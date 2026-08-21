/**
 * Dosar de referințe — fișe de lucrare publicate cu acordul clienților.
 * Clienții apar cu prenumele + inițiala numelui și localitatea, fără date personale.
 */
export type Referral = {
  /** Numărul fișei din registru, ex: "001". */
  fisa: string;
  /** Prenume + inițială, ex: "Alexandru M." */
  client: string;
  loc: string;
  luna: string;
  lucrare: string;
  livrabile: string;
  termen: string;
  pret: string;
  status: string;
  /** Mesajul clientului, cât mai aproape de formularea originală. */
  citat: string;
};

export const referrals: Referral[] = [
  {
    fisa: "001",
    client: "Alexandru M.",
    loc: "București (Sector 1)",
    luna: "iulie 2026",
    lucrare: "Planșe HVAC + termice — casă P+1",
    livrabile: "6 planșe · RVT · PDF",
    termen: "5 zile lucrătoare",
    pret: "1.100 lei",
    status: "Predat la termen",
    citat:
      "Am primit planșele mai repede decât mă așteptam, iar arhitectul nu a avut nicio observație la prima verificare.",
  },
  {
    fisa: "002",
    client: "Cristian D.",
    loc: "Bragadiru, Ilfov",
    luna: "iulie 2026",
    lucrare: "Instalații electrice — birou 120 mp",
    livrabile: "4 planșe · DWG · PDF",
    termen: "4 zile lucrătoare",
    pret: "850 lei",
    status: "Predat la termen",
    citat:
      "Comunicare foarte clară, am știut din prima cât costă și ce primesc. Recomand pentru seriozitate.",
  },
  {
    fisa: "003",
    client: "Elena V.",
    loc: "București (Sector 6)",
    luna: "iunie 2026",
    lucrare: "Proiect academic — modelare Revit MEP",
    livrabile: "Model RVT · 3 planșe · PDF",
    termen: "6 zile lucrătoare",
    pret: "650 lei",
    status: "Predat cu 2 runde de modificări incluse",
    citat:
      "M-a ajutat mult că mi-a explicat de ce a făcut fiecare lucru, nu doar a livrat. Am și învățat ceva pentru proiect.",
  },
  {
    fisa: "004",
    client: "Radu T.",
    loc: "Otopeni, Ilfov",
    luna: "iunie 2026",
    lucrare: "Modelare Revit MEP — imobil birouri, preluat de la alt modelator",
    livrabile: "RVT reorganizat · 12 sheet-uri",
    termen: "10 zile lucrătoare",
    pret: "2.600 lei",
    status: "Predat la termen",
    citat:
      "A preluat modelul început de altcineva și l-a adus la o stare organizată. Nu am mai stat să urmărim noi fișierele.",
  },
  {
    fisa: "005",
    client: "Bogdan S.",
    loc: "Chiajna, Ilfov",
    luna: "mai 2026",
    lucrare: "Curățare DWG + conversie planșe vechi",
    livrabile: "9 planșe DWG curățate · PDF",
    termen: "3 zile lucrătoare",
    pret: "450 lei",
    status: "Predat la termen",
    citat:
      "Aveam niște fișiere vechi de care se ferea toată lumea. Le-a reorganizat frumos, acum se poate lucra pe ele.",
  },
  {
    fisa: "006",
    client: "Mihai P.",
    loc: "Popești-Leordeni, Ilfov",
    luna: "mai 2026",
    lucrare: "Planșe instalații termice — pensiune",
    livrabile: "5 planșe · PDF",
    termen: "5 zile lucrătoare",
    pret: "950 lei",
    status: "Predat la termen",
    citat:
      "Foarte corect la bani și la timp. Mi-a explicat și ce va trebui actualizat după ce termin construcția.",
  },
  {
    fisa: "007",
    client: "Andrei C.",
    loc: "București (Sector 3)",
    luna: "aprilie 2026",
    lucrare: "Planșe instalații electrice — casă P+M",
    livrabile: "5 planșe · DWG · PDF",
    termen: "4 zile lucrătoare",
    pret: "1.000 lei",
    status: "Predat la termen",
    citat: "Lucrare curată, fără discuții la recepție. Am primit și DWG-urile, cum am cerut.",
  },
  {
    fisa: "008",
    client: "Florin N.",
    loc: "Voluntari, Ilfov",
    luna: "aprilie 2026",
    lucrare: "Modelare Revit MEP — hală mică",
    livrabile: "Model RVT · 8 planșe · PDF",
    termen: "7 zile lucrătoare",
    pret: "1.700 lei",
    status: "Predat la termen",
    citat:
      "A înțeles repede ce am nevoie și nu am stat după explicații. A doua lucrare deja în discuție.",
  },
  {
    fisa: "009",
    client: "Gabriel I.",
    loc: "Pantelimon, Ilfov",
    luna: "martie 2026",
    lucrare: "Curățare DWG + pregătire layout",
    livrabile: "6 planșe DWG · PDF",
    termen: "3 zile lucrătoare",
    pret: "500 lei",
    status: "Predat la termen",
    citat:
      "Fișierele vechi au ieșit aranjate, cu layerele la locul lor. Exact ce-mi trebuia ca să pot lucra mai departe.",
  },
  {
    fisa: "010",
    client: "Vlad R.",
    loc: "București (Sector 2)",
    luna: "martie 2026",
    lucrare: "Planșe HVAC — apartament",
    livrabile: "3 planșe · PDF",
    termen: "3 zile lucrătoare",
    pret: "800 lei",
    status: "Predat cu 1 rundă de modificări",
    citat: "Serios și prompt. Modificările cerute au fost rezolvate în aceeași zi.",
  },
  {
    fisa: "011",
    client: "Cosmin L.",
    loc: "Mogoșoaia, Ilfov",
    luna: "februarie 2026",
    lucrare: "Corectare planșe după observațiile beneficiarului",
    livrabile: "4 planșe actualizate · PDF",
    termen: "2 zile lucrătoare",
    pret: "900 lei",
    status: "Predat înainte de termen",
    citat: "Am trimis observațiile vineri seara, luni dimineață planșele erau gata. Impresionant.",
  },
  {
    fisa: "012",
    client: "Adrian B.",
    loc: "Corbeanca, Ilfov",
    luna: "februarie 2026",
    lucrare: "Planșe termice + electrice — vilă P+1",
    livrabile: "7 planșe · RVT · PDF",
    termen: "6 zile lucrătoare",
    pret: "1.400 lei",
    status: "Predat la termen",
    citat: "Colaborare fără bătăi de cap. Totul a fost clar de la estimare până la predare.",
  },
  {
    fisa: "013",
    client: "Dan M.",
    loc: "București (Sector 4)",
    luna: "ianuarie 2026",
    lucrare: "Organizare sheet-uri + indicator — proiect birouri",
    livrabile: "10 sheet-uri · RVT",
    termen: "8 zile lucrătoare",
    pret: "2.200 lei",
    status: "Predat la termen",
    citat:
      "Documentația arată unitar acum, cu numerotare și legende puse la punct. Se vede diferența.",
  },
  {
    fisa: "014",
    client: "Ionel G.",
    loc: "Măgurele, Ilfov",
    luna: "ianuarie 2026",
    lucrare: "Suport proiect academic — modelare + planșe",
    livrabile: "Model RVT · 4 planșe · PDF",
    termen: "5 zile lucrătoare",
    pret: "700 lei",
    status: "Predat cu explicații incluse",
    citat:
      "Dincolo de planșe, mi-a explicat pașii ca să pot susține proiectul cu încredere. Nota a confirmat.",
  },
  {
    fisa: "015",
    client: "Sergiu A.",
    loc: "București (Sector 5)",
    luna: "decembrie 2025",
    lucrare: "Conversie PDF → DWG + redesenare plan",
    livrabile: "5 planșe DWG · PDF",
    termen: "4 zile lucrătoare",
    pret: "650 lei",
    status: "Predat la termen",
    citat:
      "Aveam doar un PDF vechi de la care toți plecau. El l-a transformat în fișiere pe care se poate lucra.",
  },
];
