import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        // Directiva sitemap folosește întotdeauna domeniul canonical de producție.
        const base = site.siteUrl;

        const txt = [
          "User-agent: Googlebot",
          "Allow: /",
          "",
          "User-agent: Bingbot",
          "Allow: /",
          "",
          "User-agent: Twitterbot",
          "Allow: /",
          "",
          "User-agent: facebookexternalhit",
          "Allow: /",
          "",
          "User-agent: *",
          "Allow: /",
          "",
          `Sitemap: ${base}/sitemap.xml`,
        ].join("\n");

        return new Response(txt, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
