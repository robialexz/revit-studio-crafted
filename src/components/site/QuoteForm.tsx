import { useState } from "react";
import { whatsappLink } from "@/lib/site-config";

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

export function QuoteForm() {
  const [tip, setTip] = useState("Revit MEP");
  const [files, setFiles] = useState<string[]>(["DWG"]);
  const [planse, setPlanse] = useState("");
  const [termen, setTermen] = useState("");
  const [detalii, setDetalii] = useState("");

  const toggleFile = (f: string) =>
    setFiles((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const message = [
    `Salut! Aș avea nevoie de ajutor pentru un proiect Revit MEP.`,
    ``,
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

  return (
    <form
      className="sheet-frame p-5 md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappLink(message), "_blank", "noopener");
      }}
    >
      <fieldset className="border-0 p-0">
        <legend className="tech-label text-muted-foreground">01 — Tip proiect</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {tipuri.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTip(t)}
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
        <legend className="tech-label text-muted-foreground">02 — Fișiere disponibile</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {fisiere.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => toggleFile(f)}
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
            03 — Nr. aproximativ de planșe
          </label>
          <input
            id="planse"
            value={planse}
            onChange={(e) => setPlanse(e.target.value)}
            placeholder="ex: 5"
            className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="termen" className="tech-label text-muted-foreground">
            04 — Termen
          </label>
          <input
            id="termen"
            value={termen}
            onChange={(e) => setTermen(e.target.value)}
            placeholder="ex: 20 august"
            className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="detalii" className="tech-label text-muted-foreground">
          05 — Descriere scurtă
        </label>
        <textarea
          id="detalii"
          rows={4}
          value={detalii}
          onChange={(e) => setDetalii(e.target.value)}
          placeholder="Ce trebuie modelat / desenat, discipline, nivel de detaliu."
          className="mt-2 w-full resize-y border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="tech-label mt-7 w-full border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:border-primary hover:bg-primary"
      >
        Continuă pe WhatsApp
      </button>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Datele completate generează un mesaj pre-scris în WhatsApp. Fișierele le poți atașa direct
        în conversație.
      </p>
    </form>
  );
}
