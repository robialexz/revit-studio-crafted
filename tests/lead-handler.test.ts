import { describe, expect, test } from "bun:test";

import {
  handleSubmitLead,
  type LeadDeps,
  type LeadErrorLike,
  type LeadRecordForNotification,
  type LeadSupabaseLike,
} from "../src/lib/leads.functions";
import { resendIdempotencyKey } from "../src/lib/leads.server";
import type { LeadInput } from "../src/lib/lead-schema";

/**
 * Store in-memory care emulează semantica PostgREST pentru fluxul de lead:
 * coduri de eroare reale (23505 unic violation, 42703 coloană lipsă),
 * constrângere de unicitate pe submission_id, select cu .eq/.single.
 */
function createMemorySupabase(options: { withoutNewColumns?: boolean } = {}) {
  const rows: Record<string, unknown>[] = [];
  const bySubmissionId = new Map<string, Record<string, unknown>>();

  function notFound(): { data: null; error: LeadErrorLike } {
    return { data: null, error: { code: "PGRST116", message: "no rows" } };
  }

  const supabase: LeadSupabaseLike = {
    from: (table) => {
      if (table !== "leads") throw new Error(`unexpected table ${table}`);
      return {
        insert: (payload) => {
          if (
            options.withoutNewColumns &&
            ("submission_id" in payload || "notification_status" in payload)
          ) {
            return {
              select: () => ({
                single: async () => ({
                  data: null,
                  error: { code: "42703", message: 'column "notification_status" does not exist' },
                }),
              }),
            };
          }
          const submissionId = payload["submission_id"];
          if (typeof submissionId === "string" && bySubmissionId.has(submissionId)) {
            return {
              select: () => ({
                single: async () => ({
                  data: null,
                  error: {
                    code: "23505",
                    message:
                      'duplicate key value violates unique constraint "leads_submission_id_idx"',
                  },
                }),
              }),
            };
          }
          const row: Record<string, unknown> = {
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            notification_status: "pending",
            ...payload,
          };
          rows.push(row);
          if (typeof submissionId === "string") bySubmissionId.set(submissionId, row);
          return {
            select: () => ({ single: async () => ({ data: row, error: null }) }),
          };
        },
        select: (columns) => {
          void columns;
          return {
            eq: (column: string, value: unknown) => {
              if (column === "submission_id" && typeof value === "string") {
                const row = bySubmissionId.get(value);
                return {
                  single: async () => (row ? { data: row, error: null } : notFound()),
                };
              }
              return { single: async () => notFound() };
            },
            single: async () => notFound(),
          };
        },
        update: (payload) => ({
          eq: async (column, value) => {
            if (column === "id") {
              const row = rows.find((r) => r["id"] === value);
              if (row) Object.assign(row, payload);
              return { error: null };
            }
            return { error: { code: "PGRST100", message: "unexpected eq" } };
          },
        }),
      };
    },
  };

  return {
    supabase,
    rows,
    getBySubmissionId: (id: string) => bySubmissionId.get(id),
    count: () => rows.length,
  };
}

function makeDeps(
  store: ReturnType<typeof createMemorySupabase>,
  notification?: (lead: LeadRecordForNotification) => Promise<"sent" | "failed">,
): LeadDeps {
  return {
    supabase: store.supabase,
    sendNotification:
      notification ??
      (async () => {
        return "sent";
      }),
  };
}

const baseLead = (overrides: Partial<LeadInput> = {}): LeadInput => ({
  name: "Ion Popescu",
  phone: "0722123456",
  email: "",
  project_type: "Revit MEP",
  available_files: ["DWG"],
  description: "Modelare HVAC",
  submission_id: crypto.randomUUID(),
  ...overrides,
});

