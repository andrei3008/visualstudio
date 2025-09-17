import { headers } from 'next/headers'

export async function GET() {
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${host}`

  return new Response(`User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Block bad bots
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: Baiduspider
Disallow: /

# Crawl delay
Crawl-delay: 1
`, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  })
}