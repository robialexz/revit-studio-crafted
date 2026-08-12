import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { whatsappLink } from "@/lib/site-config";
import { getAttribution } from "@/lib/attribution";
import { track, trackOnce } from "@/lib/analytics";
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

  const started = () => trackOnce("quote_start");

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
    if (phone.replace(/\D/g, "").length < 6) next.phone = "Completează un număr de telefon valid.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Adresa de email nu pare validă.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || submittedRef.current) return;
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});
    try {
      const attribution = getAttribution();
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
        },
      });
      submittedRef.current = true;
      setSent(true);
      track("quote_submit", { project_type: tip });
    } catch (error) {
      console.error(error);
      setErrors({
        form: "Trimiterea a eșuat. Reîncearcă sau scrie-mi direct pe WhatsApp.",
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
          Am primit informațiile proiectului. Pentru un răspuns mai rapid, poți continua
          conversația direct pe WhatsApp.
        </p>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => track("whatsapp_click", { source: "quote_success" })}
          className="tech-label mt-8 inline-block border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary"
        >
          Continuă pe WhatsApp
        </a>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Mesajul conține deja detaliile completate. Fișierele le poți atașa direct în conversație.
        </p>
      </div>
    );
  }

  return (
    <form className="sheet-frame p-5 md:p-8" onSubmit={onSubmit} noValidate>
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
                started();
                setName(e.target.value);
              }}
              aria-invalid={!!errors.name}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
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
                started();
                setPhone(e.target.value);
              }}
              aria-invalid={!!errors.phone}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
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
                started();
                setEmail(e.target.value);
              }}
              aria-invalid={!!errors.email}
              className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
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
                started();
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
                started();
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
              started();
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
              started();
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
            started();
            setDetalii(e.target.value);
          }}
          placeholder="Ce trebuie modelat / desenat, discipline, nivel de detaliu."
          className="mt-2 w-full resize-y border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      {errors.form && (
        <p className="mt-5 border border-destructive px-3 py-3 text-sm text-destructive" role="alert">
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
    </form>
  );
}
