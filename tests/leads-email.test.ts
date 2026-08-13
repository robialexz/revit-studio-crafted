import { describe, expect, spyOn, test } from "bun:test";

import { buildLeadEmail, sendLeadNotification, type LeadRecord } from "../src/lib/leads.server";

const lead: LeadRecord = {
  id: "lead-test-1",
  created_at: "2026-08-13T10:00:00+03:00",
  name: "Ion <Popescu>",
  phone: "0722123456",
  email: "ion@exemplu.ro",
  project_type: "HVAC",
  available_files: ["DWG", "PDF"],
  approximate_sheet_count: "5",
  deadline: "20 august",
  description: "Modelare <b>instalații</b> HVAC.",
  page_path: "/hvac",
  referrer: "https://www.google.com",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "lansare",
  utm_content: "banner-1",
  utm_term: "revit mep",
};

function withEnv(vars: Record<string, string | undefined>, fn: () => Promise<void> | void) {
  const saved: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(vars)) {
    saved[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return fn();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

describe("buildLeadEmail", () => {
  test("include toate câmpurile lead-ului", () => {
    const { html, text, subject } = buildLeadEmail(lead);
    for (const value of [
      "Ion",
      "0722123456",
      "ion@exemplu.ro",
      "HVAC",
      "DWG, PDF",
      "5",
      "20 august",
      "google",
      "cpc",
      "lansare",
      "banner-1",
      "revit mep",
      "https://www.google.com",
      "/hvac",
      "lead-test-1",
    ]) {
      expect(html).toContain(value);
    }
    for (const value of [
      "Ion",
      "0722123456",
      "ion@exemplu.ro",
      "HVAC",
      "DWG, PDF",
      "5",
      "20 august",
      "google",
      "cpc",
      "lansare",
      "banner-1",
      "revit mep",
      "https://www.google.com",
      "/hvac",
    ]) {
      expect(text).toContain(value);
    }
    expect(subject).toContain("HVAC");
    expect(subject).toContain("Ion");
  });

  test("scapă HTML-ul din datele utilizatorului (XSS)", () => {
    const { html } = buildLeadEmail(lead);
    expect(html).toContain("Ion &lt;Popescu&gt;");
    expect(html).toContain("Modelare &lt;b&gt;instalații&lt;/b&gt; HVAC.");
    expect(html).not.toContain("<Popescu>");
  });

  test("câmpuri lipsă devin lizibile", () => {
    const { html, text } = buildLeadEmail({ ...lead, email: null, utm_source: null });
    expect(html).toContain("—");
    expect(text).toContain("Email: —");
  });
});

describe("sendLeadNotification", () => {
  test("fără configurare completă => false, fără a arunca (lead-ul rămâne salvat)", async () => {
    await withEnv(
      {
        RESEND_API_KEY: undefined,
        LEAD_NOTIFICATION_EMAIL: undefined,
        LEAD_NOTIFICATION_FROM: undefined,
      },
      async () => {
        await expect(sendLeadNotification(lead)).resolves.toBe(false);
      },
    );
  });

  test("cheie + destinatar prezenți, dar LEAD_NOTIFICATION_FROM lipsește => NU trimite (fără fallback)", async () => {
    const fetchSpy = spyOn(globalThis, "fetch");
    try {
      await withEnv(
        {
          RESEND_API_KEY: "re_test_key",
          LEAD_NOTIFICATION_EMAIL: "owner@example.com",
          LEAD_NOTIFICATION_FROM: undefined,
        },
        async () => {
          const result = await sendLeadNotification(lead);
          expect(result).toBe(false);
          expect(fetchSpy).not.toHaveBeenCalled();
        },
      );
    } finally {
      fetchSpy.mockRestore();
    }
  });

  test("configurație completă => apelează Resend o singură dată, de la expeditorul de producție", async () => {
    const fetchSpy = spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("{}", { status: 200 }),
    );
    try {
      await withEnv(
        {
          RESEND_API_KEY: "re_test_key",
          LEAD_NOTIFICATION_EMAIL: "owner@example.com",
          LEAD_NOTIFICATION_FROM: "NOD BIM <leads@example.com>",
        },
        async () => {
          const result = await sendLeadNotification(lead);
          expect(result).toBe(true);
          expect(fetchSpy).toHaveBeenCalledTimes(1);
          const [url, init] = fetchSpy.mock.calls[0] as unknown as [string, RequestInit];
          expect(url).toBe("https://api.resend.com/emails");
          const body = JSON.parse(String(init.body));
          expect(body.from).toBe("NOD BIM <leads@example.com>");
          expect(body.to).toEqual(["owner@example.com"]);
          expect(body.reply_to).toBe("ion@exemplu.ro");
          expect(body.html).toContain("Ion");
          expect(body.text).toContain("HVAC");
        },
      );
    } finally {
      fetchSpy.mockRestore();
    }
  });

  test("Resend răspunde cu eroare => false, fără a arunca", async () => {
    const fetchSpy = spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("rate limited", { status: 429 }),
    );
    try {
      await withEnv(
        {
          RESEND_API_KEY: "re_test_key",
          LEAD_NOTIFICATION_EMAIL: "owner@example.com",
          LEAD_NOTIFICATION_FROM: "NOD BIM <leads@example.com>",
        },
        async () => {
          await expect(sendLeadNotification(lead)).resolves.toBe(false);
        },
      );
    } finally {
      fetchSpy.mockRestore();
    }
  });
});
