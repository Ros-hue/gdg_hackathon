import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Command, Cpu, Menu, Search, Settings, ShieldCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navItems } from '../data/dashboardData';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1850);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950" exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
          <div className="relative grid place-items-center">
            <motion.div className="h-28 w-28 rounded-full border border-emerald-300/40" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }} />
            <motion.div className="absolute h-16 w-16 rounded-full border-2 border-sky-300 border-t-transparent" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }} />
            <div className="absolute text-center">
              <Cpu className="mx-auto mb-2 text-emerald-300" size={22} />
              <p className="text-xs font-semibold tracking-[0.28em] text-slate-200">BOOTING AI CORE</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AnimatedCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <motion.div className="pointer-events-none fixed z-[90] hidden h-9 w-9 rounded-full border border-emerald-300/50 mix-blend-screen shadow-[0_0_35px_rgba(34,197,94,0.5)] lg:block" animate={{ x: pos.x - 18, y: pos.y - 18 }} transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.4 }} />;
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="fixed left-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-slate-950/70 text-slate-100 backdrop-blur-xl lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
        <Menu size={20} />
      </button>
      <aside className="fixed left-4 top-4 z-40 hidden h-[calc(100vh-2rem)] w-20 flex-col items-center justify-between rounded-[28px] border border-white/10 bg-slate-950/50 py-5 shadow-2xl shadow-emerald-950/20 backdrop-blur-2xl lg:flex">
        <a href="#hero" className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-slate-950 shadow-[0_0_32px_rgba(34,197,94,0.55)]">
          <Command size={22} />
        </a>
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} className="group relative grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-xs font-semibold text-slate-300 transition hover:border-emerald-300/60 hover:text-emerald-200">
              {String(index + 1).padStart(2, '0')}
              <span className="pointer-events-none absolute left-14 min-w-max rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-[11px] text-slate-100 opacity-0 shadow-xl transition group-hover:opacity-100">{item.label}</span>
            </a>
          ))}
        </nav>
        <a href="#settings" className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 text-slate-300 hover:text-emerald-200">
          <Settings size={18} />
        </a>
      </aside>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] bg-slate-950/80 backdrop-blur-xl lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center justify-between p-5">
              <span className="font-semibold text-emerald-200">RotexAI Drone</span>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-100" aria-label="Close navigation">
                <X size={18} />
              </button>
            </div>
            <nav className="grid gap-3 px-5">
              {navItems.map((item) => (
                <a key={item.id} onClick={() => setOpen(false)} href={`#${item.id}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-100">
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Topbar({ telemetry }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:left-28">
      <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-slate-950/45 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl md:flex">
        <ShieldCheck size={17} className="text-emerald-300" />
        Fleet link secure · AI confidence {Math.round(telemetry.confidence)}%
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-slate-950/45 px-3 py-2 text-sm text-slate-400 backdrop-blur-xl sm:flex">
          <Search size={15} />
          Search orchard sectors
        </div>
        <button className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-slate-950/55 text-slate-100 backdrop-blur-xl" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_#22c55e]" />
        </button>
      </div>
    </header>
  );
}
