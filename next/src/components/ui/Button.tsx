"use client"
import clsx from 'clsx'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}

export default function Button({ variant = 'primary', size = 'md', className, ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60'
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
  }[size]
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-300',
    ghost: 'bg-transparent text-primary-700 hover:bg-primary-50 focus:ring-primary-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  }[variant]
  return <button className={clsx(base, sizes, variants, className)} {...props} />
}

