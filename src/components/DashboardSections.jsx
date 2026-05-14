import { motion } from 'framer-motion';
import { BatteryCharging, CloudSun, Cpu, Fingerprint, Gauge, Leaf, MapPin, Navigation, Recycle, Satellite, SlidersHorizontal, Sprout, Thermometer, ToggleLeft, Waves, Wind, Zap } from 'lucide-react';
import DroneScene from './DroneScene';
import { mapMarkers, milestones, pipeline, teamMembers } from '../data/dashboardData';
import { coord } from '../utils/format';

export function StatCard({ icon: Icon, label, value, accent = 'emerald' }) {
  const accentClass = accent === 'sky' ? 'bg-sky-400/10 text-sky-300' : 'bg-emerald-400/10 text-emerald-300';

  return (
    <motion.div className="glass-panel p-4" whileHover={{ y: -5, scale: 1.01 }}>
      <div className="mb-3 flex items-center justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-2xl ${accentClass}`}>
          <Icon size={19} />
        </span>
        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_#22c55e]" />
      </div>
      <p className="text-2xl font-semibold text-slate-50">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </motion.div>
  );
}

export function Hero({ telemetry }) {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pl-0 lg:pl-28">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:54px_54px] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(34,197,94,0.20),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(14,165,233,0.19),transparent_32%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 py-24 lg:grid-cols-[0.96fr_1.04fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100 shadow-[0_0_30px_rgba(34,197,94,0.18)]">
            <Waves size={16} /> ZYNEX Vision with Velocity Hackathon
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-7xl lg:text-8xl">RotexAI Drone</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">AI-powered autonomous drone system for early fruit rot detection and sustainable smart harvesting.</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">Combines artificial intelligence, computer vision, and drone technology to reduce food wastage, agricultural losses, and environmental impact.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#monitoring" className="magnetic-btn bg-emerald-300 text-slate-950 shadow-[0_0_32px_rgba(34,197,94,0.45)]">Launch Demo</a>
            <a href="#camera" className="magnetic-btn border border-sky-300/30 bg-sky-300/10 text-sky-100">View AI Vision</a>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon={BatteryCharging} label="Battery" value={`${telemetry.battery}%`} />
            <StatCard icon={Gauge} label="Altitude" value={`${telemetry.altitude}m`} accent="sky" />
            <StatCard icon={Leaf} label="Fruit collected" value={telemetry.collected} />
            <StatCard icon={Cpu} label="AI confidence" value={`${Math.round(telemetry.confidence)}%`} accent="sky" />
          </div>
        </motion.div>
        <motion.div className="relative h-[520px] min-h-[420px]" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <DroneScene />
          <div className="pointer-events-none absolute inset-x-8 bottom-14 rounded-full border border-emerald-300/30 p-8">
            <div className="radar-sweep" />
          </div>
          <div className="absolute right-4 top-20 glass-panel max-w-[220px] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-sky-200">Scan Lock</p>
            <p className="mt-2 text-2xl font-semibold text-white">Sector B-12</p>
            <p className="text-sm text-slate-400">Early rot clusters detected</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Monitoring({ telemetry }) {
  const cards = [
    [BatteryCharging, 'Battery', `${telemetry.battery}%`, 'emerald'],
    [Navigation, 'Altitude', `${telemetry.altitude} m`, 'sky'],
    [MapPin, 'GPS', `${coord(telemetry.lat)}, ${coord(telemetry.lng)}`, 'emerald'],
    [Wind, 'Wind speed', `${telemetry.wind.toFixed(1)} km/h`, 'sky'],
    [Thermometer, 'Temperature', `${telemetry.temperature.toFixed(1)} C`, 'emerald'],
  ];

  return (
    <section id="monitoring" className="section-shell">
      <div className="section-heading">
        <span>Drone Monitoring System</span>
        <h2>Live telemetry for battery, altitude, GPS, wind, temperature, and AI confidence.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(([Icon, label, value, accent]) => (
            <StatCard key={label} icon={Icon} label={label} value={value} accent={accent} />
          ))}
          <div className="glass-panel p-5 sm:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_#22c55e]" />
              <p className="font-medium text-emerald-100">Autonomous drone link stable</p>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-sky-300" animate={{ width: `${telemetry.confidence}%` }} />
            </div>
          </div>
        </div>
        <div className="glass-panel relative min-h-[420px] overflow-hidden p-5">
          <div className="absolute inset-0 camera-noise opacity-40" />
          <div className="relative flex items-center justify-between">
            <h3 className="panel-title">Real-Time Detection Simulation</h3>
            <span className="status-pill">LIVE</span>
          </div>
          <div className="relative mt-5 h-[330px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(34,197,94,0.16),transparent_30%),linear-gradient(135deg,#052e16,#020617_55%,#082f49)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:100%_28px]" />
            <div className="scan-line" />
            {[
              ['Fresh', '97%', 'left-[15%] top-[22%] h-20 w-24 border-emerald-300'],
              ['Early Rot', '82%', 'left-[49%] top-[38%] h-24 w-28 border-sky-300'],
              ['Critical', '91%', 'left-[68%] top-[18%] h-28 w-24 border-orange-300'],
            ].map(([label, score, cls]) => (
              <div key={label} className={`absolute rounded-2xl border-2 ${cls}`}>
                <span className="absolute -top-8 left-0 rounded-lg bg-slate-950/80 px-2 py-1 text-xs text-white">{label} {score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FarmMap() {
  return (
    <section id="map" className="section-shell">
      <div className="section-heading">
        <span>Smart Farm Monitoring</span>
        <h2>Interactive orchard map with route visualization, rot severity markers, and live alerts.</h2>
      </div>
      <div className="glass-panel relative h-[560px] overflow-hidden p-5">
        <div className="absolute inset-5 rounded-[28px] bg-[linear-gradient(135deg,rgba(20,83,45,0.75),rgba(2,6,23,0.88)),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:auto,42px_42px,42px_42px]" />
        <svg className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path d="M8 72 C24 18, 38 86, 52 42 S78 12, 92 64" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }} />
        </svg>
        {mapMarkers.map((marker) => (
          <motion.div key={marker.id} className="absolute z-10" style={{ left: `${marker.x}%`, top: `${marker.y}%` }} whileHover={{ scale: 1.2 }}>
            <span className={`block h-5 w-5 rounded-full border-2 ${marker.level === 'Critical' ? 'border-orange-300 bg-orange-400/40' : marker.level === 'Early Rot' ? 'border-sky-300 bg-sky-400/40' : 'border-emerald-300 bg-emerald-400/40'} shadow-[0_0_22px_currentColor]`} />
            <span className="mt-2 block rounded-lg border border-white/10 bg-slate-950/80 px-2 py-1 text-xs text-slate-100">{marker.level} · {marker.score}%</span>
          </motion.div>
        ))}
        <div className="absolute bottom-9 left-9 right-9 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
          <span className="flex items-center gap-2 text-slate-200"><Satellite size={18} className="text-sky-300" /> Drone route: Orchard North Ridge</span>
          <button className="magnetic-btn border border-emerald-300/30 bg-emerald-300/10 py-2 text-emerald-100">Zoom Sector</button>
        </div>
      </div>
    </section>
  );
}

export function ControlCenter() {
  return (
    <section id="control" className="section-shell">
      <div className="section-heading">
        <span>3D Drone Visualization</span>
        <h2>Three.js powered command view for autonomous navigation and collection systems.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel h-[560px] overflow-hidden">
          <DroneScene compact />
        </div>
        <div className="grid gap-4">
          {['Autonomous route lock', 'Propeller balance', 'Soft-grip collection arm', 'Computer vision scan'].map((item, index) => (
            <motion.div key={item} className="glass-panel flex items-center justify-between p-5" whileHover={{ x: 6 }}>
              <div>
                <p className="font-semibold text-slate-100">{item}</p>
                <p className="text-sm text-slate-400">Subsystem {index + 1} nominal</p>
              </div>
              <Zap className="text-emerald-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CameraDetection() {
  return (
    <section id="camera" className="section-shell">
      <div className="section-heading">
        <span>AI Fruit Rot Detection</span>
        <h2>Computer vision HUD with early spoilage boxes, confidence scoring, and collection priority.</h2>
      </div>
      <div className="glass-panel relative min-h-[520px] overflow-hidden p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(34,197,94,0.22),transparent_22%),radial-gradient(circle_at_78%_62%,rgba(56,189,248,0.18),transparent_26%),linear-gradient(135deg,#052e16,#020617_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="scan-line" />
        {[
          ['Fresh', '98.4%', 'left-[12%] top-[18%] h-32 w-36 border-emerald-300'],
          ['Early Rot', '87.1%', 'left-[42%] top-[42%] h-36 w-44 border-sky-300'],
          ['Critical', '93.8%', 'left-[70%] top-[22%] h-40 w-32 border-orange-300'],
        ].map(([label, score, cls]) => (
          <motion.div key={label} className={`absolute rounded-[24px] border-2 ${cls}`} animate={{ opacity: [0.65, 1, 0.65] }} transition={{ repeat: Infinity, duration: 2.3 }}>
            <span className="absolute -top-9 left-0 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-1 text-xs text-white">{label} · {score}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function CollectionAndImpact({ telemetry }) {
  return (
    <>
      <section className="section-shell">
        <div className="section-heading">
          <span>Demo Workflow</span>
          <h2>From orchard scan to sustainable reuse routing, matching the hackathon pitch flow.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {pipeline.map((step, index) => (
            <motion.div key={step.title} className="glass-panel p-5 text-center" whileHover={{ y: -7 }}>
              <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full border border-emerald-300/40 bg-emerald-300/10 text-2xl font-semibold text-emerald-100 shadow-[0_0_28px_rgba(34,197,94,0.22)]">{step.value}%</div>
              <p className="font-semibold text-slate-100">{step.title}</p>
              <p className="mt-2 text-sm text-slate-400">Workflow step {index + 1}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="impact" className="section-shell">
        <div className="section-heading">
        <span>Sustainability Impact</span>
        <h2>Reducing food waste while improving crop management and smart farming automation.</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-panel grid min-h-[360px] place-items-center overflow-hidden">
            <div className="earth-hologram" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={Recycle} label="CO2 reduced" value={`${telemetry.co2.toFixed(1)}t`} />
            <StatCard icon={Leaf} label="Waste reduced" value={`${Math.round(telemetry.waste)}%`} accent="sky" />
            <StatCard icon={Sprout} label="Reuse routed" value={telemetry.collected} />
          </div>
        </div>
      </section>
    </>
  );
}

export function TeamAndSettings({ lightMode, onThemeToggle }) {
  return (
    <section id="team" className="section-shell">
      <div className="section-heading">
        <span>Team code-py</span>
        <h2>Built for ZYNEX across AI/ML, smart agriculture, drone technology, computer vision, and sustainability.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <motion.div key={member.name} className="glass-panel p-5" whileHover={{ y: -5 }}>
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-sky-300 font-bold text-slate-950">{member.initials}</div>
              <p className="font-semibold text-slate-100">{member.name}</p>
              <p className="text-sm text-slate-400">{member.role}</p>
              <div className="mt-4 flex gap-2">
                <span className="h-9 w-9 rounded-full border border-white/10 bg-white/[0.04]" />
                <span className="h-9 w-9 rounded-full border border-white/10 bg-white/[0.04]" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-5">
          <div className="glass-panel p-5">
            {milestones.map((milestone, index) => (
              <div key={milestone} className="flex gap-4 border-l border-emerald-300/20 pb-5 pl-4 last:pb-0">
                <span className="-ml-[25px] grid h-5 w-5 place-items-center rounded-full bg-emerald-300 text-[10px] font-bold text-slate-950">{index + 1}</span>
                <p className="text-slate-200">{milestone}</p>
              </div>
            ))}
          </div>
          <div id="settings" className="glass-panel p-5">
            <h3 className="panel-title mb-4">Demo Settings</h3>
            <button type="button" onClick={onThemeToggle} className="mb-4 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-emerald-300/40">
              <span className="flex items-center gap-2 text-slate-200"><CloudSun size={18} className="text-emerald-300" /> {lightMode ? 'Light command mode' : 'Dark futuristic mode'}</span>
              <span className="status-pill">{lightMode ? 'LIGHT' : 'DARK'}</span>
            </button>
            {['Collection arm safety', 'Rot alert notifications'].map((label) => (
              <div key={label} className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="flex items-center gap-2 text-slate-200"><ToggleLeft size={18} className="text-emerald-300" /> {label}</span>
                <span className="status-pill">ON</span>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="mb-3 flex items-center gap-2 text-slate-200"><SlidersHorizontal size={18} className="text-sky-300" /> AI sensitivity</span>
              <input className="w-full accent-emerald-300" type="range" defaultValue="82" />
            </div>
            <div className="mt-4 rounded-2xl border border-sky-300/20 bg-sky-300/10 p-4">
              <span className="mb-3 flex items-center gap-2 text-slate-200"><Fingerprint size={18} className="text-sky-300" /> Operator Authentication</span>
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm text-slate-100 outline-none ring-emerald-300/30 transition focus:ring-4" defaultValue="demo@rotexai.ai" aria-label="Operator email" />
                <button className="magnetic-btn bg-sky-300 py-3 text-slate-950">Authenticate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
