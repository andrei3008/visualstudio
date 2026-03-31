import BackgroundParallax from "@/components/animation/BackgroundParallax";
import Approch from "@/components/common/Approch";
import Awards from "@/components/common/Awards";
import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Facts from "@/components/common/Facts";
import Footer from "@/components/footers/Footer";
import AboutMarqueeSlider from "@/components/other-pages/about/AboutMarqueeSlider";
import Hero2 from "@/components/other-pages/about/Hero2";
import MarqueeSlider2 from "@/components/other-pages/about/MarqueeSlider2";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Despre Noi | Visual Studio Concept",
  description:
    "Afla cum lucreaza Visual Studio Concept: strategie, design, dezvoltare software si automatizari pentru companii care vor crestere reala.",
  alternates: {
    canonical: "https://visualstudio.ro/despre-noi",
  },
  openGraph: {
    title: "Despre Noi | Visual Studio Concept",
    description: "15+ ani în programare, 5+ ani în DevOps. O echipă care transformă ideile în soluții digitale funcționale.",
    url: "https://visualstudio.ro/despre-noi",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Despre Noi | Visual Studio Concept",
      },
    ],
  },
};
export default function AboutUsPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <Hero2 />
        <MarqueeSlider2 />
        <Awards />
        <AboutMarqueeSlider />
        <Facts />
        <Approch />
        <div className="mxd-section padding-pre-title">
          <div className="mxd-container">
            <div className="mxd-divider">
              <BackgroundParallax className="mxd-divider__image divider-image-9 parallax-img" />
            </div>
          </div>
        </div>
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
