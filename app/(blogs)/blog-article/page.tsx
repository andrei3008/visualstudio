import BlogDetails from "@/components/blogs/BlogDetails";
import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Articol | Visual Studio Concept",
  description:
    "Articol din blogul Visual Studio Concept despre dezvoltare software, automatizare, produs digital și tehnologie aplicată în business.",
};
export default function BlogSinglePage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <BlogDetails />
        <Blogs desc="" title="Articole similare" />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
