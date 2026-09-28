import {
  hasWhatsapp,
  whatsappLink,
  defaultWhatsappMessage,
  defaultWhatsappMessageEn,
} from "@/lib/site-config";
import { useLocale } from "@/lib/i18n";
import { trackConversion } from "@/lib/analytics";

export function MobileCta({ estimateHref = "/#estimare" }: { estimateHref?: string }) {
  const en = useLocale() === "en";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border-strong bg-background/95 backdrop-blur-sm lg:hidden">
      <a
        href={estimateHref}
        className="tech-label flex-1 bg-foreground px-4 py-4 text-center text-background"
      >
        {en ? "Discuss your project" : "Solicită o estimare"}
      </a>
      {hasWhatsapp && (
        <a
          href={whatsappLink(en ? defaultWhatsappMessageEn : defaultWhatsappMessage) || undefined}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => trackConversion("whatsapp_click", { source: "mobile_cta" })}
          className="tech-label flex-1 px-4 py-4 text-center"
        >
          WhatsApp
        </a>
      )}
    </div>
  );
}
