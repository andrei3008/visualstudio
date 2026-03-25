import Blogs2 from "@/components/blogs/Blogs2";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog extins | Visual Studio Concept",
  description:
    "Colecție extinsă de articole și resurse despre tehnologie, dezvoltare software, produs digital și automatizare.",
};
export default function BlogCreativePage() {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <Blogs2 />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
