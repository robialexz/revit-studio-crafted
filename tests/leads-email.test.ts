import { describe, expect, test } from "bun:test";

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

describe("buildLeadEmail", () => {
  test("include toate câmpurile lead-ului", () => {
    const { html, text, subject } = buildLeadEmail(lead);
    // HTML conține tot, inclusiv ID-ul lead-ului.
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
    // Versiunea text conține tot, mai puțin ID-ul (rezervat HTML-ului).
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
  test("sare notificarea fără a arunca dacă lipsește configurația", async () => {
    const originalKey = process.env["RESEND_API_KEY"];
    const originalTo = process.env["LEAD_NOTIFICATION_EMAIL"];
    delete process.env["RESEND_API_KEY"];
    delete process.env["LEAD_NOTIFICATION_EMAIL"];

    try {
      // Nu trebuie să arunce — lead-ul rămâne salvat.
      await expect(sendLeadNotification(lead)).resolves.toBeUndefined();
    } finally {
      if (originalKey) process.env["RESEND_API_KEY"] = originalKey;
      if (originalTo) process.env["LEAD_NOTIFICATION_EMAIL"] = originalTo;
    }
  });

  test("nu trimite dacă lipsește doar destinatarul", async () => {
    const originalKey = process.env["RESEND_API_KEY"];
    const originalTo = process.env["LEAD_NOTIFICATION_EMAIL"];
    process.env["RESEND_API_KEY"] = "re_test_key";
    delete process.env["LEAD_NOTIFICATION_EMAIL"];

    try {
      await expect(sendLeadNotification(lead)).resolves.toBeUndefined();
    } finally {
      if (originalKey) process.env["RESEND_API_KEY"] = originalKey;
      else delete process.env["RESEND_API_KEY"];
      if (originalTo) process.env["LEAD_NOTIFICATION_EMAIL"] = originalTo;
    }
  });
});
