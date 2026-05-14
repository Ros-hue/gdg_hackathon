import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';
import ChartsPanel from './components/ChartsPanel';
import { AnimatedCursor, LoadingScreen, Sidebar, Topbar } from './components/Shell';
import { CameraDetection, CollectionAndImpact, ControlCenter, FarmMap, Hero, Monitoring, TeamAndSettings } from './components/DashboardSections';
import { useDroneTelemetry } from './hooks/useDroneTelemetry';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const telemetry = useDroneTelemetry();
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.section-shell').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 46 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
            },
          },
        );
      });

      gsap.to('.orbital-particle', {
        y: 'random(-28, 28)',
        x: 'random(-24, 24)',
        opacity: 'random(0.35, 0.9)',
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.08,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`min-h-screen overflow-x-hidden text-slate-100 ${lightMode ? 'light-command' : 'bg-slate-950'}`}>
      <LoadingScreen />
      <AnimatedCursor />
      <BackgroundParticles />
      <Sidebar />
      <Topbar telemetry={telemetry} />
      <main>
        <Hero telemetry={telemetry} />
        <div className="relative z-10 pl-0 lg:pl-28">
          <Monitoring telemetry={telemetry} />
          <ChartsPanel telemetry={telemetry} />
          <FarmMap />
          <ControlCenter />
          <CameraDetection />
          <CollectionAndImpact telemetry={telemetry} />
          <TeamAndSettings lightMode={lightMode} onThemeToggle={() => setLightMode((value) => !value)} />
        </div>
      </main>
      <div className="fixed bottom-5 right-5 z-40 hidden rounded-2xl border border-emerald-300/20 bg-slate-950/70 px-4 py-3 text-sm text-emerald-100 shadow-[0_0_30px_rgba(34,197,94,0.18)] backdrop-blur-xl sm:block">
        Early rot alert in Orchard Sector B-12
      </div>
    </div>
  );
}

function BackgroundParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 46 }, (_, index) => (
        <span
          key={index}
          className="orbital-particle absolute h-1 w-1 rounded-full bg-emerald-200/70 shadow-[0_0_12px_rgba(34,197,94,0.8)]"
          style={{
            left: `${(index * 19) % 100}%`,
            top: `${(index * 31) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}
