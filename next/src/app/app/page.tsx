export const metadata = { title: 'Dashboard — Client Portal' }

const demo = [
  { id: 1, name: 'Website prezentare', status: 'in-progress', next: 'Revizuire design' },
  { id: 2, name: 'Aplicație mobilă', status: 'scoping', next: 'Oferta finală' },
  { id: 3, name: 'Portal clienți', status: 'review', next: 'Acceptare livrabil' }
]

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'

export default async function AppDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
      <h1 className="text-2xl font-bold">Bun venit, {session.user.name || session.user.email}!</h1>
      <p className="mt-1 text-slate-600">Iată o vedere de ansamblu a proiectelor tale.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {demo.map(p => (
          <div key={p.id} className="rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{p.status}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">Următorul pas: {p.next}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
