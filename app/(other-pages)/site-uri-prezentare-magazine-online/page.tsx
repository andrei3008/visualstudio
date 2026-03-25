import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import HeroSiteuriMagazine from "@/components/service-heroes/HeroSiteuriMagazine";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site-uri de prezentare și magazine online | Visual Studio Concept",
  description:
    "Construim site-uri de prezentare și magazine online rapide, moderne și orientate pe conversie pentru companii care vor mai mult decât o simplă prezență online.",
};

export default function SiteuriPrezentareMagazinePage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroSiteuriMagazine />
        <Services
          items={servicePageGroups.siteuriMagazine}
          introTitle="Ce livrăm în proiectele web și eCommerce"
          introText="Punem accent pe claritate, încredere și conversie. Scopul nu este doar un design frumos, ci un site care explică bine oferta, răspunde rapid și transformă vizitele în cereri sau vânzări."
        />
        <ParallaxDivider />
        <ContactForm />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
