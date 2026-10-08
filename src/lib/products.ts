import shopAutomation from "@/assets/shop-automation.webp";
import shopCapacity from "@/assets/shop-capacity.webp";
import shopDidacticModel from "@/assets/shop-didactic-model.webp";
import shopHealthCheck from "@/assets/shop-health-check.webp";
import shopStarterKit from "@/assets/shop-starter-kit.webp";

export const freeMaintAffiliateUrl = "https://freemaint.com/pricing?via=bsx7y7fx2v58";

export type ShopProduct = {
  id: string;
  name: string;
  category:
    | "Audit & verificare"
    | "Kituri Revit MEP"
    | "Automatizări"
    | "Capacitate externă"
    | "Modele didactice";
  kind: "Pachet digital" | "Serviciu" | "Model fizic";
  description: string;
  price: string;
  priceMin?: number;
  priceMax?: number;
  availability: string;
  audience: string;
  compatibility: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  imageCaption: string;
};

/**
 * Oferta magazinului NOD BIM: produse și servicii mici care pot deschide o
 * colaborare B2B — audit, organizare Revit, automatizări și modele didactice.
 */
export const products: ShopProduct[] = [
  {
    id: "rvt-dwg-health-check",
    name: "RVT / DWG Health Check",
    category: "Audit & verificare",
    kind: "Serviciu",
    description:
      "Verificare punctuală pentru un fișier RVT sau DWG înainte de predare, preluare ori continuarea lucrului. Primești o imagine clară a problemelor și a următorilor pași.",
    price: "149–299 lei",
    priceMin: 149,
    priceMax: 299,
    availability: "Raport în 2–4 zile lucrătoare",
    audience: "Birouri mici de proiectare",
    compatibility: "RVT · DWG · PDF · HVAC / termice / electrice",
    deliverables: [
      "raport PDF cu problemele găsite",
      "observații prioritizate pentru corectare",
      "verificare structură, planșe și denumiri",
      "recomandări pentru predare sau continuarea proiectului",
    ],
    image: shopHealthCheck,
    imageAlt: "Comparație între o planșă DWG și un model 3D Revit MEP coordonat",
    imageCaption: "Preview audit · DWG → RVT",
  },
  {
    id: "revit-mep-office-starter-kit",
    name: "Revit MEP Office Starter Kit",
    category: "Kituri Revit MEP",
    kind: "Pachet digital",
    description:
      "Un punct de pornire practic pentru un birou care vrea să lucreze mai organizat în Revit MEP și să reducă timpul pierdut la fiecare proiect nou.",
    price: "249–499 lei",
    priceMin: 249,
    priceMax: 499,
    availability: "Livrare digitală · 3–5 zile",
    audience: "Birouri care vor un flux repetabil",
    compatibility: "Revit MEP · template RVT · versiunea se confirmă la comandă",
    deliverables: [
      "template RVT de pornire",
      "view templates și filtre de bază",
      "nomenclatoare și sheet-uri organizate",
      "checklist QA/QC pentru predare",
    ],
    image: shopStarterKit,
    imageAlt: "Kit vizual cu template Revit MEP, sheet-uri și checklist QA/QC",
    imageCaption: "Preview kit · sheet și documentație",
  },
  {
    id: "dynamo-pyrevit-mep-pack",
    name: "Pachete Dynamo / pyRevit pentru MEP",
    category: "Automatizări",
    kind: "Pachet digital",
    description:
      "Automatizări mici pentru sarcini repetitive din Revit MEP: numerotare, verificări, pregătirea planșelor și exporturi. Alegi doar fluxul de care ai nevoie.",
    price: "79–299 lei",
    priceMin: 79,
    priceMax: 299,
    availability: "Livrare digitală · după confirmarea fluxului",
    audience: "Proiectanți și coordonatori Revit",
    compatibility: "Revit MEP · Dynamo · pyRevit · Windows",
    deliverables: [
      "scripturile pentru fluxul ales",
      "instrucțiuni scurte de instalare și rulare",
      "verificări pentru scenariul agreat",
      "exemplu de utilizare pe un proiect demonstrativ",
    ],
    image: shopAutomation,
    imageAlt: "Flux vizual de automatizare pentru modelare și documentație Revit MEP",
    imageCaption: "Preview automatizare · coordonare MEP",
  },
  {
    id: "revit-mep-capacity-pack",
    name: "Pachet de capacitate externă Revit MEP",
    category: "Capacitate externă",
    kind: "Serviciu",
    description:
      "O rezervă de capacitate pentru birouri care au un vârf de lucru, o revizie urgentă sau nevoie de o mână în plus la documentație.",
    price: "La ofertă",
    availability: "Termen și preț după fișiere",
    audience: "Firme cu vârf de lucru sau lipsă temporară de personal",
    compatibility: "RVT · DWG · PDF · HVAC / termice / electrice",
    deliverables: [
      "5 planșe sau o revizie RVT/DWG",
      "pachet de 10 ore de suport tehnic",
      "scope, termen și livrabile stabilite în scris",
      "predare RVT, DWG și PDF când sunt incluse în scop",
    ],
    image: shopCapacity,
    imageAlt: "Ansamblu HVAC și set de planșe pregătite pentru predare",
    imageCaption: "Preview capacitate · planșă HVAC",
  },
  {
    id: "modele-didactice-mep",
    name: "Modele didactice MEP la comandă",
    category: "Modele didactice",
    kind: "Model fizic",
    description:
      "Modele secționate pentru predarea instalațiilor: pompă, vană, ventiloconvector, distribuitor sau un ansamblu personalizat. Conceptul și nivelul de detaliu se stabilesc înainte de print.",
    price: "650–2.500+ lei",
    priceMin: 650,
    availability: "La comandă · termen confirmat",
    audience: "Facultăți, licee tehnologice și firme de training",
    compatibility: "Print 3D · variante și coduri de culoare stabilite împreună",
    deliverables: [
      "model secționat cu componente vizibile",
      "coduri de culoare pentru componente sau fluxuri",
      "suport de prezentare, când este necesar",
      "variante: pompă, vană, ventiloconvector, distribuitor",
    ],
    image: shopDidacticModel,
    imageAlt: "Model fizic secționat pentru instruirea instalațiilor HVAC și MEP",
    imageCaption: "Preview conceptual · model didactic MEP",
  },
];
