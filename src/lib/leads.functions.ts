import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(160).or(z.literal("")).optional(),
  project_type: z.string().trim().max(120).optional(),
  available_files: z.array(z.string().trim().max(60)).max(20).default([]),
  approximate_sheet_count: z.string().trim().max(60).optional(),
  deadline: z.string().trim().max(120).optional(),
  description: z.string().trim().max(4000).optional(),
  page_path: z.string().trim().max(500).optional(),
  referrer: z.string().trim().max(500).optional(),
  utm_source: z.string().trim().max(200).optional(),
  utm_medium: z.string().trim().max(200).optional(),
  utm_campaign: z.string().trim().max(200).optional(),
  utm_content: z.string().trim().max(200).optional(),
  utm_term: z.string().trim().max(200).optional(),
  website: z.string().trim().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    // Câmp honeypot ascuns vizitatorilor: bot-ii îl completează, oamenii nu.
    // Pretindem succes fără a salva nimic.
    if (data.website) {
      return { id: "accepted" };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { sendLeadNotification } = await import("./leads.server");

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

    await sendLeadNotification(inserted as never);

    return { id: inserted.id as string };
  });
