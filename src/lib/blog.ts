/**
 * Articolele tehnice NOD BIM — conținut de inginerie cu probe practice,
 * nu umplutură SEO. Fiecare articol are o temă complicată, explicată
 * din experiența de lucru reală.
 */
export type ArticleSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  note?: string;
};

export type Article = {
  slug: string;
  title: string;
  /** Titlu scurt pentru <title>; `title` rămâne H1-ul articolului. */
  metaTitle: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "cat-costa-o-plansa-de-instalatii",
    title: "Cât costă cu adevărat o planșă de instalații? Anatomia unui preț",
    metaTitle: "Cât costă cu adevărat o planșă de instalații",
    description:
      "Descompun prețul unei planșe de instalații în etape, ore și factori reali: de ce costă „de la 300 lei” și de unde apar diferențele între oferte.",
    date: "2026-08-21",
    readingTime: 8,
    tags: ["Prețuri", "Revit MEP", "Proces"],
    sections: [
      {
        paragraphs: [
          "Cea mai frecventă întrebare pe care o primesc nu este „poți să faci X?”, ci „de ce costă atât?”. E o întrebare corectă, pentru că piața de modelare și desenare tehnică nu afișează aproape niciodată prețuri. Acest articol descompune costul unei planșe de instalații pe etape reale de lucru, cu ore și factori concreți — ca să știi exact pentru ce plătești.",
        ],
      },
      {
        heading: "Ce se întâmplă cu fișierele tale, în ordine",
        paragraphs: [
          "O planșă „gata de predare” nu înseamnă doar desen. În spatele ei stau, în medie, aceste etape — proporțiile variază de la proiect la proiect, dar ordinea este aproape mereu aceeași:",
        ],
        list: [
          "Preluare și verificare fișiere (DWG/PDF/RVT): se verifică scara, unitățile, layerele, ce lipsește și ce trebuie refăcut de la zero.",
          "Pregătirea bazei de lucru: curățarea fișierelor primite, organizarea layere-lor, template-ul cu indicator, stiluri de linii, legende.",
          "Modelarea / desenarea propriu-zisă a instalațiilor: trasee, echipamente, adnotări, cote.",
          "Verificare și coordonare: suprapunerea disciplinelor, coliziuni, verificarea logicii traseelor.",
          "Predare: export în formatele cerute, verificarea printului, organizarea livrabilelor.",
        ],
      },
      {
        heading: "Factorii care schimbă prețul (mai mult decât crezi)",
        table: {
          head: ["Factor", "Impact real asupra prețului"],
          rows: [
            [
              "Starea fișierelor primite",
              "Un PDF scanat strâmb poate dubla timpul față de un RVT curat — totul se redesenază de la zero",
            ],
            [
              "Numărul de discipline",
              "HVAC + termice + electrice pe același plan înseamnă coordonare triplă, nu doar desen triplu",
            ],
            [
              "Nivelul de detaliu (LOD)",
              "O schemă de principiu se face în ore; un model 3D coordonat cu sheet-uri și liste, în zile",
            ],
            [
              "Numărul de planșe identice",
              "Planul 2 costă mai puțin decât planul 1: baza de lucru e deja construită",
            ],
            [
              "Termenul",
              "Urgența = ore suplimentare. Un termen normal costă mai puțin decât „pe mâine dimineață”",
            ],
            [
              "Reviziile",
              "1–2 runde normale sunt incluse; reviziile cauzate de schimbări majore de temă sunt lucrare nouă",
            ],
          ],
        },
      },
      {
        heading: "De ce diferențe mari între oferte pentru aceeași lucrare",
        paragraphs: [
          "Pentru aceeași cerere poți primi oferte de la 200 lei la 2.000 lei. Nu e neapărat „țeapă” vs. „corect” — e vorba despre ce se livrează de fapt. O planșă „desenată” fără verificare, fără organizarea fișierelor și fără responsabilitate pentru predare costă altceva decât un livrabil care poate intra direct în documentație.",
          "Regula mea simplă: dacă o ofertă nu îți spune ce primești (formate, număr de planșe, revizii incluse, termen), cere-i să o facă. Un preț fără scopul lucrării nu înseamnă nimic.",
        ],
        note: "Pe site-ul NOD BIM prețurile orientative sunt publice tocmai ca să poți compara corect — de la corectare de planșă până la pachete de proiect.",
      },
      {
        heading: "Concluzia practică",
        paragraphs: [
          "Costul real al unei planșe este suma dintre starea fișierelor tale, complexitatea instalațiilor și standardul de predare. Poți reduce costul fără să reduci calitatea: trimite fișiere curate, cere explicit ce include livrabilul și stabilește termenul realist. Restul e muncă de inginerie — și aia merită plătită corect.",
        ],
      },
    ],
  },
  {
    slug: "revit-vs-autocad-experiment",
    title: "Experiment: aceeași modificare în Revit vs AutoCAD — ce se întâmplă cu timpul tău",
    metaTitle: "Experiment: aceeași modificare în Revit vs AutoCAD",
    description:
      "Aceeași modificare de traseu făcută în paralel în Revit și AutoCAD: câte desene actualizezi manual, unde apar erorile și de ce DWG-ul poate costa mai mult.",
    date: "2026-08-21",
    readingTime: 7,
    tags: ["Revit MEP", "AutoCAD", "Experiment"],
    sections: [
      {
        paragraphs: [
          "Discuția „Revit vs AutoCAD” e de obicei religioasă, nu tehnică. Am vrut să o transform într-un experiment simplu: iau aceeași modificare reală — mutarea unui traseu de tubulatură dintr-un hol, cu tot ce decurge din ea — și o fac o dată într-un desen DWG clasic și o dată într-un model Revit MEP. Urmăresc ce se actualizează automat, ce se face manual și unde se strecoară erorile.",
        ],
      },
      {
        heading: "Modificarea aleasă",
        paragraphs: [
          "Scenariul este banal în practică: arhitectura mută un gol de ușă, iar traseul de tubulatură care traversa holul trebuie ridicat cu 15 cm și deviat. Consecințele: planul de nivel se schimbă, secțiunea prin hol se schimbă, legenda și lista de cantități se schimbă — și toate planșele trebuie predate actualizate.",
        ],
      },
      {
        heading: "Ce se întâmplă în AutoCAD (DWG)",
        list: [
          "Modifici traseul pe planul de nivel — desenezi manual noua poziție, ștergi vechea poziție.",
          "Actualizezi manual secțiunea prin hol — aceeași modificare, desenată a doua oară, din alt unghi.",
          "Cauți în legendă și în lista de cantități elementele atinse — lungimi de tubulatură, fitinguri — și le modifici manual.",
          "Verifici dacă nu ai uitat vreo vedere: cote, etichete, referințe încrucișate între planșe.",
        ],
        paragraphs: [
          "Fiecare pas este o nouă ocazie de eroare: un traseu mutat pe plan, dar nu și în secțiune; o cotă rămasă în urmă; o lungime de țeavă nemodificată în listă. În practică, exact aceste neconcordanțe sunt cele care revin ca observații de la verificatori.",
        ],
      },
      {
        heading: "Ce se întâmplă în Revit (RVT)",
        list: [
          "Modifici traseul o singură dată, în orice vedere — plan sau secțiune sau 3D.",
          "Toate vederile se actualizează automat din model: planul, secțiunea, vederea 3D.",
          "Listele de cantități se regenerează din model — lungimile și fitingurile se recalculează singure.",
          "Cotele legate de elemente se actualizează odată cu elementele.",
        ],
        paragraphs: [
          "Diferența nu este viteza de desenare, ci numărul de locuri în care aceeași informație trebuie menținută manual. În 2D, informația trăiește de N ori (o dată în fiecare vedere); în model, trăiește o singură dată.",
        ],
      },
      {
        heading: "Unde câștigă fiecare instrument",
        table: {
          head: ["Criteriu", "AutoCAD / DWG", "Revit / RVT"],
          rows: [
            [
              "Prima planșă simplă, fără modificări",
              "Rapid — desenezi direct ce vezi",
              "Mai lent — construiești modelul înainte de a extrage planșa",
            ],
            [
              "Modificări care ating mai multe vederi",
              "Fiecare vedere se actualizează manual",
              "Se actualizează automat din model",
            ],
            [
              "Coerența între planșe",
              "Depinde de disciplină și verificare manuală",
              "Garantată de model — sursă unică de informație",
            ],
            [
              "Liste de cantități",
              "Numărate manual, cu risc de eroare",
              "Generate din model, recalculabile oricând",
            ],
            ["Predarea editabilă (RVT)", "Nu se aplică", "Fișierul model rămâne livrabil editabil"],
          ],
        },
      },
      {
        heading: "Concluzia experimentului",
        paragraphs: [
          "Niciun instrument nu este „mai bun” în absolut. Regula practică pe care o folosesc: pentru o lucrare care va suferi modificări, care se predă în mai multe vederi sau care trebuie să rămână coerentă — modelul Revit plătește investiția inițială de fiecare dată. Pentru o corectură punctuală, o conversie sau un desen de unică folosință — DWG-ul rămâne unealta potrivită.",
          "De aceea ofer ambele: Revit MEP ca flux principal de modelare și documentație, AutoCAD/DWG pentru lucrările care se rezolvă cel mai curat în 2D. Dacă nu ești sigur care se potrivește lucrării tale, trimite-mi fișierele și îți spun exact ce aș folosi și de ce.",
        ],
      },
    ],
  },
  {
    slug: "cum-verifici-un-model-revit-primit",
    title: "Cum verifici un model Revit primit de la altcineva — checklist de preluare",
    metaTitle: "Cum verifici un model Revit primit: checklist",
    description:
      "Checklist de preluare pentru un fișier RVT primit de la altcineva: ce verifici înainte de a promite termene și semnele unui model prost construit.",
    date: "2026-08-21",
    readingTime: 9,
    tags: ["Revit MEP", "Control calitate", "Preluare proiect"],
    sections: [
      {
        paragraphs: [
          "Preluarea unui model Revit început de altcineva este una dintre cele mai riscante lucrări din modelare: primești un fișier care arată bine în 3D, dar în interior poate fi construit în zece feluri diferite, cu familii explodate, filtre duplicate și parametri inventați. Timpul de curățare poate depăși timpul de modelare. Acest checklist este exact ordinea în care verific eu un model primit, înainte de a estima orice termen.",
        ],
      },
      {
        heading: "Pasul 1 — Integritatea fișierului",
        list: [
          "Deschide modelul fără a încărca link-uri: dacă lipsește arhitectura, ceri link-urile înainte de orice.",
          "Verifică dimensiunea fișierului față de conținut: un model de 300 MB pentru o casă ascunde de obicei importuri CAD grele sau familii explode.",
          "Rulează un audit de fișier (Revit → Audit) la deschidere — semnalează corupții care altfel apar exact înainte de predare.",
        ],
      },
      {
        heading: "Pasul 2 — Structura modelului",
        list: [
          "Browser-ul de proiect: există o logică de organizare a vederilor și sheet-urilor, sau totul e aruncat la rădăcină?",
          "Familiile: câte sunt „Familii locale” vs. încărcate din bibliotecă? O mulțime de familii locale înseamnă muncă nereutilizabilă.",
          "Parametrii partajați: există un fișier de parametri partajați predat odată cu modelul? Fără el, orice program (schedules) care îi folosește devine fragil.",
          "Fazele: modelul are faze setate corect sau totul e „Fază nouă” cu excepții manuale?",
        ],
      },
      {
        heading: "Pasul 3 — Calitatea modelării MEP",
        list: [
          "Sistemele sunt reale (conectate logic) sau traseele sunt doar geometrie fără sistem? Fără sisteme, nu ai liste, nu ai filtre, nu ai control.",
          "Pantele la canalizare: sunt modelate ca pante reale sau „desenate aproximativ” cu texte puse manual?",
          "Cotele și etichetele: citesc valori reale din elemente sau sunt text static? Textul static minte la prima modificare.",
          "Coliziunile existente: rulează o verificare de interferențe înainte de a promite că „doar continui” — moștenești fiecare conflict.",
        ],
      },
      {
        heading: "Pasul 4 — Ce spui clientului înainte de a începe",
        paragraphs: [
          "Dacă modelul pică jumătate din verificări, varianta corectă profesional este să spui asta deschis: „Fișierul primit necesită X ore de curățare înainte de continuare; costul este Y; alternativa este remodelarea porțiunilor problematice”. Promisiunea de a „continua orbește” este exact cum se nasc proiectele care se livrează târziu și prost.",
          "Acest tip de preluare și reorganizare este o lucrare pe care o fac des — dacă ai un model moștenit, trimite-mi-l și îți spun exact ce am găsit și cât costă să-l aduc în stare de lucru.",
        ],
      },
    ],
  },
  {
    slug: "lod-explicat-practic",
    title: "LOD explicat practic: ce înseamnă LOD 100–400 în instalații",
    metaTitle: "LOD explicat practic: LOD 100–400 în instalații",
    description:
      "LOD (Level of Development) pe un proiect de instalații: ce conține fiecare nivel, ce se cere într-o ofertă și cum eviți să plătești LOD 350 pentru LOD 200.",
    date: "2026-08-21",
    readingTime: 8,
    tags: ["BIM", "Standarde", "Revit MEP"],
    sections: [
      {
        paragraphs: [
          "„Vreau modelul la LOD 350” este o cerință care apare în aproape fiecare caiet de sarcini — și care, în practică, rareori înseamnă același lucru pentru ambele părți. LOD (Level of Development) descrie cât de dezvoltat și de fiabil este un element din model, nu cât de detaliat arată. Diferența dintre „dezvoltat” și „arătos” este exact locul unde se pierd banii.",
        ],
      },
      {
        heading: "Nivelurile, pe un exemplu concret: un ventiloconvector",
        table: {
          head: ["Nivel", "Ce conține elementul", "La ce folosește"],
          rows: [
            [
              "LOD 100",
              "Un simbol sau un volum generic, cu locul aproximativ",
              "Studii de fezabilitate, concept — doar ca să existe ceva acolo",
            ],
            [
              "LOD 200",
              "Element cu dimensiuni aproximative, poziție orientativă",
              "Predimensionare, coordonare grosieră între discipline",
            ],
            [
              "LOD 300",
              "Geometrie corectă, poziție exactă, sistem conectat, parametri tehnici",
              "Proiectul care se poate autoriza și executa — nivelul standard al planșelor",
            ],
            [
              "LOD 350",
              "LOD 300 + conexiunile la trasee verificate, suporturi, spații de mentenanță",
              "Coordonare finală interdisciplinară, verificarea montajului",
            ],
            [
              "LOD 400",
              "Tot ce e în 350 + detalii de fabricație și montaj exacte",
              "Prefabricare, execuție asistată direct din model",
            ],
          ],
        },
      },
      {
        heading: "Unde se pierd banii în practică",
        paragraphs: [
          "Problema clasică: se cere LOD 350 în contract, dar livrabilele cerute sunt planșe 2D la scara 1:50. Adică se plătește coordonare de montaj pentru o documentație care nu o folosește. Invers: se cere „doar modelul” la LOD 200, dar modelul trebuie să stea la baza listelor de cantități pentru licitație — liste care au nevoie de LOD 300 ca să fie corecte.",
          "Regula simplă: nivelul LOD se stabilește pornind de la ce se face cu modelul, nu de la un număr la modă. Un element la LOD 300 corect construit valorează mai mult decât unul „350” care doar are mai multe detalii desenate, dar fără sisteme și parametri.",
        ],
      },
      {
        heading: "Cum ceri corect într-o ofertă",
        list: [
          "Specifică scopul: „modelul servește la X” — restul derivă de acolo.",
          "Cere nivelul pe discipline, nu global: HVAC la 300 poate coexista cu sanitare la 200 într-o fază timpurie.",
          "Cere criterii de acceptare: „sisteme conectate, fără coliziuni la verificare, parametri X, Y, Z completați” — măsurabil, nu descriptiv.",
          "Întreabă explicit ce înseamnă LOD-ul ofertat: dacă răspunsul e vag, prețul va fi vag.",
        ],
        note: "În ofertele NOD BIM, nivelul de detaliu este parte din scopul lucrării, stabilit în scris înainte de start — exact ca să nu existe „LOD 350” care înseamnă altceva pentru fiecare.",
      },
    ],
  },
  {
    slug: "ce-fisiere-trimiti-pentru-modelare-mep",
    title: "Ce fișiere să trimiți pentru modelare MEP — ghid pentru arhitecți și beneficiari",
    metaTitle: "Ce fișiere trimiți pentru modelare MEP: ghid",
    description:
      "Ce se poate face din fiecare format (DWG, PDF, RVT, schițe), ce lipsește cel mai des și cum trimiți tema ca estimarea să fie corectă din prima.",
    date: "2026-08-21",
    readingTime: 7,
    tags: ["Proces", "Ghid", "Fișiere"],
    sections: [
      {
        paragraphs: [
          "Jumătate din timpul unei estimări se pierde pe fișiere incomplete. Acest ghid este exact ce cer eu de la un client nou — îl poți folosi ca listă de verificare înainte de a trimite orice cerere de modelare sau planșe de instalații.",
        ],
      },
      {
        heading: "Ce se poate face din fiecare format",
        table: {
          head: ["Format", "Ce primești", "Ce nu primești"],
          rows: [
            [
              "RVT (Revit)",
              "Model complet editabil: cel mai bun punct de plecare",
              "Necesită versiune compatibilă; predarea se stabilește contractual",
            ],
            [
              "DWG (AutoCAD)",
              "Planuri vectoriale, la scară, cu layere",
              "Fără model 3D; calitatea depinde de organizarea layere-lor",
            ],
            [
              "PDF",
              "Planuri doar pentru referință/redesenare",
              "Fără date vectoriale utilizabile direct — totul se redesenază",
            ],
            [
              "Schițe / imagini",
              "Punct de pornire pentru concept",
              "Necesită interpretare și clarificări; risc mare de neînțelegeri",
            ],
          ],
        },
      },
      {
        heading: "Cele mai frecvente lipsuri (și de ce contează)",
        list: [
          "Arhitectura lipsește: fără planurile de arhitectură, instalațiile se modelează „în gol” — și se refac la prima suprapunere.",
          "Tema nu spune disciplinele: „vreau instalații” poate însemna 2 sau 6 specialități — diferența de preț e de ordinul 3-5x.",
          "Fără informații despre echipamente: centrală, ventilație, tablouri — dacă nu există, se lucrează cu ipoteze care se plătesc la revizii.",
          "Fără termen și scop: planșe pentru autorizație vs. planșe pentru execuție sunt lucrări diferite.",
        ],
      },
      {
        heading: "Lista completă de trimitere",
        paragraphs: [
          "Ca regulă, o cerere completă conține: (1) planurile de arhitectură în DWG sau PDF, la scară, cu toate nivelurile; (2) tema proiectului — ce discipline, ce echipamente, ce norme; (3) fișierele existente în orice format, chiar și vechi — mai bine prea multe decât prea puține; (4) termenul dorit; (5) scopul livrabilelor (autorizație, execuție, predare către alt proiectant).",
          "Cu aceste cinci lucruri, o estimare corectă durează o zi, nu o săptămână de întrebări. Și da — trimite fișierele direct pe WhatsApp sau prin formularul de estimare; dimensiunea nu e o problemă.",
        ],
      },
    ],
  },
  {
    slug: "cat-costa-modelarea-bim-pe-tip-de-cladire",
    title: "Cât costă modelarea BIM în 2026: prețuri reale pe tip de clădire",
    metaTitle: "Cât costă modelarea BIM în 2026, pe tip de clădire",
    description:
      "Prețuri orientative pentru modelare BIM pe tipuri de clădiri: casă, apartament, birou, hală. Ce determină prețul și cum compari corect ofertele.",
    date: "2026-08-24",
    readingTime: 9,
    tags: ["Prețuri", "BIM", "Revit MEP"],
    sections: [
      {
        paragraphs: [
          "Modelarea BIM nu are un preț unic — dar nici nu e un mister. Dacă prețurile din piață par aleatorii, e pentru că aproape nimeni nu le explică public. Acest articol descompune costul modelării pe tipuri reale de clădiri, cu intervale orientative și cu factorii care le schimbă.",
        ],
      },
      {
        heading: "Prețuri orientative pe tip de clădire (modelare + planșe rezultate)",
        table: {
          head: ["Tip clădire", "Interval orientativ", "Ce include de regulă"],
          rows: [
            [
              "Apartament (tip 2-3 camere)",
              "800 – 1.500 lei",
              "1-2 discipline, planuri de nivel, 2-3 planșe",
            ],
            [
              "Casă P+1 / P+2",
              "1.500 – 3.500 lei",
              "2-3 discipline, planuri + secțiuni, 4-8 planșe",
            ],
            [
              "Birou / spațiu comercial (100-300 mp)",
              "2.500 – 6.000 lei",
              "3 discipline, coordonare, 6-12 planșe",
            ],
            [
              "Clădire rezidențială (bloc mic)",
              "8.000 – 20.000 lei",
              "Toate disciplinele, model coordonat, 20+ planșe",
            ],
            [
              "Hală industrială",
              "10.000 – 30.000 lei",
              "Model MEP + coordonare, echipamente specifice",
            ],
            [
              "Centru de date / spațiu critic",
              "la cerere",
              "Redundanță modelată ca sisteme separate, standarde Tier",
            ],
          ],
        },
      },
      {
        heading: "Ce face ca modelarea să coste mai mult (sau mai puțin)",
        list: [
          "Numărul de discipline: HVAC + termice + electrice înseamnă coordonare triplă, nu doar triplul desenului.",
          "Starea fișierelor de intrare: un DWG curat e de două ori mai ieftin de modelat decât un PDF scanat.",
          "Nivelul de detaliu cerut: LOD 200 (concept) vs LOD 350 (coordonare de montaj) sunt alte lucrări.",
          "Reviziile incluse: 1-2 runde normale sunt standard; schimbări majore de temă sunt lucrare nouă.",
          "Termenul: urgența plătește ore suplimentare, nu altceva.",
        ],
      },
      {
        heading: "Cum compari ofertele corect",
        paragraphs: [
          "Nu compara prețul total — compară ce e în spatele lui: câte planșe, ce formate, câte runde de revizii, cine verifică modelul, termenul. O ofertă cu 30% mai ieftină care livrează doar jumătate din ce ai nevoie e, de fapt, mai scumpă.",
          "Regula pe care o folosesc eu: dacă oferta nu spune explicit ce primești la final, cere-o în scris înainte de orice plată.",
        ],
        note: "Pe site-ul NOD BIM prețurile orientative sunt publice — de la corectare de planșă la pachete complete — ca să poți compara direct.",
      },
      {
        heading: "Cum reduci costul fără a pierde din calitate",
        paragraphs: [
          "Trimite fișiere curate și complete, stabilește scopul (autorizație vs execuție) și termenul realist, și fă schimbările de temă înainte de începerea lucrării, nu pe parcurs. Modelarea BIM plătește investiția de fiecare dată, pentru că documentația rămâne coerentă din aceeași sursă.",
        ],
      },
    ],
  },
  {
    slug: "clash-detection-ce-este",
    title: "Clash detection: ce se verifică de fapt într-un model și când devine o problemă",
    metaTitle: "Clash detection: ce se verifică într-un model MEP",
    description:
      "Clash detection (verificarea de coliziuni): ce tipuri de coliziuni există, ce se verifică într-un model MEP și cât costă prinsul lor târziu.",
    date: "2026-08-24",
    readingTime: 8,
    tags: ["Coordonare", "BIM", "Revit MEP"],
    sections: [
      {
        paragraphs: [
          "Clash detection înseamnă verificarea automată a intersectărilor dintre elementele modelului — nu doar între instalații, ci între instalații și structură sau arhitectură. O conductă de 200 mm care traversează un grinda... acelea nu se văd în plan 2D, dar se văd imediat în modelul coordonat.",
        ],
      },
      {
        heading: "Cele trei tipuri de coliziuni care contează",
        list: [
          "Hard clash: două obiecte care se intersectează fizic (conductă prin grindă). Este cel mai vizibil și cel mai frecvent prins.",
          "Soft clash: spațiu insuficient fără intersecție directă — curburi minim, spațiu de montaj, izolație, sarcini de mentenanță.",
          "Clearance: zonele de acces și serviciu — o vană care nu mai poate fi operată pentru că tabloul este în fața ei.",
        ],
        paragraphs: [
          "În coordonarea 2D, toate cele trei tipuri se verifică manual, vizual, desen cu desen. De aceea erorile apar exact în planurile aglomerate.",
        ],
      },
      {
        heading: "Cât costă o coliziune prinsă târziu",
        table: {
          head: ["Etapa în care se prinde", "Cost tipic de remediere", "Observații"],
          rows: [
            [
              "În model (înainte de predare)",
              "Nimic — se mutează traseul",
              "O singură modificare, toată documentația se actualizează",
            ],
            [
              "La execuție, înainte de montaj",
              "Săptămâni + materiale",
              "Reluări, neclarități, discuții între echipe",
            ],
            [
              "La montaj (pe șantier)",
              "Zile de oprire + reluare",
              "Cel mai scump scenariu, plus riscul de improvizații",
            ],
          ],
        },
      },
      {
        heading: "Ce se verifică într-un model MEP coordonat",
        list: [
          "Traseele de aer și conducte față de grinzi și goluri de montaj",
          "Spațiul de serviciu la vane, filtre și echipamente",
          "Gabaritele de întreținere (acces pentru schimbare de piese)",
          "Traverse și penetrații compartimentate",
          "Traseele electrice față de conducte de apă (regula de aur a coordonării)",
        ],
      },
      {
        heading: "Cum arată un raport de coordonare",
        paragraphs: [
          "Un raport serios nu e o listă de erori — e o hartă a priorităților: coliziunile critice (care blochează montajul), minore (cosmetice) și zonele de atenție. Fiecare cu poziție, schiță și remediere propusă.",
          "Dacă modelul tău vine de la altcineva, această verificare e primul lucru pe care îl fac înainte de orice termen promis — un model cu zeci de coliziuni moștenite costă mai mult de curățat decât de construit.",
        ],
      },
    ],
  },
  {
    slug: "documentatie-instalatii-dtac-pt",
    title:
      "Documentația de instalații pentru autorizație (DTAC) și proiect tehnic (PTh): pași și greșeli care întârzie",
    metaTitle: "Documentația de instalații pentru DTAC și PTh",
    description:
      "Ce intră în DTAC la instalații, care e diferența față de PTh și ce greșeli blochează autorizarea. Ghid practic pentru beneficiari și arhitecți.",
    date: "2026-08-24",
    readingTime: 9,
    tags: ["Autorizație", "Documentație", "Instalații"],
    sections: [
      {
        paragraphs: [
          "Documentația tehnică de instalații este partea care întârzie cel mai des autorizațiile — nu pentru că ar fi greu de făcut, ci pentru că se pregătește pe ultima sută de metri și sub presiune. Acest ghid îți arată ce trebuie să conțină și unde se pierde timpul de fapt.",
        ],
      },
      {
        heading: "Ce intră în DTAC la instalații",
        list: [
          "Planuri de instalații pe fiecare nivel, cu trasee, echipamente și simboluri standard",
          "Scheme de principiu pe discipline (electrice, termice, ventilare)",
          "Detalii tehnice relevante la scara uzuală",
          "Legende cu simbolurile folosite, cote și adnotări clare",
          "Notă de dimensionare pe instalațiile principale, acolo unde este cerută",
        ],
        paragraphs: [
          "Toate piesele trebuie să fie coerente între ele — un plan care nu corespunde cu schema de principiu e primul motiv de respingere.",
        ],
      },
      {
        heading: "DTAC vs PTh: diferența reală",
        table: {
          head: ["", "DTAC (autorizație)", "PTh (proiect tehnic)"],
          rows: [
            ["Scop", "Obținerea autorizației de construire", "Execuția propriu-zisă a lucrării"],
            [
              "Nivel de detaliu",
              "Definitivarea conceptului, verificarea conformității",
              "Detalii de execuție, liste de materiale, amplasări exacte",
            ],
            [
              "Instalații",
              "Trasee principale, scheme, echipamente",
              "Trasee complete, cote, detalii de montaj, scheme unifilare",
            ],
            ["Cine o folosește", "Autoritatea de autorizare", "Executantul și verificatorii"],
          ],
        },
      },
      {
        heading: "Greșelile care întârzie autorizarea",
        table: {
          head: ["Greșeală", "Impact"],
          rows: [
            [
              "Planuri fără templet și indice (indicator)",
              "Documentul se trimite înapoi pentru completare",
            ],
            [
              "Nerespectarea simbolurilor standard",
              "Verificatorul nu poate urmări logica instalațiilor",
            ],
            [
              "Incoerență între planuri și scheme",
              "Se cere refacerea pieselor sau explicații suplimentare",
            ],
            ["Date incomplete despre echipamente", "Dimensionarea devine incertă, apar observații"],
            [
              "Lipsa notelor și a detaliilor la zona unităților externe",
              "Observații la fațade și amplasamente",
            ],
          ],
        },
      },
      {
        heading: "Cum te pregătești ca să nu refaci nimic",
        paragraphs: [
          "Pregătește de la început documentația ca un set coerent: același template, aceleași simboluri, numerotare unică a planșelor. Dacă arhitectura este la final, instalațiile se pot desena pe un ACAS curat, fără dubluri.",
          "Aceasta este exact tipul de lucrare pe care o predau ca livrabil de sine stătător — documentația iese din model, cu planșe, legende și indicator gata de depunere.",
        ],
      },
    ],
  },
  {
    slug: "template-revit-mep-bun",
    title: "Ce trebuie să conțină un template Revit MEP bun (și cum recunoști unul făcut prost)",
    metaTitle: "Ce conține un template Revit MEP bun",
    description:
      "Ce trebuie să conțină un template Revit MEP bun, semnalele unuia făcut prost și cât timp îți economisește la pornirea unui proiect.",
    date: "2026-08-24",
    readingTime: 8,
    tags: ["Revit MEP", "Workflow", "Template"],
    sections: [
      {
        paragraphs: [
          "Template-ul de proiect este baza din care pornește fiecare lucrare Revit: stiluri, filtre, parametri, indicator, legende. Unul bun îți economisește zile la fiecare proiect. Unul prost te costă săptămâni de corectat lucruri care ar fi trebuit să fie setate o singură dată.",
        ],
      },
      {
        heading: "Ce trebuie să conțină un template MEP serios",
        list: [
          "Indicator (cartuș) conform cu cerințele uzuale, cu format A3/A4 și variațiile la scară",
          "Stiluri de linie și obiecte cu grosimi logice pe discipline",
          "Filtre de vizibilitate pe sistem (rețea de aer, conducte, circuite electrice)",
          "View templates pe tip de vedere: plan, secțiune, 3D, sheet",
          "Parametri partajați cu un fișier .txt predat odată cu template-ul",
          "Seturi de legende și simboluri standard",
          "Schedules predefinite pentru liste de cantități",
          "Niveluri, axe și grille inițializate corect",
        ],
      },
      {
        heading: "Semnalele unui template făcut prost",
        list: [
          "Stiluri duplicate cu nume asemănătoare (Lini 1, Lini 2, Linie 1 copy)",
          "Filtre făcute pe deșertăciune, care se strică la prima modificare",
          "Familii locale în loc de familii încărcate din bibliotecă",
          "Parametri fără unități sau cu nume ambigue",
          "Indicator care nu se scalează la A3 cu textul suprapus",
        ],
      },
      {
        heading: "Cât economisești de fapt",
        paragraphs: [
          "În realitate, 2-4 ore la începutul fiecărui proiect plus, mai important, erori evitate: planșe cu simboluri inconsistente, liste incorecte, revizii care puteau fi evitate. La un volum de 10 proiecte pe an, template-ul bun e diferența dintre o jumătate de săptămână și patru săptămâni de muncă.",
          "Dacă proiectul tău nu are un template ținut la zi, orice lucrare nouă pornește cu handicap — și exact asta e prima verificare pe care o fac la orice preluare de model.",
        ],
        note: "Template-uri MEP curate, cu indicator și simboluri, sunt parte din gama de resurse pe care le pot pregăti la comandă — detalii la cerere prin formularul de contact.",
      },
    ],
  },
  {
    slug: "instalatii-centre-de-date",
    title: "Instalațiile unui centru de date: redundanță, Tier și ce se vede în modelul BIM",
    metaTitle: "Instalațiile unui centru de date: redundanță, Tier",
    description:
      "De ce instalațiile unui data center diferă de cele ale unui birou: N+1, 2N, Tier I–IV, răcirea de precizie și rolul modelului BIM în proiectare și operare.",
    date: "2026-08-21",
    readingTime: 10,
    tags: ["Centre de date", "HVAC", "Electrice", "BIM"],
    sections: [
      {
        paragraphs: [
          "Un centru de date nu este o clădire cu servere în ea. Este o mașinărie de continuitate, în care instalațiile nu sunt un capitol al proiectului, ci produsul principal. Dacă într-un birou o pană de curent înseamnă o cafea în plus, într-un data center înseamnă contracte încălcate. Acest articol explică principiile care fac instalațiile unui data center fundamental diferite — și de ce modelarea lor BIM este altfel decât orice altă modelare.",
        ],
      },
      {
        heading: "Redundanța: N, N+1, 2N — și de ce contează fiecare literă",
        paragraphs: [
          "În proiectarea instalațiilor, „N” reprezintă capacitatea necesară exactă pentru sarcină. Redundanța adaugă capacitate de rezervă, iar notațiile spun povestea completă:",
        ],
        list: [
          "N — fără redundanță: orice echipament care cade oprește serviciul. Suficient pentru birouri, inacceptabil pentru date.",
          "N+1 — un echipament de rezervă în plus față de necesar: dacă un chiller cade, celelalte acoperă sarcina.",
          "2N — dublarea completă a căii de alimentare/răcire: două sisteme independente, oricare dintre ele poate susține singur întreaga sarcină.",
          "2N+1 și peste — dublare completă plus rezerve suplimentare, pentru cele mai critice operațiuni.",
        ],
      },
      {
        paragraphs: [
          "Această logică se aplică pe tot lanțul: alimentare electrică (rețea + generatoare + UPS), răcire (chillere, pompe, ventilatoare), distribuție. Modelul BIM reflectă fiecare cale redundantă ca sistem separat — nu doar desenat separat, ci legat logic: din ce tablou se alimentează fiecare consumator, pe ce cale de răcire stă fiecare echipament.",
        ],
      },
      {
        heading: "Tier I–IV: ce înseamnă de fapt certificarea Uptime",
        paragraphs: [
          "Clasificarea Uptime Institute măsoară disponibilitatea așteptată a centrului de date, și fiecare nivel cere o altă arhitectură a instalațiilor:",
        ],
        table: {
          head: [
            "Nivel",
            "Redundanță tipică",
            "Disponibilitate țintă",
            "Ce înseamnă pentru instalații",
          ],
          rows: [
            [
              "Tier I",
              "N",
              "99,671%",
              "O singură cale de alimentare și răcire; întreruperi planificate pentru mentenanță",
            ],
            [
              "Tier II",
              "N+1 parțial",
              "99,741%",
              "Componente redundante, dar cale unică de distribuție",
            ],
            [
              "Tier III",
              "N+1, mentenanță concurentă",
              "99,982%",
              "Orice componentă poate fi scoasă din funcțiune fără oprirea centrului",
            ],
            [
              "Tier IV",
              "2N, toleranță la defect",
              "99,995%",
              "Două căi complete independente; un singur defect oriunde nu întrerupe serviciul",
            ],
          ],
        },
      },
      {
        paragraphs: [
          "Diferența dintre 99,982% și 99,995% pare mică pe hârtie — înseamnă, de fapt, diferența dintre ~1,6 ore și ~26 de minute de indisponibilitate pe an. Iar costul instalațiilor crește exponențial cu fiecare nouă zecimală. De aceea proiectarea începe întotdeauna de la întrebarea corectă: ce disponibilitate cere business-ul, nu ce disponibilitate se poate construi.",
        ],
      },
      {
        heading: "Ce se vede în modelul BIM al unui data center",
        paragraphs: [
          "Modelarea BIM într-un centru de date nu este despre „desenat frumos”. Modelul devine instrumentul de coordonare și de operare:",
        ],
        list: [
          "Căile redundante modelate ca sisteme distincte, colorate și filtrate logic — verifici în model că 2N este cu adevărat 2N, nu doar pe schema unifilară.",
          "Răcirea de precizie: culoare reci/calde, containere de aer, trasee de agent sub pardoseală — toate coordonate 3D, pentru că spațiul dintre grinzi și tăvi este la fel de prețios ca serverele.",
          "Liste de cabluri, tăvi, echipamente generate direct din model — numărul de elemente dintr-un data center face desenarea manuală impracticabilă.",
          "„As-built” operabil: modelul predat devine harta digitală pe care echipa de operare urmărește mentenanța și modificările ulterioare.",
        ],
      },
      {
        heading: "Ce înseamnă asta pentru tine",
        paragraphs: [
          "Dacă proiectezi sau construiești spații tehnice — camere de servere, centre mici, spații cu cerințe de continuitate — principiile de mai sus se aplică scalate: redundanță corect dimensionată, căi separate, documentație care reflectă realitatea. Iar dacă vrei un model Revit MEP care să țină evidența acestor logici, acesta este exact tipul de lucrare pe care îl modelez.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
