import { createFileRoute } from "@tanstack/react-router";
import { PrivacyContent } from "@/components/site/PrivacyContent";
import { canonicalUrl } from "@/lib/site-config";

const title = "Politica de confidențialitate — NOD BIM";
const description =
  "Politica de confidențialitate NOD BIM: ce date personale colectăm prin formularul de estimare, scopurile, temeiurile legale, destinatarii și drepturile tale conform GDPR.";
const url = canonicalUrl("/politica-de-confidentialitate");

export const Route = createFileRoute("/politica-de-confidentialitate")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <PrivacyContent />;
}
