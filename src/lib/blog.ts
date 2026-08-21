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
    description:
      "Descompun prețul unei planșe de instalații în etape, ore și factori reali: de ce costă „de la 300 lei”, ce se întâmplă cu fișierele tale și de unde apar diferențele de preț între oferte.",
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
    slug: "instalatii-centre-de-date",
    title: "Instalațiile unui centru de date: redundanță, Tier și ce se vede în modelul BIM",
    description:
      "De ce instalațiile unui data center nu seamănă cu cele ale unei clădiri de birouri: N+1, 2N, Tier I–IV, răcirea de precizie și rolul modelului BIM în proiectare și operare.",
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
  {
    slug: "revit-vs-autocad-experiment",
    title: "Experiment: aceeași modificare în Revit vs AutoCAD — ce se întâmplă cu timpul tău",
    description:
      "Un experiment practic de modificare a unui traseu de instalații făcut în paralel în Revit și în AutoCAD: câte desene trebuie actualizate manual, unde apar erorile și de ce „doar desenează în DWG” poate costa mai mult.",
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
    description:
      "Ai primit un fișier RVT de la un colaborator și trebuie să continui lucrul? Checklist-ul complet de preluare: ce verifici înainte de a promite termene, care sunt semnele unui model prost construit și cum eviți să moștenești greșelile altora.",
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
    description:
      "LOD (Level of Development) este cel mai abuzat termen din contractele de modelare. Explicația practică pe un proiect de instalații: ce conține fiecare nivel, ce se cere de fapt într-o ofertă și cum eviți să plătești pentru LOD 350 când primești LOD 200.",
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
    description:
      "Ghidul practic al fișierelor pentru o cerere de modelare sau planșe de instalații: ce se poate face din fiecare format (DWG, PDF, RVT, schițe), ce lipsește cel mai des și cum să trimiți tema ca estimarea să fie corectă din prima.",
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
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
