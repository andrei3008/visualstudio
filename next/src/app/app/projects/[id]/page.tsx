import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'
import NewTaskForm from '@/components/NewTaskForm'
import NewMilestoneForm from '@/components/NewMilestoneForm'
import TaskRow from '@/components/TaskRow'
import MilestoneRow from '@/components/MilestoneRow'
import NewProposalForm from '@/components/NewProposalForm'
import Link from 'next/link'

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')
  const project = await prisma.project.findFirst({ where: { id: params.id, userId: user.id } })
  if (!project) redirect('/app')

  const [tasks, milestones, proposals] = await Promise.all([
    prisma.task.findMany({ where: { projectId: project.id }, orderBy: [{ status: 'asc' }, { dueAt: 'asc' }, { createdAt: 'desc' }] }),
    prisma.milestone.findMany({ where: { projectId: project.id }, orderBy: [{ status: 'asc' }, { dueAt: 'asc' }, { createdAt: 'desc' }] }),
    prisma.proposal.findMany({ where: { projectId: project.id }, include: { items: true }, orderBy: { createdAt: 'desc' } }),
  ])

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <Link href="/app" className="text-sm text-primary-700 hover:underline">← Înapoi la dashboard</Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Tasks</h2>
          <div className="mt-4"><NewTaskForm projectId={project.id} /></div>
          <ul className="mt-6 space-y-3">
            {tasks.length === 0 ? (
              <li className="text-slate-600">Nu există task-uri încă.</li>
            ) : (
              tasks.map((t: any) => (
                <TaskRow
                  key={t.id}
                  projectId={project.id}
                  task={{ id: t.id, title: t.title, status: t.status as any, dueAt: (t.dueAt as any)?.toString() ?? null, estimateH: t.estimateH as any }}
                />
              ))
            )}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Milestones</h2>
          <div className="mt-4"><NewMilestoneForm projectId={project.id} /></div>
          <ul className="mt-6 space-y-3">
            {milestones.length === 0 ? (
              <li className="text-slate-600">Nu există milestones încă.</li>
            ) : (
              milestones.map((m: any) => (
                <MilestoneRow
                  key={m.id}
                  projectId={project.id}
                  item={{ id: m.id, title: m.title, status: m.status as any, dueAt: (m.dueAt as any)?.toString() ?? null }}
                />
              ))
            )}
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Proposals</h2>
        <div className="mt-4"><NewProposalForm projectId={project.id} /></div>
        <ul className="mt-6 space-y-3">
          {proposals.length === 0 ? (
            <li className="text-slate-600">Nu există propuneri încă.</li>
          ) : (
            proposals.map((p: any) => {
              const total = p.items.reduce((s: number, it: any) => s + it.qty * it.unitPriceCents, 0)
              return (
                <li key={p.id} className="rounded border border-slate-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">{p.title}</div>
                      <div className="text-xs text-slate-500">Status: {String(p.status)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{(total/100).toFixed(2)} EUR</div>
                      <Link href={`/app/proposals/${p.id}`} className="text-sm text-primary-700 hover:underline">Deschide →</Link>
                    </div>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      </section>
    </main>
  )
}
