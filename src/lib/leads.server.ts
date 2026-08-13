export type LeadRecord = {
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
};

function row(label: string, value: string | null | undefined) {
  const v = value && value.trim() ? value : "—";
  return `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:12px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;font-size:14px;color:#111827;vertical-align:top">${escapeHtml(v)}</td></tr>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildLeadEmail(lead: LeadRecord) {
  const subject = `🔥 Lead nou — ${lead.project_type || "Proiect"} — ${lead.name}`;
  const data = new Date(lead.created_at).toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" });

  const html = `<!doctype html><html lang="ro"><body style="margin:0;background:#f2f3f1;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:520px;margin:0 auto;padding:20px">
    <h1 style="font-size:16px;margin:0 0 4px">Lead nou de pe site</h1>
    <p style="margin:0 0 16px;color:#6b7280;font-size:12px">${escapeHtml(data)}</p>
    <div style="background:#fff;border:1px solid #d8dad6;padding:16px">
      <table style="width:100%;border-collapse:collapse">
        ${row("Nume", lead.name)}
        ${row("Telefon", lead.phone)}
        ${row("Email", lead.email)}
        ${row("Tip proiect", lead.project_type)}
        ${row("Fișiere existente", lead.available_files?.join(", "))}
        ${row("Nr. planșe", lead.approximate_sheet_count)}
        ${row("Termen", lead.deadline)}
        ${row("Descriere", lead.description)}
      </table>
    </div>
    <div style="background:#fff;border:1px solid #d8dad6;border-top:0;padding:16px">
      <table style="width:100%;border-collapse:collapse">
        ${row("Sursă", lead.utm_source)}
        ${row("UTM medium", lead.utm_medium)}
        ${row("UTM campaign", lead.utm_campaign)}
        ${row("Referrer", lead.referrer)}
        ${row("Landing page", lead.page_path)}
        ${row("Data și ora", data)}
      </table>
    </div>
    <p style="margin:16px 0 0;font-size:12px;color:#6b7280">ID lead: ${escapeHtml(lead.id)}</p>
  </div></body></html>`;

  const text = [
    `Lead nou — ${data}`,
    `Nume: ${lead.name}`,
    `Telefon: ${lead.phone}`,
    `Email: ${lead.email || "—"}`,
    `Tip proiect: ${lead.project_type || "—"}`,
    `Fișiere: ${lead.available_files?.join(", ") || "—"}`,
    `Nr. planșe: ${lead.approximate_sheet_count || "—"}`,
    `Termen: ${lead.deadline || "—"}`,
    `Descriere: ${lead.description || "—"}`,
    ``,
    `Sursă: ${lead.utm_source || "—"}`,
    `UTM medium: ${lead.utm_medium || "—"}`,
    `UTM campaign: ${lead.utm_campaign || "—"}`,
    `Referrer: ${lead.referrer || "—"}`,
    `Landing page: ${lead.page_path || "—"}`,
  ].join("\n");

  return { subject, html, text };
}

/** Trimite notificarea de lead nou. Nu aruncă niciodată — lead-ul e deja salvat. */
export async function sendLeadNotification(lead: LeadRecord): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["LEAD_NOTIFICATION_EMAIL"];
  const from = process.env["LEAD_NOTIFICATION_FROM"] || "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.warn(
      "[leads] Notificare email sărită: lipsește RESEND_API_KEY sau LEAD_NOTIFICATION_EMAIL.",
    );
    return;
  }

  try {
    const { subject, html, text } = buildLeadEmail(lead);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        reply_to: lead.email || undefined,
      }),
    });
    if (!res.ok) console.error("[leads] Resend a răspuns cu eroare:", res.status, await res.text());
  } catch (error) {
    console.error("[leads] Trimiterea notificării a eșuat:", error);
  }
}
