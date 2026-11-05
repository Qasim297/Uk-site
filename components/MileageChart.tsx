import type { MileageReading } from '@/lib/types';

const W = 640;
const H = 240;
const PAD = { top: 20, right: 20, bottom: 36, left: 60 };

export default function MileageChart({ readings }: { readings: MileageReading[] }) {
  if (readings.length < 2) {
    return <p className="muted">Not enough mileage readings to draw a chart.</p>;
  }

  const times = readings.map((r) => new Date(r.date).getTime());
  const minT = Math.min(...times);
  const maxT = Math.max(...times);
  const maxM = Math.max(...readings.map((r) => r.miles)) * 1.1 || 1;

  const x = (t: number) => PAD.left + ((t - minT) / (maxT - minT || 1)) * (W - PAD.left - PAD.right);
  const y = (m: number) => H - PAD.bottom - (m / maxM) * (H - PAD.top - PAD.bottom);

  const points = readings.map((r, i) => ({ x: x(times[i]), y: y(r.miles), r }));
  const line = points.map((p) => `${p.x},${p.y}`).join(' ');
  const area = `${PAD.left},${H - PAD.bottom} ${line} ${points[points.length - 1].x},${H - PAD.bottom}`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round((maxM * f) / 1000) * 1000);

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Recorded mileage over time">
        <defs>
          <linearGradient id="mileage-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2f7bff" stopOpacity=".35" />
            <stop offset="1" stopColor="#2f7bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="chart-grid" />
            <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" className="chart-label">
              {t >= 1000 ? `${Math.round(t / 1000)}k` : t}
            </text>
          </g>
        ))}
        <polygon points={area} fill="url(#mileage-fill)" />
        <polyline points={line} fill="none" stroke="#2f7bff" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => {
          const year = new Date(p.r.date).getFullYear();
          const showYear = i === 0 || new Date(points[i - 1].r.date).getFullYear() !== year;
          return (
            <g key={`${p.r.date}-${i}`}>
              <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke="#2f7bff" strokeWidth="3">
                <title>
                  {`${new Date(p.r.date).toLocaleDateString('en-GB')}: ${p.r.miles.toLocaleString('en-GB')} miles`}
                </title>
              </circle>
              {showYear && (
                <text x={p.x} y={H - PAD.bottom + 22} textAnchor="middle" className="chart-label">
                  {year}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="sr-only">Mileage recorded at each MOT test, oldest to newest.</figcaption>
    </figure>
  );
}
