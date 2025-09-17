import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import NewMessageForm from '@/components/NewMessageForm'
import { Card } from "@/components/ui/card"
import DeleteFileButton from '@/components/DeleteFileButton'
import { Badge } from '@/components/ui/badge'
import FileDropzone from '@/components/FileDropzone'

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
  const files = await prisma.file.findMany({ where: { projectId: project.id }, orderBy: { createdAt: 'desc' } })

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mesaje — {project.name}</h1>
          <p className="text-slate-600 text-sm">Client: {project.user.email}</p>
        </div>
        <Link href="/app/admin" className="text-sm text-primary-700 hover:underline">← Înapoi la Admin</Link>
      </div>

      <Card className="mt-6">
        <ul className="divide-y divide-slate-100 rounded-md">
          {msgs.length === 0 ? (
            <li className="py-4 text-slate-600">Nu există mesaje.</li>
          ) : (
            msgs.map((m) => (
              <li key={m.id} className="py-3 px-2 -mx-2 odd:bg-slate-50">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate pr-2">{m.author.email} {m.author.role === 'admin' && '(admin)'} {m.isInternal && '· Notă internă'}</span>
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
      </Card>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold">Fișiere</h2>
        <div className="mt-3"><FileDropzone projectId={project.id} canInternal /></div>
        <ul className="mt-3 divide-y divide-slate-100 rounded-md text-sm">
          {files.length === 0 ? (
            <li className="py-4 text-slate-600">Nu există fișiere.</li>
          ) : (
            files.map((f) => (
              <li key={f.id} className="grid grid-cols-1 sm:grid-cols-5 items-center gap-2 py-2 px-2 -mx-2 odd:bg-slate-50">
                <div className="font-medium flex items-center gap-2">
                  {f.originalName}
                  {f.isInternal && <Badge color="warning">Intern</Badge>}
                </div>
                <div className="text-slate-600">{f.mimeType}</div>
                <div className="text-slate-600">{(f.size/1024).toFixed(1)} KB</div>
                <div className="text-slate-500">{new Date(f.createdAt).toLocaleString('ro-RO')}</div>
                <div className="sm:text-right flex items-center gap-3 sm:justify-end">
                  <a href={`/api/files/${f.id}`} className="text-primary-700 hover:underline" target="_blank">Descarcă</a>
                  <DeleteFileButton fileId={f.id} />
                </div>
              </li>
            ))
          )}
        </ul>
      </Card>
    </main>
  )
}
