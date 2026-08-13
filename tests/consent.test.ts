import { describe, expect, test } from "bun:test";

import {
  CONSENT_KEY,
  clearConsent,
  consentModeBootstrapScript,
  consentStateFor,
  pushConsentUpdate,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "../src/lib/consent";

describe("consentStateFor", () => {
  test("'all' => toate categoriile granted", () => {
    expect(consentStateFor("all")).toEqual({
      adStorage: "granted",
      adUserData: "granted",
      adPersonalization: "granted",
      analyticsStorage: "granted",
    });
  });

  test("'necessary' / null => toate categoriile denied", () => {
    expect(consentStateFor("necessary")).toEqual({
      adStorage: "denied",
      adUserData: "denied",
      adPersonalization: "denied",
      analyticsStorage: "denied",
    });
    expect(consentStateFor(null)).toEqual({
      adStorage: "denied",
      adUserData: "denied",
      adPersonalization: "denied",
      analyticsStorage: "denied",
    });
  });
});

describe("consent storage", () => {
  /** localStorage minimal în memorie (bun nu expune localStorage în teste). */
  function withStorage(fn: () => void) {
    const store = new Map<string, string>();
    const saved = globalThis.localStorage;
    const polyfill = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
      removeItem: (key: string) => void store.delete(key),
    };
    // @ts-expect-error polyfill minimal pentru teste
    globalThis.localStorage = polyfill;
    try {
      fn();
    } finally {
      globalThis.localStorage = saved;
    }
  }

  test("scrie și citește alegerea", () => {
    withStorage(() => {
      writeConsent("all");
      expect(readConsent()).toBe("all");
      writeConsent("necessary");
      expect(readConsent()).toBe("necessary");
      clearConsent();
      expect(readConsent()).toBeNull();
    });
  });

  test("fără localStorage disponibil => null, fără erori", () => {
    const saved = globalThis.localStorage;
    // @ts-expect-error simulăm lipsa localStorage
    delete globalThis.localStorage;
    try {
      expect(readConsent()).toBeNull();
      expect(() => writeConsent("all" as ConsentChoice)).not.toThrow();
      expect(() => clearConsent()).not.toThrow();
    } finally {
      globalThis.localStorage = saved;
    }
  });
});

describe("consentModeBootstrapScript", () => {
  test("conține cele 4 semnale Consent Mode + wait_for_update", () => {
    const script = consentModeBootstrapScript();
    expect(script).toContain("ad_storage");
    expect(script).toContain("ad_user_data");
    expect(script).toContain("ad_personalization");
    expect(script).toContain("analytics_storage");
    expect(script).toContain("wait_for_update");
    expect(script).toContain('consent","default');
    expect(script).toContain(CONSENT_KEY);
    expect(script).toContain("function gtag(){dataLayer.push(arguments)}");
  });

  test("este un singur rând (inline sigur în <head>)", () => {
    const script = consentModeBootstrapScript();
    expect(script).not.toContain("\n");
  });
});

describe("pushConsentUpdate", () => {
  test("apelează gtag('consent','update', ...) când gtag există", () => {
    const calls: unknown[][] = [];
    const saved = globalThis.window;
    // @ts-expect-error simulăm window.gtag
    globalThis.window = { gtag: (...args: unknown[]) => calls.push(args) };
    try {
      pushConsentUpdate("all");
      expect(calls).toHaveLength(1);
      expect(calls[0]?.[0]).toBe("consent");
      expect(calls[0]?.[1]).toBe("update");
      expect(calls[0]?.[2]).toEqual(consentStateFor("all"));
    } finally {
      globalThis.window = saved;
    }
  });

  test("nu aruncă dacă window lipsește", () => {
    const saved = globalThis.window;
    // @ts-expect-error simulăm lipsa window
    delete globalThis.window;
    try {
      expect(() => pushConsentUpdate("necessary")).not.toThrow();
    } finally {
      globalThis.window = saved;
    }
  });
});
