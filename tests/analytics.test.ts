import { describe, expect, test } from "bun:test";

import { buildAdsConversionPayload, trackConversion } from "../src/lib/analytics";
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
});
