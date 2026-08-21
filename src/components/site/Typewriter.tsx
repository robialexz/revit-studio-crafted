import { useEffect, useState } from "react";

const TYPING_MS = 70;
const DELETING_MS = 40;
const HOLD_MS = 1700;

/**
 * Efect de typing în stil terminal: tastează și șterge cuvintele ciclic,
 * cu cursor bloc care clipește. Cu `prefers-reduced-motion`, afișează
 * static primul cuvânt, fără animație.
 */
export function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0] ?? "");
      return;
    }

    const word = words[wordIndex] ?? "";
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setDeleting(true);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (!next) {
            setDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        }
      },
      !deleting && text === word ? HOLD_MS : deleting ? DELETING_MS : TYPING_MS,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="inline-flex items-baseline" aria-hidden="true">
      <span>{text}</span>
      <span className="blink ml-1 inline-block h-[0.85em] w-[2px] translate-y-[2px] bg-primary" />
    </span>
  );
}
