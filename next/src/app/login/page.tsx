"use client"
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const search = useSearchParams()
  useEffect(() => {
    if (search.get('registered') === '1') {
      toast.success('Cont creat. Te poți autentifica acum.')
    }
    if (search.get('error')) {
      toast.error('Autentificare eșuată. Verifică datele.')
    }
  }, [search])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || ''),
    })
    if (res?.ok) {
      window.location.href = '/app'
    } else {
      setLoading(false)
      toast.error('Email sau parolă incorecte')
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">Autentificare</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <label className="grid gap-1">
          <span>Email</span>
          <input name="email" type="email" required className="rounded border px-3 py-2" />
        </label>
        <label className="grid gap-1">
          <span>Parolă</span>
          <input name="password" type="password" required className="rounded border px-3 py-2" />
        </label>
        <button disabled={loading} className="mt-2 rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
          {loading ? 'Se autentifică...' : 'Intră în cont'}
        </button>
        <p className="text-sm text-slate-600">Nu ai cont? <Link className="text-primary-700 font-semibold" href="/register">Înregistrează-te</Link></p>
      </form>
    </main>
  )
}
