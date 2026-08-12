/**
 * Atribuire marketing — capturată o singură dată pe sesiune (prima pagină vizitată)
 * și păstrată până la trimiterea formularului. Nu se afișează vizitatorului.
 */
export type Attribution = {
  page_path: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

const KEY = "lead_attribution_v1";

const EMPTY: Attribution = {
  page_path: "",
  referrer: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

function inferSource(referrer: string): string {
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (typeof window !== "undefined" && host === window.location.hostname) return "";
    return host;
  } catch {
    return "";
  }
}

/** Se apelează o dată, din useEffect, în root. Sigur dacă e apelat de mai multe ori. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const existing = window.sessionStorage.getItem(KEY);
    const params = new URLSearchParams(window.location.search);
    const hasUtm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].some(
      (k) => params.get(k),
    );
    // Prima atribuire câștigă, exceptând o vizită nouă cu parametri UTM expliciți.
    if (existing && !hasUtm) return;

    const referrer = document.referrer || "";
    const data: Attribution = {
      page_path: window.location.pathname + window.location.search,
      referrer,
      utm_source: params.get("utm_source") || inferSource(referrer),
      utm_medium: params.get("utm_medium") || (referrer ? "referral" : "direct"),
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
    };
    window.sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage indisponibil — nu blocăm nimic */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return { ...EMPTY, page_path: window.location.pathname };
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Attribution>) };
  } catch {
    return EMPTY;
  }
}
