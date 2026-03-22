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
import Projects from "@/components/homes/home-software-development-company/Projects";
import Services from "@/components/homes/home-software-development-company/Services";
import TechStacks from "@/components/homes/home-software-development-company/TechStacks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Studio Concept - Software Development Company Romania",
  description: "Software development company specializată în Next.js, React, CRM, E-commerce și soluții software custom. Transformăm ideile în aplicații de succes.",
  keywords: ["software development", "Next.js", "React", "CRM", "E-commerce", "web development", "mobile apps"],
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
