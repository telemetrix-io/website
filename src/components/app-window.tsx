import Image from 'next/image';
import { LogoMark } from './logo';

/** A Windows-style app window around a real screenshot (the app ships for Windows). */
export function AppWindow({
  src,
  alt,
  priority,
  sizes = '(min-width: 1280px) 1150px, 100vw',
  className = '',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line-strong bg-surface-1 shadow-[0_40px_120px_-40px_rgb(34_196_238/0.35),0_30px_60px_-30px_rgb(0_0_0/0.8)] ${className}`}
    >
      <div className="flex h-8 items-center justify-between border-b border-line bg-sunken pl-3 sm:h-9" aria-hidden>
        <div className="flex items-center gap-2 text-[0.6875rem] text-fg-subtle">
          <LogoMark className="size-4" />
          Telemetrix
        </div>
        <div className="flex h-full text-fg-subtle">
          {/* minimise · maximise · close */}
          <span className="flex w-10 items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M1 5h8" stroke="currentColor" />
            </svg>
          </span>
          <span className="flex w-10 items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="currentColor" />
            </svg>
          </span>
          <span className="flex w-10 items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" />
            </svg>
          </span>
        </div>
      </div>
      <Image src={src} alt={alt} width={2880} height={1800} priority={priority} sizes={sizes} className="block h-auto w-full" />
    </figure>
  );
}
