"use client"
import clsx from 'clsx'
import { useEffect, useState } from 'react'

type Tab = { id: string; label: string; href?: string; disabled?: boolean }

export default function Tabs({ tabs, className, activeId }: { tabs: Tab[]; className?: string; activeId?: string }) {
  const [hash, setHash] = useState<string>(typeof window !== 'undefined' ? window.location.hash : '')
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const active = (id: string) => (activeId ? activeId === id : (hash === `#${id}` || (!hash && tabs[0]?.id === id)))
  return (
    <div className={clsx('flex items-center gap-1 border-b border-slate-200', className)}>
      {tabs.map(t => {
        const isActive = !t.disabled && active(t.id)
        return (
          <a
            key={t.id}
            href={t.href || `#${t.id}`}
            aria-disabled={t.disabled}
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
              'relative px-4 py-2 text-sm font-semibold rounded-t transition-colors',
              t.disabled && 'pointer-events-none text-slate-400',
              !t.disabled && (isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50')
            )}
          >
            {t.label}
            {!t.disabled && isActive && (
              <span className="pointer-events-none absolute inset-x-0 -bottom-[1px] h-0.5 bg-primary-600" />
            )}
          </a>
        )
      })}
    </div>
  )
}
