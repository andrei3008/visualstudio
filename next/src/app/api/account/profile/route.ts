import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { updateUserName } from '@/lib/users'

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json().catch(() => ({} as any))
    const name = String(body.name || '').trim()
    if (name.length > 100) {
      return NextResponse.json({ error: 'Numele este prea lung' }, { status: 400 })
    }
    const updated = await updateUserName(session.user.email, name)
    if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({ ok: true, user: { id: updated.id, email: updated.email, name: updated.name } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Update failed' }, { status: 400 })
  }
}

