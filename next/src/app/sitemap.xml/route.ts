import { headers } from 'next/headers'

export async function GET() {
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${host}`

  // Static pages
  const staticPages = [
    '',
    '/services',
    '/pricing',
    '/contact',
    '/login',
    '/register',
  ]

  // Dynamic app pages (would need to be generated from database in production)
  const appPages = [
    '/app',
    '/app/dashboard',
    '/app/projects',
    '/app/admin',
  ]

  // Add project detail pages (these would need to be dynamically generated from database)
  const projectPages: { id: string }[] = [] // In production: await prisma.project.findMany({ select: { id: true } })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
${appPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
${projectPages.map(project => `
  <url>
    <loc>${baseUrl}/app/projects/${project.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  })
}