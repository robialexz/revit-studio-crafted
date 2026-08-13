import { describe, expect, test } from "bun:test";

import {
  MAX_NOTIFICATION_ATTEMPTS,
  NOTIFICATION_RETRY_BATCH_SIZE,
  processPendingNotifications,
  resendIdempotencyKey,
  type LeadRecord,
  type NotificationRetrySupabase,
} from "../src/lib/leads.server";

const SUBMISSION_ID = "feed0000-0000-4000-8000-000000000000";

function makeLead(overrides: Partial<LeadRecord> = {}): LeadRecord {
  return {
    id: crypto.randomUUID(),
    submission_id: SUBMISSION_ID,
    created_at: new Date().toISOString(),
    name: "Ion Popescu",
    phone: "0722123456",
    email: null,
    project_type: "HVAC",
    available_files: ["DWG"],
    approximate_sheet_count: null,
    deadline: null,
    description: "Ventilare birou",
    page_path: "/hvac",
    referrer: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
    notification_status: "failed",
    notification_attempts: 1,
    ...overrides,
  };
}

function createRetrySupabase(leads: LeadRecord[]) {
  const updates: { id: string; payload: Record<string, unknown> }[] = [];
  const selected: LeadRecord[][] = [];

  const supabase: NotificationRetrySupabase = {
    from: (table) => {
      if (table !== "leads") throw new Error(`unexpected table ${table}`);
      return {
        select: (columns) => {
          void columns;
          let filtered = leads;
          const chain = {
            in: (column: string, values: string[]) => {
              if (column === "notification_status") {
                filtered = filtered.filter((l) =>
                  values.includes(l.notification_status ?? "pending"),
                );
              }
              return chain;
            },
            lt: (column: string, value: number) => {
              if (column === "notification_attempts") {
                filtered = filtered.filter((l) => (l.notification_attempts ?? 0) < value);
              }
              return chain;
            },
            order: () => chain,
            limit: (count: number) => {
              void count;
              const batch = filtered.slice(0, NOTIFICATION_RETRY_BATCH_SIZE);
              selected.push(batch);
              return Promise.resolve({ data: batch, error: null });
            },
          };
          return chain;
        },
        update: (payload) => ({
          eq: async (column, value) => {
            if (column === "id") {
              updates.push({ id: String(value), payload });
              const lead = leads.find((l) => l.id === value);
              if (lead) Object.assign(lead, payload);
              return { error: null };
            }
            return { error: { message: "unexpected eq" } };
          },
        }),
      };
    },
  };

  return { supabase, updates, selected };
}

describe("processPendingNotifications — retry automat", () => {
  test("selectează doar lead-urile pending/failed sub pragul de încercări", async () => {
    const leads = [
      makeLead({ notification_status: "failed", notification_attempts: 0 }),
      makeLead({ id: "sent-1", notification_status: "sent", notification_attempts: 0 }),
      makeLead({
        id: "max-1",
        notification_status: "failed",
        notification_attempts: MAX_NOTIFICATION_ATTEMPTS,
      }),
    ];
    const { supabase, selected } = createRetrySupabase(leads);

    const sent: string[] = [];
    await processPendingNotifications({
      supabase,
      sendNotification: async (lead) => {
        sent.push(lead.id);
        return true;
      },
      now: () => new Date("2026-08-13T12:00:00Z"),
    });

    expect(selected[0]?.map((l) => l.id)).toEqual([leads[0]?.id]);
    expect(sent).toEqual([leads[0]?.id]);
  });

  test("succes => status 'sent' + notification_sent_at + contor incrementat", async () => {
    const lead = makeLead({ notification_status: "pending", notification_attempts: 2 });
    const { supabase, updates } = createRetrySupabase([lead]);

    const result = await processPendingNotifications({
      supabase,
      sendNotification: async () => true,
      now: () => new Date("2026-08-13T12:00:00Z"),
    });

    expect(result).toEqual({ attempted: 1, sent: 1, failed: 0 });
    expect(updates).toHaveLength(1);
    expect(updates[0]?.payload).toMatchObject({
      notification_status: "sent",
      notification_attempts: 3,
      notification_last_attempt_at: "2026-08-13T12:00:00.000Z",
      notification_sent_at: "2026-08-13T12:00:00.000Z",
    });
  });

  test("eșec repetat respectă MAX_NOTIFICATION_ATTEMPTS (nu reîncearcă la nesfârșit)", async () => {
    const lead = makeLead({
      notification_status: "failed",
      notification_attempts: MAX_NOTIFICATION_ATTEMPTS - 1,
    });
    const store = createRetrySupabase([lead]);

    const result = await processPendingNotifications({
      supabase: store.supabase,
      sendNotification: async () => false,
      now: () => new Date("2026-08-13T12:00:00Z"),
    });

    expect(result).toEqual({ attempted: 1, sent: 0, failed: 1 });
    expect(store.updates[0]?.payload["notification_attempts"]).toBe(MAX_NOTIFICATION_ATTEMPTS);
    expect(store.updates[0]?.payload["notification_status"]).toBe("failed");

    // După atingerea pragului, o rulare ulterioară nu mai selectează lead-ul.
    const secondRun = await processPendingNotifications({
      supabase: store.supabase,
      sendNotification: async () => true,
    });
    expect(secondRun).toEqual({ attempted: 0, sent: 0, failed: 0 });
  });

  test("fiecare încercare folosește aceeași cheie de idempotență Resend", async () => {
    const lead = makeLead({ submission_id: SUBMISSION_ID, notification_status: "pending" });
    const { supabase } = createRetrySupabase([lead]);

    const keys: string[] = [];
    await processPendingNotifications({
      supabase,
      sendNotification: async (l) => {
        keys.push(resendIdempotencyKey(l));
        return false;
      },
    });

    expect(keys).toEqual([`lead-notification/${SUBMISSION_ID}`]);
    // Aceeași cheie la o a doua rulare (retry programat).
    await processPendingNotifications({
      supabase,
      sendNotification: async (l) => {
        keys.push(resendIdempotencyKey(l));
        return true;
      },
    });
    expect(new Set(keys).size).toBe(1);
  });

  test("resendIdempotencyKey este stabilă și folosește lead.id ca fallback", () => {
    const withSubmission = makeLead();
    const withoutSubmission = makeLead({ submission_id: null, id: "legacy-row-id" });

    expect(resendIdempotencyKey(withSubmission)).toBe(`lead-notification/${SUBMISSION_ID}`);
    expect(resendIdempotencyKey(withoutSubmission)).toBe("lead-notification/legacy-row-id");
    // Determinism: apeluri repetate dau exact aceeași cheie.
    expect(resendIdempotencyKey(withSubmission)).toBe(resendIdempotencyKey(withSubmission));
  });
});
