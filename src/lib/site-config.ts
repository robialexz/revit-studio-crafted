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
  /** Etichete „imagine demonstrativă” — pune pe false când ai capturi reale. */
  showDemoImageLabels: true,
} as const;

const placeholderPattern = /^\[[A-Z0-9_]+\]$/;

export function isConfigured(value: string | undefined): value is string {
  const normalized = value?.trim() ?? "";
  return Boolean(normalized && !placeholderPattern.test(normalized));
}

const digits = site.whatsappNumber.replace(/\D/g, "");

export const hasWhatsapp = isConfigured(site.whatsappNumber) && digits.length >= 8;
export const hasEmail = isConfigured(site.email);
export const hasSiteUrl = isConfigured(site.siteUrl);
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

export const defaultWhatsappMessage =
  "Salut! Aș avea nevoie de ajutor pentru un proiect Revit MEP. Pot să îți trimit fișierele pentru o estimare?";

export const disclaimer =
  "Serviciile constau în desenare tehnică, modelare BIM și pregătirea documentației. Documentațiile care necesită verificare, autorizare sau semnătură de specialitate trebuie validate de profesioniști autorizați.";
