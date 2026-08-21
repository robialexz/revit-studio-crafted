import { createFileRoute } from "@tanstack/react-router";
import { PrivacyContent } from "@/components/site/PrivacyContent";
import { canonicalUrl } from "@/lib/site-config";

/**
 * Alias „/privacy” pentru agenți AI — conținut identic cu
 * /politica-de-confidentialitate. Canonicalul indică pagina românească.
 */
const canonical = canonicalUrl("/politica-de-confidentialitate");

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · NOD BIM" },
      {
        name: "description",
        content:
          "How NOD BIM processes personal data when you use the estimate form: purpose, legal basis, recipients and your GDPR rights.",
      },
      { property: "og:title", content: "Privacy Policy — NOD BIM" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
    ],
    links: [{ rel: "canonical", href: canonical }],
  }),
  component: PrivacyRoute,
});

function PrivacyRoute() {
  return <PrivacyContent />;
}
