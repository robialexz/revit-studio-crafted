import { describe, expect, test } from "bun:test";

import { leadSchema } from "../src/lib/lead-schema";

const SUBMISSION_ID = "123e4567-e89b-42d3-a456-426614174000";

const validPayload = {
  name: "Ion Popescu",
  phone: "0722123456",
  email: "ion@exemplu.ro",
  project_type: "Revit MEP",
  available_files: ["DWG", "PDF"],
  approximate_sheet_count: "5",
  deadline: "20 august",
  description: "Modelare instalații HVAC pentru un birou.",
  page_path: "/",
  referrer: "https://www.google.com",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "lansare",
  utm_content: "banner-1",
  utm_term: "revit mep",
  submission_id: SUBMISSION_ID,
};

describe("leadSchema", () => {
  test("acceptă un payload valid complet", () => {
    expect(() => leadSchema.parse(validPayload)).not.toThrow();
  });

  test("acceptă minimum necesar (nume + telefon + submission_id)", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", submission_id: SUBMISSION_ID }),
    ).not.toThrow();
  });

  test("RESPINGE cererea fără submission_id (obligatoriu server-side)", () => {
    expect(() => leadSchema.parse({ name: "Ana", phone: "0722123456" })).toThrow();
  });

  test("RESPINGE submission_id invalid (nu e UUID)", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", submission_id: "abc" }),
    ).toThrow();
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", submission_id: "1234" }),
    ).toThrow();
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", submission_id: "1".repeat(40) }),
    ).toThrow();
  });

  test("respinge nume prea scurt", () => {
    expect(() =>
      leadSchema.parse({ name: "A", phone: "0722123456", submission_id: SUBMISSION_ID }),
    ).toThrow();
  });

  test("respinge telefon prea scurt", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "123", submission_id: SUBMISSION_ID }),
    ).toThrow();
  });

  test("respinge telefoane fără cifre (doar simboluri)", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "!!!!!!", submission_id: SUBMISSION_ID }),
    ).toThrow();
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "---", submission_id: SUBMISSION_ID }),
    ).toThrow();
  });

  test("respinge telefoane doar cu litere", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "abcdefg", submission_id: SUBMISSION_ID }),
    ).toThrow();
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722abcde", submission_id: SUBMISSION_ID }),
    ).toThrow();
  });

  test("acceptă telefon românesc simplu", () => {
    const parsed = leadSchema.parse({
      name: "Ana",
      phone: "0722123456",
      submission_id: SUBMISSION_ID,
    });
    expect(parsed.phone).toBe("0722123456");
  });

  test("acceptă telefon românesc cu spații și cratime", () => {
    const parsed = leadSchema.parse({
      name: "Ana",
      phone: "0722 123 456",
      submission_id: SUBMISSION_ID,
    });
    expect(parsed.phone).toBe("0722 123 456");
  });

  test("acceptă telefon internațional cu prefix +", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "+40722123456", submission_id: SUBMISSION_ID }),
    ).not.toThrow();
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "+44 7911 123456", submission_id: SUBMISSION_ID }),
    ).not.toThrow();
  });

  test("respinge email invalid", () => {
    expect(() =>
      leadSchema.parse({
        name: "Ana",
        phone: "0722123456",
        email: "nu-e-email",
        submission_id: SUBMISSION_ID,
      }),
    ).toThrow();
  });

  test("acceptă email gol ca lipsă", () => {
    const parsed = leadSchema.parse({
      name: "Ana",
      phone: "0722123456",
      email: "",
      submission_id: SUBMISSION_ID,
    });
    expect(parsed.email).toBe("");
  });

  test("respinge descriere peste 4000 de caractere", () => {
    expect(() =>
      leadSchema.parse({
        name: "Ana",
        phone: "0722123456",
        description: "x".repeat(4001),
        submission_id: SUBMISSION_ID,
      }),
    ).toThrow();
  });

  test("respinge prea multe fișiere", () => {
    const files = Array.from({ length: 21 }, (_, i) => `fisier-${i}`);
    expect(() =>
      leadSchema.parse({
        name: "Ana",
        phone: "0722123456",
        available_files: files,
        submission_id: SUBMISSION_ID,
      }),
    ).toThrow();
  });

  test("respinge UTM peste limita de 200 de caractere", () => {
    expect(() =>
      leadSchema.parse({
        name: "Ana",
        phone: "0722123456",
        utm_source: "x".repeat(201),
        submission_id: SUBMISSION_ID,
      }),
    ).toThrow();
  });

  test("permite câmpul honeypot website, dar îl limitează", () => {
    const parsed = leadSchema.parse({
      name: "Ana",
      phone: "0722123456",
      website: "bot.com",
      submission_id: SUBMISSION_ID,
    });
    expect(parsed.website).toBe("bot.com");
    expect(() =>
      leadSchema.parse({
        name: "Ana",
        phone: "0722123456",
        website: "x".repeat(201),
        submission_id: SUBMISSION_ID,
      }),
    ).toThrow();
  });

  test("taie spațiile din nume și telefon", () => {
    const parsed = leadSchema.parse({
      name: "  Ana  ",
      phone: " 0722123456 ",
      submission_id: SUBMISSION_ID,
    });
    expect(parsed.name).toBe("Ana");
    expect(parsed.phone).toBe("0722123456");
  });

  test("respinge tipuri greșite", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: 12345678, submission_id: SUBMISSION_ID }),
    ).toThrow();
    expect(() =>
      leadSchema.parse({
        name: "Ana",
        phone: "0722123456",
        available_files: "DWG",
        submission_id: SUBMISSION_ID,
      }),
    ).toThrow();
  });
});
