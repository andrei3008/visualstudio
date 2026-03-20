import "../public/css/styles.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Visual Studio Concept - Software Development Company",
  description:
    "Visual Studio Concept - Software development company specializată în Next.js, React, CRM, E-commerce și soluții software custom.",
};
const setColorSchemeScript = `
(function() {
  try {
    var scheme = localStorage.getItem('color-scheme') || 'light';
    document.documentElement.setAttribute('color-scheme', scheme);
  } catch(e) {}
})();
`;

const scrollFixScript = `
(function() {
  // Handle internal links scroll to top
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="/"]');
    if (link && !link.target) {
      e.preventDefault();
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Navigate after a small delay
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    }
  });
})();
`;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="no-touch">
      <head>
        <script dangerouslySetInnerHTML={{ __html: setColorSchemeScript }} />
        <script dangerouslySetInnerHTML={{ __html: scrollFixScript }} />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
