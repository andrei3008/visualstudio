import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroDevOpsCloud from "@/components/service-heroes/HeroDevOpsCloud";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { servicePageGroups } from "@/data/service-page-groups";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "DevOps și Cloud | Visual Studio Concept",
  description:
    "Configurăm infrastructură cloud, CI/CD, deployment, observabilitate și optimizare de cost pentru aplicații care trebuie să ruleze stabil și sigur.",
};
export default function DevOpsCloudPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroDevOpsCloud />
        <Services
          items={servicePageGroups.devopsCloud}
          introTitle="Ce optimizăm în zona de DevOps și cloud"
          introText="Ne uităm la viteză de livrare, stabilitate, control operațional și cost, astfel încât infrastructura să susțină produsul fără risipă sau improvizații."
        />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
