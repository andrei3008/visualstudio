import Cta from "@/components/common/Cta";
import LandingFaq from "@/components/common/LandingFaq";
import TrustSection from "@/components/common/TrustSection";
import Footer from "@/components/footers/Footer";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import HeroSiteuriMagazine from "@/components/service-heroes/HeroSiteuriMagazine";
import { siteuriMagazineFaqs } from "@/data/landing-faqs";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site-uri de prezentare și magazine online | Visual Studio Concept",
  description:
    "Construim site-uri de prezentare și magazine online rapide, moderne și orientate pe conversie pentru companii care vor mai mult decât o simplă prezență online.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteuriMagazineFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Site-uri de prezentare și magazine online",
  provider: {
    "@type": "Organization",
    name: "Visual Studio Concept",
    url: "https://visualstudio.ro",
  },
  description:
    "Construim site-uri de prezentare și magazine online rapide, moderne și orientate pe conversie.",
  areaServed: "RO",
};

export default function SiteuriPrezentareMagazinePage() {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <HeroSiteuriMagazine />
        <TrustSection />
        <Services
          items={servicePageGroups.siteuriMagazine}
          introTitle="Ce livrăm în proiectele web și eCommerce"
          introText="Punem accent pe claritate, încredere și conversie. Scopul nu este doar un design frumos, ci un site care explică bine oferta, răspunde rapid și transformă vizitele în cereri sau vânzări."
        />
        <LandingFaq items={siteuriMagazineFaqs} />
        <ParallaxDivider />
        <ContactForm />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
