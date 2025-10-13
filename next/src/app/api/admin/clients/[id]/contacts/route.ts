import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().optional(),
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().optional(),
  isPrimary: z.boolean().default(false),
  notes: z.string().optional()
})

const updateContactSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  position: z.string().optional(),
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().optional(),
  isPrimary: z.boolean().optional(),
  notes: z.string().optional()
})

// GET /api/admin/clients/[id]/contacts - Get all contacts for a client
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const clientId = params.id

    // Verify client exists
    const client = await prisma.user.findUnique({
      where: { id: clientId },
      select: { id: true, Companie: true }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const contacts = await prisma.contact.findMany({
      where: { clientId },
      orderBy: [
        { isPrimary: 'desc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json({
      contacts,
      client: {
        id: client.id,
        company: client.Companie
      }
    })

  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/clients/[id]/contacts - Create a new contact for a client
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const clientId = params.id
    const body = await request.json()
    const validatedData = createContactSchema.parse(body)

    // Verify client exists
    const client = await prisma.user.findUnique({
      where: { id: clientId },
      select: { id: true }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // If setting as primary, unset other primary contacts
    if (validatedData.isPrimary) {
      await prisma.contact.updateMany({
        where: { clientId },
        data: { isPrimary: false }
      })
    }

    const contact = await prisma.contact.create({
      data: {
        ...validatedData,
        clientId
      }
    })

    return NextResponse.json({
      contact,
      message: 'Contact created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating contact:', error)

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

// PUT /api/admin/clients/[id]/contacts - Update multiple contacts
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const clientId = params.id
    const body = await request.json()
    const { contactIds, updateData } = body

    if (!Array.isArray(contactIds) || contactIds.length === 0) {
      return NextResponse.json(
        { error: 'Contact IDs array is required' },
        { status: 400 }
      )
    }

    const validatedData = updateContactSchema.parse(updateData)

    // If setting as primary, unset other primary contacts
    if (validatedData.isPrimary) {
      await prisma.contact.updateMany({
        where: {
          clientId,
          id: { notIn: contactIds }
        },
        data: { isPrimary: false }
      })
    }

    // Update contacts
    const result = await prisma.contact.updateMany({
      where: {
        id: { in: contactIds },
        clientId
      },
      data: validatedData
    })

    return NextResponse.json({
      updatedCount: result.count,
      message: `Successfully updated ${result.count} contacts`
    })

  } catch (error) {
    console.error('Error updating contacts:', error)

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

// DELETE /api/admin/clients/[id]/contacts - Delete multiple contacts
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const clientId = params.id
    const { searchParams } = new URL(request.url)
    const contactIds = searchParams.get('ids')?.split(',').filter(Boolean)

    if (!Array.isArray(contactIds) || contactIds.length === 0) {
      return NextResponse.json(
        { error: 'Contact IDs are required' },
        { status: 400 }
      )
    }

    // Verify all contacts belong to this client
    const contacts = await prisma.contact.findMany({
      where: {
        id: { in: contactIds },
        clientId
      }
    })

    if (contacts.length !== contactIds.length) {
      return NextResponse.json(
        { error: 'Some contacts not found or do not belong to this client' },
        { status: 404 }
      )
    }

    // Delete contacts
    const result = await prisma.contact.deleteMany({
      where: {
        id: { in: contactIds },
        clientId
      }
    })

    return NextResponse.json({
      deletedCount: result.count,
      message: `Successfully deleted ${result.count} contacts`
    })

  } catch (error) {
    console.error('Error deleting contacts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}