import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import HeroDevOpsCloud from "@/components/service-heroes/HeroDevOpsCloud";
import ParallaxDivider from "@/components/other-pages/services/ParallaxDivider";
import Services from "@/components/other-pages/services/Services";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "DevOps & Cloud || Visual Studio - Software Development Company",
  description: "Servicii DevOps & Cloud - AWS, Azure, CI/CD pipelines, migrare cloud, optimizare costuri, securitate.",
};
export default function DevOpsCloudPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <HeroDevOpsCloud />
        <Services />
        <ParallaxDivider />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
