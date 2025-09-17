"use client"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, AlertCircle, Edit, Trash2 } from 'lucide-react'

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

const statusConfig = {
  todo: {
    label: 'De făcut',
    variant: 'secondary' as const,
    icon: Clock,
    color: 'text-gray-600 bg-gray-100'
  },
  in_progress: {
    label: 'În lucru',
    variant: 'default' as const,
    icon: AlertCircle,
    color: 'text-blue-600 bg-blue-100'
  },
  done: {
    label: 'Finalizat',
    variant: 'outline' as const,
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100'
  }
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

  const status = statusConfig[task.status]
  const StatusIcon = status.icon

  return (
    <Card className="w-full border border-gray-200 hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        {!editing ? (
          <>
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <span className="font-medium text-gray-900">{task.title}</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={status.variant}
                    className={status.color}
                  >
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                  {task.dueAt && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(task.dueAt).toLocaleDateString('ro-RO')}
                    </span>
                  )}
                  {task.estimateH && (
                    <span className="text-xs text-gray-500">
                      {task.estimateH}h
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditing(true)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={updateStatus}
                  disabled={pending}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {pending ? '...' : 'Schimbă status'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={del}
                  disabled={pending}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Titlu</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titlu task"
                  required
                  className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Scadență</label>
                <Input
                  type="date"
                  value={dueAt}
                  onChange={(e) => setDueAt(e.target.value)}
                  className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Estimare (ore)</label>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={estimateH}
                  onChange={(e) => setEstimateH(e.target.value)}
                  placeholder="Estimare (h)"
                  className="border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                size="sm"
                disabled={pending}
                onClick={(e) => {
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
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {pending ? '...' : 'Salvează'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(false)
                  setTitle(task.title)
                  setDueAt(task.dueAt ? toDateInput(task.dueAt) : '')
                  setEstimateH(task.estimateH != null ? String(task.estimateH) : '')
                }}
                className="text-gray-600"
              >
                Renunță
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}