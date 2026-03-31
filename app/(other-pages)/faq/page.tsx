import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import Faqs from "@/components/other-pages/Faqs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Întrebări frecvente | Visual Studio Concept",
  description:
    "Răspunsuri clare despre procesul de lucru, estimări, livrare, mentenanță și colaborarea pentru proiecte software la comandă.",
  alternates: {
    canonical: "https://visualstudio.ro/faq",
  },
  openGraph: {
    title: "Întrebări Frecvente | Visual Studio Concept",
    description: "Răspunsuri la cele mai frecvente întrebări despre serviciile noastre de dezvoltare software.",
    url: "https://visualstudio.ro/faq",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Întrebări Frecvente | Visual Studio Concept",
      },
    ],
  },
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
