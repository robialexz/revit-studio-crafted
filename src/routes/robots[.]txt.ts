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
          // Căutare clasică
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
          // Crawlere AI — declarați explicit ca fiind permiși
          // (necesar pentru citare în ChatGPT, Perplexity, Gemini, Claude).
          "User-agent: GPTBot",
          "Allow: /",
          "",
          "User-agent: OAI-SearchBot",
          "Allow: /",
          "",
          "User-agent: ChatGPT-User",
          "Allow: /",
          "",
          "User-agent: ClaudeBot",
          "Allow: /",
          "",
          "User-agent: PerplexityBot",
          "Allow: /",
          "",
          "User-agent: Perplexity-User",
          "Allow: /",
          "",
          "User-agent: Google-Extended",
          "Allow: /",
          "",
          "User-agent: Applebot",
          "Allow: /",
          "",
          "User-agent: Applebot-Extended",
          "Allow: /",
          "",
          "User-agent: Amazonbot",
          "Allow: /",
          "",
          "User-agent: CCBot",
          "Allow: /",
          "",
          "User-agent: meta-externalagent",
          "Allow: /",
          "",
          "User-agent: AI2Bot",
          "Allow: /",
          "",
          "User-agent: DuckAssistBot",
          "Allow: /",
          "",
          "User-agent: Diffbot",
          "Allow: /",
          "",
          "User-agent: cohere-ai",
          "Allow: /",
          "",
          "User-agent: YouBot",
          "Allow: /",
          "",
          "User-agent: Bytespider",
          "Allow: /",
          "",
          // Orice alt client
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
