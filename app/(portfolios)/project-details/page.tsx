import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";

import Challages from "@/components/portfolios/Challages";
import DetailsHero from "@/components/portfolios/DetailsHero";
import Feedback from "@/components/portfolios/Feedback";
import NextPrevNavigation from "@/components/portfolios/NextPrevNavigation";
import ParallaxDivider2 from "@/components/portfolios/ParallaxDivider2";
import Solutions from "@/components/portfolios/Solutions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Detalii proiect | Visual Studio Concept",
  description:
    "Exemplu de pagină de studiu de caz cu provocări, soluții și rezultate pentru un proiect digital livrat de Visual Studio Concept.",
  alternates: {
    canonical: "https://visualstudio.ro/project-details",
  },
  openGraph: {
    title: "Detalii Proiect | Visual Studio Concept",
    description: "Studiu de caz: cum am construit o soluție digitală de la zero la livrare.",
    url: "https://visualstudio.ro/project-details",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Detalii Proiect | Visual Studio Concept",
      },
    ],
  },
};
export default function ProjectDetailsPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <DetailsHero />
        <ParallaxDivider2 />
        <div className="mxd-section mxd-project overflow-hidden">
          <div className="mxd-container grid-container">
            <Challages />
            <Solutions />
            <Feedback />
            <NextPrevNavigation />
          </div>
        </div>
        <Cta />
      </main>
      <Footer />
    </>
  );
}
