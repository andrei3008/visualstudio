import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

export default async function AdminHome() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')

  const [users, projects, proposals, usersCount, projectsCount, proposalsSubmitted, proposalsApproved, messages7d] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 20, include: { user: true } }),
    prisma.proposal.findMany({ orderBy: { createdAt: 'desc' }, take: 20, include: { project: true, items: true } }),
    prisma.user.count(),
    prisma.project.count(),
    prisma.proposal.count({ where: { status: 'submitted' } }),
    prisma.proposal.count({ where: { status: 'approved' } }),
    prisma.message.count({ where: { createdAt: { gte: new Date(Date.now() - 7*24*60*60*1000) } } }),
  ])

  return (
    <main className="py-10">
      <Container>
        <h1 className="text-2xl font-bold">Admin — Overview</h1>
        <p className="mt-1 text-slate-600">KPI rapide și ultimele elemente.</p>

        {/* KPI cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <div className="text-sm text-slate-500">Utilizatori</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">{usersCount}</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Proiecte</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">{projectsCount}</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Proposals trimise</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">{proposalsSubmitted}</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Proposals aprobate</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">{proposalsApproved}</div>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card>
            <h2 className="text-lg font-semibold">Utilizatori</h2>
            <div className="mt-3 hidden sm:grid grid-cols-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Email</span>
              <span className="text-right">Rol</span>
            </div>
            <ul className="mt-2 divide-y divide-slate-100 rounded-md">
              {users.map((x) => (
                <li key={x.id} className="flex items-center justify-between py-2 px-2 -mx-2 odd:bg-slate-50 text-sm">
                  <span className="truncate pr-3">{x.email}</span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">{x.role}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">Proiecte</h2>
            <div className="mt-3 hidden sm:grid grid-cols-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Proiect</span>
              <span>Client</span>
              <span className="text-right">Acțiuni</span>
            </div>
            <ul className="mt-2 divide-y divide-slate-100 rounded-md text-sm">
              {projects.map((p) => (
                <li key={p.id} className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 py-2 px-2 -mx-2 odd:bg-slate-50">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-slate-600 text-xs sm:text-sm">{p.user.email}</div>
                  <div className="sm:text-right">
                    <Link href={`/app/admin/projects/${p.id}`} className="text-primary-700 hover:underline">Mesaje →</Link>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">Proposals</h2>
            <div className="mt-3 hidden sm:grid grid-cols-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Propunere</span>
              <span>Status</span>
              <span className="text-right">Total</span>
            </div>
            <ul className="mt-2 divide-y divide-slate-100 rounded-md text-sm">
              {proposals.map((p) => {
                const total = p.items.reduce((s, it) => s + it.qty * it.unitPriceCents, 0)
                return (
                  <li key={p.id} className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 py-2 px-2 -mx-2 odd:bg-slate-50">
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-slate-500">Proiect: {p.project.name}</div>
                    </div>
                    <div className="text-slate-700">{String(p.status)}</div>
                    <div className="sm:text-right font-semibold">{(total/100).toFixed(2)} EUR</div>
                  </li>
                )
              })}
            </ul>
          </Card>
        </div>
      </Container>
    </main>
  )
}
