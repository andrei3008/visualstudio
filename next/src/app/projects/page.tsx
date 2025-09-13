async function getProjects() {
  const res = await fetch('http://localhost:3000/api/projects', { cache: 'no-store' })
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

