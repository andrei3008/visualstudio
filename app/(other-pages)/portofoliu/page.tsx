import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";

import PortofoliuMarquee from "@/components/portofoliu/PortofoliuMarquee";
import PortofoliuLista from "@/components/portofoliu/PortofoliuLista";
import PortofoliuHero from "@/components/portofoliu/PortofoliuHero";
import Testimonials from "@/components/common/Testimonials";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Portofoliu | Visual Studio Concept",
  description:
    "Vezi exemple de proiecte digitale, aplicații, site-uri și soluții software dezvoltate pentru companii cu obiective clare de creștere.",
  alternates: {
    canonical: "https://visualstudio.ro/portofoliu",
  },
  openGraph: {
    title: "Portofoliu | Visual Studio Concept",
    description: "Vezi proiectele noastre: site-uri de prezentare, magazine online, aplicații și automatizări construite pentru clienți reali.",
    url: "https://visualstudio.ro/portofoliu",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Portofoliu | Visual Studio Concept",
      },
    ],
  },
};
export default function PortofoliuPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <PortofoliuHero />
        <PortofoliuLista />
        <PortofoliuMarquee />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
