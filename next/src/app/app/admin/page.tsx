import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminHome() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  const [users, projects, proposals] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 20, include: { user: true } }),
    prisma.proposal.findMany({ orderBy: { createdAt: 'desc' }, take: 20, include: { project: true, items: true } }),
  ])

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <h1 className="text-2xl font-bold">Admin — Overview</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <section className="rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold">Utilizatori</h2>
          <ul className="mt-3 space-y-2">
            {users.map((x) => (
              <li key={x.id} className="flex items-center justify-between text-sm">
                <span>{x.email}</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">{x.role}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold">Proiecte</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.user.email}</div>
                </div>
                <Link href={`/app/admin/projects/${p.id}`} className="text-primary-700 hover:underline">Mesaje →</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold">Proposals</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {proposals.map((p) => {
              const total = p.items.reduce((s, it) => s + it.qty * it.unitPriceCents, 0)
              return (
                <li key={p.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-slate-500">Proiect: {p.project.name} · Status: {String(p.status)}</div>
                  </div>
                  <div className="font-semibold">{(total/100).toFixed(2)} EUR</div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}

