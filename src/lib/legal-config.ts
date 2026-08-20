/**
 * Configurare legală / de business — centralizată aici.
 * Toate câmpurile provin din env-ul de build (VITE_LEGAL_*); câmpurile
 * lipsă NU se afișează public (nu se arată niciodată placeholder-e).
 * Câmpurile necompletate trebuie raportate proprietarului ca date necesare.
 */
const publicEnv = import.meta.env ?? {};

function legalValue(name: string): string {
  const value = publicEnv[name];
  return typeof value === "string" ? value.trim() : "";
}

const placeholderPattern = /^\[[A-Z0-9_]+\]$/;

export function isLegalConfigured(value: string): boolean {
  return Boolean(value && !placeholderPattern.test(value));
}

export const legal = {
  /** Numele complet al entității (ex: „NOD BIM S.R.L."). Necompletat => neafișat. */
  legalName: legalValue("VITE_LEGAL_NAME"),
  /** Forma juridică (ex: S.R.L., P.F.A.). Necompletat => neafișat. */
  legalForm: legalValue("VITE_LEGAL_FORM"),
  /** Sediu social / adresă de corespondență. Necompletat => neafișat. */
  registeredAddress: legalValue("VITE_LEGAL_REGISTERED_ADDRESS"),
  /** Cod unic de identificare (CUI). Necompletat => neafișat. */
  cui: legalValue("VITE_LEGAL_CUI"),
  /** Nr. de înregistrare la Registrul Comerțului (ex: J40/1234/2026). */
  registrationNumber: legalValue("VITE_LEGAL_REGISTRATION_NUMBER"),
  /** Adresă de email oficială (dacă diferă de cea publică). */
  legalEmail: legalValue("VITE_LEGAL_EMAIL"),
  /** Telefon oficial, format internațional. */
  legalPhone: legalValue("VITE_LEGAL_PHONE"),
} as const;

export type LegalFieldKey = keyof typeof legal;

/** Câmpurile legale completate — pentru afișare condiționată. */
export function configuredLegalFields(): { key: LegalFieldKey; label: string; value: string }[] {
  const labels: Record<LegalFieldKey, string> = {
    legalName: "Denumire",
    legalForm: "Formă juridică",
    registeredAddress: "Sediu",
    cui: "CUI",
    registrationNumber: "Nr. înregistrare",
    legalEmail: "Email oficial",
    legalPhone: "Telefon",
  };
  return (Object.keys(legal) as LegalFieldKey[])
    .filter((key) => isLegalConfigured(legal[key]))
    .map((key) => ({ key, label: labels[key], value: legal[key] }));
}
