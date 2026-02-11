import React from 'react';

function hashStringToInt(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function mulberry32(seed) {
  return function rand() {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function generateRoutePoints(seed, pointCount = 10) {
  const rand = mulberry32(seed);
  let x = 10 + rand() * 80;
  let y = 10 + rand() * 80;

  const points = [{ x, y }];
  for (let i = 1; i < pointCount; i += 1) {
    const dx = (rand() - 0.5) * 26;
    const dy = (rand() - 0.5) * 26;
    x = clamp(x + dx, 8, 92);
    y = clamp(y + dy, 8, 92);
    points.push({ x, y });
  }

  return points;
}

function pointsToPath(points) {
  if (!points.length) return '';
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
}

export default function FlyoverPreview({ activityId, className = '', density = 10 }) {
  const seed = hashStringToInt(activityId || 'activity');
  const points = generateRoutePoints(seed, density);
  const pathD = pointsToPath(points);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-strava-border bg-white ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full block">
        {/* background */}
        <defs>
          <linearGradient id={`flyover-bg-${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F8FAFC" />
            <stop offset="1" stopColor="#FFF7ED" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill={`url(#flyover-bg-${seed})`} />

        {/* subtle grid */}
        <g opacity="0.12">
          {Array.from({ length: 9 }).map((_, i) => {
            const v = (i + 1) * 10;
            return (
              <React.Fragment key={v}>
                <line x1={v} y1={0} x2={v} y2={100} stroke="#0F172A" strokeWidth="0.4" />
                <line x1={0} y1={v} x2={100} y2={v} stroke="#0F172A" strokeWidth="0.4" />
              </React.Fragment>
            );
          })}
        </g>

        {/* route outline */}
        <path
          d={pathD}
          fill="none"
          stroke="#111827"
          strokeOpacity="0.18"
          strokeWidth="5.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* animated route */}
        <path
          d={pathD}
          fill="none"
          stroke="#FC4C02"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="100"
          className="flyover-draw"
        />

        {/* start + end dots */}
        <circle cx={points[0]?.x ?? 10} cy={points[0]?.y ?? 10} r="2.2" fill="#16A34A" />
        <circle cx={points.at(-1)?.x ?? 90} cy={points.at(-1)?.y ?? 90} r="2.6" fill="#FC4C02" className="flyover-pulse" />
      </svg>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .flyover-draw { animation: none !important; stroke-dashoffset: 0 !important; }
          .flyover-pulse { animation: none !important; }
        }
        .flyover-draw {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: flyover-draw 3.4s ease-in-out infinite;
        }
        .flyover-pulse {
          transform-origin: center;
          animation: flyover-pulse 1.4s ease-in-out infinite;
        }
        @keyframes flyover-draw {
          0% { stroke-dashoffset: 100; opacity: 0.85; }
          55% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -20; opacity: 0.0; }
        }
        @keyframes flyover-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.45); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
