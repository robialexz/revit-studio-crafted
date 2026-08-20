/** Configurare publică centralizată; valorile lipsă nu apar în interfață. */
const publicEnv = import.meta.env ?? {};

function envValue(name: string): string {
  const value = publicEnv[name];
  return typeof value === "string" ? value.trim() : "";
}

function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

const configuredSiteUrl = normalizeSiteUrl(envValue("VITE_SITE_URL"));

export const site = {
  businessName: "NOD BIM",
  tagline: "MODELARE BIM · REVIT MEP · DESENARE TEHNICĂ",
  whatsappNumber: envValue("VITE_WHATSAPP_NUMBER"),
  phone: envValue("VITE_PHONE_NUMBER"),
  email: envValue("VITE_PUBLIC_EMAIL"),
  /** Domeniul canonical de producție; preview-urile îl pot suprascrie prin VITE_SITE_URL. */
  siteUrl: configuredSiteUrl || "https://nodbim.com",
  /** ex: "G-XXXXXXXXXX". Gol => analytics dezactivat. */
  gaMeasurementId: envValue("VITE_GA_MEASUREMENT_ID"),
  /** Google Ads: ID-ul de conversie (AW-xxxxxxx). */
  adsConversionId: envValue("VITE_GOOGLE_ADS_CONVERSION_ID"),
  /** Google Ads: eticheta conversiei principale (lead_form_success). */
  adsConversionLabel: envValue("VITE_GOOGLE_ADS_CONVERSION_LABEL"),
  /** Etichete „imagine demonstrativă" — pune pe false când ai capturi reale. */
  showDemoImageLabels: true,
} as const;

const placeholderPattern = /^\[[A-Z0-9_]+\]$/;

function isConfigured(value: string | undefined): value is string {
  const normalized = value?.trim() ?? "";
  return Boolean(normalized && !placeholderPattern.test(normalized));
}

const digits = site.whatsappNumber.replace(/\D/g, "");

export const hasWhatsapp = isConfigured(site.whatsappNumber) && digits.length >= 8;
export const hasEmail = isConfigured(site.email);
export const hasSiteUrl = isConfigured(site.siteUrl);
export const hasTracking = Boolean(site.gaMeasurementId || site.adsConversionId);
export const canonicalHostname = new URL(site.siteUrl).hostname;

export function whatsappLink(message: string): string {
  if (!hasWhatsapp || !digits) return "";
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

/** URL absolut pentru canonical, Open Graph și sitemap. */
export function canonicalUrl(path: string): string {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
  return `${site.siteUrl}${clean}`;
}

/**
 * Afișare telefon prietenoasă pentru oameni (nu schimbă link-urile wa.me).
 * Exemplu RO: 40750485793 -> "+40 750 485 793".
 */
export function formatPhoneDisplay(raw: string | undefined): string {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!digits) return "";

  // România: 10 cifre începând cu 07 => +40 7XX XXX XXX
  if (/^07\d{8}$/.test(digits)) {
    return `+40 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  // România cu prefix de țară: 40 + 9 cifre
  if (/^40\d{9}$/.test(digits)) {
    const local = digits.slice(2);
    return `+40 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  // Internațional generic: grupăm cifrele de la dreapta la stânga în blocuri de 3
  {
    const groups: string[] = [];
    for (let i = digits.length; i > 0; i -= 3) {
      groups.unshift(digits.slice(Math.max(0, i - 3), i));
    }
    return `+${groups.join(" ")}`;
  }
}

export const defaultWhatsappMessage =
  "Salut! Aș avea nevoie de ajutor pentru un proiect Revit MEP. Pot să îți trimit fișierele pentru o estimare?";

export const disclaimer =
  "Serviciile constau în desenare tehnică, modelare BIM și pregătirea documentației. Documentațiile care necesită verificare, autorizare sau semnătură de specialitate trebuie validate de profesioniști autorizați.";
