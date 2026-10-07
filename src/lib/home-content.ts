/**
 * Conținutul paginii principale (servicii, proces, FAQ) — separat de markup
 * ca să fie ușor de editat fără a atinge componenta.
 */
import type { ServicePath } from "@/components/site/ServicePage";

export type ServiceItem = {
  title: string;
  lead: string;
  items: string[];
};

export const services: ServiceItem[] = [
  {
    title: "Externalizare Revit MEP",
    lead: "Modelare BIM și planșe de instalații pe tema biroului tău, livrate RVT / DWG / PDF.",
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
  },
  {
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
    title: "AutoCAD / DWG",
    lead: "Redesenare, conversie PDF în DWG și curățarea documentației existente.",
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
];

export type ProcessStep = { title: string; body: string };

export const process: ProcessStep[] = [
  {
    title: "Trimiți fișierele",
    body: "PDF, DWG, RVT sau poze cu schița, pe WhatsApp ori e-mail.",
  },
  {
    title: "Primești oferta",
    body: "Ce se livrează, până când și cât costă, de regulă în 1–2 zile lucrătoare.",
  },
  {
    title: "Desenez și verific",
    body: "În AutoCAD sau Revit, după cum cere lucrarea.",
  },
  {
    title: "Primești planșele",
    body: "DWG sau RVT, plus PDF gata de tipărit. Rundele de modificări incluse sunt scrise în ofertă.",
  },
];

/** Prima pagină afișează și marchează în FAQPage doar primele 6 întrebări. */
export const faq: [string, string][] = [
  [
    "Poți porni de la un PDF sau o poză?",
    "Da. Dacă originalul are cote lizibile, planul se redesenează la scară. Dacă lipsesc cote, îți spun înainte ce nu se poate garanta.",
  ],
  [
    "Cum se stabilește prețul?",
    "După numărul de planșe, complexitate și termen. Îl primești în scris înainte să încep.",
  ],
  [
    "În cât timp e gata?",
    "Depinde de volum. Termenul face parte din ofertă și se stabilește înainte de start.",
  ],
  [
    "Lucrezi și cu birouri din afara României?",
    "Da, complet online, în engleză, cu livrare RVT, DWG și PDF.",
  ],
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
    "Realizezi instalații sanitare?",
    "Nu. Serviciile sunt concentrate pe Revit MEP, HVAC, instalații termice și instalații electrice.",
  ],
  [
    "Realizezi instalații electrice?",
    "Da, pentru partea de desenare/modelare tehnică pe baza cerințelor și informațiilor de proiect furnizate.",
  ],
  [
    "Poți lucra în template-ul și cu familiile biroului nostru?",
    "Da. Folosesc template-ul, standardele și familiile furnizate de birou, dacă le primesc la începutul lucrării.",
  ],
  [
    "Semnezi un NDA înainte de a primi fișierele?",
    "Da, la cerere. Fișierele primite nu sunt publicate și nu sunt transmise mai departe.",
  ],
  [
    "Cum se predau fișierele și observațiile?",
    "Online: prin email, WhatsApp sau link de transfer (WeTransfer, Google Drive, OneDrive).",
  ],
];

/** Linkuri interne crawlabile de la blocurile de servicii către paginile dedicate. */
export const serviceHref: Record<string, ServicePath | undefined> = {
  "Externalizare Revit MEP": "/revit-mep",
  "Instalații HVAC": "/hvac",
  "Instalații termice": "/instalatii-termice",
  "Instalații electrice": "/instalatii-electrice",
  "AutoCAD / DWG": "/autocad-dwg",
};
