import capabilities from "@/data/capabilities.json";

const siteUrl = "https://visualstudio.ro";

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Visual Studio Concept",
    url: siteUrl,
    logo: `${siteUrl}/img/favicon/favicon-96x96.png`,
    description:
      "Visual Studio Concept construiește site-uri de prezentare, magazine online, automatizări și software custom pentru firme care vor mai multe lead-uri, mai puțină muncă manuală și procese mai clare.",
    email: "salut@visualstudio.ro",
    telephone: "+40770561719",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RO",
      addressLocality: "București",
    },
    sameAs: [
      "https://www.instagram.com/visualstudio.ro",
      "https://www.tiktok.com/@visualstudio",
      "https://www.youtube.com/@visualstudio",
      "https://github.com/visualstudio",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "salut@visualstudio.ro",
      telephone: "+40770561719",
      availableLanguage: ["Romanian", "English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Visual Studio Concept",
    url: siteUrl,
    inLanguage: "ro-RO",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function ServiceJsonLd() {
  const services = capabilities.map((service) => ({
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "Organization",
      name: "Visual Studio Concept",
      url: siteUrl,
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: service,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function JsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <ServiceJsonLd />
    </>
  );
}
