import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useLocation } from "@tanstack/react-router";
import { hasWhatsapp, quoteContextForPath, whatsappLink } from "@/lib/site-config";
import { getAttribution } from "@/lib/attribution";
import { track, trackOnce, trackConversion } from "@/lib/analytics";
import { submitLead } from "@/lib/leads.functions";
import { useLocale } from "@/lib/i18n";

const copy = {
  ro: {
    types: [
      "Redesenare / PDF în DWG",
      "Corectare planșă",
      "Planșe de instalații",
      "Modelare Revit MEP",
      "Altceva",
    ],
    files: ["RVT", "DWG", "PDF", "Schițe / imagini", "Nu există încă fișiere"],
    waMessage: (tip: string, files: string) =>
      [
        "Salut! Am trimis o cerere de estimare pe nodbim.com.",
        `Tip proiect: ${tip}`,
        `Fișiere disponibile: ${files}`,
        "",
        "Pot să îți trimit fișierele aici?",
      ].join("\n"),
    errName: "Completează numele.",
    errPhone: "Numărul de telefon nu pare valid.",
    errEmail: "Completează o adresă de email validă.",
    errDetails: "Descrie pe scurt lucrarea (minim 10 caractere).",
    errFormWa: "Trimiterea a eșuat. Reîncearcă sau scrie-mi direct pe WhatsApp.",
    errForm: "Trimiterea a eșuat. Reîncearcă.",
    okLabel: "Confirmare · cerere înregistrată",
    okTitle: "Cererea a fost trimisă.",
    okText: "Am primit informațiile proiectului.",
    okWa: " Pentru un răspuns mai rapid, poți continua conversația direct pe WhatsApp.",
    okWaButton: "Continuă pe WhatsApp",
    okWaNote:
      "Cererea ta e deja salvată; pe WhatsApp poți atașa direct planurile și fișierele proiectului.",
    contact: "Date de contact",
    name: "Nume *",
    email: "Email *",
    phone: "Telefon / WhatsApp (opțional, pentru răspuns mai rapid)",
    company: "Companie / birou (opțional)",
    type: "Tip proiect",
    available: "Fișiere disponibile",
    sheets: "Nr. aproximativ de planșe",
    sheetsHint: "ex: 5",
    deadline: "Termen",
    deadlineHint: "ex: 20 august",
    details: "Descrierea lucrării *",
    detailsHint: "Ex.: plan apartament cu 2 camere, scanat; îl vreau în DWG, la scară.",
    sending: "Se trimite…",
    submit: "Trimite cererea",
    after:
      "Răspund de regulă în 1–2 zile lucrătoare. După trimitere poți continua pe WhatsApp, unde poți atașa direct fișierele.",
    privacy:
      "Prin trimiterea cererii, datele sunt prelucrate pentru a răspunde solicitării tale. Detalii în",
    privacyLink: "Politica de confidențialitate",
    privacyHref: "/politica-de-confidentialitate",
  },
  en: {
    types: [
      "Revit MEP modelling",
      "AutoCAD / PDF to DWG",
      "HVAC",
      "Heating",
      "Electrical",
      "Drawings / documentation",
      "Existing model or drawings",
      "Other",
    ],
    files: ["RVT", "DWG", "PDF", "Sketches / markups", "No files yet"],
    waMessage: (tip: string, files: string) =>
      [
        "Hello, I have sent a project request via nodbim.com.",
        `Scope: ${tip}`,
        `Available files: ${files}`,
        "",
        "Can I share the project files here?",
      ].join("\n"),
    errName: "Please enter your name.",
    errPhone: "This phone number does not look valid.",
    errEmail: "Please enter a valid email address.",
    errDetails: "Please add a short project brief (at least 10 characters).",
    errFormWa: "Sending failed. Please try again or contact me directly on WhatsApp.",
    errForm: "Sending failed. Please try again.",
    okLabel: "Confirmation · request received",
    okTitle: "Your request has been sent.",
    okText: "I have received your project details and will reply within 1–2 working days.",
    okWa: " If you prefer, you can continue on WhatsApp and share the files there.",
    okWaButton: "Continue on WhatsApp",
    okWaNote: "Your request is already saved; WhatsApp is just a faster channel for files.",
    contact: "Contact details",
    name: "Name *",
    email: "Work email *",
    phone: "Phone, with country code (optional)",
    company: "Company / engineering office (optional)",
    type: "Scope",
    available: "Available files",
    sheets: "Approx. number of drawings",
    sheetsHint: "e.g. 12",
    deadline: "Target date",
    deadlineHint: "e.g. end of March",
    details: "Project brief *",
    detailsHint:
      "Building type, disciplines, Revit version, template or BIM standards to follow, level of detail.",
    sending: "Sending…",
    submit: "Request a project estimate",
    after:
      "I reply within 1–2 working days with scope, timeline and cost. An NDA can be signed before you share files.",
    privacy: "Your details are used only to reply to this request. See the",
    privacyLink: "privacy policy",
    privacyHref: "/en/privacy",
  },
};

