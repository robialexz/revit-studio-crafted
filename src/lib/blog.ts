/**
 * Articolele tehnice NOD BIM — conținut de inginerie cu probe practice,
 * nu umplutură SEO. Fiecare articol are o temă complicată, explicată
 * din experiența de lucru reală.
 */
export type ArticleSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  links?: { label: string; href: string }[];
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
    slug: "xref-lipsa-autocad-preluare-dwg",
    title: "DWG cu Xref lipsă: ce verifici înainte de preluare",
    metaTitle: "Xref lipsă în AutoCAD: preluarea corectă a DWG-ului",
    description:
      "Ai primit un DWG cu referințe externe lipsă? Vezi cum clarifici sursele, căile și poziționarea înainte de a cere continuarea desenării în AutoCAD.",
    date: "2026-10-08",
    readingTime: 5,
    tags: ["AutoCAD", "Xref", "Preluare DWG", "Referințe externe"],
    sections: [
      {
        paragraphs: [
          "Ai primit un DWG care se deschide, dar lipsesc pereți, echipamente sau o parte din plan. Înainte să ceri redesenarea elementelor absente, verifică dacă desenul depinde de alte fișiere. Uneori, problema este o referință externă lipsă sau o legătură către un folder care exista numai pe calculatorul expeditorului.",
          "Pentru continuarea desenării în AutoCAD, trebuie stabilit ce conține fișierul principal, ce vine din surse externe și unde sunt permise modificările. Această verificare ajută la definirea lucrării înainte de ofertă.",
        ],
      },
      {
        heading: "Un Xref păstrează legătura cu un alt DWG",
        paragraphs: [
          "În terminologia AutoCAD, un Xref este o referință externă către un fișier DWG. Desenul gazdă afișează conținutul din Model Space al sursei, printr-o legătură. Actualizările sursei salvate se reflectă la redeschiderea gazdei sau la reîncărcarea referinței.",
          "Prin urmare, un plan vizibil în DWG-ul principal poate aparține altui fișier. Pentru o corectură, precizează dacă se schimbă desenul gazdă ori sursa referențiată. Cere păstrarea legăturilor dacă sursele trebuie actualizate ulterior; integrarea permanentă prin Bind este o decizie separată, de confirmat cu proprietarul documentației.",
        ],
        links: [
          {
            label: "Autodesk: legătura dintre desenul gazdă și Xref",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-A987D2FF-45BD-474E-99C1-E6316A42F667.htm",
          },
        ],
      },
      {
        heading: "Identifică fișierul de lucru și sursele acceptate",
        paragraphs: [
          "Mai multe DWG-uri cu nume asemănătoare nu explică automat care este versiunea acceptată pentru lucru. Indică desenul principal, emiterea folosită ca bază și responsabilul care confirmă sursele. Data salvării poate ajuta la identificare, însă nu înlocuiește această confirmare.",
          "Trimite și un PDF de referință care arată configurația așteptată. Acesta permite compararea vizuală a planului deschis cu documentul transmis. Marchează separat sursele care trebuie doar afișate și fișierele în care sunt autorizate corecturi. Astfel, repararea unei legături nu se confundă cu modificarea desenului altui colaborator.",
        ],
      },
      {
        heading: "Starea referinței arată ce trebuie investigat",
        paragraphs: [
          "Paleta External References, deschisă și prin comanda EXTERNALREFERENCES, listează referințele și starea lor. Tree View arată și fișierele referențiate în interiorul altor surse. Nu trata toate elementele absente ca fișiere pierdute.",
        ],
        table: {
          head: ["Stare", "Semnificație", "Ce clarifici înainte de lucru"],
          rows: [
            [
              "Unloaded",
              "Referința este neîncărcată temporar; legătura este păstrată.",
              "Trebuia păstrată ascunsă sau trebuie reîncărcată?",
            ],
            [
              "Not Found",
              "Fișierul nu este găsit în căile de căutare valide.",
              "Lipsește sursa sau trebuie corectată calea?",
            ],
            [
              "Unresolved",
              "Fișierul referențiat nu poate fi citit.",
              "Este disponibilă o sursă care poate fi deschisă?",
            ],
            [
              "Orphaned",
              "Referința depinde de alta neîncărcată, negăsită sau necitibilă.",
              "Care este problema referinței părinte?",
            ],
          ],
        },
        note: "Saved Path este calea memorată în desen; Found At este locația efectivă a fișierului găsit. Compară-le pentru a confirma că se folosește sursa dorită, mai ales când există copii cu același nume.",
        links: [
          {
            label: "Autodesk: stările și căile din External References",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-7947385D-1A5D-4474-9AB9-FD5E46ADEF53.htm",
          },
        ],
      },
      {
        heading: "Păstrează structura folderelor la preluare",
        paragraphs: [
          "AutoCAD permite căi absolute, relative sau fără cale salvată. O cale relativă poate permite mutarea setului pe alt calculator dacă relația dintre foldere se păstrează. Mutarea numai a desenului principal poate rupe această relație.",
          "Cere arhiva cu structura originală și evită reunirea arbitrară a tuturor fișierelor într-un singur folder. Înainte de schimbarea unei căi, identifică sursa corectă. Dacă două emiteri au același nume de fișier, o legătură reparată către copia greșită poate afișa un plan diferit de cel acceptat.",
        ],
        links: [
          {
            label: "Autodesk: căile către desenele referențiate",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-164C2548-91E6-476D-AFDF-6257340C2EE2.htm",
          },
        ],
      },
      {
        heading: "Attachment și Overlay controlează propagarea referinței",
        paragraphs: [
          "Referințele DWG pot fi atașate ca Attachment sau Overlay. Un Overlay este vizibil în gazda lui, dar nu este inclus când acea gazdă este referențiată într-un alt desen.",
          "Exemplu ipotetic: instalatii.dwg afișează arhitectura.dwg, iar sinteza.dwg referențiază instalatii.dwg. Dacă arhitectura este Overlay în instalatii.dwg, nu se propagă prin această legătură în sinteza.dwg. Ca Attachment, poate apărea ca referință imbricată. Alegerea trebuie să corespundă organizării desenelor cerute de client; schimbarea tuturor referințelor în Attachment nu este o soluție universală pentru lipsurile din plan.",
        ],
        links: [
          {
            label: "Autodesk: referințe imbricate și Overlay",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-0D7D1315-B58A-4BCD-9953-282FF578B144.htm",
          },
        ],
      },
      {
        heading: "O sursă găsită trebuie verificată și în poziție",
        paragraphs: [
          "Dialogul de atașare permite stabilirea punctului de inserție, a factorilor de scară și a rotației. El afișează și informațiile despre unități și factorul de conversie calculat din acestea. Faptul că referința s-a încărcat nu confirmă singur alinierea.",
          "Transmite unitățile, reperele comune și poziționarea cerută, dacă sunt cunoscute. Verifică o dimensiune și câteva repere convenite cu proiectantul. Dacă sursa apare deplasată, rotită sau la o dimensiune neașteptată, clarifică setările înainte să fie mutată manual pentru a semăna cu PDF-ul.",
        ],
        links: [
          {
            label: "Autodesk: inserție, scară, rotație și unități pentru Xref",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-53030EDD-1D1D-40C4-922E-9B964A048ED9.htm",
          },
        ],
      },
      {
        heading: "Checklist pentru continuarea desenării în AutoCAD",
        list: [
          "Desenul principal și sursele externe sunt identificate prin fișier și emitere.",
          "Structura folderelor este păstrată, inclusiv dependențele imbricate.",
          "Lipsurile și referințele neîncărcate intenționat sunt semnalate separat.",
          "PDF-ul de referință permite verificarea configurației așteptate.",
          "Unitățile și reperele de poziționare sunt confirmate sau marcate pentru clarificare.",
          "Este precizat ce fișiere pot fi modificate și cine acceptă schimbările.",
          "Lista intervențiilor și livrabilele DWG/PDF sunt definite.",
        ],
        note: "Checklistul este o propunere de organizare a preluării, adaptabilă procesului clientului.",
      },
      {
        heading: "Ai nevoie de pregătirea unui DWG primit?",
        paragraphs: [
          "NOD BIM oferă corecturi AutoCAD, organizarea layerelor, blocurilor și referințelor externe, plus pregătirea documentelor DWG/PDF. Trimite fișierele și cerințele pentru evaluarea lucrării; costul se stabilește după verificarea documentației, înainte de începere. Calculele, soluțiile tehnice și semnătura de specialitate rămân la proiectanții responsabili.",
        ],
        links: [
          {
            label: "Servicii AutoCAD: pregătire DWG și referințe externe",
            href: "/autocad-dwg",
          },
        ],
      },
    ],
  },
  {
    slug: "liste-cantitati-revit-mep-campuri-filtre-verificare",
    title: "Liste de cantități Revit MEP: ce ceri și cum le verifici",
    metaTitle: "Liste de cantități Revit MEP: câmpuri și verificare",
    description:
      "Ce stabilești pentru listele dintr-un model Revit MEP: categorii, parametri, filtre, unități și modele legate, înainte de externalizarea documentației.",
    date: "2026-10-07",
    readingTime: 5,
    tags: ["Revit MEP", "Liste de cantități", "Parametri", "Documentație"],
    sections: [
      {
        paragraphs: [
          "Ai nevoie ca modelul Revit MEP să vină și cu o listă de echipamente sau de cantități? Cererea «vreau toate cantitățile» nu precizează ce trebuie extras și cum vei verifica rezultatul. Un tabel poate fi lizibil și totuși să includă alte elemente decât cele așteptate.",
          "Pentru un birou care externalizează modelarea HVAC, termică sau electrică, lista trebuie definită ca livrabil: categorii, informații, limite și format. Acest ghid explică ce merită stabilit înainte de lucru și ce verifici în tabelul primit.",
        ],
      },
      {
        heading: "Definește lista după scopul în care o vei folosi",
        paragraphs: [
          "O listă pentru identificarea echipamentelor are alte coloane decât una pentru totalizarea lungimilor. În Revit, crearea unui Schedule/Quantities presupune selectarea categoriei și a fazei, apoi configurarea câmpurilor, filtrelor și grupării.",
          "Exemplele de mai jos sunt orientative; câmpurile disponibile depind de categoria și informațiile modelului.",
        ],
        table: {
          head: ["Lista cerută", "Informații de precizat", "Control util"],
          rows: [
            [
              "Echipamente",
              "Cod, familie/tip, număr de instanțe",
              "Identificarea elementelor din model",
            ],
            [
              "Trasee",
              "Categorie, tip/dimensiune, lungime și unitate",
              "Separarea traseelor de alte componente",
            ],
            [
              "Accesorii sau fitinguri",
              "Categorie, tip și număr",
              "Regulile de grupare și excluderile",
            ],
          ],
        },
        links: [
          {
            label: "Autodesk: crearea unui Schedule/Quantities",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-6D4DBBDA-3611-40CD-9A45-BE40EB07188A.htm",
          },
        ],
      },
      {
        heading: "Cere parametri care identifică elementul",
        paragraphs: [
          "Stabilește denumirea coloanelor și informația pe care trebuie să o conțină. Un cod intern de echipament, un tip și o denumire comercială nu sunt neapărat același parametru. O coloană intitulată convenabil nu demonstrează că valorile sale sunt completate corect.",
          "Revit permite selectarea câmpurilor și folosirea parametrilor de tip sau de instanță. Transmite definițiile parametrilor folosiți de birou și indică ce valori lipsă trebuie raportate. Nu cere completarea lor prin presupuneri.",
          "Documentația Autodesk avertizează că, atunci când introduci parametri partajați într-un tabel, categoriile care nu au parametrul selectat nu sunt afișate. Absența unui rând trebuie investigată înainte să concluzionezi că elementul nu există.",
        ],
        links: [
          {
            label: "Autodesk: selectarea câmpurilor unui tabel",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-F7D48874-EDB0-454B-8E5B-19C551A78978.htm",
          },
          {
            label: "Autodesk: categorii și parametri partajați",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-6D4DBBDA-3611-40CD-9A45-BE40EB07188A.htm",
          },
        ],
      },
      {
        heading: "Verifică filtrele și modelele din care se extrag datele",
        paragraphs: [
          "Un tabel poate afișa numai o parte din model. Notează faza, filtrele și eventualele limite de zonă sau sistem, folosind parametrii disponibili. Revit cere îndeplinirea tuturor filtrelor configurate pentru ca datele să fie afișate; filtrele de text sunt sensibile la litere mari și mici.",
          "Un câmp poate fi ascuns în tabel și totuși folosit pentru filtrare. De aceea, verificarea coloanelor vizibile nu este suficientă pentru a înțelege ce a fost exclus.",
          "Clarifică separat modelul gazdă și modelele legate. Pentru includerea elementelor din legături, Autodesk documentează opțiunea Include elements in links. Cere să fie consemnat dacă este folosită în tabelul respectiv și care sunt fișierele sursă, pentru a evita omisiuni sau includeri nedorite.",
        ],
        links: [
          {
            label: "Autodesk: filtrarea datelor dintr-un tabel",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-C5140A8E-EDB3-4C99-84F0-9299D5136369.htm",
          },
          {
            label: "Autodesk: includerea elementelor din modele legate",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-F7D48874-EDB0-454B-8E5B-19C551A78978.htm",
          },
        ],
      },
      {
        heading: "Un rând grupat poate reprezenta mai multe elemente",
        paragraphs: [
          "Cere explicit dacă vrei fiecare instanță pe un rând sau un sumar pe tipuri. Opțiunea Itemize every instance afișează instanțele individual; când este dezactivată, mai multe instanțe se pot reuni în același rând, potrivit câmpurilor de sortare.",
          "Într-o listă grupată, numărul de rânduri nu este numărul de echipamente. Verifică valoarea Count și regulile grupării. Dacă elementele grupate au valori diferite pentru un parametru, afișarea depinde de setările pentru valori multiple.",
          "Pentru control, poate fi util un tabel detaliat alături de sumar. Aceasta este o recomandare de organizare, nu o cerință obligatorie Autodesk.",
        ],
        links: [
          {
            label: "Autodesk: sortarea și gruparea câmpurilor",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-3ED9C7F0-C340-4317-BCE6-327638ED4A39.htm",
          },
        ],
      },
      {
        heading: "Unitățile și totalurile trebuie să fie explicite",
        paragraphs: [
          "Precizează unitatea și precizia de afișare pentru coloanele numerice. Revit permite formatarea câmpurilor numerice cu unități și ajustarea acesteia separat de setările proiectului.",
          "Totalizarea este disponibilă pentru câmpurile care pot fi însumate și depinde de configurarea tabelului. Cere să fie indicat dacă primești valori pe element, subtotaluri ori un total general. Nu însuma manual o coloană fără să înțelegi ce reprezintă fiecare rând și ce categorii au fost excluse.",
        ],
        links: [
          {
            label: "Autodesk: formatarea câmpurilor și a totalurilor",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-44DD5F85-F715-450B-B98D-1AB23D5F5074.htm",
          },
        ],
      },
      {
        heading: "Checklist pentru primirea listei de cantități",
        list: [
          "Fișierul și data modelului sursă sunt identificate, împreună cu legăturile incluse.",
          "Categoriile, faza, filtrele și excluderile corespund cererii de lucru.",
          "Coloanele au parametri definiți, iar valorile lipsă sunt semnalate.",
          "Instanțele individuale și rândurile grupate se pot distinge; Count este interpretat corect.",
          "Unitățile, precizia și regulile totalurilor sunt explicite.",
          "Câteva elemente selectate pot fi urmărite din tabel până la model.",
          "Formatul primit și lista întrebărilor deschise corespund scopului convenit.",
        ],
      },
      {
        heading: "Cantitățile din model au limitele documentației modelate",
        paragraphs: [
          "Un tabel descrie elementele și informațiile pe care modelul le conține și pe care configurația le include. El nu stabilește singur că documentația este completă pentru achiziție sau că toate componentele necesare au fost modelate.",
          "Orice adaosuri, rezerve sau elemente nemodelate trebuie definite separat de responsabilul documentației. Calculul soluției, verificarea și acceptarea tehnică rămân la proiectant. Lista extrasă nu înlocuiește acest control.",
        ],
      },
      {
        heading: "Pregătești externalizarea documentației Revit MEP?",
        paragraphs: [
          "NOD BIM realizează modelare și documentație HVAC, termică și electrică pe tema biroului de proiectare. Dacă ai nevoie și de tabele din model, include exemplul de listă, parametrii și regulile de extragere în cerere, pentru evaluare și stabilirea livrabilelor. Trimite fișierele și cerințele înainte de începerea lucrării.",
        ],
        links: [
          {
            label: "Externalizare Revit MEP pentru birouri de proiectare",
            href: "/revit-mep",
          },
        ],
      },
    ],
  },
  {
    slug: "corecturi-dwg-pdf-redline-layout-predare",
    title: "Corecturi DWG după PDF redline: ce ceri înainte de predare",
    metaTitle: "Corecturi DWG după PDF redline: layout și predare",
    description:
      "Ai un DWG și observații pe PDF? Vezi ce trimiți pentru corecturi AutoCAD, cum se verifică layouturile și ce trebuie să conțină predarea.",
    date: "2026-10-05",
    readingTime: 5,
    tags: ["AutoCAD", "Corecturi DWG", "Layout", "Predare documentație"],
    sections: [
      {
        paragraphs: [
          "Ai deja desenul DWG, dar proiectantul sau beneficiarul a trimis un PDF cu observații: texte de corectat, elemente de mutat, cote de actualizat sau planșe de reorganizat. Acest PDF comentat este numit adesea redline. Lucrarea pornește de la fișierul editabil existent și cere aplicarea observațiilor, apoi controlul documentelor predate.",
          "Pentru o ofertă clară, descrie atât modificările, cât și rezultatul dorit: DWG editabil, layouturi pregătite și PDF-uri care pot fi verificate. Corectarea desenului și pregătirea tipăririi sunt etape distincte ale aceleiași livrări.",
        ],
      },
      {
        heading: "Ce trimiți pentru corecturi AutoCAD",
        paragraphs: [
          "Indică fișierul de bază și PDF-ul căruia îi corespund observațiile. Un comentariu făcut pe o emitere mai veche poate cere o schimbare deja aplicată sau poate contrazice desenul curent.",
        ],
        list: [
          "DWG-ul de lucru și fișierele la care se referă: alte DWG-uri, imagini ori PDF-uri atașate.",
          "PDF-ul redline complet, cu data sau codul emiterii și observații lizibile pe planșele afectate.",
          "Lista modificărilor și informațiile aprobate pentru implementare; marchează separat întrebările încă deschise.",
          "Template-ul, indicatorul și regulile pentru layere, texte, cote și denumirea fișierelor, dacă există.",
          "Lista layouturilor de predat, formatele de hârtie, scările cerute și setările de tipărire disponibile.",
          "Versiunea DWG necesară, termenul dorit și persoana care confirmă rezultatul înainte de emitere.",
        ],
      },
      {
        heading: "O observație utilă spune ce se schimbă și unde",
        paragraphs: [
          "Numerotează comentariile și precizează planșa, zona și intervenția cerută. «Corectează planul» lasă prea multe interpretări. O cerere precum «actualizează denumirea echipamentului în această vedere și în legendă» permite verificarea rezultatului în locurile relevante.",
          "Separă modificarea geometrică de schimbarea unui text. Dacă o observație cere o altă dimensiune, trebuie clarificat dacă se modifică elementul desenat, cota sau ambele. Valorile și soluțiile tehnice se transmit de către persoana responsabilă de proiectare; nu se deduc dintr-o săgeată ambiguă.",
          "O listă cu stări precum «de aplicat», «în clarificare» și «verificat» poate ajuta. Este o propunere de organizare, adaptabilă procesului clientului. Închiderea unui comentariu trebuie să indice și documentul în care poate fi controlat.",
        ],
      },
      {
        heading: "Layoutul trebuie verificat împreună cu geometria",
        paragraphs: [
          "În fluxul standard AutoCAD, geometria din Model Space se desenează la dimensiunea reală, în unitățile stabilite. Layoutul din Paper Space organizează foaia, indicatorul și vederile modelului. Scara unei vederi se stabilește prin viewport; schimbarea dimensiunii foii nu justifică scalarea întregii geometrii.",
          "După o corectură, verifică dacă zona modificată rămâne vizibilă în toate layouturile necesare. Controlează încadrarea, scara, textele, cotele, legenda și indicatorul. O modificare corectă în Model Space poate apărea tăiată sau greu de citit pe foaia predată.",
          "După stabilirea scării, blocarea afișării viewportului previne schimbarea accidentală a acesteia la zoom. Autodesk precizează că zoomul se aplică atunci întregului layout, păstrând scara din viewport. Confirmă setarea fiecărui viewport relevant, nu doar a primei planșe.",
        ],
        links: [
          {
            label: "Autodesk: Model Space și Paper Space",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-MAC-Core/files/GUID-990538B6-DDA1-4190-BCC0-BB5BA94C9879.htm",
          },
          {
            label: "Autodesk: blocarea scării unui layout viewport",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-F9A37755-68A8-489D-B508-253EDD88F356.htm",
          },
        ],
      },
      {
        heading: "Compararea DWG-urilor ajută, dar nu verifică întreaga predare",
        paragraphs: [
          "DWG Compare poate evidenția obiecte adăugate, eliminate sau modificate între două desene. Compararea fișierului inițial cu cel corectat este utilă pentru identificarea intervențiilor și a schimbărilor neintenționate.",
          "Există însă o limită importantă: instrumentul operează numai în Model Space. Layouturile trebuie controlate separat. De asemenea, layerele oprite sau înghețate în desenul curent nu intră în rezultatul comparației. Un rezultat fără diferențe vizibile nu demonstrează că toate observațiile sunt rezolvate.",
          "Folosește comparația împreună cu lista comentariilor și verificarea PDF-urilor finale, nu drept confirmare automată a acceptării documentației.",
        ],
        links: [
          {
            label: "Autodesk: DWG Compare și limitele comparației",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-2D69E78D-5C82-464F-B864-CD29D5720EB9.htm",
          },
        ],
      },
      {
        heading: "Predă un pachet care poate fi deschis și tipărit",
        paragraphs: [
          "Un DWG poate depinde de referințe externe și de fișiere pentru afișare sau tipărire. eTransmit ajută la pregătirea unui pachet de transmitere. Verifică lista efectivă a fișierelor incluse și evită amestecarea unor versiuni vechi cu documentația curentă.",
          "Documentația Autodesk enumeră între fișierele adăugate automat referințe DWG, imagini, PDF-uri atașate și fișiere CTB, STB sau PC3 folosite de desene. Aceeași referință listează fonturile SHX și TTF între tipurile care nu sunt adăugate automat. Nu presupune că arhiva conține tot ce este necesar; controlează dependențele și eventualele lipsuri.",
          "Include o listă a planșelor, modificările aplicate și întrebările rămase. Această notă permite clientului să verifice pachetul fără să caute explicații în conversații separate.",
        ],
        links: [
          {
            label: "Autodesk: fișierele incluse într-un pachet eTransmit",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-C32FA153-88D6-41D9-B868-0DFF59509CD2.htm",
          },
        ],
      },
      {
        heading: "Checklist înainte de acceptarea corecturilor",
        list: [
          "Fiecare comentariu are o intervenție verificabilă sau o clarificare explicită.",
          "DWG-ul corectat se deschide, iar referințele necesare sunt disponibile.",
          "Geometria, cotele, textele și legendele corespund observațiilor confirmate.",
          "Layouturile păstrează formatul, scara și încadrarea cerute.",
          "PDF-urile finale au fost deschise și controlate pentru lizibilitate și conținut.",
          "Codurile din indicator și denumirile fișierelor identifică aceeași emitere.",
          "Lista livrabilelor precizează ce a fost inclus și ce rămâne de confirmat.",
        ],
      },
      {
        heading: "Ai un DWG cu observații de implementat?",
        paragraphs: [
          "Serviciile AutoCAD NOD BIM includ corecturi pe planșe existente, implementarea observațiilor, organizarea layerelor și pregătirea layouturilor pentru predarea DWG/PDF. Trimite desenul, PDF-ul comentat și cerințele de livrare pentru evaluarea lucrării. Scopul și costul se stabilesc după verificarea documentației; calculele, verificarea și semnătura de specialitate rămân la proiectanții responsabili.",
        ],
        links: [
          {
            label: "Servicii AutoCAD: corecturi DWG și layouturi",
            href: "/autocad-dwg",
          },
        ],
      },
    ],
  },
  {
    slug: "revizii-revit-mep-observatii-predare-rvt-dwg-pdf",
    title: "Revizii Revit MEP: de la observații la predarea RVT, DWG și PDF",
    metaTitle: "Revizii Revit MEP: observații și predare RVT, DWG, PDF",
    description:
      "Cum organizezi observațiile într-un model Revit MEP, marchezi reviziile și verifici predarea RVT, DWG și PDF pentru biroul de proiectare.",
    date: "2026-10-04",
    readingTime: 5,
    tags: ["Revit MEP", "Revizii", "Documentație", "RVT DWG PDF"],
    sections: [
      {
        paragraphs: [
          "Ai un model Revit MEP și un PDF cu observații de la proiectant. Unele cer mutarea traseelor, altele modificarea adnotărilor sau refacerea planșelor. Pentru a externaliza această rundă de lucru, trebuie să fie clar ce se modifică, unde se verifică și ce documente se predau.",
          "Acest ghid propune o organizare practică a reviziilor pentru modele HVAC, termice și electrice. Nu este un standard obligatoriu: regulile biroului de proiectare și scopul convenit au prioritate. Soluția tehnică rămâne responsabilitatea proiectantului.",
        ],
      },
      {
        heading: "Ce pregătești înainte să trimiți observațiile",
        paragraphs: [
          "Identifică pachetul de referință asupra căruia au fost formulate comentariile. O observație pe un PDF vechi poate intra în conflict cu modelul actual.",
        ],
        list: [
          "Modelul RVT relevant, versiunea Revit și referințele necesare pentru zonele afectate.",
          "PDF-ul comentat, cu data sau codul emiterii, și o listă lizibilă a observațiilor.",
          "Deciziile tehnice aprobate: poziții, dimensiuni și informații furnizate de proiectant pentru implementare.",
          "Planșele și vederile care intră în rundă, inclusiv secțiunile sau listele afectate.",
          "Regulile pentru indicator, numerotarea reviziilor, denumirea fișierelor și exportul DWG.",
          "Formatele cerute, termenul dorit și persoana care confirmă închiderea observațiilor.",
        ],
      },
      {
        heading: "Un registru simplu păstrează întrebările deschise vizibile",
        paragraphs: [
          "Poți atribui fiecărei observații un identificator și o stare. «Implementat» arată că intervenția a fost făcută; «verificat» cere controlul rezultatului. Un comentariu neclar rămâne în clarificare până când proiectantul transmite decizia.",
          "Exemplul de mai jos este ipotetic, fără legătură cu un proiect realizat. Stările sunt o propunere de organizare, nu categorii impuse de Revit.",
        ],
        table: {
          head: ["ID", "Observație", "Verificare", "Stare"],
          rows: [
            [
              "OBS-01",
              "Mutarea unui traseu de ventilare",
              "Plan HVAC și secțiune",
              "În clarificare: poziție de confirmat",
            ],
            [
              "OBS-02",
              "Corectarea unei etichete de echipament",
              "Vedere și planșă termice",
              "De implementat",
            ],
            [
              "OBS-03",
              "Actualizarea legendei electrice",
              "Planșele care folosesc legenda",
              "De verificat",
            ],
          ],
        },
      },
      {
        heading: "Implementează observația și verifică toate documentele afectate",
        paragraphs: [
          "Leagă intervenția de observația primită. Dacă se mută un traseu, controlează vederile în care apare, cotele, etichetele și reprezentarea pe planșe. Dacă se schimbă o informație de echipament, verifică și listele în care este folosită.",
          "O modificare vizibilă în model nu închide singură comentariul. Poate rămâne o notă veche, o vedere nepotrivită sau o planșă omisă din export. În registru, consemnează ce ai modificat și unde poate fi verificat. Separă corectarea documentației de o schimbare nouă de temă, care necesită clarificarea scopului.",
        ],
      },
      {
        heading: "Marchează reviziile fără să confunzi norul cu verificarea",
        paragraphs: [
          "Fluxul Autodesk include introducerea informațiilor în Sheet Issues/Revisions, implementarea schimbării, adăugarea norilor de revizie și verificarea informațiilor afișate pe planșe. Un nor nou primește implicit cea mai recentă revizie; atribuirea poate fi schimbată și trebuie controlată.",
          "Norul indică zona modificată, iar eticheta identifică revizia atribuită. Aceste adnotări nu confirmă acceptarea soluției tehnice. Verifică istoricul din indicator și numerotarea conform regulilor proiectului înainte de emitere.",
          "Un tabel din categoria Revision Clouds permite examinarea norilor și a vederilor sau planșelor asociate. Este un instrument distinct de istoricul reviziilor din indicator.",
        ],
        note: "Norii de revizie din modele Revit legate nu sunt incluși în tabelul Revision Clouds creat în modelul gazdă. Verifică separat documentația modelelor legate.",
        links: [
          {
            label: "Autodesk: Workflow — Revisions",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-312CD63E-12FD-4CA7-A05B-CD7DADBAACA7.htm",
          },
          {
            label: "Autodesk: Revision Clouds",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-73DF5264-6C8B-4E58-AE5B-007FB54C1FDA.htm",
          },
          {
            label: "Autodesk: Create a Revision Cloud Schedule",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-D7A5FFC1-E6B3-4FC1-A764-4BF26F543EC5.htm",
          },
        ],
      },
      {
        heading: "Pregătește o predare coerentă în RVT, DWG și PDF",
        paragraphs: [
          "Stabilește un pachet de emitere: modelul de referință, lista planșelor și exporturile aferente. O structură cu directoare RVT, DWG și PDF, plus o notă de predare, poate ajuta la identificarea versiunii curente. Folosește însă convenția de fișiere a clientului.",
          "Revit poate exporta vederi și planșe în PDF, salva seturi pentru reutilizare și aplica reguli de denumire. Confirmă lista selectată și verifică PDF-urile rezultate: indicator, codul reviziei, lizibilitatea și zonele modificate.",
          "Pentru DWG, controlează configurația de export, versiunea AutoCAD și opțiunea de export al vederilor și legăturilor ca referințe externe. Aceasta influențează dacă pachetul conține fișiere care se referă unele la altele. Predă referințele necesare și verifică rezultatul în aplicația destinatarului.",
        ],
        links: [
          {
            label: "Autodesk: Exporting to PDF",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-E9058256-8A36-4FB8-9809-5AA896FC2237.htm",
          },
          {
            label: "Autodesk: Export to DWG or DXF",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/Revit-DocumentPresent/files/GUID-42C75024-4D71-4831-8910-2747168624A3.htm",
          },
        ],
      },
      {
        heading: "Checklist pentru primirea rundei de revizie",
        list: [
          "Fiecare observație are un răspuns, o verificare indicată sau o întrebare încă deschisă.",
          "Lista planșelor din pachet corespunde scopului și nu amestecă exporturi vechi cu cele curente.",
          "Modelul, indicatorii și fișierele exportate permit identificarea aceleiași emiteri.",
          "DWG-urile includ referințele necesare, iar PDF-urile au fost deschise și controlate.",
          "Nota de predare precizează modificările, excluderile și punctele care așteaptă confirmarea proiectantului.",
        ],
      },
      {
        heading: "Ai nevoie de implementarea observațiilor în Revit MEP?",
        paragraphs: [
          "NOD BIM preia corectări și completări pe modele existente, implementarea observațiilor și reorganizarea planșelor HVAC, termice și electrice. Trimite modelul, comentariile și livrabilele dorite pentru evaluarea lucrării. Fișierul RVT editabil se include când face parte din scopul convenit; calculele, verificarea și semnătura de specialitate rămân la proiectanții responsabili.",
        ],
        links: [
          {
            label: "Externalizare Revit MEP și implementarea observațiilor",
            href: "/revit-mep",
          },
        ],
      },
    ],
  },
  {
    slug: "pdf-in-dwg-vectorial-scanare-scara-oferta",
    title: "Cum transformi un PDF în DWG: ce se convertește și ce se redesenează",
    metaTitle: "Cum transformi un PDF în DWG și când nu merge",
    description:
      "Ce importă AutoCAD dintr-un PDF vectorial, de ce o scanare trebuie redesenată și cum verifici scara în DWG. Ghid practic, înainte să ceri o ofertă.",
    date: "2026-10-03",
    readingTime: 4,
    tags: ["AutoCAD", "PDF în DWG", "Redesenare", "Pregătire fișiere"],
    sections: [
      {
        paragraphs: [
          "Ai un plan vechi în PDF și ai nevoie să modifici compartimentarea, să aplici observații sau să predai un DWG editabil. Prima întrebare este ce informație există în PDF. Două documente care arată asemănător pe ecran pot necesita lucrări diferite: import și curățare pentru geometrie vectorială, respectiv redesenare pentru o scanare.",
          "Înainte să ceri o ofertă, merită să clarifici sursa, dimensiunile de referință și rezultatul dorit. Astfel, estimarea se bazează pe documentația reală și pe modificările necesare.",
        ],
      },
      {
        heading: "PDF vectorial sau scanare: de ce contează",
        paragraphs: [
          "Un PDF vectorial poate conține trasee geometrice și text pe care AutoCAD le importă ca obiecte. O scanare conține o imagine formată din pixeli; funcția obișnuită PDFIMPORT poate atașa imaginea, dar nu o transformă automat în linii CAD editabile. Pentru serviciul de redesenare, imaginea devine o referință.",
          "Mărirea documentului poate oferi indicii: contururile pixelate sugerează o imagine. Verificarea vizuală nu este însă suficientă, iar aceeași pagină poate combina imagine, geometrie și text. Nu trebuie să identifici singur formatul înainte să ceri o evaluare; trimite PDF-ul original, fără capturi de ecran sau fotografii suplimentare.",
        ],
      },
      {
        heading: "De ce importul nu înseamnă recuperarea DWG-ului original",
        paragraphs: [
          "Autodesk explică faptul că exportul în PDF pierde informație și precizie. La import, cote, tabele sau hașuri pot deveni mai multe obiecte separate. Un număr vizibil pe plan nu garantează existența unei cote asociate geometriei.",
          "De aceea, solicită un rezultat descris clar: geometrie care poate fi modificată, layere organizate și texte verificate. Dacă ai și DWG-ul sursă, trimite-l. El poate evita reconstruirea unor informații pierdute în PDF. Un fișier care se deschide în AutoCAD trebuie evaluat și după felul în care poate fi folosit.",
        ],
      },
      {
        heading: "Scara se verifică după dimensiuni cunoscute",
        paragraphs: [
          "Mențiunea «1:100» de pe planșă descrie scara prevăzută pentru tipărire; nu dovedește dimensiunea geometriei importate. Documentul poate fi redimensionat la export sau la imprimare. Setarea unităților și compararea cu o cotă cunoscută sunt verificări separate.",
          "În AutoCAD, redimensionarea se poate face cu SCALE și opțiunea Reference, folosind o distanță existentă și lungimea corectă. Verifică apoi o altă cotă, într-o altă zonă a planului. Pentru o scanare, această a doua verificare este utilă pentru a observa diferențe care nu se rezolvă printr-o singură scalare.",
          "Ca exemplu ipotetic, dacă o distanță notată de 5 metri măsoară 4.800 de unități într-un DWG lucrat în milimetri, există o neconcordanță de clarificat. Nu modifica doar textul cotei. Geometria și dimensiunea de referință trebuie reconciliate înainte de continuarea desenului.",
        ],
      },
      {
        heading: "Ce trimiți pentru o ofertă de conversie sau redesenare",
        paragraphs: [
          "O cerere completă permite separarea importului, curățării și redesenării. Pentru evaluare, pregătește următoarele:",
        ],
        list: [
          "PDF-ul original, cu toate paginile relevante, și orice DWG disponibil. Precizează ce planșe intră în lucrare și care sunt doar referințe.",
          "Cotele lizibile și cel puțin o dimensiune de referință verificată. Dacă dimensiunile lipsesc sau se contrazic, menționează problema.",
          "Lista modificărilor: redesenare fidelă, corecturi punctuale, completări sau aplicarea observațiilor. Marchează clar observațiile pe o copie a planului.",
          "Livrabilul cerut: DWG editabil, PDF pentru tipărire, versiunea DWG necesară și eventuale reguli pentru layere, texte sau indicator.",
          "Termenul dorit și modul în care vrei să verifici rezultatul. Numărul de planșe și reviziile trebuie precizate în ofertă.",
          "Scopul utilizării: bază de lucru, documentație de coordonare ori actualizarea unui desen existent. Semnalează zonele neclare care necesită confirmare.",
        ],
      },
      {
        heading: "Ce verifici la predarea DWG-ului",
        paragraphs: [
          "Deschide fișierul și verifică dacă elementele necesare sunt editabile, dacă unitățile sunt cele convenite și dacă dimensiunile de referință corespund. Controlează și textele, layerele, lizibilitatea PDF-ului final și prezența eventualelor imagini externe.",
          "În fluxul obișnuit AutoCAD, geometria se desenează la dimensiunea reală în Model Space; scara vederilor pentru tipărire se stabilește în layout. Un DWG util trebuie să permită continuarea lucrului și reproducerea previzibilă a planșei.",
          "Redesenarea reproduce informația furnizată. Ea nu confirmă că planul descrie situația actuală din teren și nu înlocuiește calculele, verificarea sau semnătura proiectantului de specialitate.",
        ],
      },
      {
        heading: "Ai un PDF și ai nevoie de un DWG editabil?",
        paragraphs: [
          "Serviciile AutoCAD NOD BIM includ redesenare din PDF sau scanări, corectarea planșelor, organizarea layerelor și pregătirea PDF-ului pentru tipărire. Trimite documentația și descrierea rezultatului dorit pentru evaluare. Costul se stabilește după verificarea fișierelor, înainte de începerea lucrării.",
        ],
        links: [
          {
            label: "Servicii AutoCAD: redesenare PDF în DWG",
            href: "/autocad-dwg",
          },
          { label: "Redesenare PDF în DWG: serviciul", href: "/pdf-in-dwg" },
        ],
      },
      {
        heading: "Surse tehnice",
        links: [
          {
            label: "Autodesk: limitele importului PDF în AutoCAD",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-1202CC8A-364F-4E93-8E86-6F476CD83C72.htm",
          },
          {
            label: "Autodesk: opțiuni de import, scară și layere",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-Core/files/GUID-F94D7059-5B4A-4396-97FE-765B1D037D56.htm",
          },
          {
            label: "Autodesk: calibrarea unei imagini sau a unui PDF după o cotă cunoscută",
            href: "https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/How-to-properly-scale-an-image-after-inserting-into-AutoCAD.html",
          },
          {
            label: "Autodesk: Model Space și Paper Space",
            href: "https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-MAC-Core/files/GUID-990538B6-DDA1-4190-BCC0-BB5BA94C9879.htm",
          },
        ],
      },
    ],
  },
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
        links: [{ label: "Modelare Revit MEP și planșe de instalații", href: "/revit-mep" }],
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
        links: [{ label: "Desenare AutoCAD la comandă", href: "/autocad-dwg" }],
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
        links: [{ label: "Modelare Revit MEP și planșe de instalații", href: "/revit-mep" }],
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
