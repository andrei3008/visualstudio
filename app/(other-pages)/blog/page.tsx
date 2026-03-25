import Blog1ro from "@/components/blog/Blog1ro";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog | Visual Studio Concept",
  description:
    "Articole despre dezvoltare software, automatizare, produs digital, AI și decizii tehnice care au impact într-un business real.",
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
