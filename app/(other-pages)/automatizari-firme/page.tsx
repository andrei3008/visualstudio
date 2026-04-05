import Cta from "@/components/common/Cta";
import LandingFaq from "@/components/common/LandingFaq";
import TrustSection from "@/components/common/TrustSection";
import Footer from "@/components/footers/Footer";
import HowItWorks from "@/components/landing/HowItWorks";
import PainPoints from "@/components/landing/PainPoints";
import Testimonials from "@/components/landing/Testimonials";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Pricing from "@/components/other-pages/Pricing";
import Services from "@/components/other-pages/services/Services";
import HeroAutomatizariFirme from "@/components/service-heroes/HeroAutomatizariFirme";
import { landingContent } from "@/data/landing-content";
import { automatizariFaqs } from "@/data/landing-faqs";
import pricingAutomatizari from "@/data/pricing-automatizari.json";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatizări pentru firme | Visual Studio Concept",
  description:
    "Automatizăm task-uri repetitive, fluxuri de lead-uri, operațiuni și procese interne pentru companii care vor mai puțin haos și mai multă eficiență.",
  alternates: {
    canonical: "https://visualstudio.ro/automatizari-firme",
  },
  openGraph: {
    title: "Automatizări pentru firme | Visual Studio Concept",
    description:
      "Automatizăm task-uri repetitive și procese interne pentru companii care vor mai multă eficiență.",
    url: "https://visualstudio.ro/automatizari-firme",
    images: [
      {
        url: "/img/illustrations/1920x1080_divider-02.webp",
        width: 1920,
        height: 1080,
        alt: "Automatizări pentru firme",
      },
    ],
  },
};

const content = landingContent.automatizariFirme;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: automatizariFaqs.map((f) => ({
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
  name: "Automatizări pentru firme",
  provider: {
    "@type": "Organization",
    name: "Visual Studio Concept",
    url: "https://visualstudio.ro",
  },
  description:
    "Automatizăm task-uri repetitive, fluxuri de lead-uri, operațiuni și procese interne pentru companii.",
  areaServed: "RO",
};

export default function AutomatizariFirmePage() {
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
        <HeroAutomatizariFirme stats={content.heroStats} />
        <PainPoints items={content.painPoints} />
        <TrustSection />
        <Testimonials items={content.testimonials} />
        <Services
          items={servicePageGroups.automatizariFirme}
          introTitle="Ce automatizăm"
          introText="Eliminăm procesele care consumă timp și creăm fluxuri mai rapide, mai clare și mai ușor de urmărit."
        />
        <HowItWorks
          items={content.steps}
          sectionTitle="Cum funcționează"
          sectionSubtitle="De la discuție la automatizări care rulează singure — în 4 pași simpli."
        />
        <Pricing
          items={pricingAutomatizari}
          sectionLabel="Prețuri"
          sectionTitle="Investiția pentru automatizările tale"
        />
        <LandingFaq items={automatizariFaqs} />
        <ParallaxDivider scrollToContact />
        <ContactForm />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
