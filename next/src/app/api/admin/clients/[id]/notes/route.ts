import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  isPrivate: z.boolean().default(false)
})

const updateNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  isPrivate: z.boolean().optional()
})

// GET /api/admin/clients/[id]/notes - Get all notes for a client
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
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const isPrivate = searchParams.get('isPrivate')

    const skip = (page - 1) * limit

    // Verify client exists
    const client = await prisma.user.findUnique({
      where: { id: clientId },
      select: { id: true, Companie: true, Nume: true, Prenume: true }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Build where clause
    const where: any = { clientId }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (isPrivate !== null && isPrivate !== undefined) {
      where.isPrivate = isPrivate === 'true'
    }

    const [notes, totalCount] = await Promise.all([
      prisma.clientNote.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.clientNote.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      notes,
      client: {
        id: client.id,
        company: client.Companie,
        name: `${client.Prenume || ''} ${client.Nume || ''}`.trim() || client.Companie
      },
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })

  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/clients/[id]/notes - Create a new note for a client
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
    const validatedData = createNoteSchema.parse(body)

    // Verify client exists
    const client = await prisma.user.findUnique({
      where: { id: clientId },
      select: { id: true }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const note = await prisma.clientNote.create({
      data: {
        ...validatedData,
        clientId
      }
    })

    return NextResponse.json({
      note,
      message: 'Note created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating note:', error)

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

// PUT /api/admin/clients/[id]/notes - Update multiple notes
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
    const { noteIds, updateData } = body

    if (!Array.isArray(noteIds) || noteIds.length === 0) {
      return NextResponse.json(
        { error: 'Note IDs array is required' },
        { status: 400 }
      )
    }

    const validatedData = updateNoteSchema.parse(updateData)

    // Update notes
    const result = await prisma.clientNote.updateMany({
      where: {
        id: { in: noteIds },
        clientId
      },
      data: validatedData
    })

    return NextResponse.json({
      updatedCount: result.count,
      message: `Successfully updated ${result.count} notes`
    })

  } catch (error) {
    console.error('Error updating notes:', error)

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

// DELETE /api/admin/clients/[id]/notes - Delete multiple notes
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
    const noteIds = searchParams.get('ids')?.split(',').filter(Boolean)

    if (!Array.isArray(noteIds) || noteIds.length === 0) {
      return NextResponse.json(
        { error: 'Note IDs are required' },
        { status: 400 }
      )
    }

    // Verify all notes belong to this client
    const notes = await prisma.clientNote.findMany({
      where: {
        id: { in: noteIds },
        clientId
      }
    })

    if (notes.length !== noteIds.length) {
      return NextResponse.json(
        { error: 'Some notes not found or do not belong to this client' },
        { status: 404 }
      )
    }

    // Delete notes
    const result = await prisma.clientNote.deleteMany({
      where: {
        id: { in: noteIds },
        clientId
      }
    })

    return NextResponse.json({
      deletedCount: result.count,
      message: `Successfully deleted ${result.count} notes`
    })

  } catch (error) {
    console.error('Error deleting notes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}