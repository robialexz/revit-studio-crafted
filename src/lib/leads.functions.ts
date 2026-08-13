import { createServerFn } from "@tanstack/react-start";

import { leadSchema, type LeadInput } from "./lead-schema";

/**
 * Contract minimal față de clientul Supabase, suficient pentru fluxul de
 * lead. Clientul real (@supabase/supabase-js) îl satisface structural;
 * testele folosesc un store in-memory cu aceleași coduri de eroare.
 */
export interface LeadFilterableQuery {
  eq: (column: string, value: unknown) => LeadFilterableQuery;
  single: () => Promise<LeadQueryResult>;
}

export interface LeadInsertQuery {
  select: (columns?: string) => { single: () => Promise<LeadQueryResult> };
}

export interface LeadUpdateQuery {
  eq: (column: string, value: unknown) => Promise<{ error: LeadErrorLike | null }>;
}

export interface LeadQueryResult {
  data: unknown;
  error: LeadErrorLike | null;
}

export interface LeadErrorLike {
  code?: string;
  message?: string;
}

export interface LeadSupabaseLike {
  from: (table: string) => {
    insert: (payload: Record<string, unknown>) => LeadInsertQuery;
    select: (columns: string) => LeadFilterableQuery;
    update: (payload: Record<string, unknown>) => LeadUpdateQuery;
  };
}

export type LeadNotificationOutcome = "sent" | "failed";

export interface LeadDeps {
  supabase: LeadSupabaseLike;
  sendNotification: (lead: LeadRecordForNotification) => Promise<LeadNotificationOutcome>;
}

export interface LeadRecordForNotification {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  project_type: string | null;
  available_files: string[];
  approximate_sheet_count: string | null;
  deadline: string | null;
  description: string | null;
  page_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
}

export interface SubmitLeadResult {
  id: string;
  duplicate: boolean;
}

const SAFE_USER_ERROR = "Cererea nu a putut fi salvată. Încearcă din nou.";

function isUniqueViolation(error: LeadErrorLike | null): boolean {
  return error?.code === "23505";
}

function isMissingColumn(error: LeadErrorLike | null): boolean {
  return error?.code === "42703";
}

function isRow(error: unknown): error is LeadRecordForNotification {
  return !!error && typeof error === "object" && "id" in error;
}

async function insertLead(
  supabase: LeadSupabaseLike,
  payload: Record<string, unknown>,
): Promise<
  | { row: LeadRecordForNotification }
  | { uniqueViolation: boolean }
  | { failed: LeadErrorLike | null }
> {
  const { data, error } = await supabase.from("leads").insert(payload).select().single();

  if (!error && isRow(data)) return { row: data };
  if (isUniqueViolation(error)) return { uniqueViolation: true };
  return { failed: error };
}

async function findLeadBySubmissionId(
  supabase: LeadSupabaseLike,
  submissionId: string,
): Promise<LeadRecordForNotification | undefined> {
  const { data, error } = await supabase
    .from("leads")
    .select("id, notification_status")
    .eq("submission_id", submissionId)
    .single();

  if (error) return undefined;
  return isRow(data) ? data : undefined;
}

/** Actualizează statusul notificării; erorile sunt ignorate (nu afectează lead-ul). */
async function recordNotificationStatus(
  supabase: LeadSupabaseLike,
  leadId: string,
  status: LeadNotificationOutcome,
): Promise<void> {
  try {
    await supabase.from("leads").update({ notification_status: status }).eq("id", leadId);
  } catch {
    /* coloana poate lipsi când migrarea nu e aplicată — nu blocăm nimic */
  }
}

async function notifyAndRecord(deps: LeadDeps, lead: LeadRecordForNotification): Promise<void> {
  const outcome = await deps.sendNotification(lead);
  await recordNotificationStatus(deps.supabase, lead.id, outcome);
}

/**
 * Logica centrală de trimitere lead — independentă de framework, testabilă.
 *
 * Idempotență: identitatea unei trimiteri este tokenul submission_id generat
 * client-side. Unicitatea este impusă atomic la nivel de bază de date
 * (index unic pe submission_id); la conflict se returnează lead-ul existent
 * fără un al doilea rând. Două anchete diferite (conținut diferit => token
 * diferit) creează întotdeauna două lead-uri.
 *
 * Notificare: salvarea în bază de date este sursa de adevăr. Eșecul
 * notificării nu pierde lead-ul; la un retry idempotent al aceleiași
 * trimiteri, notificarea este reîncercată dacă nu fusese deja trimisă.
 */
export async function handleSubmitLead(data: LeadInput, deps: LeadDeps): Promise<SubmitLeadResult> {
  // Câmp honeypot ascuns vizitatorilor: bot-ii îl completează, oamenii nu.
  // Pretindem succes fără a salva nimic.
  if (data.website) {
    return { id: "accepted", duplicate: false };
  }

  const payload: Record<string, unknown> = {
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
    submission_id: data.submission_id ?? null,
    notification_status: "pending",
  };

  const inserted = await insertLead(deps.supabase, payload);

  if ("row" in inserted) {
    await notifyAndRecord(deps, inserted.row);
    return { id: inserted.row.id, duplicate: false };
  }

  if ("uniqueViolation" in inserted) {
    // Aceeași trimitere deja salvată: returnează rândul existent fără duplicat.
    if (data.submission_id) {
      const existing = await findLeadBySubmissionId(deps.supabase, data.submission_id);
      if (existing) {
        // Retry al notificării, dacă prima încercare nu a fost trimisă.
        const status = (existing as { notification_status?: string }).notification_status;
        if (status !== "sent") {
          await notifyAndRecord(deps, existing);
        }
        return { id: existing.id, duplicate: true };
      }
    }
    console.error("[leads] Conflict de idempotență fără rând găsit:", data.submission_id);
    throw new Error(SAFE_USER_ERROR);
  }

  // Fallback: migrarea nu e aplicată (coloanele noi lipsesc) — salvăm fără
  // câmpurile de idempotență/status, degradat dar funcțional.
  if (isMissingColumn(inserted.failed)) {
    const legacyInsert = await insertLead(
      deps.supabase,
      Object.fromEntries(
        Object.entries(payload).filter(
          ([key]) => !["submission_id", "notification_status"].includes(key),
        ),
      ),
    );

    if ("row" in legacyInsert) {
      // Fără coloană de status: notificăm fără a putea înregistra rezultatul.
      await deps.sendNotification(legacyInsert.row);
      return { id: legacyInsert.row.id, duplicate: false };
    }

    console.error("[leads] Insert legacy eșuat:", JSON.stringify(legacyInsert));
    throw new Error(SAFE_USER_ERROR);
  }

  console.error("[leads] Insert eșuat:", JSON.stringify(inserted));
  throw new Error(SAFE_USER_ERROR);
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { sendLeadNotification } = await import("./leads.server");

    return handleSubmitLead(data, {
      supabase: supabaseAdmin as unknown as LeadSupabaseLike,
      sendNotification: async (lead) => ((await sendLeadNotification(lead)) ? "sent" : "failed"),
    });
  });
