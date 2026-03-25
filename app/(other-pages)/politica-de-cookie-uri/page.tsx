import LegalPage from "@/components/legal/LegalPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Cookie-uri | Visual Studio Concept",
  description:
    "Informatii despre cookie-uri, local storage si preferintele de consimtamant folosite pe site-ul Visual Studio Concept.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Politica de cookie-uri"
      intro="Aceasta pagina explica ce mecanisme de stocare locala pot fi folosite pe site-ul Visual Studio Concept, in ce scop si cum iti poti gestiona preferintele."
      updatedAt="25 martie 2026"
      sections={[
        {
          title: "1. Ce sunt cookie-urile si tehnologiile similare",
          paragraphs: [
            "Cookie-urile sunt fisiere mici stocate pe dispozitivul tau atunci cand vizitezi un site. In mod similar, pot fi folosite si alte tehnologii precum local storage, session storage sau identificatori tehnici echivalenti.",
            "Aceste mecanisme pot fi folosite pentru functionare, memorarea preferintelor, analiza utilizarii site-ului sau, in anumite cazuri, activitati de marketing.",
          ],
        },
        {
          title: "2. Ce folosim in prezent",
          paragraphs: [
            "In forma actuala, site-ul foloseste in principal mecanisme tehnice necesare functionarii si memorarii unor preferinte de afisare, cum ar fi preferinta pentru tema vizuala.",
            "La acest moment nu folosim, in mod evident pe suprafata publica a site-ului, trackere third-party de marketing sau analiza activate implicit pentru toti utilizatorii.",
          ],
        },
        {
          title: "3. Categorii de consimtamant",
          paragraphs: [
            "Modulul de consimtamant disponibil pe site este pregatit pentru gestionarea urmatoarelor categorii:",
          ],
          items: [
            "strict necesare, pentru functionarea de baza a site-ului",
            "preferinte, pentru memorarea optiunilor de afisare sau utilizare",
            "analiza, pentru masurarea traficului si intelegerea utilizarii site-ului",
            "marketing, pentru campanii, pixeli sau remarketing",
          ],
        },
        {
          title: "4. Cand cerem consimtamantul",
          paragraphs: [
            "Pentru mecanismele strict necesare functionarii site-ului nu este necesar consimtamantul prealabil in toate situatiile, in masura permisa de lege.",
            "Pentru categorii precum analiza, preferinte optionale sau marketing, consimtamantul tau va fi solicitat inainte de activare, atunci cand legislatia aplicabila impune acest lucru.",
          ],
        },
        {
          title: "5. Cum iti poti schimba optiunile",
          paragraphs: [
            "Poti reveni oricand asupra alegerii tale folosind butonul de setari cookie disponibil in interfata site-ului.",
            "De asemenea, poti sterge cookie-urile sau alte date stocate local direct din setarile browserului tau.",
          ],
        },
        {
          title: "6. Contact",
          paragraphs: [
            "Pentru intrebari legate de cookie-uri si preferintele de consimtamant, ne poti contacta la salut@visualstudio.ro sau la 0770 561 719.",
          ],
        },
      ]}
    />
  );
}
