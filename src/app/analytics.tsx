'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// GA4 Measurement ID (e.g. "G-XXXXXXXXXX"). Set NEXT_PUBLIC_GA_ID in the
// production environment to turn analytics on; unset (local dev, previews) →
// no-op, so dev traffic never pollutes the reports. NEXT_PUBLIC_ vars are
// inlined at build time, so this must be present when `next build` runs.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let loaded = false;

/**
 * Load gtag.js once and initialise GA4. Idempotent. `send_page_view: false`
 * because the docs run as a client-navigated app: we fire page_view ourselves
 * on each navigation (below), after render, so route changes are counted
 * exactly once with the correct title. Injected imperatively (rather than via
 * next/script) so window.gtag exists synchronously before the first page_view.
 */
function loadGtag(id: string): void {
  if (loaded) return;
  loaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });
}

/**
 * Google Analytics (GA4). Renders nothing; reports a page_view on every route
 * change. No-op unless NEXT_PUBLIC_GA_ID is set.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    loadGtag(GA_ID);
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.origin + pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
