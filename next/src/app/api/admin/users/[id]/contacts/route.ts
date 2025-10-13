import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true }
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Only admins can get contacts
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Verify the target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, name: true }
    })

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get contacts for the user
    const contacts = await prisma.contact.findMany({
      where: { clientId: params.id },
      orderBy: [
        { isPrimary: 'desc' },
        { name: 'asc' }
      ],
      select: {
        id: true,
        name: true,
        position: true,
        email: true,
        phone: true,
        isPrimary: true,
        notes: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      contacts,
      user: targetUser
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true }
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Only admins can create contacts
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Verify the target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true }
    })

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const { name, position, email, phone, isPrimary, notes } = body

    // Validate required fields
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // Generate unique ID
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

    // If this contact is marked as primary, unmark all other contacts for this user
    if (isPrimary) {
      await prisma.contact.updateMany({
        where: { clientId: params.id },
        data: { isPrimary: false }
      })
    }

    // Create the contact
    const contact = await prisma.contact.create({
      data: {
        id: contactId,
        clientId: params.id,
        name: name.trim(),
        position: position?.trim() || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        isPrimary: Boolean(isPrimary),
        notes: notes?.trim() || null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        position: true,
        email: true,
        phone: true,
        isPrimary: true,
        notes: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({ contact }, { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}