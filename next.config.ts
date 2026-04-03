import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-auth"],
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              // Default: only allow same-origin for everything
              "default-src 'self'",
              // Scripts: allow inline (for Next.js hydration, color scheme, tracking init)
              // and specific external domains
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net",
              // Styles: allow inline (Next.js CSS, admin styles), self, and Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images: allow self, data: URIs (SVGs, base64), blob: (Next.js image opt)
              "img-src 'self' data: blob: https://www.facebook.com https://www.googletagmanager.com",
              // Fonts: allow self, data: URIs (icon fonts, base64), and Google Fonts CDN
              "font-src 'self' data: https://fonts.gstatic.com",
              // Connections (fetch, XHR): allow self (API calls) and analytics endpoints
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://graph.facebook.com",
              // Frames: disallow embedding by default (admin protection)
              "frame-src 'none'",
              // Objects/plugins: disallow
              "object-src 'none'",
              // Base URI: restrict to self
              "base-uri 'self'",
              // Form actions: allow self (contact form, login)
              "form-action 'self'",
              // Frame ancestors: prevent clickjacking
              "frame-ancestors 'none'",
              // Upgrade insecure requests in production
              ...(process.env.NODE_ENV === "production"
                ? ["upgrade-insecure-requests"]
                : []),
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
