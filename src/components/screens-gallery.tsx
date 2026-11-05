'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { LogoMark } from './logo';
import type { Screen } from '@/lib/content';

/** Tabbed tour of the real app screens. All images are stacked so switching tabs cross-fades instantly. */
export function ScreensGallery({ screens }: { screens: Screen[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    const next = (i + screens.length) % screens.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') select(active + 1);
    else if (e.key === 'ArrowLeft') select(active - 1);
    else if (e.key === 'Home') select(0);
    else if (e.key === 'End') select(screens.length - 1);
    else return;
    e.preventDefault();
  };

  const current = screens[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="App screens"
        onKeyDown={onKey}
        className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {screens.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={i === active}
            aria-controls="screen-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="shrink-0 rounded-lg border px-3.5 py-2 text-sm transition-colors aria-selected:border-cyan/50 aria-selected:bg-cyan/10 aria-selected:text-fg border-line text-fg-muted hover:text-fg"
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        id="screen-panel"
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="mt-8 overflow-hidden rounded-xl border border-line-strong bg-surface-1 shadow-[0_40px_120px_-40px_rgb(34_196_238/0.3),0_30px_60px_-30px_rgb(0_0_0/0.8)]"
      >
        <div className="flex h-8 items-center gap-2 border-b border-line bg-sunken px-3 text-[0.6875rem] text-fg-subtle sm:h-9" aria-hidden>
          <LogoMark className="size-4" />
          Telemetrix — {current.title}
        </div>
        <div className="grid">
          {screens.map((s, i) => (
            <Image
              key={s.id}
              src={s.src}
              alt={s.alt}
              width={2880}
              height={1800}
              sizes="(min-width: 1216px) 1150px, 100vw"
              aria-hidden={i !== active}
              className={`block h-auto w-full transition-opacity duration-500 [grid-area:1/1] ${
                i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-1 text-center" aria-live="polite">
        <p className="font-semibold text-fg">{current.title}</p>
        <p className="text-sm leading-relaxed text-fg-muted">{current.body}</p>
      </div>
    </div>
  );
}