const fieldIds = {
  name: "lead-name",
  phone: "lead-phone",
  email: "lead-email",
  details: "detalii",
} as const;

type Errors = Partial<Record<"name" | "phone" | "email" | "details" | "form", string>>;

export function QuoteForm() {
  const t = copy[useLocale()];
  const context = quoteContextForPath(useLocation().pathname);
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
  const [company, setCompany] = useState("");
  const [selectedType, setTip] = useState<string>();
  const tip = selectedType ?? context?.projectType ?? t.types[0] ?? "";
  const [files, setFiles] = useState<string[]>(["PDF"]);
  const [planse, setPlanse] = useState("");
  const [termen, setTermen] = useState("");
  const [detalii, setDetalii] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const submittedRef = useRef(false);
  const quoteSuccessEventSentRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  // După trimitere, aducem confirmarea în vizor: formularul lung este
  // înlocuit de un panou scurt, iar fără scroll utilizatorul rămâne cu
  // viewport-ul sub mesaj (mai ales pe mobil).
  useEffect(() => {
    if (!sent) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      successRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
    });
  }, [sent]);

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

  // Doar valori din listele fixe: linkul wa.me poate ajunge în Analytics
  // (clic extern), deci fără nume, telefon, email sau text liber.
  const message = t.waMessage(tip, files.length ? files.join(" + ") : "—");

  function validate(): boolean {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = t.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = t.errEmail;
    const cleanedPhone = phone.replace(/[\s().-]/g, "");
    if (cleanedPhone && !/^\+?\d{6,15}$/.test(cleanedPhone)) next.phone = t.errPhone;
    if (detalii.trim().length < 10) next.details = t.errDetails;
    setErrors(next);
    const firstInvalid = (["name", "phone", "email", "details"] as const).find((k) => next[k]);
    if (firstInvalid) document.getElementById(fieldIds[firstInvalid])?.focus();
    return !firstInvalid;
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
    quoteSuccessEventSentRef.current = false;
    setSubmitting(true);
    setErrors({});
    try {
      const attribution = getAttribution();
      const submissionId = makeSubmissionId();
      const result = await send({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          company: company.trim(),
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
      if (result.saved && !quoteSuccessEventSentRef.current) {
        quoteSuccessEventSentRef.current = true;
        trackConversion(
          "lead_form_success",
          {
            form_name: "quote_contact",
            lead_type: "project_quote",
            value: 1,
            currency: "RON",
          },
          { dedupeKey: submissionId },
        );
      }
      setSent(true);
      track("quote_submit", { project_type: tip });
    } catch (error) {
      // Tokenul rămâne neschimbat: un retry al aceleiași trimiteri este
      // idempotent pe server (nu creează un al doilea rând).
      console.error(error);
      setErrors({
        form: hasWhatsapp ? t.errFormWa : t.errForm,
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div ref={successRef} className="sheet-frame p-5 md:p-8" role="status" aria-live="polite">
        <div className="reveal flex items-center gap-4" style={{ animationDelay: "0ms" }}>
          <svg viewBox="0 0 52 52" className="h-12 w-12 shrink-0" aria-hidden="true">
            <circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="check-circle text-primary"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 27l8 8 16-16"
              className="check-mark text-primary"
            />
          </svg>
          <p className="tech-label text-muted-foreground">{t.okLabel}</p>
        </div>
        <h3 className="reveal mt-5 text-3xl md:text-4xl" style={{ animationDelay: "120ms" }}>
          {t.okTitle}
        </h3>
        <div className="reveal" style={{ animationDelay: "220ms" }}>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.okText}
            {hasWhatsapp ? t.okWa : ""}
          </p>
          {hasWhatsapp && (
            <>
              <a
                href={whatsappLink(message) || undefined}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => {
                  trackConversion("whatsapp_click", { source: "quote_success" });
                }}
                className="tech-label mt-8 inline-block border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary"
              >
                {t.okWaButton}
              </a>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.okWaNote}</p>
            </>
          )}
        </div>
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
        <legend className="tech-label text-muted-foreground">{t.contact}</legend>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-name" className="tech-label text-muted-foreground">
              {t.name}
            </label>
            <input
              id="lead-name"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                changed();
                setName(e.target.value);
              }}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-base focus:border-primary md:text-sm"
            />
            {errors.name && (
              <p id="lead-name-error" className="mt-1 text-xs text-destructive">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lead-phone" className="tech-label text-muted-foreground">
              {t.phone}
            </label>
            <input
              id="lead-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => {
                changed();
                setPhone(e.target.value);
              }}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "lead-phone-error" : undefined}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-base focus:border-primary md:text-sm"
            />
            {errors.phone && (
              <p id="lead-phone-error" className="mt-1 text-xs text-destructive">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lead-email" className="tech-label text-muted-foreground">
              {t.email}
            </label>
            <input
              id="lead-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                changed();
                setEmail(e.target.value);
              }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "lead-email-error" : undefined}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-base focus:border-primary md:text-sm"
            />
            {errors.email && (
              <p id="lead-email-error" className="mt-1 text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lead-company" className="tech-label text-muted-foreground">
              {t.company}
            </label>
            <input
              id="lead-company"
              autoComplete="organization"
              value={company}
              onChange={(e) => {
                changed();
                setCompany(e.target.value);
              }}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-base focus:border-primary md:text-sm"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="tech-label text-muted-foreground">{t.type}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {t.types.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                changed();
                setTip(option);
              }}
              aria-pressed={tip === option}
              className={`tech-label border px-3 py-3 transition-colors ${
                tip === option
                  ? "border-foreground bg-foreground text-background"
                  : "border-input hover:border-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="tech-label text-muted-foreground">{t.available}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {t.files.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                changed();
                toggleFile(f);
              }}
              aria-pressed={files.includes(f)}
              className={`tech-label border px-3 py-3 transition-colors ${
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
            {t.sheets}
          </label>
          <input
            id="planse"
            inputMode="numeric"
            value={planse}
            onChange={(e) => {
              changed();
              setPlanse(e.target.value);
            }}
            placeholder={t.sheetsHint}
            className="mt-2 w-full border border-input bg-background px-3 py-3 text-base focus:border-primary md:text-sm"
          />
        </div>
        <div>
          <label htmlFor="termen" className="tech-label text-muted-foreground">
            {t.deadline}
          </label>
          <input
            id="termen"
            value={termen}
            onChange={(e) => {
              changed();
              setTermen(e.target.value);
            }}
            placeholder={t.deadlineHint}
            className="mt-2 w-full border border-input bg-background px-3 py-3 text-base focus:border-primary md:text-sm"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="detalii" className="tech-label text-muted-foreground">
          {t.details}
        </label>
        <textarea
          id="detalii"
          rows={4}
          value={detalii}
          onChange={(e) => {
            changed();
            setDetalii(e.target.value);
          }}
          placeholder={t.detailsHint}
          aria-invalid={!!errors.details}
          aria-describedby={errors.details ? "detalii-error" : undefined}
          className="mt-2 w-full resize-y border border-input bg-background px-3 py-3 text-base focus:border-primary md:text-sm"
        />
        {errors.details && (
          <p id="detalii-error" className="mt-1 text-xs text-destructive">
            {errors.details}
          </p>
        )}
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
        {submitting ? t.sending : t.submit}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t.after}</p>
      <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {t.privacy}{" "}
        <a href={t.privacyHref} className="underline underline-offset-4 hover:text-primary">
          {t.privacyLink}
        </a>
        .
      </p>
    </form>
  );
}
