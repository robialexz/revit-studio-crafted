import { whatsappLink, defaultWhatsappMessage } from "@/lib/site-config";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border-strong bg-background/95 backdrop-blur-sm lg:hidden">
      <a
        href="/#estimare"
        className="tech-label flex-1 bg-foreground px-4 py-4 text-center text-background"
      >
        Solicită o estimare
      </a>
      <a
        href={whatsappLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noreferrer noopener"
        className="tech-label flex-1 px-4 py-4 text-center"
      >
        WhatsApp
      </a>
    </div>
  );
}
