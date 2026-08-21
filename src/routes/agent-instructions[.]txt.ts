import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { agentInstructionsTxt } from "@/lib/agent-content";

/**
 * /agent-instructions.txt — fișier dedicat de instrucțiuni pentru agenți AI:
 * când și cum să folosească site-ul. Servește text/plain cu Vary pentru caching.
 */
export const Route = createFileRoute("/agent-instructions.txt")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(agentInstructionsTxt(), {
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
