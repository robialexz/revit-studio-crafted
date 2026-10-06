# Redesign NOD BIM: site, SEO și Google Ads

Data: 2026-10-05 · Stare: revizuit, de aprobat · Machetă: https://claude.ai/artifact/FCDyVk6Cz1v4tRSXHJZa5C (varianta A)

Planul de implementare (`docs/superpowers/plans/2026-10-05-redesign-site-seo-ads.md`) conține valorile exacte: texte, titluri, cuvinte-cheie, anunțuri. Documentul acesta spune ce se construiește și de ce.

## 1. Scop

Site-ul trebuie să transforme în apeluri și mesaje oamenii care au un plan de desenat și să arate ca un studio profesionist. Nu își propune să înlocuiască OLX.

Reușită:

- **La lansare:** pe telefon, un vizitator poate suna dintr-o singură atingere, din primul ecran, chiar și cu bannerul de cookies afișat.
- **La 30 de zile:** clicurile pe telefon ale vizitatorilor care au acceptat cookies apar ca conversii în Google Ads, iar peste 70% din clicurile plătite vin de la cereri de desenare.
- **La testul de Ads** (40 de clicuri, 120 lei sau 60 de zile): cel puțin un contact real cu ofertă trimisă, notat în jurnalul proprietarului.
- **Organic:** paginile noi sunt indexate și apar primele afișări pe căutări cu „dwg” și „autocad”. Niciun obiectiv de clienți din căutarea organică înainte de 8 săptămâni.

## 2. Ce arată datele

**Google Ads, ultimele 90 de zile** (o campanie, 6,5 lei/zi): 730 afișări, 41 clicuri, 139,03 lei, 0 conversii. Banii s-au dus pe „bim”, „revit for macbook”, „arhitect bucuresti”, „proiect gaz brasov pret”. Grupul „Desenare AutoCAD” are o afișare. Singura conversie măsurată este formularul, iar clienții sună. Campania a avut zero afișări în 21.09–04.10, din cauză necunoscută.

**Volume de căutare, România** (Keyword Planner, medie lunară, sep. 2025 – aug. 2026):

| Căutare | Pe lună | Ce caută de fapt omul |
| --- | ---: | --- |
| releveu (cu variante) | ~3.900 | măsurare la fața locului și persoană autorizată |
| desen tehnic | 1.900 | cursuri și materiale de școală |
| pdf in dwg | 1.300 | în mare parte un convertor gratuit |
| desenator tehnic | 170 | locuri de muncă |
| desenare autocad, desene autocad | 110 fiecare | tutoriale și fișiere de descărcat, parțial servicii |
| proiectant autocad | 70 | locuri de muncă și proiectare autorizată |
| revit mep | 50 | programul; cea mai scumpă licitare |
| desenator autocad | 30 | locuri de muncă și, parțial, servicii |

**Rezultatele de căutare** (verificate printr-un motor intermediar, nu direct în google.ro): pentru „desenator autocad” prima pagină este plină de site-uri de joburi; pentru „pdf in dwg”, de convertoare. Anunțurile proprietarului de pe OLX și Publi24 apar deja în rezultate pentru „servicii desenare autocad”.

**Search Console:** nicio afișare pe „desenator autocad”, „pdf in dwg” sau „redesenare”.

**Site:** telefonul este apelabil doar pe `/contact`. Bara de navigare are 10 elemente. Prima pagină are 13 secțiuni. Pe telefon, bannerul de cookies acoperă bara de jos. Mesajele precompletate de WhatsApp și formularul vorbesc despre „proiect Revit MEP”.

## 3. Poziționare

Prima pagină vorbește întâi cu omul care are un plan de redesenat, apoi cu birourile de proiectare.

- Mesaj: „Trimiți PDF-ul sau schița. Primești planul desenat în AutoCAD.”
- Două intrări: „Am un plan de redesenat” și „Suntem birou de proiectare”.
- O secțiune „Lucrezi direct cu mine” spune cine face lucrarea: un inginer de instalații, nu o societate.
- Releveul de apartamente și case nu se oferă. Releveul de instalații existente apare ca secțiune pe `/revit-mep`.
- Texte la persoana întâi singular. Fără centre de date sau acreditări Uptime. Nimic inventat: fără recenzii, cifre sau lucrări.

## 4. Pagini

Niciun URL existent nu se schimbă. O singură pagină nouă.

| Pagină | Ce se întâmplă | Căutarea pe care o deține |
| --- | --- | --- |
| `/` | Rescrisă | brandul, „desenare autocad” |
| `/autocad-dwg` | Rescrisă pentru desenare la comandă | „desenator autocad”, corecturi DWG |
| `/pdf-in-dwg` | Nouă | „pdf in dwg” ca serviciu; pagina de destinație pentru Ads |
| articolul de blog PDF→DWG | Redenumit ca ghid, cu link către pagina de serviciu | „cum transformi un PDF în DWG” |
| `/revit-mep` și paginile de instalații | Șablon nou, titluri noi, secțiune de releveu de instalații | planșe de instalații |
| restul (portofoliu, despre, contact, blog, magazin, engleză, legale) | Antet, subsol și stil nou; conținutul rămâne | — |

Fără pagini pe orașe, fără pagină de prețuri, fără pagină de releveu.

## 5. Design

