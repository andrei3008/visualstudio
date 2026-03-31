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
  title: "Visual Studio Concept | Software la comandă pentru companii din România",
  description:
    "Construim aplicații web și mobile, platforme interne, automatizări AI și infrastructură cloud pentru companii care au nevoie de software făcut corect, nu de soluții generice.",
  keywords: [
    "dezvoltare software",
    "software la comandă",
    "aplicații web",
    "aplicații mobile",
    "automatizări AI",
    "DevOps",
    "cloud",
  ],
  alternates: {
    canonical: "https://visualstudio.ro",
  },
  openGraph: {
    title: "Visual Studio Concept | Dezvoltare Software la Comandă",
    description: "Construim site-uri, aplicații mobile, automatizări și software custom. 15+ ani experiență. Lead-uri, conversii și procese digitale care funcționează.",
    url: "https://visualstudio.ro",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Visual Studio Concept | Dezvoltare Software la Comandă",
      },
    ],
  },
};

export default function Home() {
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
