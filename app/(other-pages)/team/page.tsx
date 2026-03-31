import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import About from "@/components/other-pages/team/About";
import Hero from "@/components/other-pages/team/Hero";
import MarqueeSlider from "@/components/other-pages/team/MarqueeSlider";
import Teammembers from "@/components/other-pages/team/Teammembers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Echipă | Visual Studio Concept",
  description:
    "Cunoaște echipa din spatele Visual Studio Concept: strategie, design, dezvoltare, automatizare și livrare software orientată spre rezultate.",
  alternates: {
    canonical: "https://visualstudio.ro/team",
  },
  openGraph: {
    title: "Echipa | Visual Studio Concept",
    description: "Cunoaște echipa din spatele proiectelor. Experiență, pasiune și soluții care funcționează.",
    url: "https://visualstudio.ro/team",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Echipa | Visual Studio Concept",
      },
    ],
  },
};
export default function TeamPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <Hero />
        <MarqueeSlider />
        <Teammembers />
        <About />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
