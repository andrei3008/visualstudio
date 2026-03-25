import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import Faqs from "@/components/other-pages/Faqs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Întrebări frecvente | Visual Studio Concept",
  description:
    "Răspunsuri clare despre procesul de lucru, estimări, livrare, mentenanță și colaborarea pentru proiecte software la comandă.",
};
export default function FaqsPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <Faqs />
        <Blogs />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
