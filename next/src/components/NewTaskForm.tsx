"use client"
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewTaskForm({ projectId }: { projectId: string }) {
  const [title, setTitle] = useState('')
  const [dueAt, setDueAt] = useState('')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title.trim()) return
    startTransition(async () => {
      const res = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title, dueAt: dueAt || undefined }),
      })
      if (res.ok) {
        toast.success('Task adăugat')
        setTitle('')
        setDueAt('')
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Crearea a eșuat')
      }
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Adaugă Task Nou</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titlu task"
            disabled={pending}
          />
          <Input
            type="date"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            disabled={pending}
          />
          <Button
            type="submit"
            disabled={pending}
            className="w-full"
          >
            {pending ? 'Se adaugă...' : 'Adaugă task'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

