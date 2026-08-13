import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { clearConsent, readConsent, writeConsent, pushConsentUpdate } from "@/lib/consent";

/**
 * Banner de consimțământ cookies (EEA), în stilul vizual al site-ului.
 * Apare doar dacă: (1) tracking-ul (GA4/Ads) este configurat și
 * (2) vizitatorul nu a ales încă. „Preferințe cookies" din footer
 * îl redeschide prin evenimentul personalizat "nod:open-consent".
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!site.gaMeasurementId && !site.adsConversionId) return;
    if (readConsent() !== null) return;
    setVisible(true);

    const onOpen = () => {
      clearConsent();
      setVisible(true);
    };
    window.addEventListener("nod:open-consent", onOpen);
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
      aria-label="Consimțământ cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-strong bg-graphite text-graphite-foreground"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8">
        <p className="max-w-2xl text-xs leading-relaxed text-graphite-foreground/80">
          Folosim cookies doar pentru funcționarea site-ului și, cu acordul tău, pentru statistici
          anonime și măsurarea eficienței reclamelor. Detalii în{" "}
          <a href="/politica-cookies" className="underline underline-offset-4 hover:text-primary">
            Politica de cookies
          </a>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="tech-label border border-graphite-foreground/40 px-5 py-3 transition-colors hover:bg-graphite-foreground hover:text-graphite"
          >
            Doar necesare
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="tech-label border border-primary bg-primary px-5 py-3 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Accept toate
          </button>
        </div>
      </div>
    </div>
  );
}
