import { describe, expect, test } from "bun:test";

import { canonicalUrl, site, whatsappLink } from "../src/lib/site-config";

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
