import Blogs2 from "@/components/blogs/Blogs2";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog extins | Visual Studio Concept",
  description:
    "Colecție extinsă de articole și resurse despre tehnologie, dezvoltare software, produs digital și automatizare.",
  alternates: {
    canonical: "https://visualstudio.ro/blog-creative",
  },
  openGraph: {
    title: "Blog Creativ | Visual Studio Concept",
    description: "Perspective creative din lumea tech și business digital.",
    url: "https://visualstudio.ro/blog-creative",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Blog Creativ | Visual Studio Concept",
      },
    ]
  },
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
