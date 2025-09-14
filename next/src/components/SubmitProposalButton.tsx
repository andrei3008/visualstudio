"use client"
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function SubmitProposalButton({ proposalId }: { proposalId: string }) {
  const [pending, start] = useTransition()
  const router = useRouter()
  return (
    <button
      onClick={() => start(async () => { await fetch(`/api/proposals/${proposalId}/submit`, { method: 'POST' }); router.refresh() })}
      disabled={pending}
      className="rounded bg-primary-600 px-3 py-2 text-white text-sm font-semibold hover:bg-primary-700 disabled:opacity-60"
    >
      {pending ? '...' : 'Trimite spre aprobare'}
    </button>
  )
}

