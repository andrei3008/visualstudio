import './globals.css'
import type { Metadata, Viewport } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import ToasterClient from '@/components/ToasterClient'
import { prisma } from '@/lib/prisma'
import NextDynamic from 'next/dynamic'
import StructuredData from '@/components/StructuredData'
import Navbar from '@/components/Navbar'
import ThemeInit from '@/components/ThemeInit'
import { Sparkles } from 'lucide-react'
import ConditionalMainLayout from '@/components/ConditionalMainLayout'
import CookieConsent from '@/components/CookieConsent'


export const metadata: Metadata = {
  title: {
    default: 'Visual Studio - Dezvoltare Software la Comandă 2025',
    template: '%s | Visual Studio - Platformă pentru Dezvoltare Software',
  },
  description: 'Platformă modernă Visual Studio 2025 pentru servicii software la comandă. Ofertare rapidă, execuție transparentă, status live în timp real și facturare automată. Soluție completă pentru clienții corporatiști.',
  keywords: ['dezvoltare software', 'software la comandă', 'outsourcing IT', 'platformă software', 'management proiecte', 'web development', 'mobile apps', 'AI solutions', 'Romania software'],
  authors: [{ name: 'Visual Studio Team' }],
  creator: 'Visual Studio',
  publisher: 'Visual Studio',
  metadataBase: typeof process !== 'undefined' && process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL) : undefined,
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: '/',
    siteName: 'Visual Studio',
    title: 'Visual Studio - Platformă pentru Dezvoltare Software 2025',
    description: 'Soluție completă pentru servicii software la comandă. Ofertare rapidă, execuție transparentă, status live și facturare automată.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Visual Studio - Dezvoltare Software la Comandă',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Studio - Platformă pentru Dezvoltare Software 2025',
    description: 'Soluție completă pentru servicii software la comandă cu ofertare rapidă și execuție transparentă.',
    images: ['/twitter-image.jpg'],
    creator: '@visualstudio',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#3b82f6',
}

// Ensure pages are rendered dynamically at runtime (avoid build-time execution of auth/session)
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  let isAdmin = false
  if (session?.user?.email) {
    const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
    isAdmin = u?.role === 'admin'
  }
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        {/* Structured Data for SEO */}
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <ThemeInit />
        <Navbar session={session} isAdmin={isAdmin} />
        <ToasterClient />
        <ConditionalMainLayout>{children}</ConditionalMainLayout>
        <CookieConsent />
        <footer className="mt-12 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-purple-400 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-pink-400 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Border top with gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></div>

        <div className="relative container mx-auto px-4 py-8">
          {/* Main content */}
          <div className="text-center mb-6">
            {/* Logo/Brand with glow effect */}
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">VS</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-md opacity-50 animate-pulse"></div>
              </div>
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Visual Studio
              </span>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              © {new Date().getFullYear()} Visual Studio. Toate drepturile rezervate.
            </p>

            {/* Navigation links */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
              {[
                { href: "/privacy-policy", label: "Privacy" },
                { href: "/cookie-policy", label: "Cookies" },
                { href: "/gdpr", label: "GDPR" },
                { href: "/terms", label: "Termeni" },
                { href: "/despre-noi", label: "Despre" },
                { href: "/servicii", label: "Servicii" },
                { href: "/contact", label: "Contact" }
              ].map((link, index) => (
                <div key={link.href} className="flex items-center">
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105 inline-block"
                  >
                    {link.label}
                  </a>
                  {index < 6 && (
                    <span className="mx-2 text-gray-400 dark:text-gray-600">•</span>
                  )}
                </div>
              ))}
            </div>

            {/* Tagline */}
            <p className="text-xs text-gray-500 dark:text-gray-500 italic">
              Platformă modernă pentru dezvoltare software • Build with ❤️ using Next.js
            </p>
          </div>

          {/* Bottom accent line */}
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30"></div>
          </div>
        </div>
      </footer>
      </body>
    </html>
  )
}
