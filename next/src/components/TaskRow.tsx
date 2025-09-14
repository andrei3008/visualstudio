"use client"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type Task = {
  id: string
  title: string
  status: 'todo' | 'in_progress' | 'done'
  dueAt?: string | null
  estimateH?: number | null
}

const cycle: Record<Task['status'], Task['status']> = {
  todo: 'in_progress',
  in_progress: 'done',
  done: 'todo',
}

export default function TaskRow({ projectId, task }: { projectId: string; task: Task }) {
  const [pending, start] = useTransition()
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [dueAt, setDueAt] = useState<string>(() => (task.dueAt ? toDateInput(task.dueAt) : ''))
  const [estimateH, setEstimateH] = useState<string>(() => (task.estimateH != null ? String(task.estimateH) : ''))

  function toDateInput(d: string) {
    try {
      const dt = new Date(d)
      const y = dt.getFullYear()
      const m = String(dt.getMonth() + 1).padStart(2, '0')
      const day = String(dt.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
    } catch {
      return ''
    }
  }

  async function updateStatus() {
    start(async () => {
      const next = cycle[task.status]
      const res = await fetch(`/api/projects/${projectId}/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (res.ok) router.refresh()
      else toast.error('Actualizare eșuată')
    })
  }

  async function del() {
    if (!confirm('Ștergi acest task?')) return
    start(async () => {
      const res = await fetch(`/api/projects/${projectId}/tasks/${task.id}`, { method: 'DELETE' })
      if (res.ok) router.refresh()
      else toast.error('Ștergere eșuată')
    })
  }

  return (
    <li className="rounded border border-slate-200 p-3">
      {!editing ? (
        <>
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-slate-900">{task.title}</span>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">{String(task.status).replace('_','-')}</span>
              <button onClick={() => setEditing(true)} className="text-xs rounded border px-2 py-1 hover:bg-slate-50">Editează</button>
              <button onClick={updateStatus} disabled={pending} className="text-xs rounded border px-2 py-1 hover:bg-slate-50">
                {pending ? '...' : 'Schimbă status'}
              </button>
              <button onClick={del} disabled={pending} className="text-xs text-red-600 hover:underline">Șterge</button>
            </div>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {task.dueAt ? `Due: ${new Date(task.dueAt).toLocaleDateString('ro-RO')}` : 'Fără termen'}
            {task.estimateH ? ` · Estimare: ${task.estimateH}h` : ''}
          </div>
        </>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            start(async () => {
              const payload: any = { title: title.trim() }
              if (dueAt) payload.dueAt = dueAt
              else payload.dueAt = null
              if (estimateH !== '') payload.estimateH = Number(estimateH)
              else payload.estimateH = null
              const res = await fetch(`/api/projects/${projectId}/tasks/${task.id}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
              })
              if (res.ok) {
                toast.success('Task actualizat')
                setEditing(false)
                router.refresh()
              } else {
                const data = await res.json().catch(() => ({}))
                toast.error(data?.error || 'Actualizare eșuată')
              }
            })
          }}
          className="grid gap-2 sm:grid-cols-3"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border px-3 py-2"
            placeholder="Titlu"
            required
          />
          <input
            type="date"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            className="rounded border px-3 py-2"
          />
          <input
            type="number"
            min="0"
            step="1"
            value={estimateH}
            onChange={(e) => setEstimateH(e.target.value)}
            className="rounded border px-3 py-2"
            placeholder="Estimare (h)"
          />
          <div className="sm:col-span-3 flex gap-2 pt-1">
            <button disabled={pending} className="text-xs rounded bg-primary-600 px-3 py-1 font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
              {pending ? '...' : 'Salvează'}
            </button>
            <button type="button" onClick={() => { setEditing(false); setTitle(task.title); setDueAt(task.dueAt ? toDateInput(task.dueAt) : ''); setEstimateH(task.estimateH != null ? String(task.estimateH) : ''); }} className="text-xs rounded border px-3 py-1 hover:bg-slate-50">
              Renunță
            </button>
          </div>
        </form>
      )}
    </li>
  )
}
