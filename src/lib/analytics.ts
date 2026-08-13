/**
 * Tracking de conversii — minimal, fără librării externe.
 * Trimite spre dataLayer (GTM) și gtag (GA4) dacă sunt configurate.
 * Fără GA_MEASUREMENT_ID site-ul funcționează normal, evenimentele sunt no-op.
 * Orice eroare este înghițită: tracking-ul nu blochează niciodată un formular.
 */
import { site } from "./site-config";

export type ConversionEvent =
  "quote_start" | "quote_submit" | "whatsapp_click" | "portfolio_open" | "pricing_cta_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const fired = new Set<string>();

export function track(
  event: ConversionEvent,
  params: Record<string, string | number | undefined> = {},
  options: { once?: boolean; dedupeKey?: string } = {},
): void {
  if (typeof window === "undefined") return;
  try {
    const key = options.dedupeKey ?? event;
    if (options.once) {
      if (fired.has(key)) return;
      fired.add(key);
    }
    const payload = { event, ...params };
    (window.dataLayer ||= []).push(payload);
    if (site.gaMeasurementId && typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
  } catch {
    /* niciodată nu blocăm interacțiunea utilizatorului */
  }
}

/** Evenimente care trebuie să apară o singură dată per sesiune de pagină. */
export function trackOnce(
  event: ConversionEvent,
  params: Record<string, string | number | undefined> = {},
  dedupeKey?: string,
): void {
  track(event, params, { once: true, ...(dedupeKey ? { dedupeKey } : {}) });
}
