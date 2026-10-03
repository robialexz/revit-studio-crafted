import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { DespreContent } from "@/components/site/DespreContent";
import { canonicalUrl } from "@/lib/site-config";
import { hreflangLinks } from "@/lib/i18n";

const title = "Despre NOD BIM · Inginer de instalații, servicii BIM și CAD";
const description =
  "Modelare Revit MEP, planșe de instalații și lucrări AutoCAD, realizate direct de un inginer de instalații, în standardele biroului tău. NDA la cerere.";
const url = canonicalUrl("/despre");

export const Route = createFileRoute("/despre")({
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
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }, ...hreflangLinks("/despre")],
  }),
  component: Despre,
});

function Despre() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DespreContent />
    </div>
  );
}
