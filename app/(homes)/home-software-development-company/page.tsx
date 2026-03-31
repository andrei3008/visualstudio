import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";

import About from "@/components/homes/home-software-development-company/About";
import Capabilities from "@/components/homes/home-software-development-company/Capabilities";
import Facts from "@/components/homes/home-software-development-company/Facts";
import Hero from "@/components/homes/home-software-development-company/Hero";
import MarqueeSlider from "@/components/homes/home-software-development-company/MarqueeSlider";
import MarqueeSlider2 from "@/components/homes/home-software-development-company/MarqueeSlider2";
import ParallaxDivider from "@/components/homes/home-software-development-company/ParallaxDivider";
import Services from "@/components/homes/home-software-development-company/Services";
import TechStacks from "@/components/homes/home-software-development-company/TechStacks";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Software la comandă | Visual Studio Concept",
  description:
    "Pagină principală alternativă pentru prezentarea serviciilor Visual Studio Concept: software custom, aplicații, automatizări și infrastructură cloud.",
  alternates: {
    canonical: "https://visualstudio.ro",
  },
  openGraph: {
    title: "Software Development Company | Visual Studio Concept",
    description: "Firmă de dezvoltare software cu 15+ ani experiență. Site-uri, aplicații, automatizări și DevOps pentru afacerea ta.",
    url: "https://visualstudio.ro",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Software Development Company | Visual Studio Concept",
      },
    ]
  },
};
export default function HomeSoftwareDevelopmentCompanyPage() {
  return (
    <>
      <main id="mxd-page-content" className="mxd-page-content">
        <Hero />
        <MarqueeSlider />
        <Services />
        <About />
        <Capabilities />
        {/* <Projects /> */}
        <TechStacks />
        <MarqueeSlider2 />
        <Facts />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
