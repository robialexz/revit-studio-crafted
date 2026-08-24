import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { indexnowKeyFileContent } from "@/lib/indexnow";

/**
 * Fișierul de verificare IndexNow — conține cheia exact, fără newline.
 * Calea este `/{key}.txt`, conform protocolului.
 */
export const Route = createFileRoute("/09cc0f49373bfe3e74afbd962e8ac392.txt")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(indexnowKeyFileContent(), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
