import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { site } from "@/lib/site-config";

/**
 * agent.json — descriptor mașină-citibil pentru agenți AI: ce este site-ul,
 * ce poate face un agent și unde găsește resursele. La rădăcină + .well-known.
 */
export const Route = createFileRoute("/agent.json")({
  server: {
    handlers: {
      GET: async () => {
        const payload = {
          name: site.businessName,
          url: `${site.siteUrl}/`,
          description:
            "Freelance MEP design engineering: Revit MEP / BIM modeling, technical documentation for HVAC, heating and electrical installations, drafting corrections, plus an online shop for niche CAD tools and training models.",
          language: ["ro", "en"],
          capabilities: [
            {
              type: "estimate-request",
              url: `${site.siteUrl}/#estimare`,
              description:
                "Submit a project estimate request (form). User sends DWG/PDF/RVT files, scope and deadline.",
            },
            {
              type: "contact",
              url: `${site.siteUrl}/contact`,
              description: "Contact via WhatsApp, email or estimate form.",
            },
            {
              type: "content-negotiation",
              url: `${site.siteUrl}/llms.txt`,
              description:
                "All main pages serve Markdown at the same URL via Accept: text/markdown.",
            },
            {
              type: "reference",
              url: `${site.siteUrl}/referinte`,
              description: "Completed works with client, term and cost.",
            },
          ],
          resources: [
            `${site.siteUrl}/llms.txt`,
            `${site.siteUrl}/agent-instructions.txt`,
            `${site.siteUrl}/sitemap.xml`,
          ],
        };
        return new Response(JSON.stringify(payload, null, 2), {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            Vary: "Accept, Accept-Encoding",
          },
        });
      },
    },
  },
});
