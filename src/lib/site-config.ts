/**
 * Configurare centralizată — înlocuiește valorile de mai jos cu datele reale.
 */
export const site = {
  businessName: "[BUSINESS_NAME]",
  brandShort: "BIM STUDIO",
  tagline: "MODELARE BIM · REVIT MEP · DESENARE TEHNICĂ",
  whatsappNumber: "[WHATSAPP_NUMBER]", // ex: 40712345678 (doar cifre, cu prefix de țară)
  phone: "[PHONE_NUMBER]",
  email: "[EMAIL]",
  domain: "[DOMAIN]",
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

export const defaultWhatsappMessage =
  "Salut! Aș avea nevoie de ajutor pentru un proiect Revit MEP. Pot să îți trimit fișierele pentru o estimare?";

export const disclaimer =
  "Serviciile constau în desenare tehnică, modelare BIM și pregătirea documentației. Documentațiile care necesită verificare, autorizare sau semnătură de specialitate trebuie validate de profesioniști autorizați.";
