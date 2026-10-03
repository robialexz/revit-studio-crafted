import { describe, expect, test } from "bun:test";

import { alternatePath, enHomePath, hreflangLinks, localeForPath } from "../src/lib/i18n";
import { redirectPathUrl } from "../src/server";

describe("limba paginii", () => {
  test("engleza doar sub /en", () => {
    expect(localeForPath("/en/revit-mep-outsourcing")).toBe("en");
    expect(localeForPath("/en")).toBe("en");
    expect(localeForPath("/revit-mep")).toBe("ro");
    expect(localeForPath("/english")).toBe("ro");
  });

  test("comutatorul duce la pagina echivalentă sau la intrarea în limbă", () => {
    expect(alternatePath("/revit-mep", "en")).toBe("/en/revit-mep-outsourcing");
    expect(alternatePath("/en/revit-mep-outsourcing/", "ro")).toBe("/revit-mep");
    expect(alternatePath("/hvac", "en")).toBe("/en/revit-mep-outsourcing");
    expect(alternatePath("/hvac", "ro")).toBe("/hvac");
    expect(alternatePath("/politica-cookies", "en")).toBe("/en/cookies");
    expect(alternatePath("/autocad-dwg", "en")).toBe("/en/autocad-drafting");
    expect(alternatePath("/en/about", "ro")).toBe("/despre");
    expect(alternatePath("/en/privacy", "ro")).toBe("/politica-de-confidentialitate");
  });

  test("/en redirecționează către intrarea EN", () => {
    expect(redirectPathUrl("https://nodbim.com/en")).toBe(`https://nodbim.com${enHomePath}`);
    expect(redirectPathUrl("https://nodbim.com/en/?a=1")).toBe(
      `https://nodbim.com${enHomePath}?a=1`,
    );
    expect(redirectPathUrl(`https://nodbim.com${enHomePath}`)).toBeUndefined();
  });

  test("hreflang reciproc doar pentru perechi, cu x-default", () => {
    const ro = hreflangLinks("/revit-mep");
    const en = hreflangLinks("/en/revit-mep-outsourcing");
    expect(ro).toEqual(en);
    expect(ro.map((l) => l.hrefLang)).toEqual(["ro", "en", "x-default"]);
    expect(ro[0]?.href).toBe("https://nodbim.com/revit-mep");
    expect(ro[1]?.href).toBe("https://nodbim.com/en/revit-mep-outsourcing");
    expect(hreflangLinks("/hvac")).toEqual([]);
  });
});
