import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { agentDescriptorJson } from "@/lib/agent-content";

/**
 * agent.json — descriptor mașină-citibil pentru agenți AI: ce este site-ul,
 * ce poate face un agent și unde găsește resursele.
 * Varianta /.well-known/agent.json este servită din server.ts.
 */
export const Route = createFileRoute("/agent.json")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(agentDescriptorJson(), {
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
