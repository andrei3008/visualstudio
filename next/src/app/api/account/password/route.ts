import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { updateUserPassword } from '@/lib/users'

function validatePassword(pw: string): string | null {
  if (pw.length < 8) return 'Parola trebuie să aibă minim 8 caractere'
  if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) return 'Parola trebuie să conțină litere și cifre'
  return null
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const currentPassword = String(body.currentPassword || '')
    const newPassword = String(body.newPassword || '')

    const validation = validatePassword(newPassword)
    if (validation) return NextResponse.json({ error: validation }, { status: 400 })
    if (currentPassword === newPassword) {
      return NextResponse.json({ error: 'Noua parolă trebuie să fie diferită' }, { status: 400 })
    }

    const ok = await updateUserPassword(session.user.email, currentPassword, newPassword)
    if (!ok) return NextResponse.json({ error: 'Parola curentă este incorectă' }, { status: 400 })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Update failed' }, { status: 400 })
  }
}

