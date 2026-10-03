import { Link } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";

const profile: [string, string][] = [
  ["Formare", "Inginer de instalații — facultatea de inginerie a instalațiilor"],
  ["Experiență profesională", "Proiectarea și coordonarea instalațiilor"],
  ["Software", "Revit MEP · AutoCAD"],
  ["Discipline", "HVAC · instalații termice · instalații electrice"],
  ["Livrabile", "RVT · DWG · PDF"],
  ["Colaborare", "Online, în română sau engleză"],
];

/**
 * Conținutul paginii „Despre” — reutilizat de /despre (canonical) și
 * /about (alias pentru agenți AI, canonical către /despre).
 * NOD BIM este un brand, nu o societate: experiența este a specialistului,
 * iar lucrările angajatorului nu apar ca lucrări NOD BIM.
 */
export function DespreContent() {
  return (
    <>
      <main className="pb-16 lg:pb-0">
        <section className="relative overflow-hidden border-b border-border-strong">
          <div className="cad-grid-lg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
            <Reveal>
              <p className="tech-label text-primary">Despre NOD BIM</p>
              <h1 className="display-xl mt-6 max-w-4xl text-[2.8rem] sm:text-6xl lg:text-7xl">
                Servicii BIM și CAD pentru birouri de proiectare
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                NOD BIM oferă modelare Revit MEP, planșe de instalații și lucrări AutoCAD / DWG,
                realizate direct de un inginer de instalații. Nu există intermediari: cine face
                estimarea este și cine lucrează pe fișierele tale.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <h2 className="text-3xl uppercase md:text-4xl">Specialistul din spatele brandului</h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                Sunt inginer, absolvent al facultății de inginerie a instalațiilor. Profesional
                lucrez în proiectarea și coordonarea instalațiilor, unde documentația exactă și
                coordonarea între discipline sunt obligatorii.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/85">
                Proiectele din activitatea profesională aparțin angajatorului și clienților săi și
                nu sunt prezentate aici ca lucrări NOD BIM. Pe site apar doar lucrări pe care am
                dreptul să le arăt.
              </p>

              <h2 className="mt-12 text-3xl uppercase md:text-4xl">Cum lucrez</h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                Revit MEP este fluxul principal; AutoCAD / DWG acolo unde lucrarea se rezolvă mai
                curat în 2D. Planurile, secțiunile și sheet-urile rezultă din același model, deci
                rămân coerente între ele. Scopul, livrabilele, termenul și prețul se stabilesc în
                scris înainte de începere.
              </p>
              <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/85">
                <li>
                  <span className="tech-label text-mep">01 · </span>
                  Prețuri orientative publice și cost fix, confirmat înainte de start.
                </li>
                <li>
                  <span className="tech-label text-mep">02 · </span>
                  Fișierele primite rămân confidențiale și nu sunt publicate fără acord scris.
                </li>
                <li>
                  <span className="tech-label text-mep">03 · </span>
                  Modelare și desenare pe tema proiectantului; soluția tehnică, verificarea și
                  semnătura rămân la profesioniștii autorizați.
                </li>
              </ul>

              <h2 className="mt-12 text-3xl uppercase md:text-4xl">Brand, nu societate</h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                NOD BIM este numele sub care ofer aceste servicii; nu este o societate comercială.
                Modalitatea de contractare și facturare se stabilește la ofertare, pentru fiecare
                lucrare. Datele de identificare vor apărea pe pagina{" "}
                <Link to="/informatii-legale" className="underline hover:text-primary">
                  Informații legale
                </Link>{" "}
                când vor exista.
              </p>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-5">
              <div className="sheet-frame p-6 md:p-8">
                <p className="tech-label text-mep">Profil</p>
                <dl className="mt-5 divide-y divide-border border-y border-border">
                  {profile.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-2 gap-4 py-3">
                      <dt className="tech-label text-muted-foreground">{k}</dt>
                      <dd className="text-sm leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  <Link to="/revit-mep" className="tech-label text-primary hover:underline">
                    Externalizare Revit MEP
                  </Link>
                  <Link to="/autocad-dwg" className="tech-label text-primary hover:underline">
                    Redesenare AutoCAD / DWG
                  </Link>
                  <Link to="/portofoliu" className="tech-label text-primary hover:underline">
                    Portofoliu
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection
          title="Trimite planurile pentru o estimare"
          description="Spune-mi disciplina, formatul fișierelor și termenul. Primești scopul lucrării, termenul și costul înainte de începere."
          source="despre"
        />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
