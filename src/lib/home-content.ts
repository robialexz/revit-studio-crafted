/**
 * Conținutul paginii principale (servicii, proces, FAQ) — separat de markup
 * ca să fie ușor de editat fără a atinge componenta.
 */
import { Box, FileStack, Layers, PenLine, Ruler, Wrench, Zap, type LucideIcon } from "lucide-react";
import type { ServicePath } from "@/components/site/ServicePage";

export type ServiceItem = {
  n: string;
  icon: LucideIcon;
  title: string;
  lead: string;
  items: string[];
  featured?: boolean;
};

export const services: ServiceItem[] = [
  {
    n: "01",
    icon: Box,
    title: "Revit MEP & Modelare BIM",
    lead: "Modelare 3D și pregătirea documentației tehnice într-un workflow Revit MEP.",
    items: [
      "modelare instalații",
      "trasee MEP",
      "amplasare echipamente",
      "vederi",
      "secțiuni",
      "sheet-uri",
      "adnotări",
      "documentație 2D din model",
      "export RVT / DWG / PDF",
    ],
    featured: true,
  },
  {
    n: "02",
    icon: Layers,
    title: "Instalații HVAC",
    lead: "Planșe și modele pentru instalații de ventilare și climatizare.",
    items: [
      "tubulaturi",
      "echipamente",
      "grile",
      "anemostate",
      "ventilatoare",
      "introducere / evacuare aer",
      "secțiuni",
      "scheme",
    ],
  },
  {
    n: "03",
    icon: Wrench,
    title: "Instalații termice",
    lead: "Trasee, echipamente și planșe pentru instalații de încălzire.",
    items: [
      "conducte",
      "radiatoare",
      "centrale",
      "distribuitoare",
      "pompe",
      "încălzire în pardoseală",
      "scheme",
      "planuri și secțiuni",
    ],
  },
  {
    n: "04",
    icon: Zap,
    title: "Instalații electrice",
    lead: "Desenare și modelare tehnică pe baza temei și informațiilor de proiect furnizate.",
    items: [
      "corpuri de iluminat",
      "prize și consumatori",
      "circuite",
      "trasee",
      "tablouri",
      "simboluri",
      "legende",
      "scheme",
    ],
  },
  {
    n: "05",
    icon: PenLine,
    title: "AutoCAD / DWG",
    lead: "Serviciu complementar, pentru completări, corectări, conversii și livrare.",
    items: [
      "curățare DWG",
      "organizare layere",
      "redesenare",
      "layout / Paper Space",
      "cote și note",
      "conversii",
      "pregătire pentru print",
    ],
  },
  {
    n: "06",
    icon: FileStack,
    title: "Corectare & completare",
    lead: "Preluarea unui proiect început și ducerea documentației la formă finală.",
    items: [
      "preluare RVT / DWG existent",
      "implementarea observațiilor",
      "modificări",
      "completări",
      "reorganizare planșe",
      "refacerea documentației",
    ],
  },
  {
    n: "07",
    icon: Ruler,
    title: "Suport tehnic academic",
    lead: "Suport pentru modelare, desenare și organizarea proiectelor de facultate.",
    items: [
      "modelare Revit",
      "desenare planșe",
      "organizarea documentației",
      "scheme",
      "explicații tehnice",
      "implementarea observațiilor",
    ],
  },
];

export type ProcessStep = {
  n: string;
  title: string;
  body: string;
  meta: string;
};

export const process: ProcessStep[] = [
  {
    n: "01",
    title: "Îmi trimiți proiectul",
    body: "Trimite tema, planurile existente și cerințele.",
    meta: "DWG / PDF / RVT · discipline · nr. planșe · termen",
  },
  {
    n: "02",
    title: "Primești estimarea",
    body: "Analizez volumul, complexitatea și termenul și stabilim costul înainte de începerea lucrării.",
    meta: "Preț stabilit înainte de start",
  },
  {
    n: "03",
    title: "Realizez modelul și planșele",
    body: "Lucrez în principal în Revit și folosesc AutoCAD atunci când proiectul sau livrabilele o cer.",
    meta: "Revit MEP · AutoCAD la nevoie",
  },
  {
    n: "04",
    title: "Primești livrabilele",
    body: "Fișierele finale, în formatele stabilite în scopul lucrării.",
    meta: "RVT · DWG · PDF",
  },
];

export const faq: [string, string][] = [
  [
    "Lucrezi în Revit?",
    "Da. Revit MEP este principalul meu mediu de lucru pentru modelare și pregătirea planșelor.",
  ],
  [
    "Pot primi fișierul RVT?",
    "Da, atunci când livrarea fișierului editabil face parte din lucrare.",
  ],
  [
    "Pot primi și DWG?",
    "Da. Pot furniza exporturi sau fișiere DWG atunci când proiectul o necesită.",
  ],
  [
    "Poți lucra pe un proiect început de altcineva?",
    "Da. Pot prelua fișiere RVT, DWG sau documentații existente pentru corectări, completări și reorganizare.",
  ],
  [
    "Poți porni de la un PDF?",
    "Da, în funcție de calitatea și informațiile disponibile în document.",
  ],
  [
    "Realizezi instalații sanitare?",
    "Nu. Serviciile sunt concentrate pe Revit MEP, HVAC, instalații termice și instalații electrice.",
  ],
  [
    "Realizezi instalații electrice?",
    "Da, pentru partea de desenare/modelare tehnică pe baza cerințelor și informațiilor de proiect furnizate.",
  ],
  [
    "Poți ajuta cu proiecte pentru facultate?",
    "Da. Ofer suport tehnic pentru modelare, desenare și organizarea documentației, pe baza cerințelor proiectului.",
  ],
  [
    "Cum se stabilește prețul?",
    "În funcție de volum, complexitate, nivelul de detaliu și termen. Costul este stabilit înainte de începerea lucrării.",
  ],
  [
    "În cât timp poate fi gata?",
    "Termenul depinde de complexitatea și volumul proiectului. Trimite documentația și termenul dorit pentru o estimare.",
  ],
  ["Putem lucra complet online?", "Da. Fișierele și observațiile pot fi transmise online."],
];

/** Linkuri interne crawlabile de la blocurile de servicii către paginile dedicate. */
export const serviceHref: Record<string, ServicePath | undefined> = {
  "Revit MEP & Modelare BIM": "/revit-mep",
  "Instalații HVAC": "/hvac",
  "Instalații termice": "/instalatii-termice",
  "Instalații electrice": "/instalatii-electrice",
  "AutoCAD / DWG": "/autocad-dwg",
};
