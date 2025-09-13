import { NextResponse } from 'next/server'
import { createUser } from '@/lib/users'

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let name = ''
    let email = ''
    let password = ''
    if (contentType.includes('application/json')) {
      const body = await req.json()
      name = String(body.name || '')
      email = String(body.email || '')
      password = String(body.password || '')
    } else {
      const form = await req.formData()
      name = String(form.get('name') || '')
      email = String(form.get('email') || '')
      password = String(form.get('password') || '')
    }

    if (!email || password.length < 6) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    await createUser({ name, email, password })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Registration failed' }, { status: 400 })
  }
}

