import LegalPage from "@/components/legal/LegalPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni si Conditii | Visual Studio Concept",
  description:
    "Termeni si conditii de utilizare pentru site-ul si serviciile Visual Studio Concept.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Termeni si conditii"
      intro="Acesti termeni reglementeaza utilizarea site-ului Visual Studio Concept, precum si conditiile generale aplicabile interactiunilor comerciale initiate prin intermediul acestuia."
      updatedAt="22 martie 2026"
      sections={[
        {
          title: "1. Acceptarea termenilor",
          paragraphs: [
            "Prin accesarea si utilizarea acestui site, accepti acesti termeni si conditii. Daca nu esti de acord cu ei, te rugam sa nu utilizezi site-ul.",
            "Pentru proiectele comerciale concrete, prevederile din oferta, contractul sau anexele semnate intre parti prevaleaza fata de informatiile generale de pe site.",
          ],
        },
        {
          title: "2. Descrierea serviciilor",
          paragraphs: [
            "VISUAL STUDIO CONCEPT SRL poate prezenta pe site servicii de dezvoltare software, consultanta, automatizari, mentenanta, integrare si alte servicii digitale.",
            "Informatiile publicate au caracter orientativ si pot fi modificate fara notificare prealabila, pentru a reflecta evolutia ofertei sau a portofoliului.",
          ],
        },
        {
          title: "3. Utilizarea site-ului",
          paragraphs: [
            "Te obligi sa folosesti site-ul in mod legal, cu buna-credinta si fara a afecta securitatea, functionalitatea sau reputatia acestuia.",
          ],
          items: [
            "sa nu incerci acces neautorizat la servere, conturi sau formulare",
            "sa nu transmiti continut malitios, spam sau mesaje frauduloase",
            "sa nu copiezi, distribui sau exploatezi continutul site-ului in afara limitelor permise de lege",
          ],
        },
        {
          title: "4. Proprietate intelectuala",
          paragraphs: [
            "Textele, elementele vizuale, structura site-ului, marcile, logo-urile si alte materiale publicate pe site apartin Visual Studio Concept sau partenerilor sai, dupa caz.",
            "Utilizarea, reproducerea sau distribuirea acestor materiale fara acord prealabil scris este interzisa, cu exceptia situatiilor permise expres de lege.",
          ],
        },
        {
          title: "5. Oferte, preturi si colaborari",
          paragraphs: [
            "Transmiterea unei solicitari prin site nu echivaleaza cu incheierea automata a unui contract. Orice colaborare comerciala se confirma prin oferta acceptata, contract sau alt acord scris intre parti.",
            "Preturile, termenele, livrabilele si conditiile finale se stabilesc individual, in functie de complexitatea proiectului si cerintele convenite.",
          ],
        },
        {
          title: "6. Limitarea raspunderii",
          paragraphs: [
            "Depunem eforturi rezonabile pentru ca informatiile de pe site sa fie corecte si actualizate, dar nu garantam absenta absoluta a erorilor, omisiunilor sau intreruperilor tehnice.",
            "In limitele permise de lege, nu raspundem pentru prejudicii indirecte, pierderi de oportunitate sau alte consecinte rezultate din utilizarea site-ului sau din imposibilitatea temporara de utilizare.",
          ],
        },
        {
          title: "7. Link-uri catre terti",
          paragraphs: [
            "Site-ul poate contine link-uri catre platforme sau website-uri operate de terti. Nu controlam continutul, politicile sau practicile acestora si nu ne asumam raspunderea pentru ele.",
          ],
        },
        {
          title: "8. Protectia datelor",
          paragraphs: [
            "Prelucrarea datelor personale se realizeaza conform politicii de confidentialitate publicate pe site. Prin utilizarea formularelor sau prin contactarea noastra, confirmi ca datele furnizate sunt corecte, actuale si relevante pentru solicitarea transmisa.",
            "In ceea ce priveste cookie-urile si tehnologiile similare, vom solicita consimtamantul prealabil atunci cand acesta este necesar potrivit legislatiei aplicabile.",
          ],
        },
        {
          title: "9. Legea aplicabila",
          paragraphs: [
            "Acesti termeni sunt guvernati de legislatia romana. Eventualele neintelegeri se vor solutiona pe cale amiabila, iar in lipsa unui acord, de instantele competente din Romania.",
          ],
        },
        {
          title: "10. Contact",
          paragraphs: [
            "Pentru intrebari privind acesti termeni si conditii ne poti contacta la salut@visualstudio.ro sau la 0770 561 719.",
            "Ne rezervam dreptul de a actualiza acest document ori de cate ori este necesar.",
          ],
        },
      ]}
    />
  );
}
