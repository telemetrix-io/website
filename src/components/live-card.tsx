'use client';

import { useEffect, useState } from 'react';

const POINTS = 48;
const W = 180;
const H = 44;

/** A smooth, made-up engine-speed trace. Deterministic, so server and client render the same first frame. */
function rpmAt(t: number) {
  return 2600 + 1100 * Math.sin(t / 17) + 380 * Math.sin(t / 5.3) + 120 * Math.sin(t / 1.9);
}

function series(start: number) {
  return Array.from({ length: POINTS }, (_, i) => rpmAt(start + i));
}

function path(values: number[]) {
  const min = 1000;
  const max = 4600;
  return values
    .map((v, i) => {
      const x = (i / (POINTS - 1)) * W;
      const y = H - ((v - min) / (max - min)) * H;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

/**
 * Decorative: a small live-data card in the app's style, ticking at 10 Hz. It's labelled Simulated because it
 * is — the site never pretends to show a real car.
 */
export function LiveCard() {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setT((v) => v + 1), 100);
    return () => window.clearInterval(id);
  }, []);

  const values = series(t);
  const current = Math.round(values[values.length - 1] / 10) * 10;
  const line = path(values);

  return (
    <div className="w-[13.5rem] rounded-xl border border-line-strong bg-surface-1/95 p-3.5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-fg">RPM</span>
        <span className="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-wider text-ok">
          <span className="pulse-dot size-1.5 rounded-full bg-ok" aria-hidden />
          LIVE
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="tnum font-mono text-2xl font-semibold tracking-tight text-fg">{current.toLocaleString('en-US')}</span>
        <span className="text-xs text-fg-subtle">rpm</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-11 w-full" aria-hidden preserveAspectRatio="none">
        <defs>
          <linearGradient id="live-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#22c4ee" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22c4ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="url(#live-fill)" />
        <path d={line} fill="none" stroke="#22c4ee" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex items-center justify-between font-mono text-[0.625rem] text-fg-subtle">
        <span>PID 010C · 10 Hz</span>
        <span className="text-mock">SIMULATED</span>
      </div>
    </div>
  );
}