describe("handleSubmitLead — idempotență", () => {
  test("dublu-submit identic (același submission_id) creează un singur lead", async () => {
    const store = createMemorySupabase();
    const deps = makeDeps(store);
    const input = baseLead({ submission_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" });

    const first = await handleSubmitLead(input, deps);
    const second = await handleSubmitLead(input, deps);

    expect(first.duplicate).toBe(false);
    expect(second.duplicate).toBe(true);
    expect(second.id).toBe(first.id);
    expect(store.count()).toBe(1);
  });

  test("aceeași persoană + alt proiect (alt submission_id) creează lead nou", async () => {
    const store = createMemorySupabase();
    const deps = makeDeps(store);

    const first = await handleSubmitLead(
      baseLead({
        submission_id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
        project_type: "HVAC",
        description: "Ventilare birou",
      }),
      deps,
    );
    const second = await handleSubmitLead(
      baseLead({
        submission_id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
        project_type: "Termice",
        description: "Încălzire apartament",
      }),
      deps,
    );

    expect(first.duplicate).toBe(false);
    expect(second.duplicate).toBe(false);
    expect(first.id).not.toBe(second.id);
    expect(store.count()).toBe(2);
  });

  test("trimiteri identice concurente (Promise.all) creează un singur lead", async () => {
    const store = createMemorySupabase();
    const deps = makeDeps(store);
    const input = baseLead({ submission_id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd" });

    const results = await Promise.all([
      handleSubmitLead(input, deps),
      handleSubmitLead(input, deps),
      handleSubmitLead(input, deps),
    ]);

    expect(store.count()).toBe(1);
    const ids = new Set(results.map((r) => r.id));
    expect(ids.size).toBe(1);
    expect(results.filter((r) => r.duplicate).length).toBe(2);
  });

  test("cereri concurente pentru aceeași trimitere => un singur rând + o singură tentativă de email cu cheia corectă", async () => {
    const store = createMemorySupabase();
    const seenKeys: string[] = [];
    const deps = makeDeps(store, async (lead) => {
      seenKeys.push(resendIdempotencyKey(lead as never));
      return "failed";
    });
    const input = baseLead({ submission_id: "aaaa1111-aaaa-4aaa-8aaa-aaaaaaaaaaaa" });

    const [first, second] = await Promise.all([
      handleSubmitLead(input, deps),
      handleSubmitLead(input, deps),
    ]);

    expect(store.count()).toBe(1);
    expect(first.id).toBe(second.id);
    // O singură încercare de notificare (V1): doar câștigătoarea insert-ului
    // trimite emailul; duplicatul returnează lead-ul existent fără retrimitere.
    expect(seenKeys).toHaveLength(1);
    expect(seenKeys[0]).toBe("lead-notification/aaaa1111-aaaa-4aaa-8aaa-aaaaaaaaaaaa");
    const row = store.getBySubmissionId("aaaa1111-aaaa-4aaa-8aaa-aaaaaaaaaaaa");
    expect(row?.["notification_status"]).toBe("failed");
  });

  test("honeypot completat => succes fals, fără rând în baza de date", async () => {
    const store = createMemorySupabase();
    const deps = makeDeps(store);

    const result = await handleSubmitLead(baseLead({ website: "spam.com" }), deps);

    expect(result.id).toBe("accepted");
    expect(store.count()).toBe(0);
  });
});

describe("handleSubmitLead — notificare și retry", () => {
  test("DB success + Resend fail => lead salvat, status 'failed', fără eroare", async () => {
    const store = createMemorySupabase();
    const sentLeads: string[] = [];
    const deps = makeDeps(store, async (lead) => {
      sentLeads.push(lead.id);
      return "failed";
    });
    const input = baseLead({ submission_id: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee" });

    const result = await handleSubmitLead(input, deps);

    expect(result.duplicate).toBe(false);
    expect(store.count()).toBe(1);
    expect(sentLeads).toHaveLength(1);
    const row = store.getBySubmissionId("eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee");
    expect(row?.["notification_status"]).toBe("failed");
  });

  test("retry idempotent după eșec Resend => același lead, fără retrimitere (V1), status rămâne 'failed'", async () => {
    const store = createMemorySupabase();
    let attempts = 0;
    const deps = makeDeps(store, async () => {
      attempts += 1;
      return "failed";
    });
    const input = baseLead({
      submission_id: "ffffffff-ffff-4fff-8fff-ffffffffffff",
      project_type: "HVAC",
      deadline: "1 septembrie",
    });

    const first = await handleSubmitLead(input, deps);
    expect(first.duplicate).toBe(false);
    expect(attempts).toBe(1);

    // Retry-ul aceleiași trimiteri: lead-ul există deja, se returnează fără
    // a reîncerca notificarea. Vizitatorul primește tot succes.
    const retry = await handleSubmitLead(input, deps);
    expect(retry.duplicate).toBe(true);
    expect(retry.id).toBe(first.id);
    expect(attempts).toBe(1);
    expect(store.count()).toBe(1);

    const row = store.getBySubmissionId("ffffffff-ffff-4fff-8fff-ffffffffffff");
    expect(row?.["notification_status"]).toBe("failed");
  });

  test("Resend reușește => lead salvat + status 'sent'", async () => {
    const store = createMemorySupabase();
    const deps = makeDeps(store, async () => "sent");
    const input = baseLead({ submission_id: "abababab-abab-4bab-8bab-abababababab" });

    const result = await handleSubmitLead(input, deps);

    expect(result.duplicate).toBe(false);
    expect(store.count()).toBe(1);
    const row = store.getBySubmissionId("abababab-abab-4bab-8bab-abababababab");
    expect(row?.["notification_status"]).toBe("sent");
  });

  test("retry după succes => nu se retrimite emailul", async () => {
    const store = createMemorySupabase();
    let attempts = 0;
    const deps = makeDeps(store, async () => {
      attempts += 1;
      return "sent";
    });
    const input = baseLead({ submission_id: "99999999-9999-4999-8999-999999999999" });

    await handleSubmitLead(input, deps);
    const retry = await handleSubmitLead(input, deps);

    expect(retry.duplicate).toBe(true);
    expect(attempts).toBe(1);
    expect(store.count()).toBe(1);
  });

  test("eroare DB neașteptată => eroare sigură pentru utilizator, fără detalii", async () => {
    const store = createMemorySupabase();
    void store;
    const broken: LeadSupabaseLike = {
      from: () => ({
        insert: () => ({
          select: () => ({
            single: async () => ({ data: null, error: { code: "PGRST500", message: "boom" } }),
          }),
        }),
        select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: async () => ({ error: null }) }),
      }),
    };
    const deps = { supabase: broken, sendNotification: async () => "sent" as const };

    await expect(handleSubmitLead(baseLead(), deps)).rejects.toThrow(
      "Cererea nu a putut fi salvată. Încearcă din nou.",
    );
  });

  test("migrarea neaplicată (42703) => salvăm degradat fără câmpurile noi, fără eroare", async () => {
    const store = createMemorySupabase({ withoutNewColumns: true });
    let attempts = 0;
    const deps = makeDeps(store, async () => {
      attempts += 1;
      return "sent";
    });
    const input = baseLead({ submission_id: "11111111-1111-4111-8111-111111111111" });

    const result = await handleSubmitLead(input, deps);

    expect(result.duplicate).toBe(false);
    expect(store.count()).toBe(1);
    expect(attempts).toBe(1);
  });
});
