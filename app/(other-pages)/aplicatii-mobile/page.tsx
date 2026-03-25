import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroAplicatiiMobile from "@/components/service-heroes/HeroAplicatiiMobile";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Aplicații mobile | Visual Studio Concept",
  description:
    "Construim aplicații mobile iOS și Android, MVP-uri și produse scalabile pentru companii care vor o experiență bună pe mobil și o bază tehnică solidă.",
};
export default function AplicatiiMobilePage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroAplicatiiMobile />
        <Services
          items={servicePageGroups.aplicatiiMobile}
          introTitle="Cum abordăm aplicațiile mobile"
          introText="Punem accent pe experiența utilizatorului, claritatea funcțiilor și o bază tehnică suficient de solidă pentru update-uri și creștere ulterioară."
        />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
