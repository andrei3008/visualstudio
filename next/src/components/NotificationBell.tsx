"use client"
import { useEffect, useState } from 'react'
import clsx from 'clsx'

type Item = { id: string; type: string; payload?: any; createdAt: string; readAt?: string | null }

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Item[]>([])
  const [unread, setUnread] = useState(0)

  async function load() {
    try {
      const res = await fetch('/api/notifications', { cache: 'no-store' })
      if (!res.ok) return
      const data = await res.json()
      setItems(data.items || [])
      setUnread(data.unread || 0)
    } catch {}
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 30000)
    return () => clearInterval(id)
  }, [])

  async function markAll() {
    await fetch('/api/notifications', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' })
    load()
  }

  function label(it: Item) {
    switch (it.type) {
      case 'proposal.submitted':
        return `Propunere trimisă: ${it.payload?.title || ''}`
      case 'proposal.approved':
        return `Propunere aprobată: ${it.payload?.title || ''}`
      case 'message.new':
        return `Mesaj nou pe proiect: ${it.payload?.projectName || ''}`
      default:
        return it.type
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="relative rounded p-2 hover:bg-slate-100">
        <span aria-hidden>🔔</span>
        {unread > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">{unread}</span>}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
            <span className="text-sm font-semibold">Notificări</span>
            <button onClick={markAll} className="text-xs text-primary-700 hover:underline">Marchează toate ca citite</button>
          </div>
          <ul className="max-h-80 overflow-auto">
            {items.length === 0 ? (
              <li className="px-3 py-4 text-sm text-slate-600">Nu ai notificări.</li>
            ) : (
              items.map((it) => (
                <li key={it.id} className={clsx('px-3 py-2 text-sm border-b border-slate-100', !it.readAt && 'bg-slate-50')}>
                  <div className="flex items-center justify-between">
                    <span>{label(it)}</span>
                    <span className="text-[11px] text-slate-400">{new Date(it.createdAt).toLocaleString('ro-RO')}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

