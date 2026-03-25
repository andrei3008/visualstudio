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
