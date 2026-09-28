import { describe, expect, test } from "bun:test";

import { alternatePath, hreflangLinks, localeForPath } from "../src/lib/i18n";

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
    expect(alternatePath("/despre", "en")).toBe("/en/revit-mep-outsourcing");
    expect(alternatePath("/despre", "ro")).toBe("/despre");
    expect(alternatePath("/politica-cookies", "en")).toBe("/en/cookies");
    expect(alternatePath("/en/privacy", "ro")).toBe("/politica-de-confidentialitate");
  });

  test("hreflang reciproc doar pentru perechi, cu x-default", () => {
    const ro = hreflangLinks("/revit-mep");
    const en = hreflangLinks("/en/revit-mep-outsourcing");
    expect(ro).toEqual(en);
    expect(ro.map((l) => l.hrefLang)).toEqual(["ro", "en", "x-default"]);
    expect(ro[0]?.href).toBe("https://nodbim.com/revit-mep");
    expect(ro[1]?.href).toBe("https://nodbim.com/en/revit-mep-outsourcing");
    expect(hreflangLinks("/despre")).toEqual([]);
  });
});
