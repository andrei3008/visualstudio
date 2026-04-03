import type { MetadataRoute } from "next";

const BASE_URL = "https://visualstudio.ro";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return staticPages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified,
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1.0 : page === "/contact" ? 0.9 : page === "/servicii" ? 0.9 : 0.7,
  }));
}
