import { enHomePath, useLocale } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";

const copy = {
  ro: {
    home: { label: "Acasă", href: "/" },
    updated: "Actualizat",
    navTitle: "Navigare",
    nav: [
      { label: "Contact", href: "/contact" },
      { label: "Politica de confidențialitate", href: "/politica-de-confidentialitate" },
      { label: "Politica de cookies", href: "/politica-cookies" },
      { label: "Termeni și condiții", href: "/termeni-si-conditii" },
      { label: "Informații legale", href: "/informatii-legale" },
    ],
  },
  en: {
    home: { label: "Revit MEP outsourcing", href: enHomePath },
    updated: "Last updated",
    navTitle: "Navigation",
    nav: [
      { label: "Contact", href: `${enHomePath}#estimate` },
      { label: "Privacy policy", href: "/en/privacy" },
      { label: "Cookie policy", href: "/en/cookies" },
      { label: "Legal information (Romanian)", href: "/informatii-legale" },
    ],
  },
};

export function LegalPage({
  label,
  h1,
  intro,
  sections,
  updatedAt,
}: {
  label: string;
  h1: string;
  intro?: string;
  sections: { title: string; body: string[] }[];
  updatedAt: string;
}) {
  const t = copy[useLocale()];
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="continut">
        <section className="border-b border-border-strong">
          <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-20">
            <div>
              <nav aria-label="Breadcrumb" className="tech-label text-muted-foreground">
                <a href={t.home.href} className="hover:text-primary">
                  {t.home.label}
                </a>
                <span className="px-2">/</span>
                <span className="text-foreground">{label}</span>
              </nav>
              <h1 className="display-xl mt-8 max-w-4xl text-[2.4rem] sm:text-[3.2rem] lg:text-[4rem]">
                {h1}
              </h1>
              {intro && (
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                  {intro}
                </p>
              )}
              <p className="tech-label mt-8 text-muted-foreground">
                {t.updated}: {updatedAt}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
          <Reveal className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="border-b border-border-strong py-8 first:pt-0"
                >
                  <h2 className="text-2xl md:text-3xl">{section.title}</h2>
                  {section.body.map((paragraph, index) => (
                    <p
                      key={index}
                      className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/80 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>

            <aside className="lg:col-span-4">
              <div className="sheet-frame p-6 md:p-8 lg:sticky lg:top-24">
                <p className="tech-label text-muted-foreground">{t.navTitle}</p>
                <ul className="mt-5 space-y-3 text-sm">
                  {t.nav.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="hover:text-primary">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </section>
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
