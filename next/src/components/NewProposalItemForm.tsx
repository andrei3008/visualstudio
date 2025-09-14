"use client"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function NewProposalItemForm({ proposalId }: { proposalId: string }) {
  const [description, setDescription] = useState('')
  const [qty, setQty] = useState('1')
  const [unitPrice, setUnitPrice] = useState('0')
  const [pending, start] = useTransition()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = Number(qty)
    const price = Math.round(Number(unitPrice) * 100)
    if (!description.trim() || q <= 0 || price < 0) return
    start(async () => {
      const res = await fetch(`/api/proposals/${proposalId}/items`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ description, qty: q, unitPriceCents: price }),
      })
      if (res.ok) {
        toast.success('Element adăugat')
        setDescription('')
        setQty('1')
        setUnitPrice('0')
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Adăugarea a eșuat')
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-2 sm:grid-cols-3">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descriere"
        className="rounded border px-3 py-2"
        required
      />
      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="rounded border px-3 py-2"
        placeholder="Cantitate"
      />
      <input
        type="number"
        min="0"
        step="0.01"
        value={unitPrice}
        onChange={(e) => setUnitPrice(e.target.value)}
        className="rounded border px-3 py-2"
        placeholder="Preț unitar (EUR)"
      />
      <div className="sm:col-span-3">
        <button disabled={pending} className="rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
          {pending ? 'Se adaugă...' : 'Adaugă linie'}
        </button>
      </div>
    </form>
  )
}

