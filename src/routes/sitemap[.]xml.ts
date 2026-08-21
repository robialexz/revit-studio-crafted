import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { site } from "@/lib/site-config";

interface SitemapEntry {
  path: string;
  lastmod: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

/**
 * Data ultimei modificări de conținut — actualizează manual când
 * modifici substanțial textele/paginile (Google o folosește la recrawl).
 */
const LAST_MODIFIED = "2026-08-15";

const entries: SitemapEntry[] = [
  { path: "/", lastmod: LAST_MODIFIED, changefreq: "weekly", priority: "1.0" },
  { path: "/revit-mep", lastmod: LAST_MODIFIED, changefreq: "monthly", priority: "0.9" },
  { path: "/modelare-revit", lastmod: LAST_MODIFIED, changefreq: "monthly", priority: "0.8" },
  { path: "/hvac", lastmod: LAST_MODIFIED, changefreq: "monthly", priority: "0.8" },
  { path: "/instalatii-termice", lastmod: LAST_MODIFIED, changefreq: "monthly", priority: "0.8" },
  { path: "/instalatii-electrice", lastmod: LAST_MODIFIED, changefreq: "monthly", priority: "0.8" },
  { path: "/autocad-dwg", lastmod: LAST_MODIFIED, changefreq: "monthly", priority: "0.7" },
  { path: "/portofoliu", lastmod: LAST_MODIFIED, changefreq: "monthly", priority: "0.8" },
  { path: "/referinte", lastmod: LAST_MODIFIED, changefreq: "monthly", priority: "0.7" },
  { path: "/magazin", lastmod: LAST_MODIFIED, changefreq: "weekly", priority: "0.7" },
  { path: "/contact", lastmod: LAST_MODIFIED, changefreq: "monthly", priority: "0.8" },
  {
    path: "/politica-de-confidentialitate",
    lastmod: LAST_MODIFIED,
    changefreq: "yearly",
    priority: "0.3",
  },
  { path: "/politica-cookies", lastmod: LAST_MODIFIED, changefreq: "yearly", priority: "0.3" },
  { path: "/termeni-si-conditii", lastmod: LAST_MODIFIED, changefreq: "yearly", priority: "0.3" },
  { path: "/informatii-legale", lastmod: LAST_MODIFIED, changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Canonicalul rămâne domeniul de producție chiar și când ruta este verificată local.
        const base = site.siteUrl;

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${base}${e.path}</loc>`,
            `    <lastmod>${e.lastmod}</lastmod>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
