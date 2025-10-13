import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string; contactId: string } }
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

    // Only admins can update contacts
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

    // Check if contact exists and belongs to the user
    const existingContact = await prisma.contact.findFirst({
      where: {
        id: params.contactId,
        clientId: params.id
      }
    })

    if (!existingContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    const body = await request.json()
    const { name, position, email, phone, isPrimary, notes } = body

    // Validate required fields
    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // If this contact is marked as primary, unmark all other contacts for this user
    if (isPrimary && !existingContact.isPrimary) {
      await prisma.contact.updateMany({
        where: { clientId: params.id },
        data: { isPrimary: false }
      })
    }

    // Update the contact
    const contact = await prisma.contact.update({
      where: { id: params.contactId },
      data: {
        name: name.trim(),
        position: position?.trim() || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        isPrimary: Boolean(isPrimary),
        notes: notes?.trim() || null,
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

    return NextResponse.json({ contact })
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; contactId: string } }
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

    // Only admins can delete contacts
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

    // Check if contact exists and belongs to the user
    const existingContact = await prisma.contact.findFirst({
      where: {
        id: params.contactId,
        clientId: params.id
      }
    })

    if (!existingContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    // Delete the contact
    await prisma.contact.delete({
      where: { id: params.contactId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}