import "../public/css/styles.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Studio Concept | Dezvoltare software la comandă",
  description:
    "Visual Studio Concept construiește site-uri de prezentare, magazine online, automatizări și software custom pentru firme care vor mai multe lead-uri, mai puțină muncă manuală și procese mai clare.",
  metadataBase: new URL("https://visualstudio.ro"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Visual Studio Concept | Site-uri, automatizări și software custom",
    description:
      "Construim site-uri de prezentare, magazine online, automatizări și software custom pentru firme care vor rezultate reale.",
    url: "https://visualstudio.ro",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
  },
};

const setColorSchemeScript = `
(function() {
  try {
    var scheme = localStorage.getItem('color-scheme') || 'light';
    document.documentElement.setAttribute('color-scheme', scheme);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ro" className="no-touch">
      <head>
        <script dangerouslySetInnerHTML={{ __html: setColorSchemeScript }} />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
