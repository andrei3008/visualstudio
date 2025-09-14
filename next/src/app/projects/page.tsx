import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function getProjects() {
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000'
  const proto = (h.get('x-forwarded-proto') || 'http').split(',')[0]
  const url = `${proto}://${host}/api/projects`
  const res = await fetch(url, { cache: 'no-store' })
  if (res.status === 401) redirect('/login')
  if (!res.ok) throw new Error('Failed to load projects')
  return res.json() as Promise<Array<{ id: number; name: string; status: string }>>
}

export default async function ProjectsPage() {
  const projects = await getProjects()
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
