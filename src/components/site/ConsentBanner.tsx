import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { clearConsent, readConsent, writeConsent, pushConsentUpdate } from "@/lib/consent";
import { useLocale } from "@/lib/i18n";

const copy = {
  ro: {
    label: "Consimțământ cookies",
    text: "Site-ul folosește cookies doar pentru funcționare și, cu acordul tău, pentru statistici anonime și măsurarea reclamelor. Detalii în",
    policy: "Politica de cookies",
    policyHref: "/politica-cookies",
    necessary: "Doar necesare",
    all: "Accept toate",
  },
  en: {
    label: "Cookie consent",
    text: "This site uses cookies needed for it to work and, with your consent, for anonymous statistics and ad measurement. Details in the",
    policy: "cookie policy",
    policyHref: "/en/cookies",
    necessary: "Necessary only",
    all: "Accept all",
  },
};

/**
 * Banner de consimțământ cookies (EEA), în stilul vizual al site-ului.
 * Apare doar dacă: (1) tracking-ul (GA4/Ads) este configurat și
 * (2) vizitatorul nu a ales încă. „Preferințe cookies" din footer
 * îl redeschide prin evenimentul personalizat "nod:open-consent".
 */
export function ConsentBanner() {
  const t = copy[useLocale()];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!site.gaMeasurementId && !site.adsConversionId) return;

    const onOpen = () => {
      clearConsent();
      setVisible(true);
    };
    window.addEventListener("nod:open-consent", onOpen);

    if (readConsent() === null) setVisible(true);

    return () => window.removeEventListener("nod:open-consent", onOpen);
  }, []);

  if (!visible) return null;

  const choose = (choice: "all" | "necessary") => {
    writeConsent(choice);
    pushConsentUpdate(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t.label}
      className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-50 border-t border-border-strong bg-graphite text-graphite-foreground lg:bottom-0"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8">
        <p className="max-w-2xl text-xs leading-relaxed text-graphite-foreground/80">
          {t.text}{" "}
          <a href={t.policyHref} className="underline underline-offset-4 hover:text-primary">
            {t.policy}
          </a>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="tech-label border border-graphite-foreground/40 px-5 py-3 transition-colors hover:bg-graphite-foreground hover:text-graphite"
          >
            {t.necessary}
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="tech-label border border-primary bg-primary px-5 py-3 text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.all}
          </button>
        </div>
      </div>
    </div>
  );
}
