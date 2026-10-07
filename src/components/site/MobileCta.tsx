import {
  hasWhatsapp,
  phoneHref,
  whatsappLink,
  defaultWhatsappMessage,
  defaultWhatsappMessageEn,
} from "@/lib/site-config";
import { useLocale } from "@/lib/i18n";
import { trackConversion } from "@/lib/analytics";
import { PhoneLink } from "@/components/site/PhoneLink";

const buttonClass =
  "flex h-full flex-1 items-center justify-center whitespace-nowrap text-base font-medium";

/** Bara fixă de jos pe mobil: Sună și WhatsApp; cu un singur canal, acela ocupă tot rândul. */
export function MobileCta() {
  const en = useLocale() === "en";
  if (!phoneHref && !hasWhatsapp) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border-strong bg-background pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex h-14">
        <PhoneLink
          source="mobile_cta"
          className={`${buttonClass} bg-primary text-primary-foreground`}
        >
          {en ? "Call" : "Sună"}
        </PhoneLink>
        {hasWhatsapp && (
          <a
            href={whatsappLink(en ? defaultWhatsappMessageEn : defaultWhatsappMessage)}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => trackConversion("whatsapp_click", { source: "mobile_cta" })}
            className={buttonClass}
          >
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
