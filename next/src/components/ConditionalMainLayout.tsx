'use client'

import { usePathname } from 'next/navigation'

interface ConditionalMainLayoutProps {
  children: React.ReactNode
}

export default function ConditionalMainLayout({ children }: ConditionalMainLayoutProps) {
  const pathname = usePathname()

  // Add padding only for non-homepage and non-dashboard pages
  const isHomepage = pathname === '/'
  const isDashboard = pathname.startsWith('/app')

  return (
    <main className={`min-h-[60vh] ${!isHomepage && !isDashboard ? 'pt-16' : ''}`}>
      {children}
    </main>
  )
}