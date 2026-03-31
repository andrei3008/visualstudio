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
  alternates: {
    canonical: "https://visualstudio.ro/aplicatii-mobile",
  },
  openGraph: {
    title: "Aplicații Mobile | Visual Studio Concept",
    description: "Dezvoltăm aplicații mobile native și cross-platform. iOS, Android — performanță și UX de top.",
    url: "https://visualstudio.ro/aplicatii-mobile",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Aplicații Mobile | Visual Studio Concept",
      },
    ],
  },
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
