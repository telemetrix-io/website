import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Car,
  Check,
  Download,
  FlaskConical,
  Gauge,
  History,
  Laptop,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Usb,
  X,
  type LucideIcon,
} from 'lucide-react';
import { AppWindow } from '@/components/app-window';
import { LiveCard } from '@/components/live-card';
import { Reveal } from '@/components/reveal';
import { ScreensGallery } from '@/components/screens-gallery';
import { SectionHeading } from '@/components/section-heading';
import { features, never, notYet, profiles, reads, requirements, screens, specs } from '@/lib/content';
import { docs, site } from '@/lib/site';

const featureIcons: Record<string, LucideIcon> = {
  live: Activity,
  history: History,
  dyno: Gauge,
  ai: Sparkles,
  clear: ShieldCheck,
  sim: FlaskConical,
};

const featureTone: Record<string, string> = {
  ai: 'text-ai bg-ai/10 border-ai/25',
  clear: 'text-warn bg-warn/10 border-warn/25',
  sim: 'text-mock bg-mock/10 border-mock/25',
};

export default function HomePage() {
  const [scan, codes, ...rest] = features;

  return (
    <>
      <Hero />

      {/* ---- spec strip ---- */}
      <section aria-label="Telemetrix in numbers" className="container-x mt-8 sm:mt-16">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface-1/60 md:grid-cols-4">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className={`border-line px-6 py-7 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="tnum block font-mono text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{s.value}</span>
                <span className="mt-2 block text-sm text-fg-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---- features ---- */}
      <section id="features" className="container-x pt-28 sm:pt-36">
        <SectionHeading eyebrow="Features" title={<>A workstation, not a code reader.</>}>
          Dealer-level depth with honest labels. Every value says where it came from, and anything Telemetrix can’t
          read says so.
        </SectionHeading>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {[scan, codes].map((f, i) => (
            <Reveal key={f.id} delay={i * 80} className="panel group overflow-hidden">
              {f.image && (
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-sunken">
                  <Image
                    src={f.image.src}
                    alt={f.image.alt}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="scale-[1.55] object-cover transition-transform duration-700 group-hover:scale-[1.62]"
                    style={{ objectPosition: f.image.position, transformOrigin: f.image.position }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-surface-1 to-transparent" aria-hidden />
                </div>
              )}
              <div className="p-6 sm:p-8">
                <p className="eyebrow">{f.kicker}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-fg-muted">{f.body}</p>
                {f.points && (
                  <ul className="mt-5 grid gap-2.5">
                    {f.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-fg-muted">
                        <Check size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((f, i) => {
            const Icon = featureIcons[f.id] ?? Activity;
            return (
              <Reveal as="li" key={f.id} delay={(i % 3) * 80} className="panel p-6 transition-colors hover:border-line-strong">
                <span
                  className={`inline-flex size-10 items-center justify-center rounded-lg border ${featureTone[f.id] ?? 'border-cyan/25 bg-cyan/10 text-cyan'}`}
                >
                  <Icon size={18} aria-hidden />
                </span>
                <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-subtle">{f.kicker}</p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ---- screenshots ---- */}
      <section id="screens" className="relative mt-28 overflow-hidden border-y border-line bg-sunken/60 py-24 sm:mt-36 sm:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgb(34_196_238/0.10),transparent)]" />
        <div className="container-x relative">
          <SectionHeading eyebrow="Inside the app" title="Every screen, straight from the app.">
            Real screenshots, taken with the built-in simulator connected to a simulated BMW M2 (G87). Pick a screen.
          </SectionHeading>
          <div className="mt-12">
            <ScreensGallery screens={screens} />
          </div>
        </div>
      </section>

      {/* ---- how it works ---- */}
      <section id="how" className="container-x pt-28 sm:pt-36">
        <SectionHeading eyebrow="How it works" title="From the OBD port to answers in three steps.">
          Telemetrix talks to the car through one adapter and keeps everything on your computer. AI is the only
          optional extra, and it only ever sees decoded data.
        </SectionHeading>

        <Reveal className="mt-14">
          <Flow />
        </Reveal>

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              n: '01',
              title: 'Plug in',
              body: 'Connect the OBDLink EX to the car’s OBD-II port and to your computer’s USB port. Ignition on, engine off is fine.',
            },
            {
              n: '02',
              title: 'Scan',
              body: 'Telemetrix identifies the car, picks its profile and reads every module it finds, with real progress.',
            },
            {
              n: '03',
              title: 'Understand',
              body: 'Decoded fault codes, live data and history. Ask the AI for a plain-language explanation if you want one.',
            },
          ].map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80} className="panel p-6">
              <span className="font-mono text-sm text-cyan">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---- what we support ---- */}
      <section id="support" className="container-x pt-28 sm:pt-36">
        <SectionHeading eyebrow="What we support" title="Deep on two makes. Useful on most cars.">
          Telemetrix reads every car through a vehicle profile. BMW and Volkswagen get manufacturer-level depth, and
          any car on CAN gets the standard OBD-II data.
        </SectionHeading>

        <ul className="mt-14 grid gap-4 lg:grid-cols-3">
          {profiles.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 80} className="panel flex flex-col p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-line-strong bg-surface-3 font-mono text-sm font-semibold tracking-wider text-fg">
                  {p.make}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                  <p className="text-sm text-cyan">{p.cars}</p>
                </div>
              </div>
              <ul className="mb-6 mt-6 grid gap-2.5">
                {p.reads.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-fg-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-ok" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
              {p.note && <p className="mt-auto border-t border-line pt-4 text-xs leading-relaxed text-fg-subtle">{p.note}</p>}
            </Reveal>
          ))}
        </ul>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="panel p-6 sm:p-7">
            <h3 className="text-lg font-semibold">What you need</h3>
            <dl className="mt-5 divide-y divide-line">
              {requirements.map((r) => (
                <div key={r.label} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-fg-subtle sm:pt-0.5">{r.label}</dt>
                  <dd className="text-sm text-fg">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={80} className="panel p-6 sm:p-7">
            <h3 className="text-lg font-semibold">Not supported yet</h3>
            <ul className="mt-5 grid gap-2.5">
              {notYet.map((n) => (
                <li key={n} className="flex gap-3 text-sm text-fg-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fg-subtle" aria-hidden />
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-fg-muted">
              Need one of these?{' '}
              <Link href="/contact?topic=other" className="text-cyan underline-offset-4 hover:underline">
                Tell us
              </Link>
              .
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-4 flex gap-4 rounded-2xl border border-warn/30 bg-warn/[0.06] p-5 sm:p-6">
          <TriangleAlert size={20} className="mt-0.5 shrink-0 text-warn" aria-hidden />
          <div className="text-sm leading-relaxed text-fg-muted">
            <p className="font-semibold text-fg">Early access: what’s still being validated</p>
            <p className="mt-1.5">
              Every profile is verified on the built-in simulator, and confirming them on real cars is in progress.
              BMW and VW manufacturer code descriptions aren’t included yet, so those codes read <em>Unknown</em>{' '}
              until you add a definition with its source.{' '}
              <a href={docs('/reference/vehicles')} className="text-cyan underline-offset-4 hover:underline">
                Supported vehicles in the docs
              </a>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---- safety ---- */}
      <section id="safety" className="container-x pt-28 sm:pt-36">
        <SectionHeading eyebrow="Safety" title={<>Read-only by design.</>}>
          A diagnostics tool should never make a car worse. Telemetrix reads, and its single write is fenced off so
          it can’t happen by accident.
        </SectionHeading>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal className="panel p-6 sm:p-8">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold">
              <span className="inline-flex size-8 items-center justify-center rounded-lg border border-ok/30 bg-ok/10 text-ok">
                <Check size={16} aria-hidden />
              </span>
              What Telemetrix reads
            </h3>
            <ul className="mt-6 grid gap-3">
              {reads.map((r) => (
                <li key={r} className="flex gap-3 text-[0.9375rem] text-fg-muted">
                  <Check size={17} className="mt-0.5 shrink-0 text-ok" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="panel p-6 sm:p-8">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold">
              <span className="inline-flex size-8 items-center justify-center rounded-lg border border-bad/30 bg-bad/10 text-bad">
                <X size={16} aria-hidden />
              </span>
              What it never does
            </h3>
            <ul className="mt-6 grid gap-3">
              {never.map((r) => (
                <li key={r} className="flex gap-3 text-[0.9375rem] text-fg-muted">
                  <X size={17} className="mt-0.5 shrink-0 text-bad" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="panel mt-4 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold">The one write: clearing fault codes</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Five safeguards stand between you and a clear, and Telemetrix tells you plainly that a cleared code is
                not a repaired car.
              </p>
            </div>
            <ol className="flex flex-wrap gap-2">
              {['Switch on for this install', 'Type to arm', 'Save a scan first', 'Confirm the VIN', 'Write-ahead log'].map(
                (s, i) => (
                  <li key={s} className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm">
                    <span className="font-mono text-xs text-warn">{i + 1}</span>
                    {s}
                  </li>
                ),
              )}
            </ol>
          </div>
        </Reveal>
      </section>

      {/* ---- closing CTA ---- */}
      <section className="container-x py-28 sm:py-36">
        <Reveal className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface-1 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="grid-bg absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-80 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(34_196_238/0.25),transparent)]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-5xl">
              Ready when your car is.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-fg-muted">
              Telemetrix is in early access. Get the Windows app, or talk to us about licences for you or your
              workshop.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/download" className="btn btn-primary">
                <Download size={17} aria-hidden />
                Download for Windows
              </Link>
              <Link href="/contact?topic=licence" className="btn btn-ghost">
                Talk to sales
                <ArrowRight size={17} aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden pb-12 pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute left-1/2 top-[-12rem] h-[44rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(34_196_238/0.17),transparent)]" />
        <div className="absolute right-[-12rem] top-[26rem] h-[34rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(167_139_250/0.09),transparent)]" />
        <svg className="absolute inset-x-0 top-[37rem] hidden h-28 w-full opacity-60 sm:block" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path
            d="M0 110 C120 110 160 60 240 70 S360 130 460 100 S600 30 700 60 S860 140 960 90 S1120 40 1220 80 S1380 110 1440 96"
            fill="none"
            stroke="#22c4ee"
            strokeOpacity="0.12"
            strokeWidth="1.5"
          />
          <path
            className="trace"
            d="M0 110 C120 110 160 60 240 70 S360 130 460 100 S600 30 700 60 S860 140 960 90 S1120 40 1220 80 S1380 110 1440 96"
            fill="none"
            stroke="#5ad6f6"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="container-x relative pt-14 text-center sm:pt-24">
        <Link
          href="/about#status"
          className="rise inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-1/70 py-1.5 pl-3 pr-3.5 text-xs text-fg-muted backdrop-blur transition-colors hover:border-cyan/40 hover:text-fg"
        >
          <span className="pulse-dot size-1.5 rounded-full bg-warn" aria-hidden />
          {site.stage} · Windows · v{site.version}
          <ArrowRight size={13} aria-hidden />
        </Link>

        <h1
          className="rise mx-auto mt-7 max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-[4.75rem]"
          style={{ animationDelay: '80ms' }}
        >
          Every module. Every code. <span className="grad-text sm:block">Nothing guessed.</span>
        </h1>

        <p
          className="rise mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl"
          style={{ animationDelay: '160ms' }}
        >
          Telemetrix turns a Windows laptop and an OBDLink EX into a diagnostics workstation. Scan every control
          unit, decode fault codes, watch live data and keep an honest dyno log. Read-only by design.
        </p>

        <div className="rise mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: '240ms' }}>
          <Link href="/download" className="btn btn-primary">
            <Download size={17} aria-hidden />
            Download for Windows
          </Link>
          <Link href="/#screens" className="btn btn-ghost">
            See the app
            <ArrowRight size={17} aria-hidden />
          </Link>
        </div>
        <p className="rise mt-5 text-xs text-fg-subtle" style={{ animationDelay: '300ms' }}>
          Every feature is verified on the built-in simulator. Real-car validation is in progress.
        </p>
      </div>

      <div className="container-x relative mt-14 sm:mt-20">
        <div className="rise relative mx-auto max-w-6xl" style={{ animationDelay: '360ms' }}>
          <AppWindow
            src="/screens/overview.webp"
            alt="Telemetrix Vehicle Overview for a simulated BMW M2 G87."
            priority
            sizes="(min-width: 1216px) 1150px, 100vw"
          />

          <div className="float absolute -left-10 top-[50%] hidden xl:block">
            <div className="w-60 rounded-xl border border-line-strong bg-surface-1/95 p-3.5 text-left shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur">
              <div className="flex items-center gap-2">
                <TriangleAlert size={15} className="text-warn" aria-hidden />
                <span className="font-mono text-sm font-semibold">480A11</span>
                <span className="chip ml-auto border-warn/40 text-warn">Intermittent</span>
              </div>
              <p className="mt-2 text-[0.8125rem] leading-snug text-fg">Wheel speed sensor front left: signal implausible</p>
              <p className="mt-1.5 text-[0.6875rem] text-fg-subtle">DSC · seen in 3 scans · decoded</p>
            </div>
          </div>

          <div className="float absolute -right-10 bottom-[16%] hidden xl:block" style={{ animationDelay: '-3.5s' }}>
            <LiveCard />
          </div>

          <div className="float absolute -bottom-7 left-[30%] hidden md:block" style={{ animationDelay: '-1.8s' }}>
            <div className="flex items-center gap-2.5 rounded-xl border border-ok/30 bg-surface-1/95 px-4 py-3 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur">
              <ShieldCheck size={17} className="text-ok" aria-hidden />
              <span className="text-sm font-medium">Mileage is never modified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Flow() {
  const nodes: { icon: LucideIcon; title: string; body: string; optional?: boolean }[] = [
    { icon: Car, title: 'Your car', body: 'OBD-II port' },
    { icon: Usb, title: 'OBDLink EX', body: 'USB adapter' },
    { icon: Laptop, title: 'Your computer', body: 'Telemetrix app + local service' },
    { icon: Sparkles, title: 'EgoZ', body: 'Optional AI · decoded data only', optional: true },
  ];
  return (
    <div className="panel relative overflow-hidden p-6 sm:p-8">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-50" />
      <ol className="relative grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:gap-0">
        {nodes.map((n, i) => (
          <FlowNode key={n.title} {...n} last={i === nodes.length - 1} />
        ))}
      </ol>
      <p className="relative mt-6 text-center text-xs text-fg-subtle">
        The service listens only on your computer. Without AI turned on, nothing leaves it.
      </p>
    </div>
  );
}

function FlowNode({
  icon: Icon,
  title,
  body,
  optional,
  last,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  optional?: boolean;
  last: boolean;
}) {
  return (
    <>
      <li
        className={`flex items-center gap-3.5 rounded-xl border bg-surface-2/90 p-4 md:flex-col md:justify-center md:text-center ${
          optional ? 'border-dashed border-ai/40' : 'border-line-strong'
        }`}
      >
        <span
          className={`inline-flex size-11 shrink-0 items-center justify-center rounded-lg border ${
            optional ? 'border-ai/30 bg-ai/10 text-ai' : 'border-cyan/30 bg-cyan/10 text-cyan'
          }`}
        >
          <Icon size={20} aria-hidden />
        </span>
        <span>
          <span className="block font-semibold">{title}</span>
          <span className="block text-sm text-fg-muted">{body}</span>
        </span>
      </li>
      {!last && (
        <li aria-hidden className="flex justify-center md:w-14 md:items-center">
          <span
            className={`block h-6 w-px md:h-px md:w-full ${
              title === 'Your computer'
                ? 'bg-[repeating-linear-gradient(to_bottom,#c084fc_0_4px,transparent_4px_8px)] md:bg-[repeating-linear-gradient(to_right,#c084fc_0_4px,transparent_4px_8px)]'
                : 'bg-linear-to-b from-cyan/70 to-cyan/20 md:bg-linear-to-r'
            }`}
          />
        </li>
      )}
    </>
  );
}
