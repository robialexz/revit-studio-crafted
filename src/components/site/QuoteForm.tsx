import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { hasWhatsapp, whatsappLink } from "@/lib/site-config";
import { getAttribution } from "@/lib/attribution";
import { track, trackOnce, trackConversion } from "@/lib/analytics";
import { submitLead } from "@/lib/leads.functions";

const tipuri = [
  "Revit MEP",
  "HVAC",
  "Termice",
  "Electrice",
  "AutoCAD / DWG",
  "Corectare proiect existent",
  "Proiect academic",
  "Altul",
];

const fisiere = ["RVT", "DWG", "PDF", "Schițe / imagini", "Nu există încă fișiere"];

type Errors = Partial<Record<"name" | "phone" | "email" | "form", string>>;

export function QuoteForm() {
  const send = useServerFn(submitLead);
  const honeypotRef = useRef<HTMLInputElement>(null);
  // Token de idempotență: generat la prima încercare de trimitere, refolosit
  // la retry-uri ale aceleiași trimiteri (dublu-click / rețea), regenerat
  // după succes sau după ce utilizatorul editează conținutul unei trimiteri
  // eșuate (anchetă nouă => lead nou).
  const submissionIdRef = useRef<string | undefined>(undefined);
  const attemptedRef = useRef(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tip, setTip] = useState("Revit MEP");
  const [files, setFiles] = useState<string[]>(["DWG"]);
  const [planse, setPlanse] = useState("");
  const [termen, setTermen] = useState("");
  const [detalii, setDetalii] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const submittedRef = useRef(false);

  const toggleFile = (f: string) =>
    setFiles((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  /** Orice editare după o încercare eșuată = anchetă nouă, token nou. */
  const changed = () => {
    trackOnce("quote_start");
    if (attemptedRef.current && !submittedRef.current) {
      submissionIdRef.current = undefined;
    }
  };

  function makeSubmissionId(): string {
    if (!submissionIdRef.current) {
      if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        submissionIdRef.current = crypto.randomUUID();
      } else {
        submissionIdRef.current = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }
    }
    return submissionIdRef.current;
  }

  const message = [
    `Salut! Aș avea nevoie de ajutor pentru un proiect Revit MEP.`,
    ``,
    `Nume: ${name || "—"}`,
    `Telefon: ${phone || "—"}`,
    ...(email ? [`Email: ${email}`] : []),
    `Tip proiect: ${tip}`,
    `Fișiere disponibile: ${files.length ? files.join(" + ") : "—"}`,
    `Număr aproximativ de planșe: ${planse || "—"}`,
    `Termen: ${termen || "—"}`,
    ``,
    `Detalii:`,
    detalii || "—",
    ``,
    `Pot să îți trimit fișierele pentru o estimare?`,
  ].join("\n");

  function validate(): boolean {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Completează numele.";
    const cleanedPhone = phone.replace(/[\s().-]/g, "");
    if (!/^\+?\d{6,15}$/.test(cleanedPhone)) next.phone = "Completează un număr de telefon valid.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Adresa de email nu pare validă.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || submittedRef.current) return;
    // Honeypot: bot-ii completează câmpul ascuns. Pretindem succes fără a trimite.
    if (honeypotRef.current?.value) {
      submittedRef.current = true;
      setSent(true);
      return;
    }
    if (!validate()) return;

    attemptedRef.current = true;
    setSubmitting(true);
    setErrors({});
    try {
      const attribution = getAttribution();
      const submissionId = makeSubmissionId();
      await send({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          project_type: tip,
          available_files: files,
          approximate_sheet_count: planse.trim(),
          deadline: termen.trim(),
          description: detalii.trim(),
          ...attribution,
          website: honeypotRef.current?.value ?? "",
          submission_id: submissionId,
        },
      });
      submittedRef.current = true;
      submissionIdRef.current = undefined;
      setSent(true);
      track("quote_submit", { project_type: tip });
      // Conversia principală se trage DOAR după ce serverul a confirmat
      // salvarea lead-ului (nu la click pe buton).
      trackConversion("lead_form_success", { project_type: tip }, { dedupeKey: submissionId });
    } catch (error) {
      // Tokenul rămâne neschimbat: un retry al aceleiași trimiteri este
      // idempotent pe server (nu creează un al doilea rând).
      console.error(error);
      setErrors({
        form: hasWhatsapp
          ? "Trimiterea a eșuat. Reîncearcă sau scrie-mi direct pe WhatsApp."
          : "Trimiterea a eșuat. Reîncearcă.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="sheet-frame p-5 md:p-8" role="status" aria-live="polite">
        <p className="tech-label text-mep">Confirmare</p>
        <h3 className="mt-4 text-3xl uppercase md:text-4xl">Cererea a fost trimisă.</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Am primit informațiile proiectului.
          {hasWhatsapp
            ? " Pentru un răspuns mai rapid, poți continua conversația direct pe WhatsApp."
            : ""}
        </p>
        {hasWhatsapp && (
          <>
            <a
              href={whatsappLink(message) || undefined}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => {
                track("whatsapp_click", { source: "quote_success" });
                trackConversion("whatsapp_click", { source: "quote_success" });
              }}
              className="tech-label mt-8 inline-block border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary"
            >
              Continuă pe WhatsApp
            </a>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Mesajul conține deja detaliile completate. Fișierele le poți atașa direct în
              conversație.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <form className="sheet-frame p-5 md:p-8" onSubmit={onSubmit} noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="border-0 p-0">
        <legend className="tech-label text-muted-foreground">01 — Date de contact</legend>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-name" className="tech-label text-muted-foreground">
              Nume *
            </label>
            <input
              id="lead-name"
              value={name}
              onChange={(e) => {
                changed();
                setName(e.target.value);
              }}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
            />
            {errors.name && (
              <p id="lead-name-error" className="mt-1 text-xs text-destructive">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lead-phone" className="tech-label text-muted-foreground">
              Telefon / WhatsApp *
            </label>
            <input
              id="lead-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => {
                changed();
                setPhone(e.target.value);
              }}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "lead-phone-error" : undefined}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
            />
            {errors.phone && (
              <p id="lead-phone-error" className="mt-1 text-xs text-destructive">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="lead-email" className="tech-label text-muted-foreground">
              Email (opțional)
            </label>
            <input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => {
                changed();
                setEmail(e.target.value);
              }}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "lead-email-error" : undefined}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
            />
            {errors.email && (
              <p id="lead-email-error" className="mt-1 text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="tech-label text-muted-foreground">02 — Tip proiect</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {tipuri.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                changed();
                setTip(t);
              }}
              aria-pressed={tip === t}
              className={`tech-label border px-3 py-2 transition-colors ${
                tip === t
                  ? "border-foreground bg-foreground text-background"
                  : "border-input hover:border-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="tech-label text-muted-foreground">03 — Fișiere disponibile</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {fisiere.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                changed();
                toggleFile(f);
              }}
              aria-pressed={files.includes(f)}
              className={`tech-label border px-3 py-2 transition-colors ${
                files.includes(f)
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-input hover:border-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="planse" className="tech-label text-muted-foreground">
            04 — Nr. aproximativ de planșe
          </label>
          <input
            id="planse"
            value={planse}
            onChange={(e) => {
              changed();
              setPlanse(e.target.value);
            }}
            placeholder="ex: 5"
            className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="termen" className="tech-label text-muted-foreground">
            05 — Termen
          </label>
          <input
            id="termen"
            value={termen}
            onChange={(e) => {
              changed();
              setTermen(e.target.value);
            }}
            placeholder="ex: 20 august"
            className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="detalii" className="tech-label text-muted-foreground">
          06 — Descriere scurtă
        </label>
        <textarea
          id="detalii"
          rows={4}
          value={detalii}
          onChange={(e) => {
            changed();
            setDetalii(e.target.value);
          }}
          placeholder="Ce trebuie modelat / desenat, discipline, nivel de detaliu."
          className="mt-2 w-full resize-y border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      {errors.form && (
        <p
          className="mt-5 border border-destructive px-3 py-3 text-sm text-destructive"
          role="alert"
        >
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="tech-label mt-7 w-full border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Se trimite…" : "Trimite cererea"}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Cererea ajunge direct la mine. După trimitere poți continua conversația pe WhatsApp, cu
        detaliile deja completate.
      </p>
      <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        Prin trimiterea cererii, datele sunt prelucrate pentru a răspunde solicitării tale. Detalii
        în{" "}
        <a
          href="/politica-de-confidentialitate"
          className="underline underline-offset-4 hover:text-primary"
        >
          Politica de confidențialitate
        </a>
        .
      </p>
    </form>
  );
}
