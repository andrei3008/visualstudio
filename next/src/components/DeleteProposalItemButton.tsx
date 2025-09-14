"use client"
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteProposalItemButton({ proposalId, itemId }: { proposalId: string; itemId: string }) {
  const [pending, start] = useTransition()
  const router = useRouter()
  return (
    <button
      onClick={() => {
        if (!confirm('Ștergi această linie?')) return
        start(async () => {
          await fetch(`/api/proposals/${proposalId}/items/${itemId}`, { method: 'DELETE' })
          router.refresh()
        })
      }}
      disabled={pending}
      className="text-sm text-red-600 hover:underline disabled:opacity-60"
    >
      {pending ? '...' : 'Șterge'}
    </button>
  )
}

