import { describe, expect, test } from "bun:test";

import { leadSchema } from "../src/lib/lead-schema";

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
};

describe("leadSchema", () => {
  test("acceptă un payload valid complet", () => {
    expect(() => leadSchema.parse(validPayload)).not.toThrow();
  });

  test("acceptă minimum necesar (nume + telefon)", () => {
    expect(() => leadSchema.parse({ name: "Ana", phone: "0722123456" })).not.toThrow();
  });

  test("respinge nume prea scurt", () => {
    expect(() => leadSchema.parse({ name: "A", phone: "0722123456" })).toThrow();
  });

  test("respinge telefon prea scurt", () => {
    expect(() => leadSchema.parse({ name: "Ana", phone: "123" })).toThrow();
  });

  test("respinge telefoane fără cifre (doar simboluri)", () => {
    expect(() => leadSchema.parse({ name: "Ana", phone: "!!!!!!" })).toThrow();
    expect(() => leadSchema.parse({ name: "Ana", phone: "---" })).toThrow();
  });

  test("respinge telefoane doar cu litere", () => {
    expect(() => leadSchema.parse({ name: "Ana", phone: "abcdefg" })).toThrow();
    expect(() => leadSchema.parse({ name: "Ana", phone: "0722abcde" })).toThrow();
  });

  test("acceptă telefon românesc simplu", () => {
    const parsed = leadSchema.parse({ name: "Ana", phone: "0722123456" });
    expect(parsed.phone).toBe("0722123456");
  });

  test("acceptă telefon românesc cu spații și cratime", () => {
    const parsed = leadSchema.parse({ name: "Ana", phone: "0722 123 456" });
    expect(parsed.phone).toBe("0722 123 456");
  });

  test("acceptă telefon internațional cu prefix +", () => {
    expect(() => leadSchema.parse({ name: "Ana", phone: "+40722123456" })).not.toThrow();
    expect(() => leadSchema.parse({ name: "Ana", phone: "+44 7911 123456" })).not.toThrow();
  });

  test("acceptă submission_id uuid valid", () => {
    const parsed = leadSchema.parse({
      name: "Ana",
      phone: "0722123456",
      submission_id: "123e4567-e89b-42d3-a456-426614174000",
    });
    expect(parsed.submission_id).toBe("123e4567-e89b-42d3-a456-426614174000");
  });

  test("respinge submission_id invalid", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", submission_id: "abc" }),
    ).toThrow();
  });

  test("respinge email invalid", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", email: "nu-e-email" }),
    ).toThrow();
  });

  test("acceptă email gol ca lipsă", () => {
    const parsed = leadSchema.parse({ name: "Ana", phone: "0722123456", email: "" });
    expect(parsed.email).toBe("");
  });

  test("respinge descriere peste 4000 de caractere", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", description: "x".repeat(4001) }),
    ).toThrow();
  });

  test("respinge prea multe fișiere", () => {
    const files = Array.from({ length: 21 }, (_, i) => `fisier-${i}`);
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", available_files: files }),
    ).toThrow();
  });

  test("respinge UTM peste limita de 200 de caractere", () => {
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", utm_source: "x".repeat(201) }),
    ).toThrow();
  });

  test("permite câmpul honeypot website, dar îl limitează", () => {
    const parsed = leadSchema.parse({ name: "Ana", phone: "0722123456", website: "bot.com" });
    expect(parsed.website).toBe("bot.com");
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", website: "x".repeat(201) }),
    ).toThrow();
  });

  test("taie spațiile din nume și telefon", () => {
    const parsed = leadSchema.parse({ name: "  Ana  ", phone: " 0722123456 " });
    expect(parsed.name).toBe("Ana");
    expect(parsed.phone).toBe("0722123456");
  });

  test("respinge tipuri greșite", () => {
    expect(() => leadSchema.parse({ name: "Ana", phone: 12345678 })).toThrow();
    expect(() =>
      leadSchema.parse({ name: "Ana", phone: "0722123456", available_files: "DWG" }),
    ).toThrow();
  });
});
