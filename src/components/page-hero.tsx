import type { ReactNode } from 'react';

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute left-1/2 top-[-14rem] h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(34_196_238/0.15),transparent)]" />
      </div>
      <div className="container-x relative pb-4 pt-16 text-center sm:pt-24">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1
          className="rise mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl"
          style={{ animationDelay: '80ms' }}
        >
          {title}
        </h1>
        {children && (
          <p
            className="rise mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted"
            style={{ animationDelay: '160ms' }}
          >
            {children}
          </p>
        )}
      </div>
    </section>
  );
}
