import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroAutomatizariAI from "@/components/service-heroes/HeroAutomatizariAI";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Automatizări AI | Visual Studio Concept",
  description:
    "Implementăm automatizări AI, asistenți conversaționali, fluxuri operaționale și integrări inteligente care reduc munca manuală și timpul pierdut.",
};
export default function AutomatizariAIPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroAutomatizariAI />
        <Services
          items={servicePageGroups.automatizariAI}
          introTitle="Unde are sens să folosim AI"
          introText="Selectăm procesele în care automatizarea chiar produce timp câștigat, mai puține erori și o experiență mai bună pentru echipă sau client."
        />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
