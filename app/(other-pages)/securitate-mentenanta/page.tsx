import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroSecuritateMentenanta from "@/components/service-heroes/HeroSecuritateMentenanta";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Securitate & Mentenanță || Visual Studio - Software Development Company",
  description: "Servicii de securitate cibernetică și mentenanță - backup, monitorizare, update-uri, suport 24/7.",
};
export default function SecuritateMentenantaPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroSecuritateMentenanta />
        <Services />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
