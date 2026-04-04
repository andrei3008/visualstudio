import Cta from "@/components/common/Cta";
import LandingFaq from "@/components/common/LandingFaq";
import TrustSection from "@/components/common/TrustSection";
import Footer from "@/components/footers/Footer";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Pricing from "@/components/other-pages/Pricing";
import Services from "@/components/other-pages/services/Services";
import HeroSoftwareCustomFirme from "@/components/service-heroes/HeroSoftwareCustomFirme";
import { softwareCustomFaqs } from "@/data/landing-faqs";
import pricingSoftwareCustom from "@/data/pricing-software-custom.json";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software custom pentru firme | Visual Studio Concept",
  description:
    "Construim aplicații și platforme interne custom pentru companii care vor control mai bun asupra operațiunilor, datelor și fluxurilor interne.",
  alternates: {
    canonical: "https://visualstudio.ro/software-custom-firme",
  },
  openGraph: {
    title: "Software custom pentru firme | Visual Studio Concept",
    description:
      "Construim aplicații și platforme interne custom pentru companii care vor control mai bun asupra operațiunilor.",
    url: "https://visualstudio.ro/software-custom-firme",
    images: [
      {
        url: "/img/illustrations/1920x1080_divider-03.webp",
        width: 1920,
        height: 1080,
        alt: "Software custom pentru firme",
      },
    ],
  },
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
          introTitle="Ce construim"
          introText="Aplicații și platforme pe măsură — simplifică operațiunile, conectează datele și se potrivesc modului tău de lucru."
        />
        <Pricing
          items={pricingSoftwareCustom}
          sectionLabel="Prețuri"
          sectionTitle="Investiția pentru platforma ta software"
        />
        <LandingFaq items={softwareCustomFaqs} />
        <ParallaxDivider scrollToContact />
        <ContactForm />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
