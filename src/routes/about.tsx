import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { DespreContent } from "@/components/site/DespreContent";
import { canonicalUrl } from "@/lib/site-config";

/**
 * Alias „/about” pentru agenți AI — conținut identic cu /despre.
 * Canonicalul indică pagina principală românească (fără duplicat indexabil).
 */
const canonical = canonicalUrl("/despre");

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NOD BIM · Revit MEP engineer" },
      {
        name: "description",
        content:
          "NOD BIM is a brand run by an installations engineer with personal Uptime Institute ATD and ATS accreditations and data center experience. Revit MEP outsourcing and CAD drafting, remote, in Romanian or English.",
      },
      { property: "og:title", content: "About NOD BIM" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:url", content: canonicalUrl("/about") },
    ],
    links: [{ rel: "canonical", href: canonical }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DespreContent />
    </div>
  );
}
