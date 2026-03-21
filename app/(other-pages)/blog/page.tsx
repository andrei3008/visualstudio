import Blog1ro from "@/components/blog/Blog1ro";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog || Visual Studio - Software Development Company",
  description: "Blog Visual Studio - articole despre dezvoltare software, tehnologie, AI și tendințe digitale.",
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
