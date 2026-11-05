import { ImageResponse } from 'next/og';

export const alt = 'Telemetrix — Every module. Every code. Nothing guessed.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Social card: the gauge mark and the headline on the Graphite canvas. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(ellipse 80% 70% at 50% -10%, rgba(34,196,238,0.28), #0b0d10 60%)',
          color: '#e7ebf0',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <rect x="1" y="1" width="30" height="30" rx="8" fill="#1c2129" stroke="#343d4a" />
            <path d="M7 20.5a9 9 0 0 1 18 0" stroke="#343d4a" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M7 20.5a9 9 0 0 1 12.2-8.4" stroke="#22c4ee" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M16 20.5 21.5 13" stroke="#e7ebf0" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="20.5" r="1.8" fill="#e7ebf0" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Telemetrix</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, display: 'flex', flexWrap: 'wrap' }}>
            <span>Every module. Every code.&nbsp;</span>
            <span style={{ color: '#22c4ee' }}>Nothing guessed.</span>
          </div>
          <div style={{ fontSize: 30, color: '#a4aebb' }}>The diagnostics workstation for your car. Read-only by design.</div>
        </div>
      </div>
    ),
    size,
  );
}
