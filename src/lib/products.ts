/**
 * Produsele magazinului NOD BIM — unelte de birou/CAD și desen tehnic
 * (import, revândute local) + modele didactice secționate MEP (print 3D).
 * Selectate pe criteriul: nu se găsesc pe eMAG/magazinele uzuale din RO.
 */
export type ShopProduct = {
  id: string;
  name: string;
  category: "Birou & CAD" | "Unelte de desen" | "Didactice";
  description: string;
  price: string;
  availability: string;
  details: string[];
  /** Imagine produs (din /public/products). Opțională până la fotografia proprie. */
  image?: string;
};

export const products: ShopProduct[] = [
  {
    id: "macropad-3",
    name: "Macropad CAD — 3 taste + rotativ",
    category: "Birou & CAD",
    description:
      "Tastatură mini programabilă pentru scurtături Revit, AutoCAD, Blender sau Photoshop: 3 butoane + buton rotativ (zoom, undo, volum). Se configurează per aplicație.",
    price: "139 lei",
    availability: "Livrare 7–14 zile",
    image: "/products/macropad-3.jpg",
    details: [
      "3 butoane + rotativ cu click",
      "USB-C · fără driver special",
      "Software de configurare inclus",
      "Scurtături salvate în memorie",
    ],
  },
  {
    id: "macropad-6",
    name: "Macropad CAD — 6 taste + 2 rotative",
    category: "Birou & CAD",
    description:
      "Versiunea extinsă: 6 butoane programabile și 2 butoane rotative, pentru fluxuri complete de lucru în Revit MEP, AutoCAD sau editare foto/video.",
    price: "179 lei",
    availability: "Livrare 7–14 zile",
    image: "/products/macropad-6.jpg",
    details: [
      "6 butoane + 2 rotative",
      "Profiluri per aplicație",
      "USB-C · memorare internă",
      "Ideal pentru scurtături MEP",
    ],
  },
  {
    id: "macropad-12",
    name: "Macropad CAD — 12 taste mecanice + 2 rotative",
    category: "Birou & CAD",
    description:
      "Versiunea completă pentru proiectanți: 12 taste mecanice hotswap cu RGB + 2 butoane rotative. Toate scurtăturile Revit/AutoCAD la o mână distanță.",
    price: "229 lei",
    availability: "Livrare 7–14 zile",
    image: "/products/macropad-12.jpg",
    details: [
      "12 taste mecanice hotswap",
      "2 rotative · RGB per tastă",
      "Profiluri multiple",
      "Bluetooth + USB",
    ],
  },
  {
    id: "stream-dock",
    name: "Stream Dock — 15 taste LCD programabile",
    category: "Birou & CAD",
    description:
      "Controller de birou cu 15 taste LCD: fiecare tastă afișează propria iconiță (inclusiv GIF), cu sute de plugin-uri și profiluri per aplicație. Alternativa accesibilă la Elgato Stream Deck, pentru scurtături Revit, AutoCAD, Photoshop.",
    price: "399 lei",
    availability: "Livrare 7–14 zile",
    image: "/products/stream-dock.jpg",
    details: [
      "15 taste cu ecran LCD propriu",
      "Iconițe personalizate (JPG/PNG/GIF)",
      "Profiluri auto per aplicație",
      "Suport PC & Mac · USB-C",
    ],
  },
  {
    id: "masa-desen-standard",
    name: "Masă de desen A3 — riglă paralelă",
    category: "Birou & CAD",
    description:
      "Masă portabilă de desen A3 cu riglă paralelă glisantă, cleme de fixare a hârtiei și echer cu raportor integrat. Uneltele de bază ale desenatorului, într-un singur pachet.",
    price: "199 lei",
    availability: "Livrare 10–20 zile",
    image: "/products/masa-desen-standard.jpg",
    details: [
      "Format A3 · 2 cleme hârtie",
      "Riglă paralelă cu blocare",
      "Echer + raportor incluse",
      "Suprafață antiderapantă",
    ],
  },
  {
    id: "masa-desen-pro",
    name: "Masă de desen A3 pro — cap de desenare cu echer rotativ",
    category: "Birou & CAD",
    description:
      "Varianta profesională: cap de desenare cu echer rotativ gradat 0–90°, mecanism paralel precis și suport de hârtie dublu. Pentru planșe tehnice la standard de birou.",
    price: "449 lei",
    availability: "Livrare 10–20 zile",
    image: "/products/masa-desen-pro.jpg",
    details: [
      "Cap de desenare cu echer rotativ",
      "Scală gradată 0–90°",
      "Mecanism paralel dublu",
      "Comparabil cu mesele de firmă de 3x prețul",
    ],
  },
  {
    id: "radiera-electrica",
    name: "Radieră electrică pentru desen tehnic",
    category: "Birou & CAD",
    description:
      "Radieră electrică de precizie pentru planșe și schițe — șterge curat fără să roadă hârtia. Unelta clasică de desenator, aproape imposibil de găsit în România.",
    price: "59 lei",
    availability: "Livrare 7–14 zile",
    image: "/products/radiera-electrica.jpg",
    details: [
      "Motor rotativ · 2 viteze",
      "Vârf de cauciuc schimbabil",
      "Alimentare baterii AAA",
      "Pentru planșe, schițe, hârtie de calc",
    ],
  },
  {
    id: "lead-pointer-2mm",
    name: "Ascuțitor pentru mine de 2mm (lead pointer)",
    category: "Birou & CAD",
    description:
      "Ascuțitor dedicat minelor de 2mm pentru creioane mecanice (port-mină) — vârf fin de desen sau de scris, cu rezervor pentru praf. Accesoriul pe care îl caută orice desenator tehnic.",
    price: "29 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "Pentru mine de 2mm",
      "Două profile de vârf",
      "Rezervor pentru praf inclus",
      "Compatibil cu majoritatea port-minelor",
    ],
  },
  {
    id: "set-creioane-2mm",
    name: "Set creioane mecanice 2mm + 144 mine + ascuțitor",
    category: "Birou & CAD",
    description:
      "Set complet de desen tehnic: creion mecanic metalic de 2mm, 144 de mine HB/2B și ascuțitor dedicat. Trusă în cutie, gata de lucru.",
    price: "79 lei",
    availability: "Livrare 7–14 zile",
    details: [
      "Creion mecanic metalic 2mm",
      "144 mine · HB și 2B",
      "Ascuțitor + radieră incluse",
      "Cutie de transport",
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
