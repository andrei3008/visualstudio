import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroAplicatiiMobile from "@/components/service-heroes/HeroAplicatiiMobile";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Aplicații Mobile || Visual Studio - Software Development Company",
  description: "Dezvoltare aplicații mobile iOS și Android - aplicații native, cross-platform, React Native, Flutter.",
};
export default function AplicatiiMobilePage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroAplicatiiMobile />
        <Services />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
