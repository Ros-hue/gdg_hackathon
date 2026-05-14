export const navItems = [
  { id: 'hero', label: 'Overview' },
  { id: 'monitoring', label: 'Drone Monitor' },
  { id: 'analytics', label: 'Fruit Analytics' },
  { id: 'map', label: 'Farm Map' },
  { id: 'control', label: 'Control' },
  { id: 'camera', label: 'Rot Detection' },
  { id: 'impact', label: 'Impact' },
  { id: 'team', label: 'Team' },
];

export const detectionSplit = [
  { name: 'Fresh', value: 67, fill: '#22c55e' },
  { name: 'Early Rot', value: 24, fill: '#38bdf8' },
  { name: 'Critical', value: 9, fill: '#f97316' },
];

export const detectionTrend = [
  { time: '06:00', fresh: 42, early: 8, critical: 2 },
  { time: '08:00', fresh: 71, early: 14, critical: 4 },
  { time: '10:00', fresh: 108, early: 21, critical: 7 },
  { time: '12:00', fresh: 146, early: 31, critical: 11 },
  { time: '14:00', fresh: 188, early: 44, critical: 14 },
  { time: '16:00', fresh: 232, early: 52, critical: 19 },
];

export const collectionBars = [
  { day: 'Mon', recycled: 28, rescued: 96 },
  { day: 'Tue', recycled: 42, rescued: 112 },
  { day: 'Wed', recycled: 36, rescued: 128 },
  { day: 'Thu', recycled: 58, rescued: 151 },
  { day: 'Fri', recycled: 63, rescued: 174 },
  { day: 'Sat', recycled: 71, rescued: 190 },
  { day: 'Sun', recycled: 86, rescued: 212 },
];

export const heatCells = Array.from({ length: 42 }, (_, index) => {
  const intensity = [18, 36, 54, 72, 90][(index * 7 + 3) % 5];
  return { id: index, intensity };
});

export const mapMarkers = [
  { id: 1, x: 18, y: 24, level: 'Fresh', score: 97 },
  { id: 2, x: 31, y: 48, level: 'Early Rot', score: 82 },
  { id: 3, x: 47, y: 34, level: 'Critical', score: 91 },
  { id: 4, x: 63, y: 59, level: 'Fresh', score: 95 },
  { id: 5, x: 74, y: 29, level: 'Early Rot', score: 79 },
  { id: 6, x: 86, y: 68, level: 'Critical', score: 88 },
];

export const pipeline = [
  { title: 'Orchard Scan', value: 94 },
  { title: 'Rot Detection', value: 89 },
  { title: 'Dashboard Sync', value: 84 },
  { title: 'Smart Collection', value: 76 },
  { title: 'Reuse Routing', value: 68 },
];

export const teamMembers = [
  { name: 'Yuvraj Yadav', role: 'AI Vision & Dashboard', initials: 'YY' },
  { name: 'Susant Dhakal', role: 'Drone Workflow Simulation', initials: 'SD' },
  { name: 'Sai Harshini Gorripati', role: 'Sustainability Analytics', initials: 'SG' },
  { name: 'Harshita Mamadapur', role: 'Smart Farm Monitoring', initials: 'HM' },
];

export const milestones = [
  'Drone scans orchard area',
  'AI detects early fruit rot',
  'Detection data syncs to dashboard',
  'Drone collects affected fruits',
  'Fruit is redirected for sustainable reuse',
];
