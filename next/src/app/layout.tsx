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

export const metadata: Metadata = {
  title: 'Client Portal',
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
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-900">Client Portal</Link>
            <div className="flex items-center gap-6 text-sm font-semibold text-slate-700">
              <Link href="/services" className="hover:text-primary-700">Servicii</Link>
              <Link href="/pricing" className="hover:text-primary-700">Prețuri</Link>
              <Link href="/contact" className="hover:text-primary-700">Contact</Link>
              <Link href="/projects" className="hidden sm:inline hover:text-primary-700">Proiecte</Link>
              {session?.user ? (
                <div className="flex items-center gap-3">
                  <Link href="/app" className="hover:text-primary-700">Dashboard</Link>
                  {isAdmin && <Link href="/app/admin" className="hover:text-primary-700">Admin</Link>}
                  <Link href="/account" className="hover:text-primary-700">Contul meu</Link>
                  <NotificationBell />
                  <span className="hidden sm:inline text-slate-500">{session.user.email}</span>
                  <SignOutButton />
                </div>
              ) : (
                <>
                  <Link href="/login" className="rounded-md bg-primary-600 px-3 py-2 text-white hover:bg-primary-700">Intră în portal</Link>
                  <Link href="/register" className="hidden sm:inline hover:text-primary-700">Înregistrare</Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <ToasterClient />
        <main>{children}</main>
        <footer className="mt-16 border-t border-slate-200 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Client Portal. Toate drepturile rezervate.
        </footer>
      </body>
    </html>
  )
}
