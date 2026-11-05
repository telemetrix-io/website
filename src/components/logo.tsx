import Link from 'next/link';

/** The gauge mark from the app's sidebar (same drawing as public/logo.svg). */
export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="#1c2129" stroke="#343d4a" />
      <path d="M7 20.5a9 9 0 0 1 18 0" stroke="#343d4a" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7 20.5a9 9 0 0 1 12.2-8.4" stroke="#22c4ee" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16 20.5 21.5 13" stroke="#e7ebf0" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="20.5" r="1.8" fill="#e7ebf0" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Telemetrix home">
      <LogoMark className="size-8 transition-transform duration-300 group-hover:-rotate-6" />
      <span className="text-[1.0625rem] font-semibold tracking-tight">Telemetrix</span>
    </Link>
  );
}
