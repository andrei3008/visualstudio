import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import ServicesFaq from "@/components/common/ServicesFaq";
import Footer from "@/components/footers/Footer";
import Hero from "@/components/other-pages/services/Hero";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import faqs from "@/data/faqs.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicii | Visual Studio Concept",
  description:
    "Servicii complete de dezvoltare software la comandă: aplicații web, mobile, automatizări AI, DevOps, cloud, securitate și mentenanță.",
  alternates: {
    canonical: "https://visualstudio.ro/servicii",
  },
  openGraph: {
    title: "Servicii | Visual Studio Concept",
    description:
      "Servicii complete de dezvoltare software la comandă: aplicații web, mobile, automatizări AI, DevOps, cloud, securitate și mentenanță.",
    url: "https://visualstudio.ro/servicii",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function ServiciiPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <Hero />
        <Services />
        <ServicesFaq />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
