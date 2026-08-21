import { describe, expect, test } from "bun:test";

import {
  articleMarkdown,
  isKnownPath,
  llmsTxt,
  markdownResponseForPath,
  notFoundMarkdown,
} from "../src/lib/agent-content";
import { articles } from "../src/lib/blog";

describe("agent-content — negotiere markdown", () => {
  test("sitemap known paths sunt recunoscute", () => {
    expect(isKnownPath("/")).toBe(true);
    expect(isKnownPath("/magazin")).toBe(true);
    expect(isKnownPath("/despre")).toBe(true);
    expect(isKnownPath("/about")).toBe(true);
    expect(isKnownPath("/privacy")).toBe(true);
    expect(isKnownPath("/n-avem-asa-ceva")).toBe(false);
  });

  test("slug-urile de articol din blog sunt recunoscute", () => {
    expect(isKnownPath(`/blog/${articles[0]!.slug}`)).toBe(true);
    expect(isKnownPath("/blog/inexistent")).toBe(false);
  });

  test("răspunsurile markdown au tipul și Vary-ul corect", () => {
    const res = markdownResponseForPath("/");
    expect(res).not.toBeNull();
    expect(res!.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res!.headers.get("vary")).toContain("Accept");
  });

  test("acasa markdown conține titlul serviciului și linkurile principale", () => {
    const res = markdownResponseForPath("/");
    const body = res?.text ? "" : "";
    void body;
    return res!.text().then((t) => {
      expect(t).toContain("# NOD BIM");
      expect(t).toContain("/revit-mep");
      expect(t).toContain("/llms.txt");
    });
  });

  test("articolul markdown conține titlul și secțiunile", async () => {
    const article = articles[0]!;
    const md = articleMarkdown(article.slug);
    expect(md).toContain(`# ${article.title}`);
    expect(md).toContain("## ");
    expect(md).toContain("[Înapoi la jurnal]");
  });

  test("404 markdown conține sitemap și llms.txt și status 404", () => {
    const res = notFoundMarkdown("/nu-exista");
    expect(res.status).toBe(404);
    return res.text().then((t) => {
      expect(t).toContain("/sitemap.xml");
      expect(t).toContain("/llms.txt");
    });
  });

  test("llms.txt urmează spec-ul: H1, blockquote, secțiuni și secțiune Optional", () => {
    const txt = llmsTxt();
    expect(txt).toMatch(/^# NOD BIM/m);
    expect(txt).toContain("> ");
    expect(txt).toContain("## Servicii");
    expect(txt).toContain("## Optional");
    expect(txt).toContain("Când folosești acest site");
    expect(txt).toContain("/sitemap.xml");
    expect(txt).toContain("text/markdown");
  });
});
