/**
 * Where everything lives. Change a domain or address here and every nav link, CTA and meta tag follows.
 * The domains are placeholders until the real ones are chosen.
 */
export const site = {
  name: 'Telemetrix',
  description:
    'Telemetrix turns a Windows laptop and an OBDLink EX into a diagnostics workstation: scan every module, decode fault codes, watch live data and keep an honest dyno log. Read-only by design.',
  /** This marketing site. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://telemetrix.io',
  /** The public docs (the `docs/` repo). */
  docsUrl: 'https://docs.telemetrix.io',
  /** EgoZ, which runs the optional AI explanations. */
  egozUrl: 'https://egoz.io',
  /** Shown on the contact page and used as the fallback when the form can't send. */
  contactEmail: 'hello@telemetrix.io',
  version: '0.1.0',
  stage: 'Early access',
} as const;

/**
 * The Windows installer. Set NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL at build time once a public build exists;
 * until then the download page offers early access instead of a dead link.
 */
export const windowsDownloadUrl: string | null = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || null;

export const docs = (path = '') => `${site.docsUrl}/docs${path}`;

export const nav = [
  { href: '/#features', label: 'Features' },
  { href: '/#screens', label: 'Screenshots' },
  { href: '/#support', label: 'What we support' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;
