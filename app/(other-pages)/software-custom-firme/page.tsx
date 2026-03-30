import Cta from "@/components/common/Cta";
import LandingFaq from "@/components/common/LandingFaq";
import TrustSection from "@/components/common/TrustSection";
import Footer from "@/components/footers/Footer";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import HeroSoftwareCustomFirme from "@/components/service-heroes/HeroSoftwareCustomFirme";
import { softwareCustomFaqs } from "@/data/landing-faqs";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software custom pentru firme | Visual Studio Concept",
  description:
    "Construim aplicații și platforme interne custom pentru companii care vor control mai bun asupra operațiunilor, datelor și fluxurilor interne.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: softwareCustomFaqs.map((f) => ({
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
  name: "Software custom pentru firme",
  provider: {
    "@type": "Organization",
    name: "Visual Studio Concept",
    url: "https://visualstudio.ro",
  },
  description:
    "Construim aplicații și platforme interne custom pentru companii care vor control mai bun asupra operațiunilor.",
  areaServed: "RO",
};

export default function SoftwareCustomFirmePage() {
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
        <HeroSoftwareCustomFirme />
        <TrustSection />
        <Services
          items={servicePageGroups.softwareCustomFirme}
          introTitle="Ce tip de software custom construim"
          introText="Pornim de la procesele tale reale, nu de la un template. Scopul este să simplificăm operațiunile, să conectăm datele și să îți dăm un instrument care se potrivește cu modul în care lucrează echipa."
        />
        <LandingFaq items={softwareCustomFaqs} />
        <ParallaxDivider />
        <ContactForm />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
