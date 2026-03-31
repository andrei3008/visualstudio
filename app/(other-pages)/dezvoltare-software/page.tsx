import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroDezvoltareSoftware from "@/components/service-heroes/HeroDezvoltareSoftware";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dezvoltare software | Visual Studio Concept",
  description:
    "Dezvoltăm software la comandă: aplicații web, platforme interne, CRM, ERP, portaluri și produse digitale construite pe nevoile reale ale companiei tale.",
  alternates: {
    canonical: "https://visualstudio.ro/dezvoltare-software",
  },
  openGraph: {
    title: "Dezvoltare Software | Visual Studio Concept",
    description: "Dezvoltăm aplicații web și desktop personalizate. De la MVP-uri la platforme enterprise, cu arhitectură scalabilă.",
    url: "https://visualstudio.ro/dezvoltare-software",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Dezvoltare Software | Visual Studio Concept",
      },
    ],
  },
};
export default function DezvoltareSoftwarePage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroDezvoltareSoftware />
        <Services
          items={servicePageGroups.dezvoltareSoftware}
          introTitle="Ce livrăm în proiectele de dezvoltare software"
          introText="Acoperim analiza, arhitectura, dezvoltarea, integrările și lansarea, astfel încât să primești o soluție utilizabilă, nu doar o promisiune tehnică."
        />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
