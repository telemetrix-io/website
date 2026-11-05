# Telemetrix — website

The public marketing site for [Telemetrix](https://telemetrix.io), the diagnostics workstation for your car. It has
a landing page (key features, screenshots, what we support, safety), a download page, an about page and a contact
form.

Next.js 16 (App Router) + Tailwind CSS 4, in the app's own Graphite palette. The product docs are a separate site
([telemetrix-io/docs](https://github.com/telemetrix-io/docs)).

## Pages

| Route | What it covers |
|---|---|
| `/` | Hero, key features, a tour of real app screens, how it works, what we support, safety, call to action |
| `/download` | The Windows installer (or early access until a public build exists), requirements, next steps |
| `/about` | Why Telemetrix exists, its five rules, and where the project is today |
| `/contact` | Contact form (`?topic=licence\|early-access\|workshop\|support\|partnership\|press\|other` preselects a topic) |
| `/api/contact` | Sends the form by email through Resend |

## Develop

```bash
npm install
npm run dev        # http://localhost:7790
npm run build      # production build (type-checks)
npm start          # serve the build on $PORT (default 7790)
```

## Configuration

Copy `.env.example` to `.env.local`. Everything is optional:

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for meta tags and the sitemap (default `https://telemetrix.io`) |
| `NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL` | The installer link. Unset → the download page offers early access. Build-time. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4. Unset → no analytics. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery. Unset → the form offers to send the message by email instead. |

Domains and the contact address live in [`src/lib/site.ts`](src/lib/site.ts). All copy (features, screens,
vehicle profiles, requirements) is in [`src/lib/content.ts`](src/lib/content.ts).

## Screenshots

`public/screens/*.webp` are real screenshots of the app, taken in its built-in simulator (a simulated BMW M2 G87)
at 1440×900, 2× scale. To refresh them, run the app's renderer (`cd ../frontend && npx vite`), choose
**Use simulator**, visit each screen, and export WebP at the same size.

## Deploy

`railway.toml` + `nixpacks.toml` deploy it to Railway as a Node service (`npm run build`, then `npm start`). Any
host that runs Next.js works.
