import Link from 'next/link';
import { Logo } from './logo';
import { docs, site } from '@/lib/site';

const columns = [
  {
    title: 'Product',
    links: [
      { href: '/#features', label: 'Features' },
      { href: '/#screens', label: 'Screenshots' },
      { href: '/#support', label: 'What we support' },
      { href: '/download', label: 'Download' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/contact?topic=licence', label: 'Buy a licence' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: docs(), label: 'Documentation' },
      { href: docs('/getting-started'), label: 'Getting started' },
      { href: docs('/safety'), label: 'Safety' },
      { href: docs('/safety/privacy'), label: 'Your data & privacy' },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sunken">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">
            The diagnostics workstation for your car. <span className="whitespace-nowrap">Read-only</span> by design.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-fg-subtle">
            <span className="size-1.5 rounded-full bg-warn" aria-hidden />
            {site.stage} · v{site.version}
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold text-fg">{col.title}</h2>
            <ul className="mt-4 grid gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith('http') ? (
                    <a href={l.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line-subtle">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-fg-subtle md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Telemetrix. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            BMW, Volkswagen and OBDLink are trademarks of their owners. Telemetrix is not affiliated with or endorsed
            by them.
          </p>
        </div>
      </div>
    </footer>
  );
}
