/**
 * Produsele magazinului NOD BIM:
 * - Machete & unelte de desen: produse de import (furnizori China),
 *   revândute local — lucruri greu de găsit în România.
 * - Didactice: modele secționate MEP realizate la comandă (print 3D).
 */
export type ShopProduct = {
  id: string;
  name: string;
  category: "Machete" | "Unelte de desen" | "Didactice";
  description: string;
  price: string;
  availability: string;
  details: string[];
};

export const products: ShopProduct[] = [
  {
    id: "arbori-1-100",
    name: "Set 20 arbori pentru machete — 1:100",
    category: "Machete",
    description:
      "20 de arbori în amestec (foioase, conifere, aliniament stradal) pentru machete arhitecturale și planuri de situație. Vopsiți, gata de folosit.",
    price: "59 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "20 bucăți · amestec tipologii",
      "Scară 1:100 (potrivit și pentru HO)",
      "ABS / plastic vopsit",
      "Direct din import",
    ],
  },
  {
    id: "figurine-1-100",
    name: "Set 50 figurine umane vopsite — 1:100",
    category: "Machete",
    description:
      "50 de siluete umane vopsite, în ipostaze diverse (în picioare, mergând, așezate) — dau viață oricărei machete sau prezentări.",
    price: "69 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "50 bucăți · culori amestecate",
      "Scară 1:100",
      "ABS vopsit, detalii fine",
      "Direct din import",
    ],
  },
  {
    id: "masini-1-100",
    name: "Set 20 autovehicule vopsite — 1:100",
    category: "Machete",
    description:
      "20 de autovehicule (autoturisme, dubă, autobuz) în culori amestecate, pentru contexte urbane în machete și diorame.",
    price: "59 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "20 bucăți · 4–5 culori",
      "Lungime 4–4,8 cm (1:100)",
      "ABS vopsit",
      "Direct din import",
    ],
  },
  {
    id: "kit-macheta-complet",
    name: "Kit complet machetă — arbori + figurine + vehicule",
    category: "Machete",
    description:
      "Pachetul complet pentru o machetă vie: 20 arbori, 50 figurine și 20 vehicule la scara 1:100, în culori amestecate.",
    price: "149 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "90 piese în total",
      "Scară 1:100",
      "Vopsite, gata de montaj",
      "Economisești ~38 lei față de seturi separate",
    ],
  },
  {
    id: "sablon-instalatii",
    name: "Șablon instalații — vane, flanșe, coturi, pompe",
    category: "Unelte de desen",
    description:
      "Șablon de desen pentru scheme de instalații: simboluri de vane, flanșe, reducții, pompe și coturi. Esențial pentru scheme izometrice de mână.",
    price: "49 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "Simboluri vane + fitinguri",
      "Plastic translucid verde",
      "Riglă 7 cm + 14 cm inclusă",
      "Potrivit pentru studenți și proiectanți",
    ],
  },
  {
    id: "sablon-electrice",
    name: "Șablon simboluri electrice",
    category: "Unelte de desen",
    description:
      "Șablon cu simboluri standard pentru scheme electrice: întrerupătoare, prize, corpuri de iluminat, circuite și componente.",
    price: "39 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "Simboluri standard instalații",
      "Plastic translucid",
      "Cu ghidaje de aliniere",
      "Pentru scheme și planuri",
    ],
  },
  {
    id: "sablon-arhitect-1-50",
    name: "Șablon arhitect 1:50 — uși, mobilier, electrice",
    category: "Unelte de desen",
    description:
      "Șablon combinat pentru planuri 1:50: uși, obiecte sanitare, mobilier și simboluri electro. Acril 2 mm, laser-cut.",
    price: "49 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "Scară 1:50 integrată",
      "Acril verde translucid 2 mm",
      "Decupaje laser precise",
      "Pentru schițe și planuri",
    ],
  },
  {
    id: "sablon-mobilier-1-100",
    name: "Șablon mobilier 1:100 + raportor",
    category: "Unelte de desen",
    description:
      "Șablon universal cu simboluri de mobilier (living, dormitor, bucătărie, baie) și simboluri electrice uzuale, la scara 1:100.",
    price: "39 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "Scară 1:100",
      "Raportor inclus",
      "K-resin flexibil",
      "Simboluri mobilier + electrice",
    ],
  },
  {
    id: "pompa-sectionata",
    name: "Model didactic — pompă centrifugală secționată",
    category: "Didactice",
    description:
      "Model secționat de pompă centrifugală, cu rotor, carcasă spirală și garnituri vizibile. Secțiuni colorate pe coduri, manivelă de rotire manuală.",
    price: "650 lei",
    availability: "La comandă · 3–5 zile",
    details: [
      "Secțiuni colorate pe componente",
      "Rotor rotativ manual",
      "Print 3D, finisat manual",
      "Pentru licee tehnologice și facultăți",
    ],
  },
  {
    id: "ventiloconvector",
    name: "Model didactic — ventiloconvector secționat",
    category: "Didactice",
    description:
      "Ventiloconvector (fan coil) cu baterie, ventilator și vană vizibile prin secțiune — ideal pentru cursuri de HVAC și instalații termice.",
    price: "890 lei",
    availability: "La comandă · 3–5 zile",
    details: [
      "Baterie + ventilator vizibile",
      "Secțiuni colorate pe fluxuri",
      "Suport de prezentare inclus",
      "Pentru cursuri HVAC / termice",
    ],
  },
  {
    id: "vana-bila",
    name: "Model didactic — vană cu bilă secționată",
    category: "Didactice",
    description:
      "Vană cu bilă cu trecere integrală, secționată pentru a arăta bila, scaunele și garniturile. Robinetul se rotește manual.",
    price: "350 lei",
    availability: "La comandă · 3–5 zile",
    details: [
      "Bilă rotativă manual",
      "Scaune și garnituri vizibile",
      "Secțiuni colorate",
      "Pentru cursuri de instalații",
    ],
  },
];
