"use client"
import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="rounded-md border px-3 py-2 hover:bg-slate-50"
    >
      Ieșire
    </button>
  )
}

