import clsx from 'clsx'
import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }

export default function Card({ children, className, ...props }: Props) {
  return (
    <section {...props} className={clsx('rounded-xl border border-slate-200 bg-white p-5 shadow-sm', className)}>
      {children}
    </section>
  )
}
