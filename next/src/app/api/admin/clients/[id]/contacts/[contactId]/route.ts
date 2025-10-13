import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateContactSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  position: z.string().optional(),
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().optional(),
  isPrimary: z.boolean().optional(),
  notes: z.string().optional()
})

// GET /api/admin/clients/[id]/contacts/[contactId] - Get a specific contact
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; contactId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    })

    if (user?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id: clientId, contactId } = params

    const contact = await prisma.contact.findFirst({
      where: {
        id: contactId,
        clientId
      }
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    return NextResponse.json({ contact })

  } catch (error) {
    console.error('Error fetching contact:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/clients/[id]/contacts/[contactId] - Update a specific contact
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; contactId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    })

    if (user?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id: clientId, contactId } = params
    const body = await request.json()
    const validatedData = updateContactSchema.parse(body)

    // Check if contact exists and belongs to this client
    const existingContact = await prisma.contact.findFirst({
      where: {
        id: contactId,
        clientId
      }
    })

    if (!existingContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    // If setting as primary, unset other primary contacts
    if (validatedData.isPrimary) {
      await prisma.contact.updateMany({
        where: {
          clientId,
          id: { not: contactId }
        },
        data: { isPrimary: false }
      })
    }

    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: validatedData
    })

    return NextResponse.json({
      contact: updatedContact,
      message: 'Contact updated successfully'
    })

  } catch (error) {
    console.error('Error updating contact:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/clients/[id]/contacts/[contactId] - Delete a specific contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; contactId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    })

    if (user?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id: clientId, contactId } = params

    // Check if contact exists and belongs to this client
    const contact = await prisma.contact.findFirst({
      where: {
        id: contactId,
        clientId
      }
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    await prisma.contact.delete({
      where: { id: contactId }
    })

    return NextResponse.json({
      message: 'Contact deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}