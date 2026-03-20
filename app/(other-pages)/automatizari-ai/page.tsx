import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroAutomatizariAI from "@/components/service-heroes/HeroAutomatizariAI";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Automatizări AI || Visual Studio - Software Development Company",
  description: "Servicii de automatizări AI și inteligență artificială - chatbots, automatizări procese, soluții AI personalizate.",
};
export default function AutomatizariAIPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroAutomatizariAI />
        <Services />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
