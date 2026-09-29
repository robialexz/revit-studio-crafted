/** Ajutoare comune pentru paginile EN (/en/...). */
import { hasEmail, site } from "./site-config";

/** Link mailto cu subiect pentru paginile EN; gol când emailul nu e configurat. */
export function enMailHref(subject: string): string {
  return hasEmail ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}` : "";
}

/** Date structurate FAQPage pentru paginile EN. */
export function enFaqSchema(faq: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: faq.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
