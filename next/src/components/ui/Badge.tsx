import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  color?: 'neutral' | 'success' | 'warning' | 'danger'
  className?: string
}

export default function Badge({ children, color = 'neutral', className }: Props) {
  const map = {
    neutral: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
  } as const
  return (
    <span className={clsx('inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold', map[color], className)}>
      {children}
    </span>
  )
}

