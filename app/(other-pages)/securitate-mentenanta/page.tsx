import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroSecuritateMentenanta from "@/components/service-heroes/HeroSecuritateMentenanta";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Securitate și mentenanță | Visual Studio Concept",
  description:
    "Asigurăm mentenanță, backup, monitorizare, actualizări și măsuri de securitate pentru aplicații și infrastructură critică.",
  alternates: {
    canonical: "https://visualstudio.ro/securitate-mentenanta",
  },
  openGraph: {
    title: "Securitate & Mentenanță | Visual Studio Concept",
    description: "Menținem aplicațiile tale sigure și actualizate. Patch-uri de securitate, backup-uri și monitoring 24/7.",
    url: "https://visualstudio.ro/securitate-mentenanta",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Securitate & Mentenanță | Visual Studio Concept",
      },
    ],
  },
};
export default function SecuritateMentenantaPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroSecuritateMentenanta />
        <Services
          items={servicePageGroups.securitateMentenanta}
          introTitle="Cum menținem produsele stabile și sigure"
          introText="Combinăm intervenția reactivă cu mentenanța preventivă, ca să reducem incidentele, timpul mort și riscurile tehnice care apar după lansare."
        />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
