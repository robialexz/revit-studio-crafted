import { Link } from "@tanstack/react-router";
import {
  site,
  disclaimer,
  whatsappLink,
  defaultWhatsappMessage,
  hasWhatsapp,
  hasEmail,
  formatPhoneDisplay,
} from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border-strong bg-graphite text-graphite-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
              {site.businessName}
            </p>
            <p className="tech-label mt-3 text-graphite-foreground/60">{site.tagline}</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-graphite-foreground/70">
              Modelare Revit MEP, documentație tehnică și planșe pentru instalații HVAC, termice și
              electrice.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Navigație footer">
            <p className="tech-label text-graphite-foreground/60">Site</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="/#servicii" className="hover:text-primary">
                  Servicii
                </a>
              </li>
              <li>
                <Link to="/portofoliu" className="hover:text-primary">
                  Portofoliu
                </Link>
              </li>
              <li>
                <Link to="/referinte" className="hover:text-primary">
                  Referințe
                </Link>
              </li>
              <li>
                <a href="/#proces" className="hover:text-primary">
                  Proces
                </a>
              </li>
              <li>
                <a href="/#preturi" className="hover:text-primary">
                  Prețuri
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-primary">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
            <p className="tech-label mt-8 text-graphite-foreground/60">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/politica-de-confidentialitate" className="hover:text-primary">
                  Politica de confidențialitate
                </Link>
              </li>
              <li>
                <Link to="/politica-cookies" className="hover:text-primary">
                  Politica de cookies
                </Link>
              </li>
              <li>
                <Link to="/termeni-si-conditii" className="hover:text-primary">
                  Termeni și condiții
                </Link>
              </li>
              <li>
                <Link to="/informatii-legale" className="hover:text-primary">
                  Informații legale
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("nod:open-consent"))}
                  className="hover:text-primary"
                >
                  Preferințe cookies
                </button>
              </li>
            </ul>
          </nav>

          {(hasWhatsapp || hasEmail) && (
            <div className="md:col-span-4">
              <p className="tech-label text-graphite-foreground/60">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {hasWhatsapp && (
                  <li>
                    <a
                      href={whatsappLink(defaultWhatsappMessage)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-primary"
                    >
                      WhatsApp — {formatPhoneDisplay(site.whatsappNumber)}
                    </a>
                  </li>
                )}
                {hasEmail && (
                  <li>
                    <a href={`mailto:${site.email}`} className="hover:text-primary">
                      {site.email}
                    </a>
                  </li>
                )}
              </ul>
              <p className="mt-8 max-w-sm text-xs leading-relaxed text-graphite-foreground/55">
                {disclaimer}
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
