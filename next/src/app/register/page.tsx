"use client"
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Înregistrare',
  robots: { index: false, follow: false },
  alternates: { canonical: '/register' },
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    setLoading(true)
    const res = await fetch('/api/register', { method: 'POST', body: formData })
    if (res.ok) {
      toast.success('Cont creat. Te poți autentifica acum.')
      router.push('/login?registered=1')
    } else {
      const data = await res.json().catch(() => ({}))
      toast.error(data?.error || 'Înregistrarea a eșuat')
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">Înregistrare</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <label className="grid gap-1">
          <span>Nume</span>
          <input name="name" className="rounded border px-3 py-2" />
        </label>
        <label className="grid gap-1">
          <span>Email</span>
          <input name="email" type="email" required className="rounded border px-3 py-2" />
        </label>
        <label className="grid gap-1">
          <span>Parolă</span>
          <input name="password" type="password" required className="rounded border px-3 py-2" />
        </label>
        <button disabled={loading} className="mt-2 rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
          {loading ? 'Se creează...' : 'Creează cont'}
        </button>
      </form>
    </main>
  )
}
