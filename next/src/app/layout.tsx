import './globals.css'
import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import SignOutButton from '@/components/SignOutButton'
import ToasterClient from '@/components/ToasterClient'
import { prisma } from '@/lib/prisma'
import dynamic from 'next/dynamic'
const NotificationBell = dynamic(() => import('@/components/NotificationBell'), { ssr: false })
import ThemeInit from '@/components/ThemeInit'
import ThemeToggle from '@/components/ThemeToggle'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: {
    default: 'Visual Studio',
    template: '%s — Visual Studio',
  },
  description: 'Visual Studio — portal clienți pentru servicii software la comandă: intake, ofertare, execuție, status live și facturare.',
  metadataBase: typeof process !== 'undefined' && process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL) : undefined,
  openGraph: {
    type: 'website',
    title: 'Visual Studio',
    description: 'Portal clienți pentru servicii software la comandă.',
    siteName: 'Visual Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Studio',
    description: 'Portal clienți pentru servicii software la comandă.',
  },
  alternates: {
    canonical: '/',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

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
        <ThemeInit />
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/75">
          <nav className="container flex items-center justify-between py-4">
            <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">Visual Studio</Link>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Link href="/services" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Servicii</Link>
              <Link href="/pricing" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Prețuri</Link>
              <Link href="/contact" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Contact</Link>
              <Link href="/projects" className="hidden sm:inline px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Proiecte</Link>
              {session?.user ? (
                <div className="flex items-center gap-3">
                  <Link href="/app" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Dashboard</Link>
                  {isAdmin && <Link href="/app/admin" className="hover:text-primary-700">Admin</Link>}
                  <Link href="/account" className="px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Contul meu</Link>
                  <ThemeToggle />
                  <NotificationBell />
                  <span className="hidden sm:inline text-slate-500">{session.user.email}</span>
                  <SignOutButton />
                </div>
              ) : (
                <>
                  <Link href="/login" className="rounded-md bg-primary-600 px-3 py-2 text-white hover:bg-primary-700">Intră în portal</Link>
                  <Link href="/register" className="hidden sm:inline px-3 py-2 rounded hover:bg-slate-100">Înregistrare</Link>
                  <ThemeToggle />
                </>
              )}
            </div>
          </nav>
        </header>
        <ToasterClient />
        <main className="min-h-[60vh]">{children}</main>
        <footer className="mt-16 border-t border-slate-200 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Visual Studio. Toate drepturile rezervate.
        </footer>
      </body>
    </html>
  )
}
