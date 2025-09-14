import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/app',
          '/api',
          '/proposal/*', // public proposals remain accessible but we don’t want indexing
          '/login',
          '/register',
        ],
      },
    ],
    sitemap: `${base.replace(/\/$/, '')}/sitemap.xml`,
  }
}

