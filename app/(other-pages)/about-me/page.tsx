import Approch from "@/components/common/Approch";
import Education from "@/components/common/Education";
import Experiences from "@/components/common/Experiences";
import Facts from "@/components/common/Facts";

import Hero from "@/components/other-pages/about/Hero";
import ProjectsMarqueeSlider from "@/components/other-pages/about/ProjectsMarqueeSlider";
import Techstack from "@/components/other-pages/about/Techstack";

import MarqueeSlider from "@/components/other-pages/about/MarqueeSlider";
import Testimonials from "@/components/other-pages/Testimonials";
import ParallaxBackround from "@/components/other-pages/about/ParallaxBackround";
import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Despre echipă | Visual Studio Concept",
  description:
    "O pagină extinsă despre modul de lucru, experiență, tehnologiile și principiile după care livrează Visual Studio Concept.",
};
export default function AboutMePage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <Hero />
        <ProjectsMarqueeSlider />
        <Approch />
        <Facts />
        <Experiences />
        <Techstack />
        <Education />
        <MarqueeSlider />
        <Testimonials />
        <ParallaxBackround />
        <Blogs title="Jurnal tehnic" />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
