import Link from 'next/link'
import clsx from 'clsx'

export default function Breadcrumb({ items, className }: { items: Array<{ label: string; href?: string }>; className?: string }) {
  return (
    <nav className={clsx('text-sm text-slate-600', className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className="hover:text-slate-900 hover:underline">{it.label}</Link>
            ) : (
              <span className="text-slate-900 font-medium">{it.label}</span>
            )}
            {idx < items.length - 1 && <span className="text-slate-300">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

