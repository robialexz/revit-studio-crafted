import { hasWhatsapp, whatsappLink, defaultWhatsappMessage, phoneDisplay } from "@/lib/site-config";
import { trackConversion } from "@/lib/analytics";
import { PhoneLink } from "./PhoneLink";
import { Reveal } from "./Reveal";

/**
 * Secțiunea CTA finală — folosită identic pe toate paginile.
 * `source` identifică pagina pentru tracking (whatsapp_click).
 */
export function CtaSection({
  title,
  description,
  source,
}: {
  title: string;
  description: string;
  source: string;
}) {
  const waHref = whatsappLink(defaultWhatsappMessage);

  return (
    <section className="border-t border-border-strong bg-graphite text-graphite-foreground">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-24">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="display-xl text-5xl md:text-7xl">{title}</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-foreground/75">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <PhoneLink
                source="cta"
                className="tech-label border border-primary bg-primary px-6 py-4 text-primary-foreground transition-opacity hover:opacity-90"
              >
                Sună {phoneDisplay}
              </PhoneLink>
              {hasWhatsapp && (
                <a
                  href={waHref || undefined}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => {
                    trackConversion("whatsapp_click", { source });
                  }}
                  className="tech-label border border-graphite-foreground/40 px-6 py-4 transition-colors hover:bg-graphite-foreground hover:text-graphite"
                >
                  Trimite proiectul pe WhatsApp
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
