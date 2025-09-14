"use client"
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type Tab = { id: string; label: string; href?: string; disabled?: boolean }

export default function Tabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  const [hash, setHash] = useState<string>(typeof window !== 'undefined' ? window.location.hash : '')
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const active = (id: string) => (hash === `#${id}` || (!hash && tabs[0]?.id === id))
  return (
    <div className={clsx('flex items-center gap-1 border-b border-slate-200', className)}>
      {tabs.map(t => (
        <a
          key={t.id}
          href={t.href || `#${t.id}`}
          aria-disabled={t.disabled}
          className={clsx(
            'px-3 py-2 text-sm font-semibold rounded-t',
            t.disabled && 'pointer-events-none text-slate-400',
            !t.disabled && (active(t.id) ? 'text-primary-700 border-b-2 border-primary-600 -mb-[1px]' : 'text-slate-600 hover:text-slate-900')
          )}
        >
          {t.label}
        </a>
      ))}
    </div>
  )
}

