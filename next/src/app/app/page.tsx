export const metadata = { title: 'Dashboard — Client Portal' }

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { findUserByEmail } from '@/lib/users'
import { listProjectsByUserId } from '@/lib/projects'
import NewProjectForm from '@/components/NewProjectForm'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { prisma } from '@/lib/prisma'

export default async function AppDashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const user = await findUserByEmail(session.user.email)
  if (!user) redirect('/login')
  const [projects, submittedCount, approvedCount, openTasks] = await Promise.all([
    listProjectsByUserId(user.id),
    prisma.proposal.count({ where: { project: { userId: user.id }, status: 'submitted' } }),
    prisma.proposal.count({ where: { project: { userId: user.id }, status: 'approved' } }),
    prisma.task.count({ where: { project: { userId: user.id }, NOT: { status: 'done' } } }),
  ])

  return (
    <main className="py-10">
      <Container>
        <h1 className="text-2xl font-bold">Bun venit, {session.user.name || session.user.email}!</h1>
        <p className="mt-1 text-slate-600">Vedere de ansamblu și proiectele tale.</p>

        {/* KPI cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <div className="text-sm text-slate-500">Proiecte</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">{projects.length}</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Proposals trimise</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">{submittedCount}</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Proposals aprobate</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">{approvedCount}</div>
          </Card>
          <Card>
            <div className="text-sm text-slate-500">Task-uri deschise</div>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">{openTasks}</div>
          </Card>
        </div>

        {/* Projects */}
        <Card className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">Proiectele mele</h2>
          <div className="mt-4">
            <NewProjectForm />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.length === 0 ? (
              <p className="text-slate-600">Nu ai proiecte încă. Adaugă unul mai sus.</p>
            ) : (
              projects.map((p: any) => (
                <Card key={p.id}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{p.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Creat la: {new Date(p.createdAt).toLocaleDateString('ro-RO')}</p>
                  <div className="mt-3">
                    <Link href={`/app/projects/${p.id}`} className="text-sm text-primary-700 hover:underline">Deschide proiectul →</Link>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>
      </Container>
    </main>
  )
}
