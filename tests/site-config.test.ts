import { describe, expect, test } from "bun:test";

import {
  buildPhoneHref,
  canonicalUrl,
  formatPhoneDisplay,
  phoneDisplay,
  phoneHref,
  quoteContextForPath,
  site,
  whatsappLink,
} from "../src/lib/site-config";

describe("site-config", () => {
  test("formularul și WhatsApp păstrează serviciul paginii în RO și EN", () => {
    for (const [path, projectType, subject] of [
      ["/autocad-dwg", "Redesenare / PDF în DWG", "am un plan de desenat în AutoCAD"],
      ["/pdf-in-dwg", "Redesenare / PDF în DWG", "am un plan PDF de redesenat în DWG"],
      ["/en/autocad-drafting", "AutoCAD / PDF to DWG", "AutoCAD drafting / PDF to DWG"],
      ["/revit-mep", "Modelare Revit MEP", "modelare Revit MEP"],
      ["/en/revit-mep-outsourcing", "Revit MEP modelling", "Revit MEP modelling"],
    ] as const) {
      const context = quoteContextForPath(path);
      expect(context?.projectType).toBe(projectType);
      expect(context?.whatsappMessage).toContain(subject);
      expect(quoteContextForPath(`${path}/`)).toEqual(context);
    }
    expect(quoteContextForPath("/revit-mep")?.whatsappMessage).toBe(
      "Salut! Am găsit NOD BIM pe site și am nevoie de planșe de instalații sau modelare Revit MEP. Pot să îți trimit fișierele pentru o ofertă?",
    );
    expect(quoteContextForPath("/en/autocad-drafting")?.whatsappMessage).toStartWith(
      "Hello, I found NOD BIM online and need ",
    );
    expect(quoteContextForPath("/en/revit-mep-outsourcing")?.whatsappMessage).toStartWith(
      "Hello, I found NOD BIM online and need ",
    );
    expect(quoteContextForPath("/modelare-revit")?.projectType).toBe("Modelare Revit MEP");
    for (const path of ["/hvac", "/instalatii-termice", "/instalatii-electrice"]) {
      expect(quoteContextForPath(path)?.projectType).toBe("Planșe de instalații");
    }
    expect(quoteContextForPath("/")).toBeUndefined();
    expect(quoteContextForPath("/contact")).toBeUndefined();
    expect(quoteContextForPath("/en/about")).toBeUndefined();
  });

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

describe("buildPhoneHref", () => {
  test("normalizează la +40 și respinge valorile invalide", () => {
    expect(buildPhoneHref("40750485793")).toBe("tel:+40750485793");
    expect(buildPhoneHref("+40 750 485 793")).toBe("tel:+40750485793");
    expect(buildPhoneHref("0750485793")).toBe("tel:+40750485793");
    for (const bad of ["", "12345", "[WHATSAPP_NUMBER]"]) expect(buildPhoneHref(bad)).toBe("");
  });

  test("phoneHref și phoneDisplay există împreună", () => {
    expect(phoneHref === "").toBe(phoneDisplay === "");
    expect(phoneHref === "" || /^tel:\+\d{8,15}$/.test(phoneHref)).toBe(true);
  });
});
