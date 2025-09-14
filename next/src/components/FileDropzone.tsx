"use client"
import { useCallback, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type Props = {
  projectId: string
  canInternal?: boolean
}

export default function FileDropzone({ projectId, canInternal }: Props) {
  const [dragOver, setDragOver] = useState(false)
  const [isInternal, setIsInternal] = useState(false)
  const [pending, start] = useTransition()
  const [queue, setQueue] = useState<File[]>([])
  const router = useRouter()

  const onFiles = useCallback((files: FileList | File[]) => {
    const items = Array.from(files).filter(f => f && f.size > 0)
    if (items.length === 0) return
    setQueue(items)
    start(async () => {
      let okCount = 0
      for (const f of items) {
        const fd = new FormData()
        fd.set('file', f)
        if (canInternal) fd.set('isInternal', String(isInternal))
        const res = await fetch(`/api/projects/${projectId}/files`, { method: 'POST', body: fd })
        if (res.ok) okCount++
        else {
          const data = await res.json().catch(() => ({}))
          toast.error(data?.error || `Eroare la upload: ${f.name}`)
        }
      }
      toast.success(`Încărcate ${okCount}/${items.length} fișiere`)
      setQueue([])
      router.refresh()
    })
  }, [projectId, canInternal, isInternal, router])

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); onFiles(e.dataTransfer.files) }}
        className={`rounded-md border-2 border-dashed px-4 py-6 text-center ${dragOver ? 'border-primary-600 bg-primary-50' : 'border-slate-300 bg-white'}`}
      >
        <p className="text-sm text-slate-600">Trage fișiere aici sau</p>
        <label className="mt-2 inline-flex cursor-pointer items-center rounded bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-700">
          Alege fișiere
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => { if (e.target.files) onFiles(e.target.files); e.currentTarget.value = '' }}
            disabled={pending}
          />
        </label>
        {canInternal && (
          <label className="ml-3 inline-flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={isInternal} onChange={(e) => setIsInternal(e.target.checked)} /> Intern
          </label>
        )}
        {queue.length > 0 && (
          <p className="mt-2 text-xs text-slate-500">Se încarcă: {queue.length} fișier(e)...</p>
        )}
      </div>
    </div>
  )
}

