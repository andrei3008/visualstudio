"use client"
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function NewProjectForm() {
  const [name, setName] = useState('')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim()) return
    startTransition(async () => {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        toast.success('Proiect creat')
        setName('')
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nume proiect"
        className="rounded border px-3 py-2 flex-1"
      />
      <button
        disabled={pending}
        className="rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
      >
        {pending ? 'Se creează...' : 'Adaugă proiect'}
      </button>
    </form>
  )
}

