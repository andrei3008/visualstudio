"use client"
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function NewTaskForm({ projectId }: { projectId: string }) {
  const [title, setTitle] = useState('')
  const [dueAt, setDueAt] = useState('')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title.trim()) return
    startTransition(async () => {
      const res = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title, dueAt: dueAt || undefined }),
      })
      if (res.ok) {
        toast.success('Task adăugat')
        setTitle('')
        setDueAt('')
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Crearea a eșuat')
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titlu task"
        className="rounded border px-3 py-2 flex-1"
      />
      <input
        type="date"
        value={dueAt}
        onChange={(e) => setDueAt(e.target.value)}
        className="rounded border px-3 py-2"
      />
      <button
        disabled={pending}
        className="rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
      >
        {pending ? 'Se adaugă...' : 'Adaugă task'}
      </button>
    </form>
  )
}

