import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import ContactForm from "@/components/other-pages/contact/ContactForm";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import HeroAutomatizariFirme from "@/components/service-heroes/HeroAutomatizariFirme";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatizări pentru firme | Visual Studio Concept",
  description:
    "Automatizăm task-uri repetitive, fluxuri de lead-uri, operațiuni și procese interne pentru companii care vor mai puțin haos și mai multă eficiență.",
};

export default function AutomatizariFirmePage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroAutomatizariFirme />
        <Services
          items={servicePageGroups.automatizariFirme}
          introTitle="Ce automatizăm în practică"
          introText="Ne uităm la task-urile care consumă timp, creează erori sau depind prea mult de intervenție manuală și le transformăm în fluxuri mai rapide, mai clare și mai ușor de urmărit."
        />
        <ParallaxDivider />
        <ContactForm />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
