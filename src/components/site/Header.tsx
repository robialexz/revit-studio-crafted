import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site-config";

const nav = [
  { label: "Servicii", href: "/#servicii" },
  { label: "Portofoliu", href: "/portofoliu" },
  { label: "Proces", href: "/#proces" },
  { label: "Prețuri", href: "/#preturi" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/92 backdrop-blur-sm transition-colors ${
        scrolled ? "border-border-strong" : "border-border"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 md:px-8">
        <Link to="/" className="group flex flex-col leading-none" aria-label="Acasă">
          <span className="font-display text-xl font-semibold uppercase tracking-tight md:text-2xl">
            {site.businessName}
          </span>
          <span className="tech-label mt-1 text-muted-foreground text-[0.58rem] md:text-[0.65rem]">
            {site.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigație principală">
          {nav.map((item) =>
            item.href.startsWith("/#") ? (
              <a
                key={item.label}
                href={item.href}
                className="tech-label text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="tech-label text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ),
          )}
          <a
            href="/#estimare"
            className="tech-label border border-foreground bg-foreground px-4 py-2.5 text-background transition-colors hover:bg-primary hover:border-primary"
          >
            Solicită o estimare
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-border-strong lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-sheet px-5 py-4 lg:hidden"
          aria-label="Navigație mobilă"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.label} className="border-b border-border last:border-0">
                {item.href.startsWith("/#") ? (
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="tech-label block py-4"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="tech-label block py-4"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <a
            href="/#estimare"
            onClick={() => setOpen(false)}
            className="tech-label mt-4 block bg-foreground px-4 py-4 text-center text-background"
          >
            Solicită o estimare
          </a>
        </nav>
      )}
    </header>
  );
}
