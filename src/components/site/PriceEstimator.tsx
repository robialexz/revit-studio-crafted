import { useId, useState } from "react";
import { hasWhatsapp, phoneHref, whatsappLink } from "@/lib/site-config";
import {
  estimateLabel,
  estimateWhatsappMessage,
  formatLei,
  jobRates,
  packagePrice,
  sheetsLabel,
  type JobType,
} from "@/lib/pricing";
import { trackConversion } from "@/lib/analytics";
import { PhoneLink } from "./PhoneLink";

const jobTypes: JobType[] = ["redesenare", "corectare", "instalatii"];

/** Tariful pe unitate: „350–800 lei / plan”, „de la 250 lei / planșă”. */
function rateLabel(type: JobType): string {
  const { min, max, unit } = jobRates[type];
  return `${max === null ? `de la ${min}` : `${min}–${max}`} lei / ${unit}`;
}

/**
 * Estimator de preț orientativ. Prețul implicit este randat pe server;
 * fără JavaScript rămân vizibile tarifele și prețul pentru o planșă.
 */
export function PriceEstimator({ defaultType = "redesenare" }: { defaultType?: JobType }) {
  const id = useId();
  const [type, setType] = useState<JobType>(defaultType);
  const [sheets, setSheets] = useState(1);
  const waHref = whatsappLink(estimateWhatsappMessage(type, sheets));

  return (
    <div>
      <form
        aria-labelledby={`${id}-titlu`}
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
        className="grid border border-border-strong bg-background lg:grid-cols-[1.2fr_1fr]"
      >
        <div className="grid min-w-0 gap-8 p-5 md:p-9">
          <fieldset className="grid min-w-0 gap-2.5">
            <legend className="mb-3 font-medium">Ce fel de lucrare ai?</legend>
            {jobTypes.map((t) => (
              <label
                key={t}
                className="grid cursor-pointer grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1 rounded-sm border border-border bg-sheet px-3.5 py-3 transition-colors has-[:checked]:border-primary has-[:checked]:shadow-[inset_0_0_0_1px_var(--primary)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary min-[480px]:grid-cols-[auto_1fr_auto]"
              >
                <input
                  type="radio"
                  name={`${id}-tip`}
                  value={t}
                  checked={type === t}
                  onChange={() => setType(t)}
                  className="translate-y-px accent-primary outline-none"
                />
                <span className="min-w-0">{jobRates[t].label}</span>
                <span className="col-start-2 whitespace-nowrap font-mono text-[0.8rem] text-muted-foreground min-[480px]:col-start-3">
                  {rateLabel(t)}
                </span>
              </label>
            ))}
          </fieldset>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={`${id}-nr`} className="font-medium">
                Câte planuri sau planșe?
              </label>
              <span className="font-display text-2xl font-semibold tabular-nums" aria-hidden="true">
                {sheets}
              </span>
            </div>
            <input
              id={`${id}-nr`}
              type="range"
              min={1}
              max={20}
              value={sheets}
              onChange={(e) => setSheets(Number(e.target.value))}
              aria-valuetext={sheetsLabel(sheets)}
              className="mt-1 min-h-11 w-full accent-primary"
            />
            <div
              className="flex justify-between font-mono text-xs text-muted-foreground"
              aria-hidden="true"
            >
              <span>1</span>
              <span>20</span>
            </div>
          </div>
        </div>

        <div className="grid min-w-0 content-center justify-items-start gap-4 bg-graphite p-5 text-graphite-foreground md:p-9">
          <p id={`${id}-titlu`} className="tech-label text-graphite-foreground/65">
            Preț orientativ
          </p>
          <output
            htmlFor={`${id}-nr`}
            className="whitespace-nowrap font-display text-[clamp(1.75rem,7vw,3rem)] font-semibold leading-none tabular-nums [font-stretch:85%]"
          >
            {estimateLabel(type, sheets)}
          </output>
          <p className="max-w-sm text-sm leading-relaxed text-graphite-foreground/70">
            {jobRates[type].note} Prețul final îl primești în scris, după ce văd fișierele.
          </p>
          {hasWhatsapp && (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                trackConversion("whatsapp_click", { source: "estimator", job_type: type });
              }}
              className="btn mt-2 border-graphite-foreground bg-graphite-foreground text-graphite hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Trimite cererea pe WhatsApp
            </a>
          )}
          {phoneHref && (
            <p className="text-sm text-graphite-foreground/70">
              sau sună la{" "}
              <PhoneLink
                source="estimator"
                className="inline-flex min-h-11 items-center font-medium text-graphite-foreground underline underline-offset-4"
              />
            </p>
          )}
          {!hasWhatsapp && !phoneHref && (
            <a
              href="#estimare"
              className="btn mt-2 border-graphite-foreground bg-graphite-foreground text-graphite hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Cere ofertă
            </a>
          )}
        </div>
      </form>

      <dl className="mt-6 grid gap-x-10 text-sm sm:grid-cols-2">
        {jobTypes.map((t) => (
          <div key={t} className="flex justify-between gap-4 border-b border-border py-3">
            <dt>{jobRates[t].label}</dt>
            <dd className="whitespace-nowrap font-mono text-[0.8rem] text-muted-foreground">
              {rateLabel(t)}
            </dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 border-b border-border py-3">
          <dt>{`Pachet ${packagePrice.sheets} planșe`}</dt>
          <dd className="whitespace-nowrap font-mono text-[0.8rem] text-muted-foreground">
            {`de la ${formatLei(packagePrice.min)} lei`}
          </dd>
        </div>
      </dl>
    </div>
  );
}
