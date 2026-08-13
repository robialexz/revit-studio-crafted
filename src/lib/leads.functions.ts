import { createServerFn } from "@tanstack/react-start";

import { leadSchema } from "./lead-schema";

/**
 * Fereastră de idempotență: un submit identic (același nume + telefon +
 * aceeași pagină) în acest interval returnează lead-ul existent în loc
 * să creeze un rând duplicat. Suficient de scurtă pentru a nu bloca
 * utilizatori reali care revin, suficient de lungă pentru dublu-click
 * și reîncercări de rețea.
 */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    // Câmp honeypot ascuns vizitatorilor: bot-ii îl completează, oamenii nu.
    // Pretindem succes fără a salva nimic.
    if (data.website) {
      return { id: "accepted", duplicate: false };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { sendLeadNotification } = await import("./leads.server");

    // Idempotență server-side: returnează rândul existent fără un al doilea insert.
    try {
      const recentQuery = supabaseAdmin
        .from("leads")
        .select("id")
        .eq("phone", data.phone)
        .eq("name", data.name)
        .gte("created_at", new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString())
        .limit(1);

      const { data: existing, error: lookupError } = data.page_path
        ? await recentQuery.eq("page_path", data.page_path)
        : await recentQuery;

      if (!lookupError && existing && existing.length > 0 && existing[0]?.id) {
        return { id: existing[0].id, duplicate: true };
      }
    } catch {
      // Un eșec al verificării nu trebuie să blocheze salvarea lead-ului.
    }

    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      project_type: data.project_type || null,
      available_files: data.available_files ?? [],
      approximate_sheet_count: data.approximate_sheet_count || null,
      deadline: data.deadline || null,
      description: data.description || null,
      page_path: data.page_path || null,
      referrer: data.referrer || null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      utm_content: data.utm_content || null,
      utm_term: data.utm_term || null,
    };

    const { data: inserted, error } = await supabaseAdmin
      .from("leads")
      .insert(payload)
      .select()
      .single();

    if (error || !inserted) {
      console.error("[leads] Insert eșuat:", error);
      throw new Error("Cererea nu a putut fi salvată. Încearcă din nou.");
    }

    // Lead-ul este deja salvat; notificarea nu poate pune în pericol salvarea.
    await sendLeadNotification(inserted as never);

    return { id: inserted.id as string, duplicate: false };
  });
