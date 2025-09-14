import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proiectele mele',
  description: 'Listă proiecte — vizibilă doar pentru utilizatorii autentificați.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/projects' },
}
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { findUserByEmail } from '@/lib/users'
import { listProjectsByUserId } from '@/lib/projects'

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')
  const projects = await listProjectsByUserId(user.id)
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Proiectele mele</h1>
      <ul className="mt-4 space-y-2">
        {projects.map(p => (
          <li key={p.id} className="rounded border p-3">
            <strong>{p.name}</strong> — {p.status}
          </li>
        ))}
      </ul>
    </main>
  )
}
