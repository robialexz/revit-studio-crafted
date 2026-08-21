const items = [
  "Revit MEP",
  "BIM 3D",
  "HVAC",
  "Termice",
  "Electrice",
  "AutoCAD",
  "Navisworks",
  "RVT",
  "DWG",
  "PDF",
];

/**
 * Ticker/marquee infinit cu tehnologiile folosite. Derulează continuu,
 * cu pauză la hover; `prefers-reduced-motion` îl oprește automat
 * (regula globală din styles.css).
 */
export function Ticker() {
  return (
    <section
      aria-label="Capabilități"
      className="overflow-hidden border-b border-border-strong bg-sheet"
    >
      <div className="ticker-track flex w-max items-center gap-8 px-5 py-4 hover:[animation-play-state:paused] md:px-8">
        {[0, 1].map((half) => (
          <div key={half} aria-hidden={half === 1} className="flex items-center gap-8">
            {items.map((c) => (
              <span key={c} className="tech-label flex items-center gap-8 text-foreground/75">
                {c}
                <span className="h-3 w-px bg-border-strong" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
