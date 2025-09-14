"use client"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function AccountProfileForm({ initialName }: { initialName?: string }) {
  const [name, setName] = useState(initialName || '')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    startTransition(async () => {
      const res = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        toast.success('Profil actualizat')
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Actualizare eșuată')
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <label className="grid gap-1">
        <span>Nume afișat</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nume"
          className="rounded border px-3 py-2"
        />
      </label>
      <button
        disabled={pending}
        className="w-max rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
      >
        {pending ? 'Se salvează...' : 'Salvează'}
      </button>
    </form>
  )
}

