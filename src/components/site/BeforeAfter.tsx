import { useState } from "react";

/**
 * Comparație scanare / desen redesenat. Dedesubt stă scanarea, deasupra
 * desenul curat, decupat de la poziția glisorului spre dreapta.
 */
export function BeforeAfter({
  clean,
  scan,
  scanSrcSet,
  alt,
  note,
}: {
  clean: string;
  scan: string;
  /** Variante mai mici ale scanării, pentru ecrane înguste. */
  scanSrcSet?: string;
  alt: string;
  note: string;
}) {
  // Procentul din lățime ocupat de scanare.
  const [pos, setPos] = useState(50);

  return (
    <figure className="min-w-0">
      <div className="flex justify-between gap-4" aria-hidden="true">
        <span className="tech-label text-muted-foreground">Plan scanat</span>
        <span className="tech-label text-muted-foreground">Plan redesenat</span>
      </div>
      <div className="relative mt-3 overflow-hidden border border-border-strong bg-sheet outline-offset-2 outline-primary has-[input:focus-visible]:outline-2">
        <img
          src={scan}
          {...(scanSrcSet
            ? { srcSet: scanSrcSet, sizes: "(min-width: 1024px) 720px, calc(100vw - 40px)" }
            : {})}
          alt={alt}
          width={960}
          height={600}
          loading="lazy"
          className="block h-auto w-full"
        />
        <img
          src={clean}
          alt=""
          width={960}
          height={600}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-primary"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-sheet text-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compară scanarea cu desenul redesenat"
          aria-valuetext={`${pos}% scanare, ${100 - pos}% desen redesenat`}
          className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Stânga: plan scanat, înclinat și neclar. Dreapta: același plan redesenat, cu linii curate.{" "}
        {note}
      </figcaption>
    </figure>
  );
}
