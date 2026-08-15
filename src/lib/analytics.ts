/**
 * Tracking de conversii — minimal, fără librării externe.
 * Trimite spre dataLayer (GTM) și gtag (GA4 / Google Ads) doar când
 * sunt configurate ȘI consimțământul permite categoria respectivă.
 * Nu trimite niciodată date personale (nume/telefon/email) în evenimente.
 * Orice eroare este înghițită: tracking-ul nu blochează niciodată un formular.
 */
import { site } from "./site-config";
import { readConsent } from "./consent";

export type ConversionEvent =
  | "quote_start"
  | "quote_submit"
  | "whatsapp_click"
  | "portfolio_open"
  | "pricing_cta_click"
  | "lead_form_success"
  | "phone_click"
  | "email_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const fired = new Set<string>();
const firedAdsConversions = new Set<string>();

export type GoogleAdsConversionPayload = {
  send_to: string;
  value: 1.0;
  currency: "RON";
};

/** Construiește payload-ul Ads fără date din formular. */
export function buildAdsConversionPayload(
  conversionId: string,
  conversionLabel: string,
): GoogleAdsConversionPayload | null {
  const id = conversionId.trim();
  const label = conversionLabel.trim();
  if (!id || !label) return null;
  return {
    send_to: `${id}/${label}`,
    value: 1.0,
    currency: "RON",
  };
}

function hasAnalyticsConsent(): boolean {
  return readConsent() === "all";
}

function hasAdsConsent(): boolean {
  return readConsent() === "all";
}

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
    if (site.gaMeasurementId && typeof window.gtag === "function" && hasAnalyticsConsent()) {
      window.gtag("event", event, params);
    }
  } catch {
    /* niciodată nu blocăm interacțiunea utilizatorului */
  }
}

/**
 * Conversii Google Ads — evenimentul principal se trage DOAR după
 * confirmarea serverului (lead salvat), nu la click pe buton.
 * Evenimentele secundare se trag la acțiunile reale (click WhatsApp,
 * click telefon, click email). Fără date personale în payload.
 */
export function trackConversion(
  name: "lead_form_success" | "whatsapp_click" | "phone_click" | "email_click",
  params: Record<string, string | number | undefined> = {},
  options: { dedupeKey?: string } = {},
): void {
  if (typeof window === "undefined") return;
  try {
    const adsPayload =
      name === "lead_form_success"
        ? buildAdsConversionPayload(site.adsConversionId, site.adsConversionLabel)
        : null;
    const adsDedupeKey = options.dedupeKey ? `ads:${options.dedupeKey}` : "";
    const canSendAds = Boolean(adsPayload && hasAdsConsent());
    if (canSendAds && adsDedupeKey && firedAdsConversions.has(adsDedupeKey)) return;

    (window.dataLayer ||= []).push({ event: name, ...params });

    if (typeof window.gtag !== "function") return;

    if (site.gaMeasurementId && hasAnalyticsConsent()) {
      window.gtag("event", name, params);
    }

    if (canSendAds && adsPayload) {
      // Conversia principală: doar lead salvat cu succes, cu consimțământ ads.
      window.gtag("event", "conversion", adsPayload);
      if (adsDedupeKey) firedAdsConversions.add(adsDedupeKey);
    }
  } catch {
    /* never block user interaction */
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
