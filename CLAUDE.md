# Telemetrix website

The public marketing site: it sells Telemetrix. This repo is **public**, so nothing internal goes here: no endpoint
paths, DotCollab ids, agent names, test counts, contract sections, keys or the owner's personal details.

## Where things live

| What | File |
|---|---|
| Domains, contact address, version, download URL | `src/lib/site.ts` |
| All marketing copy: screens, features, profiles, requirements, safety lists, principles, milestones, topics | `src/lib/content.ts` |
| Landing page sections | `src/app/page.tsx` |
| Download / About / Contact | `src/app/{download,about,contact}/page.tsx` |
| Contact delivery (Resend) | `src/app/api/contact/route.ts` |
| Palette and motion | `src/app/globals.css` (tokens copied from `../frontend/src/styles/tokens.css`) |
| App screenshots | `public/screens/*.webp` |

## Rules

- **Never claim more than the product does.** Check `../internal-docs/STATUS.md`. Today: everything is built and
  verified on the simulator; real-car validation is in progress; generic OBD-II code meanings ship (OBDex,
  CC0); BMW/VW manufacturer code descriptions aren't shipped (they read Unknown); only CAN cars (ISO 15765-4, 500 kbit/s) and the OBDLink EX on Windows are supported.
- **Keep it consistent with the public docs** (`../docs/`). A change in support, safety or privacy updates both
  sites and `../internal-docs/`.
- **Use the app's words** for screens and labels.
- Screenshots come from the real app in simulator mode and stay labelled as simulated.
- No invented prices, customers, testimonials, team members or numbers.

Before finishing, run `npm run build`.
