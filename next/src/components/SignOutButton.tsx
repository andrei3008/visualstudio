"use client"
import { signOut } from 'next-auth/react'

interface SignOutButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function SignOutButton({ className, children }: SignOutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className={`rounded-md border px-3 py-2 hover:bg-slate-50 transition-all duration-200 ${className || ''}`}
    >
      {children || 'Ieșire'}
    </button>
  )
}

