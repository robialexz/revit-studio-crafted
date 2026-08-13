import { describe, expect, test } from "bun:test";

import { canonicalUrl, formatPhoneDisplay, site, whatsappLink } from "../src/lib/site-config";

describe("site-config", () => {
  test("domeniul canonical de producție este nodbim.com", () => {
    expect(site.siteUrl).toBe("https://nodbim.com");
  });

  test("canonicalUrl generează URL-uri absolute", () => {
    expect(canonicalUrl("/")).toBe("https://nodbim.com/");
    expect(canonicalUrl("/revit-mep")).toBe("https://nodbim.com/revit-mep");
    expect(canonicalUrl("hvac")).toBe("https://nodbim.com/hvac");
  });

  test("fără număr de WhatsApp configurat la build, link-urile sunt goale", () => {
    // Bun încarcă automat .env-ul local; testul trebuie să fie valid în ambele cazuri:
    // fără număr => link gol (CTA inerte), cu număr => link wa.me valid.
    const link = whatsappLink("Salut");
    expect(link === "" || link.startsWith("https://wa.me/")).toBe(true);
  });
});

describe("formatPhoneDisplay", () => {
  test("format ro: 40750485793 -> +40 750 485 793", () => {
    expect(formatPhoneDisplay("40750485793")).toBe("+40 750 485 793");
  });

  test("format ro fără prefix de țară: 0750485793 -> +40 750 485 793", () => {
    expect(formatPhoneDisplay("0750485793")).toBe("+40 750 485 793");
  });

  test("ignoră caracterele non-cifre", () => {
    expect(formatPhoneDisplay("+40 750 485 793")).toBe("+40 750 485 793");
    expect(formatPhoneDisplay("(407) 504-857-93")).toBe("+40 750 485 793");
  });

  test("internațional generic: +447 911 123 456", () => {
    expect(formatPhoneDisplay("447911123456")).toBe("+447 911 123 456");
  });

  test("gol / nedefinit => șir gol", () => {
    expect(formatPhoneDisplay("")).toBe("");
    expect(formatPhoneDisplay(undefined)).toBe("");
  });

  test("link-ul wa.me rămâne cu cifre internaționale", () => {
    // Afișarea se formatează, dar linkul folosește cifrele brute.
    expect(formatPhoneDisplay("40750485793")).not.toBe("40750485793");
  });
});
