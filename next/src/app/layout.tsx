import './globals.css'
import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import SignOutButton from '@/components/SignOutButton'
import ToasterClient from '@/components/ToasterClient'
import { prisma } from '@/lib/prisma'
import NextDynamic from 'next/dynamic'
import StructuredData from '@/components/StructuredData'
const NotificationBell = NextDynamic(() => import('@/components/NotificationBell'), { ssr: false })
import ThemeInit from '@/components/ThemeInit'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, ArrowRight, User, Settings, LogOut, Bell, Home, Building2 } from 'lucide-react'


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
        <header className="sticky top-0 z-50 border-b border-blue-100/50 bg-white/90 backdrop-blur-xl shadow-sm">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Visual Studio
                    </span>
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-6">
                <Link href="/services" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
                  Servicii
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                </Link>
                <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors relative group">
                  Prețuri
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                </Link>
                <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors relative group">
                  Contact
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                </Link>
                <Link href="/projects" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
                  Proiecte
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                </Link>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-3">
                {session?.user ? (
                  <div className="flex items-center gap-2">
                    {/* Dashboard Link */}
                    <Link href="/app">
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </Button>
                    </Link>

                    {/* Admin Link */}
                    {isAdmin && (
                      <Link href="/app/admin">
                        <Badge variant="outline" className="text-xs border-blue-300 text-blue-700 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                          Admin
                        </Badge>
                      </Link>
                    )}

                    {/* User Menu */}
                    <div className="relative group">
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline text-sm">{session.user?.email?.split('@')[0]}</span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </Button>

                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        <div className="py-2">
                          <Link href="/account">
                            <Button variant="ghost" size="sm" className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                              <Settings className="h-4 w-4 mr-2" />
                              Contul meu
                            </Button>
                          </Link>

                          <div className="border-t border-blue-100 my-2"></div>

                          <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 bg-blue-50 rounded-lg mx-2 mb-2">
                            <Bell className="h-3 w-3 text-blue-500" />
                            <NotificationBell />
                            <span className="ml-2">Notificări</span>
                          </div>

                          <SignOutButton className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200">
                            <LogOut className="h-4 w-4 mr-2" />
                            Ieșire
                          </SignOutButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/login">
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                        <span>Intră în portal</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/register" className="hidden sm:block">
                      <Button size="sm" variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Înregistrare
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>
        <ToasterClient />
        <main className="min-h-[60vh]">{children}</main>
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
