import LegalPage from "@/components/legal/LegalPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Confidentialitate | Visual Studio Concept",
  description:
    "Politica de confidentialitate pentru site-ul si serviciile Visual Studio Concept.",
  alternates: {
    canonical: "https://visualstudio.ro/politica-de-confidentialitate",
  },
  openGraph: {
    title: "Politica de Confidențialitate | Visual Studio Concept",
    description: "Politica de confidențialitate și protecția datelor personale.",
    url: "https://visualstudio.ro/politica-de-confidentialitate",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Politica de Confidențialitate | Visual Studio Concept",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Politica de confidentialitate"
      intro="Aceasta politica explica modul in care Visual Studio Concept utilizeaza si protejeaza datele personale colectate prin intermediul site-ului, formularelor de contact si interactiunilor comerciale."
      updatedAt="22 martie 2026"
      sections={[
        {
          title: "1. Cine suntem",
          paragraphs: [
            "Site-ul este operat de VISUAL STUDIO CONCEPT SRL, cu sediul in Craiova, Romania, CUI 43527366, inregistrata la Registrul Comertului sub nr. J16/53/2021. Pentru solicitari privind protectia datelor ne poti contacta la adresa salut@visualstudio.ro sau la numarul 0770 561 719.",
            "Aceasta politica se aplica datelor colectate prin website, formularele de contact, comunicarile prin e-mail si interactiunile comerciale initiate prin site.",
          ],
        },
        {
          title: "2. Ce date putem colecta",
          paragraphs: [
            "Colectam doar datele necesare pentru comunicare, ofertare, furnizarea serviciilor si functionarea corecta a site-ului.",
          ],
          items: [
            "nume si prenume",
            "adresa de e-mail",
            "numar de telefon",
            "numele companiei",
            "continutul mesajelor trimise prin formulare sau e-mail",
            "date tehnice precum IP, browser, dispozitiv si interactiuni de baza cu site-ul",
          ],
        },
        {
          title: "3. Scopurile prelucrarii",
          paragraphs: [
            "Folosim datele personale pentru a raspunde solicitarilor, a transmite oferte, a gestiona colaborari si a imbunatati experienta de utilizare a site-ului.",
          ],
          items: [
            "comunicare si raspuns la cereri",
            "transmiterea de oferte sau propuneri comerciale",
            "executarea contractelor si administrarea relatiei comerciale",
            "securitate, prevenirea abuzurilor si functionarea tehnica a site-ului",
            "analiza traficului si optimizarea continutului si performantelor",
          ],
        },
        {
          title: "4. Temeiul legal",
          paragraphs: [
            "Prelucram datele in baza unuia sau mai multor temeiuri legale aplicabile, in functie de contextul in care ne contactezi sau colaborezi cu noi.",
          ],
          items: [
            "consimtamantul tau, atunci cand acesta este solicitat",
            "demersuri precontractuale sau executarea unui contract",
            "indeplinirea unor obligatii legale",
            "interesul legitim de a administra si securiza activitatea noastra",
          ],
        },
        {
          title: "5. Cui putem divulga datele",
          paragraphs: [
            "Nu vindem date personale. Datele pot fi partajate doar cu furnizori si parteneri implicati in operarea site-ului sau furnizarea serviciilor, strict in masura necesara.",
          ],
          items: [
            "furnizori de hosting, infrastructura si mentenanta",
            "furnizori de e-mail, formulare sau automatizari",
            "colaboratori implicati in executarea serviciilor contractate",
            "autoritati publice, atunci cand legea impune acest lucru",
          ],
        },
        {
          title: "6. Cat timp pastram datele",
          paragraphs: [
            "Pastram datele numai pe perioada necesara scopului pentru care au fost colectate sau pe durata impusa de obligatiile legale, fiscale ori contractuale.",
            "Datele din solicitarile comerciale care nu se concretizeaza intr-o colaborare pot fi pastrate pentru o perioada rezonabila, in scop de follow-up sau evidenta interna.",
          ],
        },
        {
          title: "7. Cookie-uri si date tehnice",
          paragraphs: [
            "In forma actuala, site-ul foloseste in principal mecanisme tehnice necesare functionarii si memorarii unor preferinte de afisare, cum ar fi preferinta pentru tema vizuala. Aceste preferinte pot fi stocate prin tehnologii precum local storage sau alti identificatori tehnici similari.",
            "La momentul actual nu folosim, in mod evident pe suprafata publica a site-ului, cookie-uri de marketing comportamental sau instrumente de analiza de tip third-party precum Google Analytics, Meta Pixel ori alte trackere similare. Daca aceste instrumente vor fi adaugate ulterior, politica va fi actualizata, iar acolo unde legea impune, consimtamantul va fi solicitat inainte de activare.",
            "Poti controla stocarea de cookie-uri din setarile browserului tau. Dezactivarea anumitor mecanisme strict necesare poate afecta functionarea unor parti ale site-ului.",
          ],
        },
        {
          title: "8. Drepturile tale",
          paragraphs: [
            "In conditiile prevazute de legislatia aplicabila, poti solicita acces la date, rectificare, stergere, restrictionare, portabilitate sau opozitie fata de anumite prelucrari.",
            "De asemenea, ai dreptul sa retragi consimtamantul acordat si sa formulezi o plangere la autoritatea competenta pentru protectia datelor.",
          ],
        },
        {
          title: "9. Contact",
          paragraphs: [
            "Pentru intrebari privind aceasta politica sau pentru exercitarea drepturilor tale, ne poti scrie la salut@visualstudio.ro sau ne poti suna la 0770 561 719.",
            "Daca apreciezi ca drepturile tale au fost incalcate, ai posibilitatea de a te adresa si Autoritatii Nationale de Supraveghere a Prelucrarii Datelor cu Caracter Personal (ANSPDCP).",
            "Daca vor aparea modificari importante in modul de prelucrare, vom actualiza aceasta pagina.",
          ],
        },
      ]}
    />
  );
}
