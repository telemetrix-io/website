import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { milestones, principles } from '@/lib/content';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Why Telemetrix exists, the principles it is built on, and where the project is today.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title={<>Tools that tell the truth about your car</>}>
        Telemetrix exists because reading a modern car shouldn’t mean choosing between a code reader that guesses and
        workshop software you can’t trust yourself with.
      </PageHero>

      {/* ---- story ---- */}
      <section className="container-x mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Why we built it</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em]">
            A modern car has dozens of computers. You should be able to read all of them.
          </h2>
        </Reveal>
        <Reveal delay={80} className="grid gap-5 text-[1.0625rem] leading-relaxed text-fg-muted">
          <p>
            Most tools give you too little or too much. A generic code reader shows an emissions code and a guess.
            Dealer software reaches every module, but it’s built for workshops, priced for them, and makes it easy to
            change things you didn’t mean to.
          </p>
          <p>
            Telemetrix sits in between. It reads every module like a workstation, and it labels every value for what
            it is: decoded from the car, missing, unknown, or explained by AI. When it doesn’t know something, it
            says so.
          </p>
          <p>
            It’s built for people who care about their cars: enthusiasts who track and tune, owners who want to know
            what a warning really means, and technicians who need a clear record of what they read.
          </p>
        </Reveal>
      </section>

      {/* ---- principles ---- */}
      <section className="container-x mt-24 sm:mt-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What we believe</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">Five rules the app never breaks</h2>
        </Reveal>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 80} className="panel p-6 sm:p-7">
              <span className="font-mono text-sm text-cyan">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
            </Reveal>
          ))}
          <Reveal as="li" delay={160} className="flex flex-col justify-center rounded-2xl border border-dashed border-line-strong p-6 sm:p-7">
            <p className="text-sm leading-relaxed text-fg-muted">
              Read-only isn’t a promise in a manual. It’s enforced in code and checked by automated tests: every run
              inspects a log of each frame sent and fails if a forbidden command appears.
            </p>
          </Reveal>
        </ol>
      </section>

      {/* ---- status ---- */}
      <section id="status" className="container-x mt-24 sm:mt-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Where we are</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">{site.stage}, honestly</h2>
            <p className="mt-5 leading-relaxed text-fg-muted">
              Every feature below is built and verified on the built-in simulator. The next step is confirming each
              one on real cars, then the first public Windows release.
            </p>
            <Link href="/contact?topic=early-access" className="btn btn-ghost mt-7">
              Join early access
              <ArrowRight size={17} aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <ol className="relative grid gap-0">
              {milestones.map((m, i) => {
                const current = 'current' in m && m.current;
                return (
                  <li key={m.title} className="relative grid grid-cols-[2rem_1fr] gap-4 pb-8 last:pb-0">
                    {i < milestones.length - 1 && (
                      <span aria-hidden className="absolute left-[0.9375rem] top-8 bottom-0 w-px bg-line-strong" />
                    )}
                    <span
                      className={`relative z-10 mt-0.5 inline-flex size-8 items-center justify-center rounded-full border ${
                        current ? 'border-warn/50 bg-warn/10 text-warn' : 'border-ok/40 bg-ok/10 text-ok'
                      }`}
                    >
                      {current ? <span className="pulse-dot size-2 rounded-full bg-warn" /> : <Check size={15} />}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-semibold">{m.title}</h3>
                        <span className={`chip ${current ? 'border-warn/40 text-warn' : 'text-fg-subtle'}`}>{m.state}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{m.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---- AI note + CTA ---- */}
      <section className="container-x my-24 sm:my-32">
        <Reveal className="panel grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Have a car we should support next?</h2>
            <p className="mt-3 leading-relaxed text-fg-muted">
              Telemetrix’s optional AI runs through{' '}
              <a href={site.egozUrl} className="text-cyan underline-offset-4 hover:underline">
                EgoZ
              </a>
              , and its vehicle profiles grow with the cars people bring. Tell us what you drive or what your workshop
              sees most.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact" className="btn btn-primary">
              Contact us
              <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
