import Blog1ro from "@/components/blog/Blog1ro";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog | Visual Studio Concept",
  description:
    "Articole despre dezvoltare software, automatizare, produs digital, AI și decizii tehnice care au impact într-un business real.",
  alternates: {
    canonical: "https://visualstudio.ro/blog",
  },
  openGraph: {
    title: "Blog | Visual Studio Concept",
    description: "Articole despre dezvoltare software, automatizări, DevOps și tendințe din industria tech.",
    url: "https://visualstudio.ro/blog",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Blog | Visual Studio Concept",
      },
    ],
  },
};
export default function BlogPage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <Blog1ro />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
