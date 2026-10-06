import { describe, expect, test } from "bun:test";

import { buildAdsConversionPayload, track, trackConversion } from "../src/lib/analytics";
import { clearConsent, writeConsent } from "../src/lib/consent";
import { site } from "../src/lib/site-config";

describe("Google Ads conversion payload", () => {
  test("folosește send_to complet și nu include date din formular", () => {
    expect(buildAdsConversionPayload("AW-18391261797", "LVU-CLOv_-EcEOXE0cFE")).toEqual({
      send_to: "AW-18391261797/LVU-CLOv_-EcEOXE0cFE",
      value: 1.0,
      currency: "RON",
    });
  });

  test("nu construiește destinația dacă ID-ul sau eticheta lipsesc", () => {
    expect(buildAdsConversionPayload("", "label")).toBeNull();
    expect(buildAdsConversionPayload("AW-123", "")).toBeNull();
  });

  test("nu publică evenimente înainte de consimțământ", () => {
    const savedWindow = globalThis.window;
    const savedStorage = globalThis.localStorage;
    const store = new Map<string, string>();
    const dataLayer: unknown[] = [];

    // @ts-expect-error polyfill minimal pentru test
    globalThis.localStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
      removeItem: (key: string) => void store.delete(key),
    };
    // @ts-expect-error simulăm window
    globalThis.window = { dataLayer };

    try {
      track("quote_form_success");
      expect(dataLayer).toHaveLength(0);

      writeConsent("all");
      track("quote_form_success", { value: 1 });
      expect(dataLayer).toEqual([{ event: "quote_form_success", value: 1 }]);
    } finally {
      clearConsent();
      globalThis.window = savedWindow;
      globalThis.localStorage = savedStorage;
    }
  });

  test("trimite o singură conversie per submission și fără date personale", () => {
    const savedWindow = globalThis.window;
    const savedStorage = globalThis.localStorage;
    const store = new Map<string, string>();
    const calls: unknown[][] = [];
    const mutableSite = site as unknown as {
      adsConversionId: string;
      adsConversionLabel: string;
    };
    const savedId = mutableSite.adsConversionId;
    const savedLabel = mutableSite.adsConversionLabel;

    // @ts-expect-error polyfill minimal pentru test
    globalThis.localStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
      removeItem: (key: string) => void store.delete(key),
    };
    // @ts-expect-error simulăm gtag
    globalThis.window = { gtag: (...args: unknown[]) => calls.push(args) };
    mutableSite.adsConversionId = "AW-18391261797";
    mutableSite.adsConversionLabel = "LVU-CLOv_-EcEOXE0cFE";
    writeConsent("all");

    try {
      trackConversion("lead_form_success", { project_type: "HVAC" }, { dedupeKey: "test-1" });
      trackConversion("lead_form_success", { project_type: "HVAC" }, { dedupeKey: "test-1" });

      const conversionCalls = calls.filter(
        (call) => call[0] === "event" && call[1] === "conversion",
      );
      expect(conversionCalls).toHaveLength(1);
      expect(conversionCalls[0]?.[2]).toEqual({
        send_to: "AW-18391261797/LVU-CLOv_-EcEOXE0cFE",
        value: 1.0,
        currency: "RON",
      });
    } finally {
      mutableSite.adsConversionId = savedId;
      mutableSite.adsConversionLabel = savedLabel;
      clearConsent();
      globalThis.window = savedWindow;
      globalThis.localStorage = savedStorage;
    }
  });

  test("phone_click respectă consimțământul", () => {
    const savedWindow = globalThis.window;
    const savedStorage = globalThis.localStorage;
    const store = new Map<string, string>();
    const calls: unknown[][] = [];
    const dataLayer: unknown[] = [];
    const mutableSite = site as unknown as { gaMeasurementId: string };
    const savedGa = mutableSite.gaMeasurementId;

    // @ts-expect-error polyfill minimal pentru test
    globalThis.localStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
      removeItem: (key: string) => void store.delete(key),
    };
    // @ts-expect-error simulăm window
    globalThis.window = { dataLayer, gtag: (...args: unknown[]) => calls.push(args) };
    mutableSite.gaMeasurementId = "G-TEST";

    try {
      trackConversion("phone_click", { source: "header" });
      writeConsent("necessary");
      trackConversion("phone_click", { source: "header" });
      expect(dataLayer).toEqual([]);
      expect(calls).toEqual([]);

      writeConsent("all");
      trackConversion("phone_click", { source: "header" });
      expect(dataLayer).toEqual([{ event: "phone_click", source: "header" }]);
      expect(calls).toEqual([["event", "phone_click", { source: "header" }]]);
    } finally {
      mutableSite.gaMeasurementId = savedGa;
      clearConsent();
      globalThis.window = savedWindow;
      globalThis.localStorage = savedStorage;
    }
  });
});
