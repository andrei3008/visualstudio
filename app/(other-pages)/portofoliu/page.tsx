import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";

import PortofoliuMarquee from "@/components/portofoliu/PortofoliuMarquee";
import PortofoliuLista from "@/components/portofoliu/PortofoliuLista";
import PortofoliuHero from "@/components/portofoliu/PortofoliuHero";
import Testimonials from "@/components/common/Testimonials";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Portofoliu || Visual Studio - Software Development Company",
  description: "Portofoliu Visual Studio - proiecte de dezvoltare software, site-uri web, aplicații mobile și soluții digitale.",
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
