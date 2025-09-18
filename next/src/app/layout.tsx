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
        <footer className="mt-16 border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-gray-600" />
              <span className="font-semibold text-gray-700">© {new Date().getFullYear()} Visual Studio</span>
              <Sparkles className="h-4 w-4 text-gray-600" />
            </div>
            <p className="text-gray-500">Toate drepturile rezervate. Platformă modernă pentru dezvoltare software 2025.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
