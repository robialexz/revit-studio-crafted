/**
 * Configurare centralizată — înlocuiește valorile de mai jos cu datele reale.
 * Toate placeholder-ele site-ului trăiesc AICI, nu în componente.
 */
export const site = {
  businessName: "[BUSINESS_NAME]",
  brandShort: "BIM STUDIO",
  tagline: "MODELARE BIM · REVIT MEP · DESENARE TEHNICĂ",
  whatsappNumber: "[WHATSAPP_NUMBER]", // ex: 40712345678 (doar cifre, cu prefix de țară)
  phone: "[PHONE_NUMBER]",
  email: "[EMAIL]",
  /**
   * Domeniul final, fără slash la final (ex: "https://exemplu.ro").
   * Lăsat gol => canonical / og:url relative și sitemap generat din originea cererii.
   */
  siteUrl: "",
  /** Adresa care primește notificările de lead nou. Gol => notificarea e sărită. */
  leadNotificationEmail: "",
  /** ex: "G-XXXXXXXXXX". Gol => analytics dezactivat, site-ul funcționează normal. */
  gaMeasurementId: "",
  /** Etichete „imagine demonstrativă” — pune pe false când ai capturi reale. */
  showDemoImageLabels: true,
  social: {
    linkedin: "[SOCIAL_LINK_LINKEDIN]",
    instagram: "[SOCIAL_LINK_INSTAGRAM]",
  },
} as const;

const digits = site.whatsappNumber.replace(/\D/g, "");

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message);
  if (!digits) return `https://wa.me/?text=${text}`;
  return `https://wa.me/${digits}?text=${text}`;
}

/** URL absolut când domeniul e configurat, altfel cale relativă. */
export function canonicalUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return site.siteUrl ? `${site.siteUrl}${clean}` : clean;
}

export const defaultWhatsappMessage =
  "Salut! Aș avea nevoie de ajutor pentru un proiect Revit MEP. Pot să îți trimit fișierele pentru o estimare?";

export const disclaimer =
  "Serviciile constau în desenare tehnică, modelare BIM și pregătirea documentației. Documentațiile care necesită verificare, autorizare sau semnătură de specialitate trebuie validate de profesioniști autorizați.";
