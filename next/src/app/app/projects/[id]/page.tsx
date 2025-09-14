import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'
import NewTaskForm from '@/components/NewTaskForm'
import NewMilestoneForm from '@/components/NewMilestoneForm'
import TaskRow from '@/components/TaskRow'
import MilestoneRow from '@/components/MilestoneRow'
import Card from '@/components/ui/Card'
import NewProposalForm from '@/components/NewProposalForm'
import NewMessageForm from '@/components/NewMessageForm'
import NewFileUploadForm from '@/components/NewFileUploadForm'
import FileDropzone from '@/components/FileDropzone'
import { Suspense } from 'react'
import FilesList from './FilesList'
import Link from 'next/link'
import Tabs from '@/components/ui/Tabs'
import Breadcrumb from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const proj = await prisma.project.findUnique({ where: { id: params.id }, select: { name: true } })
  return { title: proj?.name ? `Proiect — ${proj.name}` : 'Proiect' }
}

export default async function ProjectDetailPage({ params, searchParams }: { params: { id: string }; searchParams?: { tab?: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')
  const project = await prisma.project.findFirst({ where: { id: params.id, userId: user.id } })
  if (!project) redirect('/app')

  const [tasks, milestones, proposals, messages] = await Promise.all([
    prisma.task.findMany({ where: { projectId: project.id }, orderBy: [{ status: 'asc' }, { dueAt: 'asc' }, { createdAt: 'desc' }] }),
    prisma.milestone.findMany({ where: { projectId: project.id }, orderBy: [{ status: 'asc' }, { dueAt: 'asc' }, { createdAt: 'desc' }] }),
    prisma.proposal.findMany({ where: { projectId: project.id }, include: { items: true }, orderBy: { createdAt: 'desc' } }),
    prisma.message.findMany({ where: { projectId: project.id, isInternal: false }, orderBy: { createdAt: 'asc' }, include: { author: { select: { email: true } } } }),
  ])

  const tab = (searchParams?.tab as string) || 'tasks'

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'Dashboard', href: '/app' }, { label: 'Proiecte', href: '/app' }, { label: project.name }]} />
          <h1 className="mt-1 text-2xl font-bold">{project.name}</h1>
        </div>
        <Link href="/app" className="text-sm text-primary-700 hover:underline">← Înapoi la dashboard</Link>
      </div>

      <Tabs
        className="mt-6"
        activeId={tab}
        tabs={[
          { id: 'tasks', label: 'Tasks', href: `?tab=tasks` },
          { id: 'milestones', label: 'Milestones', href: `?tab=milestones` },
          { id: 'proposals', label: 'Proposals', href: `?tab=proposals` },
          { id: 'files', label: 'Fișiere', href: `?tab=files` },
          { id: 'messages', label: 'Mesaje', href: `/app/admin/projects/${project.id}` },
        ]}
      />

      {tab === 'tasks' && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
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
          </Card>

          <Card>
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
          </Card>
        </div>
      )}

      {tab === 'proposals' && (
        <Card className="mt-8">
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
        </Card>
      )}

      {tab === 'messages' && (
        <Card className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">Mesaje</h2>
        <ul className="mt-4 divide-y divide-slate-100 rounded-md">
          {messages.length === 0 ? (
            <li className="py-4 text-slate-600">Nu există mesaje încă.</li>
          ) : (
            messages.map((m: any) => (
              <li key={m.id} className="py-3 px-2 -mx-2 odd:bg-slate-50">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate pr-2">{m.author.email}</span>
                  <span>{new Date(m.createdAt).toLocaleString('ro-RO')}</span>
                </div>
                <div className="mt-1 whitespace-pre-wrap text-sm">{m.body}</div>
              </li>
            ))
          )}
        </ul>
        <div className="mt-4">
          <NewMessageForm projectId={project.id} />
        </div>
        </Card>
      )}

      {tab === 'files' && (
        <Card className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">Fișiere</h2>
        <div className="mt-4">
          <FileDropzone projectId={project.id} />
        </div>
        <Suspense>
          <FilesList projectId={project.id} />
        </Suspense>
        </Card>
      )}
    </main>
  )
}