Se păstrează fonturile, albastrul și colțurile drepte. Se schimbă felul în care sunt folosite: titluri cu literă mică, eticheta mono doar pe date de planșă, o coloană de 1200 px, mai mult spațiu. Regulile tipografice existente se modifică pe loc, deci stilul nou ajunge pe toate paginile.

- **Antet:** Servicii (meniu), Lucrări, Prețuri, Despre, telefon, „Cere ofertă”. Pe telefon, un buton „Sună” stă mereu vizibil lângă meniu.
- **Prima pagină:** hero cu telefonul ca buton principal, două intrări, comparație PDF/DWG, prețuri cu estimator, exemple, proces, „Lucrezi direct cu mine”, întrebări, apel final cu formular.
- **Bara fixă de pe telefon:** „Sună” și „WhatsApp”. Bannerul de cookies stă deasupra ei.
- **Estimator de preț:** pornește de la un plan („350 – 800 lei”), deschide WhatsApp cu mesajul completat și are dedesubt lista fixă de prețuri.
- **Comparația înainte/după:** un plan de apartament desenat pentru pagină și varianta lui „scanată”, cu eticheta „Exemplu demonstrativ”.
- **Imaginile existente** poartă eticheta „Ilustrație de prezentare” până când proprietarul confirmă că sunt exporturi reale.
- **Formular:** prima opțiune devine „Redesenare / PDF în DWG”, telefonul urcă după nume.
- **Favicon** simplificat (SVG și PNG) și imagine de partajare la 1200×630.
- **Viteză:** fonta de text, livrată azi de trei ori, se livrează o dată.

## 6. SEO

- Titluri, descrieri și H1 noi pe fiecare pagină de serviciu, după maparea din secțiunea 4. Fără prețuri în titluri.
- Articolul de blog și pagina `/pdf-in-dwg` nu concurează: articolul explică, pagina vinde, și se leagă între ele.
- Date structurate valide (`Organization`, `Service` cu `Offer`, `BreadcrumbList`). Nu produc rezultate îmbogățite în Google; nu se investește mai mult în ele.
- Toate paginile de servicii sunt legate din subsol.
- După publicare: cerere de indexare în Search Console, sitemap, IndexNow, Bing Webmaster Tools, apoi verificări la 2, 4 și 8 săptămâni.

## 7. Măsurare

- Telefonul devine link apelabil în antet, hero, bara de pe telefon, estimator, apel final, subsol și contact. Fiecare trimite `phone_click`.
- Nu se adaugă cod de conversie nou. Se adaugă configurare în GA4 și Ads, cu aprobare.
- Evenimentele se trimit doar cu acord pentru cookies. Cifrele din Ads sunt de aceea o limită inferioară.
- Sursa de adevăr este un jurnal de contacte ținut de proprietar: data, canalul, „unde ați găsit numărul?”, ofertă trimisă, plătit.

## 8. Google Ads

Fiecare schimbare din cont, GA4 sau GTM se face doar cu aprobarea explicită a proprietarului.

1. Întâi se află de ce campania nu a mai avut afișări.
2. Clicul pe telefon devine conversie principală; WhatsApp rămâne secundar.
3. Campanie nouă cu două grupuri: desenator AutoCAD → `/autocad-dwg`; PDF în DWG (doar potrivire exactă, cu anunț „serviciu plătit, nu convertor”) → `/pdf-in-dwg`.
4. Campania veche se pune pe pauză în întregime, în aceeași zi.
5. Licitare manuală, extensie de apel, de preț și linkuri către pagini.
6. Estimare: 14–38 de clicuri și 10–53 lei pe lună. Bugetul actual nu va fi cheltuit și nu se recomandă creștere.
7. Decizie la 40 de clicuri, 120 lei sau 60 de zile: continuă cu cel puțin un contact real; altfel banii trec în promovare OLX.

## 9. În afara site-ului

- **OLX și Publi24** rămân sursa principală. Se adaugă anunțuri separate pentru PDF în DWG și pentru planșe de instalații; anunțul vechi nu se modifică.
- **Brig.ro și HomeRun.ro** merită un profil; condițiile de înscriere fără firmă nu sunt verificate.
- **Profil Google Business: nu se creează.** Google cere contact în persoană cu clienții și exclude afacerile exclusiv online.

## 10. Etape

1. Logică de prețuri și telefon.
2. Cadru: stiluri, antet, subsol, bare fixe, formular, favicon.
3. Stilul nou pe paginile care nu se rescriu.
4. Prima pagină, estimator și comparație.
5. Pagini de servicii și `/pdf-in-dwg`.
6. Verificare, publicare, indexare.
7. Google Ads.

Fiecare etapă lasă site-ul funcțional.

## 11. Riscuri

- **Cerere mică pe Google.** Serviciile de desenare la comandă se caută puțin; cele două expresii mari aparțin convertoarelor și cursurilor. Site-ul va fi în primul rând o carte de vizită care convertește traficul din OLX și din anunțuri.
- **Testul de Ads este mic.** 40 de clicuri spun dacă merită continuat, nu cât valorează canalul.
- **Acordul pentru cookies** ascunde o parte din conversii.
- **Repo-ul GitHub pare public.** Documentele de plan conțin ID-ul contului de Ads și nu se comit până la confirmarea că repo-ul este privat.
