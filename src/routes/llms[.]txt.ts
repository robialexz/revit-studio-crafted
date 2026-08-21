import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { llmsTxt } from "@/lib/agent-content";

/**
 * /llms.txt — index pentru agenți și LLM, conform spec-ului llmstxt.org.
 * Servește markdown text/plain, cu Vary pentru caching corect.
 */
export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(llmsTxt(), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            Vary: "Accept, Accept-Encoding",
          },
        });
      },
    },
  },
});
