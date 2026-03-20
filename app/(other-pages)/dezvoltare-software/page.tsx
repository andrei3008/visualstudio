import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroDezvoltareSoftware from "@/components/service-heroes/HeroDezvoltareSoftware";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dezvoltare Software || Visual Studio - Software Development Company",
  description: "Servicii profesionale de dezvoltare software - site-uri web, aplicații custom, CRM, ERP și soluții digitale moderne.",
};
export default function DezvoltareSoftwarePage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroDezvoltareSoftware />
        <Services />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
