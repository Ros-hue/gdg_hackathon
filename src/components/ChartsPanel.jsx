import { motion } from 'framer-motion';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { collectionBars, detectionSplit, detectionTrend, heatCells } from '../data/dashboardData';

const tooltipStyle = {
  background: 'rgba(2, 6, 23, 0.92)',
  border: '1px solid rgba(125, 211, 252, 0.22)',
  borderRadius: '14px',
  color: '#e2e8f0',
};

export default function ChartsPanel({ telemetry }) {
  return (
    <section id="analytics" className="section-shell">
      <div className="section-heading">
        <span>AI Detection Analytics</span>
        <h2>Rot intelligence, collection volume, and confidence signals update live.</h2>
      </div>
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.25fr]">
        <motion.div className="glass-panel p-5" whileHover={{ y: -4 }}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="panel-title">Fruit Health Split</h3>
            <span className="status-pill">{Math.round(telemetry.confidence)}% confidence</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={detectionSplit} innerRadius={68} outerRadius={104} paddingAngle={6} dataKey="value">
                  {detectionSplit.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} stroke="rgba(255,255,255,0.18)" />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {detectionSplit.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="mb-2 h-2 w-8 rounded-full" style={{ background: item.fill }} />
                <p className="text-lg font-semibold text-slate-100">{item.value}%</p>
                <p className="text-xs text-slate-400">{item.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="glass-panel p-5" whileHover={{ y: -4 }}>
          <h3 className="panel-title mb-4">Detection Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={detectionTrend}>
                <defs>
                  <linearGradient id="fresh" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="early" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.11)" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="fresh" stroke="#22c55e" fill="url(#fresh)" strokeWidth={3} />
                <Area type="monotone" dataKey="early" stroke="#38bdf8" fill="url(#early)" strokeWidth={3} />
                <Area type="monotone" dataKey="critical" stroke="#fb923c" fill="rgba(251,146,60,0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div className="glass-panel p-5" whileHover={{ y: -4 }}>
          <h3 className="panel-title mb-4">Daily Collection Analytics</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionBars}>
                <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="rescued" fill="#22c55e" radius={[10, 10, 0, 0]} />
                <Bar dataKey="recycled" fill="#38bdf8" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <motion.div className="glass-panel p-5" whileHover={{ y: -4 }}>
          <h3 className="panel-title mb-4">Orchard Heatmap</h3>
          <div className="grid grid-cols-7 gap-2">
            {heatCells.map((cell) => (
              <motion.div
                key={cell.id}
                className="aspect-square rounded-xl border border-white/10"
                style={{ background: `rgba(${cell.intensity > 70 ? '249,115,22' : '34,197,94'}, ${cell.intensity / 120})` }}
                whileHover={{ scale: 1.12 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
