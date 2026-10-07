import { Mail, Phone } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  site,
  disclaimer,
  whatsappLink,
  defaultWhatsappMessage,
  defaultWhatsappMessageEn,
  quoteContextForPath,
  hasWhatsapp,
  hasEmail,
  phoneHref,
} from "@/lib/site-config";
import { alternatePath, enHomePath, useLocale } from "@/lib/i18n";
import { PhoneLink } from "@/components/site/PhoneLink";

/** Iconița oficială WhatsApp (SVG inline, fără dependențe externe). */
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const copy = {
  ro: {
    tagline: site.tagline,
    description:
      "Desenare tehnică în AutoCAD și Revit: planuri redesenate, PDF în DWG și planșe de instalații.",
    nav: "Navigație footer",
    servicesTitle: "Servicii",
    services: [
      { label: "Desenare AutoCAD", href: "/autocad-dwg" },
      { label: "PDF în DWG", href: "/pdf-in-dwg" },
      { label: "Revit MEP și instalații", href: "/revit-mep" },
      { label: "Modelare Revit", href: "/modelare-revit" },
      { label: "HVAC", href: "/hvac" },
      { label: "Instalații termice", href: "/instalatii-termice" },
      { label: "Instalații electrice", href: "/instalatii-electrice" },
    ],
    siteTitle: "Site",
    site: [
      { label: "Lucrări", href: "/portofoliu" },
      { label: "Jurnal tehnic", href: "/blog" },
      { label: "Magazin", href: "/magazin" },
      { label: "Despre", href: "/despre" },
      { label: "Contact", href: "/contact" },
      { label: "Întrebări frecvente", href: "/#faq" },
    ],
    language: { label: "English", lang: "en" as const },
    legal: [
      { label: "Politica de confidențialitate", href: "/politica-de-confidentialitate" },
      { label: "Politica de cookies", href: "/politica-cookies" },
      { label: "Termeni și condiții", href: "/termeni-si-conditii" },
      { label: "Informații legale", href: "/informatii-legale" },
    ],
    cookies: "Preferințe cookies",
    whatsapp: defaultWhatsappMessage,
    disclaimer,
  },
  en: {
    tagline: "BIM · REVIT MEP · CAD PRODUCTION",
    description:
      "Revit MEP outsourcing and BIM production support for engineering teams: models, drawings and documentation delivered as RVT, DWG and PDF.",
    nav: "Footer navigation",
    servicesTitle: "",
    services: [],
    siteTitle: "Site",
    language: { label: "Română", lang: "ro" as const },
    site: [
      { label: "Revit MEP outsourcing", href: enHomePath },
      { label: "AutoCAD drafting", href: "/en/autocad-drafting" },
      { label: "About", href: "/en/about" },
      { label: "Contact", href: `${enHomePath}#estimate` },
    ],
    legal: [
      { label: "Privacy policy", href: "/en/privacy" },
      { label: "Cookie policy", href: "/en/cookies" },
      { label: "Legal information (Romanian)", href: "/informatii-legale" },
    ],
    cookies: "Cookie preferences",
    whatsapp: defaultWhatsappMessageEn,
    disclaimer:
      "Services cover BIM modelling, drafting and documentation. Engineering design, calculations, checking and sign-off remain with the client's responsible engineer.",
  },
};

export function Footer() {
  const t = copy[useLocale()];
  const pathname = useRouterState({ select: (st) => st.location.pathname });
  const message = quoteContextForPath(pathname)?.whatsappMessage ?? t.whatsapp;
  return (
    <footer className="border-t border-border-strong bg-graphite pb-[calc(3.5rem+env(safe-area-inset-bottom))] text-graphite-foreground lg:pb-0">
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {site.businessName}
            </p>
            <p className="tech-label mt-3 text-graphite-foreground/60">{t.tagline}</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-graphite-foreground/70">
              {t.description}
            </p>
          </div>

          <nav className="md:col-span-5" aria-label={t.nav}>
            <div className={`grid grid-cols-2 gap-8 ${t.services.length ? "sm:grid-cols-3" : ""}`}>
              {t.services.length > 0 && (
                <div>
                  <p className="tech-label text-graphite-foreground/60">{t.servicesTitle}</p>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {t.services.map((l) => (
                      <li key={l.href}>
                        <Link to={l.href} className="hover:underline">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="tech-label text-graphite-foreground/60">{t.siteTitle}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {t.site.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={alternatePath(pathname, t.language.lang)}
                      hrefLang={t.language.lang}
                      lang={t.language.lang}
                      className="hover:underline"
                    >
                      {t.language.label}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="tech-label text-graphite-foreground/60">Legal</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {t.legal.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new Event("nod:open-consent"))}
                      className="hover:underline"
                    >
                      {t.cookies}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {(phoneHref || hasWhatsapp || hasEmail) && (
            <div className="md:col-span-3">
              <p className="tech-label text-graphite-foreground/60">Contact</p>
              <ul className="mt-4 space-y-3 text-sm">
                {phoneHref && (
                  <li className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-graphite-foreground/25">
                      <Phone size={16} aria-hidden="true" />
                    </span>
                    <PhoneLink source="footer" className="hover:underline" />
                  </li>
                )}
                {hasWhatsapp && (
                  <li>
                    <a
                      href={whatsappLink(message)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-graphite-foreground/25">
                        <WhatsAppIcon />
                      </span>
                      <span className="group-hover:underline">WhatsApp</span>
                    </a>
                  </li>
                )}
                {hasEmail && (
                  <li>
                    <a href={`mailto:${site.email}`} className="group flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-graphite-foreground/25">
                        <Mail size={16} />
                      </span>
                      <span className="group-hover:underline">{site.email}</span>
                    </a>
                  </li>
                )}
              </ul>
              <p className="mt-8 max-w-sm text-xs leading-relaxed text-graphite-foreground/55">
                {t.disclaimer}
              </p>
            </div>
          )}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-graphite-foreground/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="tech-label text-graphite-foreground/60">
            © {new Date().getFullYear()} {site.businessName}
          </p>
          <p className="tech-label text-graphite-foreground/60">RVT · DWG · PDF</p>
        </div>
      </div>
    </footer>
  );
}
