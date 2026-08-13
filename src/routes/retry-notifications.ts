import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { processPendingNotifications } from "@/lib/leads.server";

/**
 * Endpoint intern de retry pentru notificările de lead (pending/failed).
 * Apelat de trigger-ul programat Cloudflare (la fiecare ~5 minute) cu
 * antetul Authorization: Bearer <CRON_SECRET>. Fără secretul corect
 * răspunde 401 — nu expune date și nu procesează nimic.
 */
export const Route = createFileRoute("/retry-notifications")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const secret = process.env["CRON_SECRET"];
        if (!secret) {
          console.error(
            "[cron] CRON_SECRET lipsește — retry-ul programat al notificărilor este inactiv.",
          );
          return new Response("cron secret missing", { status: 503 });
        }

        const authorization = request.headers.get("authorization");
        if (authorization !== `Bearer ${secret}`) {
          return new Response("unauthorized", { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { sendLeadNotification } = await import("@/lib/leads.server");

        const result = await processPendingNotifications({
          supabase: supabaseAdmin as unknown as Parameters<
            typeof processPendingNotifications
          >[0]["supabase"],
          sendNotification: sendLeadNotification,
        });

        return Response.json(result, {
          headers: { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" },
        });
      },
    },
  },
});
