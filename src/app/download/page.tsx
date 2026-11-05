import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Briefcase, Check, Download, FlaskConical, Monitor, Plug } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { requirements } from '@/lib/content';
import { docs, site, windowsDownloadUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Download',
  description: 'Get Telemetrix for Windows: the app and its local service in one installer.',
  alternates: { canonical: '/download' },
};

const next = [
  {
    icon: BookOpen,
    title: 'Install',
    body: 'What the installer sets up, and what happens on first launch.',
    href: docs('/getting-started/install'),
  },
  {
    icon: Plug,
    title: 'Connect your car',
    body: 'Plug in the OBDLink EX, connect, and run your first scan.',
    href: docs('/getting-started/connect'),
  },
  {
    icon: FlaskConical,
    title: 'Try the simulator',
    body: 'No car nearby? Every screen works with simulated cars.',
    href: docs('/getting-started/simulator'),
  },
];

export default function DownloadPage() {
  const available = Boolean(windowsDownloadUrl);

  return (
    <>
      <PageHero eyebrow="Download" title={<>Get Telemetrix for Windows</>}>
        One installer sets up the app and the small local service that talks to your OBDLink EX.
      </PageHero>

      <section className="container-x mt-14 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Reveal className="panel relative overflow-hidden p-7 sm:p-10">
          <div
            aria-hidden
            className="absolute right-[-6rem] top-[-6rem] size-72 rounded-full bg-[radial-gradient(closest-side,rgb(34_196_238/0.18),transparent)]"
          />
          <div className="relative">
            <div className="flex items-center gap-4">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan">
                <Monitor size={26} aria-hidden />
              </span>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Telemetrix for Windows</h2>
                <p className="mt-0.5 font-mono text-xs text-fg-subtle">
                  v{site.version} · {site.stage} · Installer (.exe)
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-2.5">
              {[
                'The Telemetrix app and its local service',
                'Built-in simulator and sample replays',
                'Choose where it installs',
                'No account, no cloud: your data stays on this PC',
              ].map((p) => (
                <li key={p} className="flex gap-3 text-[0.9375rem] text-fg-muted">
                  <Check size={17} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>

            {available ? (
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={windowsDownloadUrl!} className="btn btn-primary">
                  <Download size={17} aria-hidden />
                  Download for Windows
                </a>
                <a href={docs('/getting-started/install')} className="btn btn-ghost">
                  Install guide
                </a>
              </div>
            ) : (
              <div className="mt-9 rounded-xl border border-warn/30 bg-warn/[0.06] p-5">
                <p className="font-semibold">Public downloads open with the first release</p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  Telemetrix is in early access while we validate it on real cars. Ask for early access and we’ll send
                  you the Windows installer.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/contact?topic=early-access" className="btn btn-primary">
                    Request early access
                    <ArrowRight size={17} aria-hidden />
                  </Link>
                  <a href={docs('/getting-started/simulator')} className="btn btn-ghost">
                    Read the docs first
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={80} className="panel p-7 sm:p-8">
          <h2 className="text-lg font-semibold">What you need</h2>
          <dl className="mt-5 divide-y divide-line">
            {requirements.map((r) => (
              <div key={r.label} className="py-3">
                <dt className="font-mono text-xs uppercase tracking-wider text-fg-subtle">{r.label}</dt>
                <dd className="mt-1 text-sm text-fg">{r.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-fg-subtle">
            macOS and Linux aren’t supported yet. Check{' '}
            <Link href="/#support" className="text-cyan underline-offset-4 hover:underline">
              what we support
            </Link>{' '}
            for your car.
          </p>
        </Reveal>
      </section>

      <section className="container-x mt-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">After you install</h2>
        </Reveal>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {next.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 80}>
              <a href={n.href} className="panel group block h-full p-6 transition-colors hover:border-line-strong">
                <n.icon size={20} className="text-cyan" aria-hidden />
                <h3 className="mt-4 flex items-center gap-1.5 font-semibold">
                  {n.title}
                  <ArrowRight size={15} className="text-fg-subtle transition-transform group-hover:translate-x-0.5" aria-hidden />
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{n.body}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-x my-20 sm:mb-28">
        <Reveal className="panel flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface-3 text-fg">
              <Briefcase size={19} aria-hidden />
            </span>
            <div>
              <h2 className="font-semibold">Buying for a workshop or a team?</h2>
              <p className="mt-1 text-sm text-fg-muted">Talk to us about licences for several computers.</p>
            </div>
          </div>
          <Link href="/contact?topic=workshop" className="btn btn-ghost">
            Contact sales
            <ArrowRight size={17} aria-hidden />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
