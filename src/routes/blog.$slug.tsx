import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileCta } from "@/components/site/MobileCta";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { canonicalUrl, site } from "@/lib/site-config";
import { getArticle, type ArticleSection } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    if (!article) return {};
    return {
      meta: [
        { title: `${article.title} · Jurnal NOD BIM` },
        { name: "description", content: article.description },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: "ro_RO" },
        { property: "og:url", content: canonicalUrl(`/blog/${article.slug}`) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.description },
      ],
      links: [{ rel: "canonical", href: canonicalUrl(`/blog/${article.slug}`) }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            inLanguage: "ro-RO",
            author: { "@type": "Organization", name: site.businessName },
            publisher: { "@type": "Organization", name: site.businessName },
            mainEntityOfPage: canonicalUrl(`/blog/${article.slug}`),
          }),
        },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="tech-label text-primary">Jurnal tehnic</p>
        <h1 className="mt-4 text-4xl uppercase">Articolul nu există</h1>
        <Link
          to="/blog"
          className="tech-label mt-8 inline-block border border-foreground bg-foreground px-6 py-4 text-background"
        >
          Înapoi la jurnal
        </Link>
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}

const fmtDate = new Intl.DateTimeFormat("ro-RO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function ArticlePage() {
  const { article } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16 lg:pb-0">
        <article className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
          <Reveal>
            <Link
              to="/blog"
              className="tech-label inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft size={14} /> Jurnal tehnic
            </Link>
            <h1 className="display-xl mt-6 text-3xl md:text-5xl">{article.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-border-strong pb-6">
              <span className="tech-label text-muted-foreground">
                {fmtDate.format(new Date(article.date))}
              </span>
              <span className="tech-label text-muted-foreground">
                {article.readingTime} min de citit
              </span>
              <span className="flex flex-wrap gap-2">
                {article.tags.map((t) => (
                  <span key={t} className="tech-label border border-border px-2 py-1">
                    {t}
                  </span>
                ))}
              </span>
            </div>
          </Reveal>

          <div className="mt-8 space-y-8">
            {article.sections.map((s, i) => (
              <Section key={i} section={s} />
            ))}
          </div>
        </article>

        <CtaSection
          title="Ai o lucrare care cere acest nivel de detaliu?"
          description="Trimite planurile și cerințele — îți spun ce presupune lucrarea, termenul și costul, înainte de începere."
          source={`blog-${article.slug}`}
        />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}

function Section({ section }: { section: ArticleSection }) {
  return (
    <section>
      {section.heading && <h2 className="text-2xl uppercase md:text-3xl">{section.heading}</h2>}
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="mt-4 text-base leading-relaxed text-foreground/85">
          {p}
        </p>
      ))}
      {section.list && (
        <ul className="mt-4 space-y-2.5">
          {section.list.map((li, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/85">
              <span className="tech-label mt-1 shrink-0 text-mep">0{i + 1}</span>
              <span>{li}</span>
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="sheet-frame mt-5 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border-strong">
                {section.table.head.map((h) => (
                  <th key={h} className="tech-label px-4 py-3 text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 align-top leading-relaxed">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.note && (
        <p className="mt-5 border-l-2 border-primary bg-accent px-4 py-3 text-sm leading-relaxed text-accent-foreground">
          {section.note}
        </p>
      )}
    </section>
  );
}
