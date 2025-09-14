import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import NewMessageForm from '@/components/NewMessageForm'

export default async function AdminProjectMessages({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')
  const u = await prisma.user.findUnique({ where: { email: session.user.email }, select: { role: true } })
  if (u?.role !== 'admin') redirect('/app')
  const project = await prisma.project.findUnique({ where: { id: params.id }, include: { user: true } })
  if (!project) redirect('/app/admin')

  const msgs = await prisma.message.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: 'asc' },
    include: { author: { select: { email: true, name: true, role: true } } },
  })

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mesaje — {project.name}</h1>
          <p className="text-slate-600 text-sm">Client: {project.user.email}</p>
        </div>
        <Link href="/app/admin" className="text-sm text-primary-700 hover:underline">← Înapoi la Admin</Link>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 p-5">
        <ul className="space-y-3">
          {msgs.length === 0 ? (
            <li className="text-slate-600">Nu există mesaje.</li>
          ) : (
            msgs.map((m) => (
              <li key={m.id} className="rounded border p-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{m.author.email} {m.author.role === 'admin' && '(admin)'} {m.isInternal && '· Notă internă'}</span>
                  <span>{new Date(m.createdAt).toLocaleString('ro-RO')}</span>
                </div>
                <div className="mt-1 whitespace-pre-wrap text-sm">{m.body}</div>
              </li>
            ))
          )}
        </ul>
        <div className="mt-4">
          <NewMessageForm projectId={project.id} canInternal />
        </div>
      </section>
    </main>
  )
}

