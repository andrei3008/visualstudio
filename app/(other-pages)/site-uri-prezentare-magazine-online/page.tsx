import Cta from "@/components/common/Cta";
import LandingFaq from "@/components/common/LandingFaq";
import TrustSection from "@/components/common/TrustSection";
import Footer from "@/components/footers/Footer";
import HowItWorks from "@/components/landing/HowItWorks";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import PainPoints from "@/components/landing/PainPoints";
import Testimonials from "@/components/landing/Testimonials";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Pricing from "@/components/other-pages/Pricing";
import Services from "@/components/other-pages/services/Services";
import HeroSiteuriMagazine from "@/components/service-heroes/HeroSiteuriMagazine";
import { landingContent } from "@/data/landing-content";
import { siteuriMagazineFaqs } from "@/data/landing-faqs";
import pricingSiteuri from "@/data/pricing-siteuri.json";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site-uri de prezentare și magazine online | Visual Studio Concept",
  description:
    "Construim site-uri de prezentare și magazine online rapide, moderne și orientate pe conversie pentru companii care vor mai mult decât o simplă prezență online.",
  alternates: {
    canonical:
      "https://visualstudio.ro/site-uri-prezentare-magazine-online",
  },
  openGraph: {
    title:
      "Site-uri de prezentare și magazine online | Visual Studio Concept",
    description:
      "Construim site-uri și magazine online rapide, moderne și orientate pe conversie.",
    url: "https://visualstudio.ro/site-uri-prezentare-magazine-online",
    images: [
      {
        url: "/img/illustrations/1920x1080_divider-01.webp",
        width: 1920,
        height: 1080,
        alt: "Site-uri de prezentare și magazine online",
      },
    ],
  },
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
  const content = landingContent.siteuriMagazine;

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
        <HeroSiteuriMagazine stats={content.heroStats} />
        <div className="landing-section-alt landing-section-alt--even">
          <PainPoints items={content.painPoints} />
        </div>
        <div className="landing-section-alt">
          <TrustSection />
        </div>
        <div className="landing-section-alt landing-section-alt--even">
          <Testimonials items={content.testimonials} />
        </div>
        <div className="landing-section-alt">
          <Services
            items={servicePageGroups.siteuriMagazine}
            introTitle="Ce construim"
            introText="Site-uri și magazine online care arată profesional, se încarcă rapid și aduc lead-uri."
          />
        </div>
        <div className="landing-section-alt landing-section-alt--even">
          <HowItWorks
            items={content.steps}
            sectionTitle="Cum funcționează"
            sectionSubtitle="De la idee la site live — proces clar, fără surprize."
          />
        </div>
        <div className="landing-section-alt">
          <Pricing
            items={pricingSiteuri}
            sectionLabel="Prețuri"
            sectionTitle="Investiția pentru site-ul tău"
          />
        </div>
        <div className="landing-section-alt landing-section-alt--even">
          <LandingFaq items={siteuriMagazineFaqs} />
        </div>
        <div className="landing-section-alt">
          <ParallaxDivider scrollToContact />
        </div>
        <div className="landing-section-alt landing-section-alt--even">
          <ContactForm />
        </div>
        <div className="landing-section-alt">
          <Cta />
        </div>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
