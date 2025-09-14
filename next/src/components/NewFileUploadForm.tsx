"use client"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function NewFileUploadForm({ projectId, canInternal }: { projectId: string; canInternal?: boolean }) {
  const [pending, start] = useTransition()
  const [isInternal, setIsInternal] = useState(false)
  const router = useRouter()

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    start(async () => {
      const fd = new FormData()
      fd.set('file', f)
      if (canInternal) fd.set('isInternal', String(isInternal))
      const res = await fetch(`/api/projects/${projectId}/files`, { method: 'POST', body: fd })
      if (res.ok) {
        toast.success('Fișier încărcat')
        router.refresh()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error || 'Încărcare eșuată')
      }
      e.target.value = ''
    })
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <input type="file" onChange={onChange} disabled={pending} className="text-sm" />
      {canInternal && (
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" checked={isInternal} onChange={(e) => setIsInternal(e.target.checked)} /> Intern
        </label>
      )}
    </div>
  )
}

