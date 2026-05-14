import argparse
import sys
import subprocess
from pathlib import Path



IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
VIDEO_EXTS = {".mp4", ".mov", ".mkv", ".webm", ".avi"}


def which_ffmpeg() -> str | None:
    try:
        return subprocess.check_output(["ffmpeg", "-version"], stderr=subprocess.STDOUT, text=True) and "ffmpeg"
    except Exception:
        return None


def run(cmd: list[str]) -> None:
    p = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if p.returncode != 0:
        raise RuntimeError(
            "Command failed:\n" + " ".join(cmd) + "\n\nSTDOUT:\n" + p.stdout + "\n\nSTDERR:\n" + p.stderr
        )


def compress_image(input_path: Path, output_path: Path, quality: int) -> None:
    from PIL import Image

    output_path.parent.mkdir(parents=True, exist_ok=True)

    suffix = output_path.suffix.lower()
    in_suffix = input_path.suffix.lower()

    # For best compatibility, keep JPEG extensions for JPEG inputs;
    # for PNG we default to JPEG unless user already picked .webp.
    if in_suffix in {".jpg", ".jpeg"}:
        # Save as JPEG
        img = Image.open(input_path).convert("RGB")
        img.save(output_path, "JPEG", quality=quality, optimize=True, progressive=True)
        return

    if in_suffix == ".png":
        # If output is jpeg/jpg, save as jpeg; if output is webp, save as webp.
        img = Image.open(input_path)
        if suffix in {".jpg", ".jpeg"}:
            img = img.convert("RGB")
            img.save(output_path, "JPEG", quality=quality, optimize=True, progressive=True)
        else:
            img = img.convert("RGBA")
            img.save(output_path, "WEBP", quality=quality, method=6)
        return

    if in_suffix == ".webp":
        img = Image.open(input_path)
        if suffix == ".webp":
            img.save(output_path, "WEBP", quality=quality, method=6)
        else:
            img = img.convert("RGB")
            img.save(output_path, "JPEG", quality=quality, optimize=True, progressive=True)
        return

    # Fallback: attempt JPEG conversion
    img = Image.open(input_path).convert("RGB")
    img.save(output_path, "JPEG", quality=quality, optimize=True, progressive=True)


def compress_video(input_path: Path, output_path: Path, crf: int, preset: str) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Keep container based on output extension.
    # Default: libx264 + aac.
    if output_path.suffix.lower() == ".webm":
        # VP9 path (if user targets webm)
        cmd = [
            "ffmpeg",
            "-y",
            "-i",
            str(input_path),
            "-c:v",
            "libvpx-vp9",
            "-crf",
            str(max(0, min(63, crf + 30))),
            "-b:v",
            "0",
            "-c:a",
            "libopus",
            "-b:a",
            "96k",
            str(output_path),
        ]
        # preset may not apply cleanly for vp9; ignore.
        run(cmd)
        return

    # Default mp4 (or mov) output to h264/aac
    cmd = [
        "ffmpeg",
        "-y",
        "-i",
        str(input_path),
        "-c:v",
        "libx264",
        "-preset",
        preset,
        "-crf",
        str(crf),
        "-movflags",
        "+faststart",
        "-c:a",
        "aac",
        "-b:a",
        "96k",
        str(output_path),
    ]
    run(cmd)


# (intentionally unused placeholder removed)



def main():
    parser = argparse.ArgumentParser(description="Compress images and videos under a folder.")
    parser.add_argument("--input", type=str, default="public", help="Input folder to scan")
    parser.add_argument("--output", type=str, default="public_compressed", help="Output folder")
    parser.add_argument("--image-quality", type=int, default=65, help="JPEG/WebP quality (lower=smaller)")
    parser.add_argument("--video-crf", type=int, default=28, help="FFmpeg x264 CRF (lower=better quality, bigger size)")
    parser.add_argument("--video-preset", type=str, default="medium", help="FFmpeg x264 preset (ultrafast..veryslow)")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing outputs")
    parser.add_argument("--dry-run", action="store_true", help="Print actions without writing")

    args = parser.parse_args()

    input_root = Path(args.input).resolve()
    output_root = Path(args.output).resolve()

    if not input_root.exists():
        print(f"Input folder does not exist: {input_root}")
        sys.exit(1)

    ffmpeg_ok = which_ffmpeg()
    if any(p.suffix.lower() in VIDEO_EXTS for p in input_root.rglob("*")) and not ffmpeg_ok:
        print("ffmpeg is required for video compression but was not found in PATH.")
        print("Install ffmpeg and ensure 'ffmpeg' is available in your terminal.")
        sys.exit(1)

    try:
        # Lazy import check for images
        import PIL  # noqa: F401
    except Exception:
        print("Pillow is required for image compression. Install with: pip install pillow")
        sys.exit(1)

    for path in input_root.rglob("*"):
        if not path.is_file():
            continue

        ext = path.suffix.lower()

        rel = path.relative_to(input_root)
        out_path = output_root / rel

        # Ensure output extension is reasonable for PNG inputs.
        # If output keeps PNG extension, Pillow would keep PNG (not smaller). So for PNG input,
        # default to JPEG output unless the original output extension is webp.
        if ext == ".png":
            # Change output extension to .jpg to get real size reduction.
            out_path = out_path.with_suffix(".jpg")
        elif ext in {".jpg", ".jpeg"}:
            # Keep extension as-is.
            pass
        elif ext == ".webp":
            pass

        if ext in IMAGE_EXTS:
            if out_path.exists() and not args.overwrite:
                print(f"[SKIP] {path} -> {out_path} (exists)")
                continue
            print(f"[IMG ] {path} -> {out_path}")
            if args.dry_run:
                continue
            compress_image(path, out_path, quality=args.image_quality)

        elif ext in VIDEO_EXTS:
            # For MOV inputs, output as .mp4 by default for better compatibility/smaller size.
            if out_path.suffix.lower() == ".mov":
                out_path = out_path.with_suffix(".mp4")
            if out_path.exists() and not args.overwrite:
                print(f"[SKIP] {path} -> {out_path} (exists)")
                continue
            print(f"[VID ] {path} -> {out_path}")
            if args.dry_run:
                continue
            compress_video(path, out_path, crf=args.video_crf, preset=args.video_preset)

    # Print summary sizes
    if not args.dry_run:
        total_in = sum(p.stat().st_size for p in input_root.rglob("*") if p.is_file())
        total_out = sum(p.stat().st_size for p in output_root.rglob("*") if p.is_file()) if output_root.exists() else 0
        print("\nDone.")
        print(f"Input size : {total_in / (1024 * 1024):.2f} MB")
        print(f"Output size: {total_out / (1024 * 1024):.2f} MB")


if __name__ == "__main__":
    main()

