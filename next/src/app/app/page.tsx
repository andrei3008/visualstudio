export const metadata = { title: 'Dashboard — Client Portal' }

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { findUserByEmail } from '@/lib/users'
import { listProjectsByUserId } from '@/lib/projects'
import NewProjectForm from '@/components/NewProjectForm'

export default async function AppDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')
  const projects = await listProjectsByUserId(user.id)
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
      <h1 className="text-2xl font-bold">Bun venit, {session.user.name || session.user.email}!</h1>
      <p className="mt-1 text-slate-600">Iată o vedere de ansamblu a proiectelor tale.</p>

      <div className="mt-6 rounded-xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Proiectele mele</h2>
        <div className="mt-4">
          <NewProjectForm />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects.length === 0 ? (
            <p className="text-slate-600">Nu ai proiecte încă. Adaugă unul mai sus.</p>
          ) : (
            projects.map(p => (
              <div key={p.id} className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{p.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">Creat la: {new Date(p.createdAt).toLocaleDateString('ro-RO')}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
