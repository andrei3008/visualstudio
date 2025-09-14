import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Înregistrare',
  robots: { index: false, follow: false },
  alternates: { canonical: '/register' },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}

