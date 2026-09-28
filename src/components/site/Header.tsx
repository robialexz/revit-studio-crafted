import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site-config";
import { alternatePath, enHomePath, localeForPath, type Locale } from "@/lib/i18n";

const nav: Record<Locale, { label: string; href: string }[]> = {
  ro: [
    { label: "Revit MEP", href: "/revit-mep" },
    { label: "AutoCAD / DWG", href: "/autocad-dwg" },
    { label: "Portofoliu", href: "/portofoliu" },
    { label: "Jurnal", href: "/blog" },
    { label: "Despre", href: "/despre" },
    { label: "Prețuri", href: "/#preturi" },
    { label: "FAQ", href: "/#faq" },
  ],
  en: [
    { label: "Revit MEP outsourcing", href: enHomePath },
    { label: "How it works", href: `${enHomePath}#process` },
    { label: "FAQ", href: `${enHomePath}#faq` },
  ],
};

const copy = {
  ro: {
    home: "/",
    tagline: site.tagline,
    cta: "Solicită o estimare",
    ctaHref: "/#estimare",
    open: "Deschide meniul",
    close: "Închide meniul",
    mainNav: "Navigație principală",
    mobileNav: "Navigație mobilă",
    language: "Limba site-ului",
  },
  en: {
    home: enHomePath,
    tagline: "BIM · REVIT MEP · CAD PRODUCTION",
    cta: "Discuss your project",
    ctaHref: `${enHomePath}#estimate`,
    open: "Open menu",
    close: "Close menu",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    language: "Site language",
  },
} as const;

/** Comutator discret RO / EN către pagina echivalentă (sau intrarea în limba respectivă). */
function LanguageSwitcher({ pathname, locale }: { pathname: string; locale: Locale }) {
  return (
    <div className="tech-label flex items-center gap-1.5" aria-label={copy[locale].language}>
      {(["ro", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-muted-foreground">/</span>}
          {l === locale ? (
            <span aria-current="true" className="text-foreground">
              {l.toUpperCase()}
            </span>
          ) : (
            <a
              href={alternatePath(pathname, l)}
              hrefLang={l}
              lang={l}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}

export function Header() {
  const pathname = useRouterState({ select: (st) => st.location.pathname });
  const locale = localeForPath(pathname);
  const t = copy[locale];
  const items = nav[locale];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/92 backdrop-blur-sm transition-colors ${
        scrolled ? "border-border-strong" : "border-border"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 md:px-8">
        <a href={t.home} className="group flex items-center gap-3">
          <img
            src="/branding/nod-bim-mark.png"
            alt="NOD BIM"
            className="h-9 w-9 shrink-0 object-contain md:h-10 md:w-10"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold uppercase tracking-tight md:text-2xl">
              {site.businessName}
            </span>
            <span className="tech-label mt-1 text-muted-foreground text-[0.58rem] md:text-[0.65rem]">
              {t.tagline}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label={t.mainNav}>
          {items.map((item) =>
            item.href.includes("#") ? (
              <a
                key={item.label}
                href={item.href}
                className="tech-label text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="tech-label text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ),
          )}
          <LanguageSwitcher pathname={pathname} locale={locale} />
          <a
            href={t.ctaHref}
            className="tech-label border border-foreground bg-foreground px-4 py-2.5 text-background transition-colors hover:bg-primary hover:border-primary"
          >
            {t.cta}
          </a>
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher pathname={pathname} locale={locale} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-border-strong lg:hidden"
            aria-expanded={open}
            aria-label={open ? t.close : t.open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-sheet px-5 py-4 lg:hidden"
          aria-label={t.mobileNav}
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.label} className="border-b border-border last:border-0">
                {item.href.includes("#") ? (
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="tech-label block py-4"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="tech-label block py-4"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <a
            href={t.ctaHref}
            onClick={() => setOpen(false)}
            className="tech-label mt-4 block bg-foreground px-4 py-4 text-center text-background"
          >
            {t.cta}
          </a>
        </nav>
      )}
    </header>
  );
}
