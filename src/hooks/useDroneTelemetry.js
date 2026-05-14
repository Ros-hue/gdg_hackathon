import { useEffect, useState } from 'react';

const base = {
  battery: 87,
  altitude: 126,
  wind: 14,
  temperature: 27,
  confidence: 94,
  collected: 384,
  co2: 2.8,
  waste: 72,
  lat: 28.6139,
  lng: 77.209,
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function useDroneTelemetry() {
  const [telemetry, setTelemetry] = useState(base);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTelemetry((current) => ({
        battery: clamp(current.battery + (Math.random() > 0.72 ? 1 : -1), 54, 99),
        altitude: clamp(current.altitude + Math.round(Math.random() * 8 - 4), 96, 164),
        wind: clamp(current.wind + Number((Math.random() * 2 - 1).toFixed(1)), 6, 24),
        temperature: clamp(current.temperature + Number((Math.random() * 0.8 - 0.4).toFixed(1)), 22, 34),
        confidence: clamp(current.confidence + Number((Math.random() * 1.8 - 0.6).toFixed(1)), 86, 99.6),
        collected: current.collected + (Math.random() > 0.66 ? 1 : 0),
        co2: Number((current.co2 + 0.01).toFixed(2)),
        waste: clamp(current.waste + Number((Math.random() * 0.5).toFixed(1)), 72, 91),
        lat: Number((current.lat + (Math.random() * 0.0008 - 0.0004)).toFixed(5)),
        lng: Number((current.lng + (Math.random() * 0.0008 - 0.0004)).toFixed(5)),
      }));
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return telemetry;
}
