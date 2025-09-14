"use client"
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function NewProposalForm({ projectId }: { projectId: string }) {
  const [title, setTitle] = useState('')
  const [pending, start] = useTransition()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title.trim()) return
    start(async () => {
      const res = await fetch(`/api/projects/${projectId}/proposals`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (res.ok) {
        toast.success('Propunere creată')
        setTitle('')
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Crearea a eșuat')
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titlu propunere"
        className="rounded border px-3 py-2 flex-1"
      />
      <button
        disabled={pending}
        className="rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
      >
        {pending ? 'Se creează...' : 'Adaugă' }
      </button>
    </form>
  )
}

