import { MetadataRoute } from "next";

const siteUrl = "https://visualstudio.ro";

const routes = [
  "",
  "/despre-noi",
  "/servicii",
  "/contact",
  "/portofoliu",
  "/blog",
  "/dezvoltare-software",
  "/automatizari-ai",
  "/aplicatii-mobile",
  "/devops-cloud",
  "/securitate-mentenanta",
  "/site-uri-prezentare-magazine-online",
  "/automatizari-firme",
  "/software-custom-firme",
  "/politica-de-confidentialitate",
  "/politica-de-cookie-uri",
  "/termeni-si-conditii",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const landingPages = [
    "/site-uri-prezentare-magazine-online",
    "/automatizari-firme",
    "/software-custom-firme",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : landingPages.includes(route)
          ? 0.9
          : 0.7,
  }));
}
