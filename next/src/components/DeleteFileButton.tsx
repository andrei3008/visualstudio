"use client"
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteFileButton({ fileId }: { fileId: string }) {
  const [pending, start] = useTransition()
  const router = useRouter()
  return (
    <button
      onClick={() => {
        if (!confirm('Ștergi acest fișier?')) return
        start(async () => {
          await fetch(`/api/files/${fileId}`, { method: 'DELETE' })
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

