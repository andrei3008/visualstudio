import BlogDetails from "@/components/blogs/BlogDetails";
import Blogs from "@/components/common/Blogs";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Articol | Visual Studio Concept",
  description:
    "Articol din blogul Visual Studio Concept despre dezvoltare software, automatizare, produs digital și tehnologie aplicată în business.",
  alternates: {
    canonical: "https://visualstudio.ro/blog-article",
  },
  openGraph: {
    title: "Articol Blog | Visual Studio Concept",
    description: "Articole și insight-uri din lumea dezvoltării software.",
    url: "https://visualstudio.ro/blog-article",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Articol Blog | Visual Studio Concept",
      },
    ]
  },
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
