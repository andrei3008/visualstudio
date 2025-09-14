"use client"
import { useTransition } from 'react'

export default function PublicApproveButton({ token }: { token: string }) {
  const [pending, start] = useTransition()
  return (
    <button
      onClick={() => start(async () => { await fetch(`/api/proposals/public/${token}/approve`, { method: 'POST' }); location.reload() })}
      disabled={pending}
      className="rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
    >
      {pending ? 'Se aprobă...' : 'Aprobă propunerea'}
    </button>
  )
}

