import { Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";

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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-20">
            <nav aria-label="Breadcrumb" className="tech-label text-muted-foreground">
              <Link to="/" className="hover:text-primary">
                Acasă
              </Link>
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
            <p className="tech-label mt-8 text-muted-foreground">Actualizat: {updatedAt}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="border-b border-border-strong py-8 first:pt-0"
                >
                  <h2 className="text-2xl uppercase md:text-3xl">{section.title}</h2>
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
                <p className="tech-label text-mep">Navigare</p>
                <ul className="mt-5 space-y-3 text-sm">
                  <li>
                    <Link to="/contact" className="hover:text-primary">
                      Contact
                    </Link>
                  </li>
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
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
