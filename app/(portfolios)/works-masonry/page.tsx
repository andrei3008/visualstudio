import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";

import MarqueeSlider from "@/components/portfolios/MarqueeSlider";
import ParallaxDivider from "@/components/portfolios/ParallaxDivider";
import PortfolioMasonry from "@/components/portfolios/PortfolioMasonry";
import Testimonials from "@/components/common/Testimonials";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Portofoliu extins | Visual Studio Concept",
  description:
    "Colecție extinsă de proiecte și exemple vizuale din portofoliul Visual Studio Concept.",
  alternates: {
    canonical: "https://visualstudio.ro/works-masonry",
  },
  openGraph: {
    title: "Lucrări | Visual Studio Concept",
    description: "Galeria de proiecte: site-uri, aplicații și platforme construite de Visual Studio Concept.",
    url: "https://visualstudio.ro/works-masonry",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Lucrări | Visual Studio Concept",
      },
    ],
  },
};
export default function WorksMasonryPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <PortfolioMasonry />
        <ParallaxDivider /> <MarqueeSlider />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
