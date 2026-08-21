import { describe, expect, test } from "bun:test";

import { redirectToApexUrl, redirectToHttpsUrl } from "../src/server";

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

describe("redirect http → https", () => {
  test("redirecționează http-ul apex către https, păstrând path-ul și query-ul", () => {
    expect(
      redirectToHttpsUrl(
        "http://nodbim.com/revit-mep?utm_source=google&a=1",
        "nodbim.com",
        "nodbim.com",
      ),
    ).toBe("https://nodbim.com/revit-mep?utm_source=google&a=1");
  });

  test("https-ul nu este redirecționat", () => {
    expect(redirectToHttpsUrl("https://nodbim.com/", "nodbim.com", "nodbim.com")).toBeUndefined();
  });

  test("host-ul www este lăsat în seama redirect-ului www→apex", () => {
    expect(
      redirectToHttpsUrl("http://www.nodbim.com/", "www.nodbim.com", "nodbim.com"),
    ).toBeUndefined();
  });

  test("dev-ul local (localhost) nu este atins", () => {
    expect(
      redirectToHttpsUrl("http://localhost:5173/", "localhost:5173", "nodbim.com"),
    ).toBeUndefined();
  });

  test("host-uri străine nu sunt redirecționate", () => {
    expect(redirectToHttpsUrl("http://evil.com/", "evil.com", "nodbim.com")).toBeUndefined();
  });

  test("host-ul canonical este detectat case-insensitive", () => {
    expect(redirectToHttpsUrl("http://NODBIM.com/", "NODBIM.COM", "nodbim.com")).toBe(
      "https://nodbim.com/",
    );
  });
});
