import { describe, expect, test } from "bun:test";

import { redirectToApexUrl } from "../src/server";

describe("redirect www → apex", () => {
  const base = "https://www.nodbim.com/revit-mep?utm_source=google&a=1";

  test("redirecționează www.nodbim.com către apex, păstrând path-ul și query-ul", () => {
    expect(redirectToApexUrl(base, "www.nodbim.com", "nodbim.com")).toBe(
      "https://nodbim.com/revit-mep?utm_source=google&a=1",
    );
  });

  test("păstrează path-ul pentru pagini adânci", () => {
    expect(
      redirectToApexUrl("https://www.nodbim.com/portofoliu", "www.nodbim.com", "nodbim.com"),
    ).toBe("https://nodbim.com/portofoliu");
  });

  test("apex-ul nu este redirecționat", () => {
    expect(redirectToApexUrl("https://nodbim.com/", "nodbim.com", "nodbim.com")).toBeUndefined();
  });

  test("host-uri străine nu sunt redirecționate", () => {
    expect(redirectToApexUrl("https://evil.com/", "evil.com", "nodbim.com")).toBeUndefined();
    expect(
      redirectToApexUrl("https://www.evil.com/", "www.evil.com", "nodbim.com"),
    ).toBeUndefined();
  });

  test("host-ul www este detectat case-insensitive", () => {
    expect(redirectToApexUrl("https://www.nodbim.com/", "WWW.NODBIM.COM", "nodbim.com")).toBe(
      "https://nodbim.com/",
    );
  });

  test("portul este păstrat când există", () => {
    expect(
      redirectToApexUrl("http://www.nodbim.com:8787/test", "www.nodbim.com:8787", "nodbim.com"),
    ).toBe("http://nodbim.com:8787/test");
  });

  test("fallback la host-ul URL-ului când antetul Host lipsește", () => {
    expect(redirectToApexUrl(base, null, "nodbim.com")).toBe(
      "https://nodbim.com/revit-mep?utm_source=google&a=1",
    );
  });
});
