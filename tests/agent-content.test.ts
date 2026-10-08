import { describe, expect, test } from "bun:test";

import {
  articleMarkdown,
  isKnownPath,
  llmsTxt,
  markdownResponseForPath,
  notFoundMarkdown,
  agentInstructionsTxt,
  agentDescriptorJson,
} from "../src/lib/agent-content";
import { articles } from "../src/lib/blog";

describe("agent-content — negotiere markdown", () => {
  test("sitemap known paths sunt recunoscute", () => {
    expect(isKnownPath("/")).toBe(true);
    expect(isKnownPath("/magazin")).toBe(true);
    expect(isKnownPath("/recomandari")).toBe(true);
    expect(isKnownPath("/despre")).toBe(true);
    expect(isKnownPath("/en/about")).toBe(true);
    expect(isKnownPath("/en/privacy")).toBe(true);
    expect(isKnownPath("/pdf-in-dwg")).toBe(true);
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

  test("articolul PDF în DWG păstrează serviciul și sursele în varianta Markdown", () => {
    const slug = "pdf-in-dwg-vectorial-scanare-scara-oferta";
    expect(isKnownPath(`/blog/${slug}`)).toBe(true);
    const md = articleMarkdown(slug);
    expect(md).toContain("[Servicii AutoCAD: redesenare PDF în DWG](/autocad-dwg)");
    expect(md).toContain("https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/");
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
    expect(txt).toContain("## When to use this");
    expect(txt).toContain("Do NOT use this site for");
    expect(txt).toContain("/sitemap.xml");
    expect(txt).toContain("Accept: text/markdown");
  });

  test("recomandările afiliate au pagină Markdown separată de magazin", async () => {
    const markdown = await markdownResponseForPath("/recomandari")?.text();
    const shop = await markdownResponseForPath("/magazin")?.text();
    expect(markdown).toContain("FreeMaint CMMS");
    expect(markdown).toContain("linkul afiliat");
    expect(markdown).toContain("?via=bsx7y7fx2v58");
    expect(shop).toContain("/recomandari");
    expect(shop).not.toContain("?via=bsx7y7fx2v58");
  });

  test("agent-instructions.txt conține ghidul când/cum să folosești site-ul", () => {
    const txt = agentInstructionsTxt();
    expect(txt).toContain("# Agent instructions");
    expect(txt).toContain("## When to use this");
    expect(txt).toContain("## How to call");
    expect(txt).toContain("Do NOT use this site for");
    expect(txt).toContain("/llms.txt");
  });

  const htmlOnly = [
    "/modelare-revit",
    "/politica-de-confidentialitate",
    "/politica-cookies",
    "/termeni-si-conditii",
    "/informatii-legale",
    "/en/privacy",
    "/en/cookies",
  ];

  test("paginile de serviciu și cele EN au variantă markdown din conținutul paginii", async () => {
    for (const path of [
      "/revit-mep",
      "/hvac",
      "/instalatii-termice",
      "/instalatii-electrice",
      "/autocad-dwg",
      "/pdf-in-dwg",
      "/en/revit-mep-outsourcing",
      "/en/autocad-drafting",
      "/en/about/",
    ]) {
      const res = markdownResponseForPath(path);
      expect(res?.status, path).toBe(200);
      expect(await res?.text(), path).toMatch(/^# \S/);
    }
    const en = await markdownResponseForPath("/en/revit-mep-outsourcing")?.text();
    expect(en).toContain("### Do you provide engineering design or calculations?");
  });

  test("afirmația despre markdown corespunde comportamentului", () => {
    for (const path of htmlOnly) {
      expect(isKnownPath(path), path).toBe(true);
      expect(markdownResponseForPath(path), path).toBeNull();
    }
    // Orice pagină legată din llms.txt servește markdown sau e numită ca excepție.
    const linked = [...llmsTxt().matchAll(/\]\(https:\/\/nodbim\.com(\/[^)#]*)\)/g)]
      .map((m) => m[1] ?? "")
      .filter((path) => path !== "/sitemap.xml");
    expect(linked).toContain("/en/autocad-drafting");
    expect(linked).toContain("/en/about");
    expect(linked).toContain("/modelare-revit");
    expect(linked).toContain("/pdf-in-dwg");
    for (const path of linked) {
      expect(markdownResponseForPath(path) !== null || htmlOnly.includes(path), path).toBe(true);
    }
    const claim = "/modelare-revit and the legal pages are HTML only.";
    expect(llmsTxt()).toContain(claim);
    expect(agentInstructionsTxt()).toContain(claim);
    expect(agentDescriptorJson()).toContain(claim);
  });

  test("poziționarea: producție BIM externalizată, fără proiectare și fără sanitare", () => {
    for (const txt of [llmsTxt(), agentInstructionsTxt(), agentDescriptorJson()]) {
      expect(txt).not.toMatch(/freelance/i);
      expect(txt).not.toContain("mechanical, electrical, plumbing");
      expect(txt).toContain("production outsourcing");
      expect(txt).toContain("sign-off stay with the client");
    }
  });

  test("agent.json descriptor descrie site-ul și capabilitățile", () => {
    const parsed = JSON.parse(agentDescriptorJson()) as {
      name?: string;
      capabilities?: { type?: string }[];
      resources?: string[];
    };
    expect(parsed.name).toBe("NOD BIM");
    expect(parsed.capabilities?.some((c) => c.type === "estimate-request")).toBe(true);
    expect(parsed.resources?.some((r) => r.includes("/llms.txt"))).toBe(true);
  });
});
