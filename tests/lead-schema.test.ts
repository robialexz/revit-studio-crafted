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
