"use client"
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'

export default function AccountPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [pending, startTransition] = useTransition()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (newPassword !== confirm) {
      toast.error('Confirmarea parolei nu corespunde')
      return
    }
    startTransition(async () => {
      const res = await fetch('/api/account/password', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      if (res.ok) {
        toast.success('Parola a fost actualizată')
        setCurrentPassword('')
        setNewPassword('')
        setConfirm('')
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Actualizare eșuată')
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 max-w-md">
      <label className="grid gap-1">
        <span>Parola curentă</span>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="rounded border px-3 py-2"
        />
      </label>
      <label className="grid gap-1">
        <span>Parolă nouă</span>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="rounded border px-3 py-2"
        />
      </label>
      <label className="grid gap-1">
        <span>Confirmă parola nouă</span>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="rounded border px-3 py-2"
        />
      </label>
      <button
        disabled={pending}
        className="w-max rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
      >
        {pending ? 'Se salvează...' : 'Schimbă parola'}
      </button>
    </form>
  )
}

