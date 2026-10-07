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
  tagline: "DESENARE TEHNICĂ · AUTOCAD · REVIT MEP",
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
  /** Containerul public Google Tag Manager folosit pentru conversii. */
  gtmContainerId: "GTM-TZKXJ7KW",
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
export const hasTracking = Boolean(
  site.gaMeasurementId || site.adsConversionId || site.gtmContainerId,
);
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
 * Entitatea din datele structurate. NOD BIM este deocamdată un brand, nu o
 * societate: fără legalName, taxID, adresă sau dată de înființare. După
 * înființare, înlocuiește-l cu un nod Organization completat din legal-config.
 */
export const brandSchema = {
  "@type": "Brand",
  name: site.businessName,
  url: canonicalUrl("/"),
} as const;

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

/**
 * Link tel: din număr brut (07… devine +40…). Gol când numărul lipsește,
 * este placeholder sau nu are 8–15 cifre.
 */
export function buildPhoneHref(raw: string): string {
  if (!isConfigured(raw)) return "";
  const digits = raw.replace(/\D/g, "");
  const international = /^07\d{8}$/.test(digits) ? `40${digits.slice(1)}` : digits;
  return /^\d{8,15}$/.test(international) ? `tel:+${international}` : "";
}

/** Numărul de telefon: VITE_PHONE_NUMBER, cu rezervă numărul de WhatsApp. */
const phoneSource = isConfigured(site.phone) ? site.phone : site.whatsappNumber;
export const phoneHref = buildPhoneHref(phoneSource);
export const phoneDisplay = phoneHref ? formatPhoneDisplay(phoneSource) : "";

export const defaultWhatsappMessage =
  "Salut! Am găsit NOD BIM pe site și am un plan de desenat. Pot să îți trimit fișierele pentru o ofertă?";

export const defaultWhatsappMessageEn =
  "Hello, I found NOD BIM online and would like to discuss a Revit MEP project. Can I send you the files for an estimate?";

/** Același serviciu în formular și în primul mesaj, inclusiv pe paginile EN. */
export function quoteContextForPath(pathname: string) {
  const path = pathname.replace(/\/+$/, "");
  const pdf = path === "/pdf-in-dwg";
  const autocad = pdf || path === "/autocad-dwg" || path === "/en/autocad-drafting";
  if (
    !autocad &&
    ![
      "/revit-mep",
      "/modelare-revit",
      "/hvac",
      "/instalatii-termice",
      "/instalatii-electrice",
      "/en/revit-mep-outsourcing",
    ].includes(path)
  ) {
    return undefined;
  }
  const en = path.startsWith("/en/");
  const installations = ["/hvac", "/instalatii-termice", "/instalatii-electrice"].includes(path);
  return {
    projectType: autocad
      ? en
        ? "AutoCAD / PDF to DWG"
        : "Redesenare / PDF în DWG"
      : en
        ? "Revit MEP modelling"
        : installations
          ? "Planșe de instalații"
          : "Modelare Revit MEP",
    whatsappMessage: en
      ? `Hello, I found NOD BIM online and need ${autocad ? "AutoCAD drafting / PDF to DWG" : "Revit MEP modelling"}. Can I send you the files for an estimate?`
      : pdf
        ? "Salut! Am găsit NOD BIM pe site și am un plan PDF de redesenat în DWG. Pot să îți trimit fișierul pentru o ofertă?"
        : autocad
          ? "Salut! Am găsit NOD BIM pe site și am un plan de desenat în AutoCAD. Pot să îți trimit fișierele pentru o ofertă?"
          : "Salut! Am găsit NOD BIM pe site și am nevoie de planșe de instalații sau modelare Revit MEP. Pot să îți trimit fișierele pentru o ofertă?",
  };
}

export const disclaimer =
  "Serviciile constau în desenare tehnică, modelare BIM și pregătirea documentației. Documentațiile care necesită verificare, autorizare sau semnătură de specialitate trebuie validate de profesioniști autorizați.";
