/**
 * Produsele magazinului NOD BIM — accesorii pentru machete arhitecturale
 * și modele didactice secționate MEP, realizate la comandă (print 3D).
 */
export type ShopProduct = {
  id: string;
  name: string;
  category: "Machete" | "Didactice";
  description: string;
  price: string;
  details: string[];
};

export const products: ShopProduct[] = [
  {
    id: "arbori-1-100",
    name: "Set arbori pentru machete — 1:100",
    category: "Machete",
    description:
      "12 arbori stilizați în 3 tipologii (foioase, conifere, aliniament stradal), optimizați pentru scara 1:100. Geometrie curată, siluete clare.",
    price: "89 lei",
    details: [
      "12 bucăți · 3 tipologii",
      "Înălțime 8–14 cm",
      "Culoare: gri neutru sau verde",
      "Se pot vopsi",
    ],
  },
  {
    id: "figurine-1-100",
    name: "Set figurine umane — 1:100 / 1:50",
    category: "Machete",
    description:
      "20 de siluete umane low-poly (în picioare, mergând, așezate) pentru machete de arhitectură și urbanism. Siluete lizibile la scară mică.",
    price: "69 lei",
    details: [
      "20 bucăți · 5 ipostaze",
      "Scară 1:100 sau 1:50",
      "Culoare: gri antracit",
      "Fără suporturi la printare",
    ],
  },
  {
    id: "masini-1-100",
    name: "Set autovehicule — 1:100",
    category: "Machete",
    description:
      "10 vehicule stilizate (autoturisme, dubă, autobuz) pentru contexte urbane în machete și planuri de situație.",
    price: "59 lei",
    details: [
      "10 bucăți · 3 tipuri",
      "Scară 1:100",
      "Culoare: gri deschis",
      "Geometrie simplă, print rapid",
    ],
  },
  {
    id: "kit-macheta-complet",
    name: "Kit complet machetă — arbori + figurine + vehicule",
    category: "Machete",
    description:
      "Pachetul complet pentru prezentări: 12 arbori, 20 figurine și 10 vehicule la scara aleasă. Tot ce trebuie pentru o machetă vie.",
    price: "189 lei",
    details: [
      "42 piese în total",
      "Scară 1:100 sau 1:50",
      "Culori unitare, vopsibile",
      "Livrare în 3–5 zile lucrătoare",
    ],
  },
  {
    id: "pompa-sectionata",
    name: "Model didactic — pompă centrifugală secționată",
    category: "Didactice",
    description:
      "Model secționat de pompă centrifugală, cu rotor, carcasă spirală și garnituri vizibile. Secțiuni colorate pe coduri, manivelă de rotire manuală.",
    price: "650 lei",
    details: [
      "Scară demonstrativă 1:1 vizual",
      "Secțiuni colorate pe componente",
      "Rotor rotativ manual",
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
      "Vană cu bilă cu trecere integrală, secționată pentru a arăta bilă, scaune și garnituri. Robinetul se rotește manual.",
    price: "350 lei",
    details: [
      "Bilă rotativă manual",
      "Scaune și garnituri vizibile",
      "Secțiuni colorate",
      "Pentru cursuri de instalații",
    ],
  },
];
