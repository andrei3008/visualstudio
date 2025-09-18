'use client'

import { usePathname } from 'next/navigation'

interface ConditionalMainLayoutProps {
  children: React.ReactNode
}

export default function ConditionalMainLayout({ children }: ConditionalMainLayoutProps) {
  const pathname = usePathname()

  // Add padding only for non-homepage pages
  const isHomepage = pathname === '/'

  return (
    <main className={`min-h-[60vh] ${!isHomepage ? 'pt-16' : ''}`}>
      {children}
    </main>
  )
}