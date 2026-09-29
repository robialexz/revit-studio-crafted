import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal } from "@/components/site/Reveal";
import { site } from "@/lib/site-config";
import { trackConversion } from "@/lib/analytics";

export function EnFaq({ faq, title }: { faq: [string, string][]; title: string }) {
  return (
    <section id="faq" className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
      <Reveal>
        <h2 className="text-3xl uppercase md:text-4xl">{title}</h2>
        <div className="mt-8 max-w-3xl">
          {faq.map(([q, a]) => (
            <details key={q} className="group border-b border-border-strong first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold uppercase tracking-tight">
                {q}
                <span
                  className="tech-label text-mep transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function EnEstimate({ mailHref, source }: { mailHref: string; source: string }) {
  return (
    <section id="estimate" className="border-t border-border-strong bg-sheet">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <Reveal className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-4xl uppercase md:text-5xl">Request a project estimate</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A short brief is enough to start: disciplines, file formats, approximate number of
              drawings and target date. You receive scope, timeline and cost within 1–2 working
              days.
            </p>
            {mailHref && (
              <div className="mt-10 border-t border-border-strong pt-6">
                <p className="tech-label text-muted-foreground">Prefer email?</p>
                <a
                  href={mailHref}
                  onClick={() => trackConversion("email_click", { source })}
                  className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-primary"
                >
                  {site.email}
                </a>
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
