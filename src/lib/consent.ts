/**
 * Consimțământ cookies — implementare ușoară pentru EEA.
 * Fără consimțământ stocat, tot tracking-ul non-esențial pornește
 * DENIED prin Google Consent Mode v2 (fără cookie-uri analytics/ads).
 * Alegerea se păstrează în localStorage; banner-ul nu apare dacă
 * tracking-ul (GA4/Ads) nu este configurat.
 */
export const CONSENT_KEY = "nod_consent_v1";

export type ConsentChoice = "all" | "necessary";

export interface ConsentState {
  adStorage: "granted" | "denied";
  adUserData: "granted" | "denied";
  adPersonalization: "granted" | "denied";
  analyticsStorage: "granted" | "denied";
}

/** Starea Consent Mode corespunzătoare unei alegeri. */
export function consentStateFor(choice: ConsentChoice | null): ConsentState {
  const value = choice === "all" ? "granted" : "denied";
  return {
    adStorage: value,
    adUserData: value,
    adPersonalization: value,
    analyticsStorage: value,
  };
}

export function readConsent(): ConsentChoice | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "all" || value === "necessary" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(CONSENT_KEY, choice);
    }
  } catch {
    /* storage indisponibil — nu blocăm nimic */
  }
}

export function clearConsent(): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(CONSENT_KEY);
    }
  } catch {
    /* ignore */
  }
}

/**
 * Script inline plasat ÎNAINTE de gtag.js: definește dataLayer + gtag()
 * și trimite starea implicită de consimțământ (Consent Mode v2).
 * Default denied + wait_for_update pentru vizitatorii fără alegere.
 */
export function consentModeBootstrapScript(): string {
  return [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments)}",
    "(function(){",
    'var c="denied",w=500;',
    `try{if(localStorage.getItem("${CONSENT_KEY}")==="all"){c="granted";w=0}}catch(e){}`,
    'gtag("consent","default",{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c,wait_for_update:w});',
    "})();",
  ].join("");
}

/** Trimite alegerea către gtag (Consent Mode update). */
export function pushConsentUpdate(choice: ConsentChoice): void {
  const state = consentStateFor(choice);
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", state);
    }
  } catch {
    /* ignore */
  }
}
