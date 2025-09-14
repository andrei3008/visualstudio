"use client"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function NewMessageForm({ projectId, canInternal }: { projectId: string; canInternal?: boolean }) {
  const [body, setBody] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [pending, start] = useTransition()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = body.trim()
    if (!text) return
    start(async () => {
      const res = await fetch(`/api/projects/${projectId}/messages`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ body: text, isInternal }),
      })
      if (res.ok) {
        setBody('')
        setIsInternal(false)
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Eroare trimitere mesaj')
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <textarea value={body} onChange={(e) => setBody(e.target.value)} className="rounded border px-3 py-2" placeholder="Scrie un mesaj..." rows={3} />
      <div className="flex items-center justify-between">
        {canInternal && (
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={isInternal} onChange={(e) => setIsInternal(e.target.checked)} />
            Notă internă (vizibilă doar admin)
          </label>
        )}
        <button disabled={pending} className="rounded bg-primary-600 px-4 py-2 font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
          {pending ? 'Se trimite...' : 'Trimite mesaj'}
        </button>
      </div>
    </form>
  )
}

