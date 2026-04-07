import type { MetadataRoute } from "next";
import { getAllPublishedSlugs } from "@/lib/blog";

const BASE_URL = "https://visualstudio.ro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPages = [
    "",
    "/contact",
    "/servicii",
    "/despre-noi",
    "/portofoliu",
    "/preturi",
    "/software-custom-firme",
    "/site-uri-prezentare-magazine-online",
    "/aplicatii-mobile",
    "/automatizari-ai",
    "/automatizari-firme",
    "/devops-cloud",
    "/dezvoltare-software",
    "/securitate-mentenanta",
    "/blog",
    "/faq",
    "/termeni-si-conditii",
    "/politica-de-confidentialitate",
    "/politica-de-cookie-uri",
  ];

  const staticEntries = staticPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified,
    changeFrequency: (page === "" ? "weekly" : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: page === "" ? 1.0 : page === "/contact" ? 0.9 : page === "/servicii" ? 0.9 : 0.7,
  }));

  try {
    const posts = await getAllPublishedSlugs();
    const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticEntries, ...blogEntries];
  } catch {
    // If DB is not available during build, return static pages only
    return staticEntries;
  }
}
