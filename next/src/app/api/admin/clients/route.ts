import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createClientSchema = z.object({
  email: z.string().email('Valid email is required'),
  name: z.string().optional(),
  Nume: z.string().optional(),
  Prenume: z.string().optional(),
  Companie: z.string().optional(),
  Telefon: z.string().optional(),
  Oras: z.string().optional(),
  Address: z.string().optional(),
  PostalCode: z.string().optional(),
  Country: z.string().optional(),
  Website: z.string().optional(),
  Notes: z.string().optional(),
  isActive: z.boolean().default(true),
  role: z.enum(['client', 'staff', 'admin']).default('client')
})

const updateClientSchema = z.object({
  email: z.string().email('Valid email is required').optional(),
  name: z.string().optional(),
  Nume: z.string().optional(),
  Prenume: z.string().optional(),
  Companie: z.string().optional(),
  Telefon: z.string().optional(),
  Oras: z.string().optional(),
  Address: z.string().optional(),
  PostalCode: z.string().optional(),
  Country: z.string().optional(),
  Website: z.string().optional(),
  Notes: z.string().optional(),
  isActive: z.boolean().optional(),
  role: z.enum(['client', 'staff', 'admin']).optional()
})

// GET /api/admin/clients - Fetch all clients with filtering and pagination
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '25')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const role = searchParams.get('role') || ''
    const city = searchParams.get('city') || ''
    const company = searchParams.get('company') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { Nume: { contains: search, mode: 'insensitive' } },
        { Prenume: { contains: search, mode: 'insensitive' } },
        { Companie: { contains: search, mode: 'insensitive' } },
        { Telefon: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status === 'active') {
      where.isActive = true
    } else if (status === 'inactive') {
      where.isActive = false
    }

    if (role && role !== 'all') {
      where.role = role
    }

    if (city) {
      where.Oras = { contains: city, mode: 'insensitive' }
    }

    if (company) {
      where.Companie = { contains: company, mode: 'insensitive' }
    }

    // Get clients with counts
    const [clients, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          Nume: true,
          Prenume: true,
          Companie: true,
          Telefon: true,
          Oras: true,
          Address: true,
          PostalCode: true,
          Country: true,
          Website: true,
          Notes: true,
          isActive: true,
          clientSince: true,
          role: true,
          createdAt: true,
          _count: {
            select: {
              projects: true,
              contacts: true,
              clientNotes: true,
              creditNotes: true,
              expenses: true,
              contracts: true,
              tickets: true,
              estimates: true
            }
          }
        }
      }),
      prisma.user.count({ where })
    ])

    // Get status counts for summary
    const [activeCount, inactiveCount, roleCounts] = await Promise.all([
      prisma.user.count({ where: { isActive: true, role: 'client' } }),
      prisma.user.count({ where: { isActive: false, role: 'client' } }),
      prisma.user.groupBy({
        by: ['role'],
        where: { role: { in: ['client', 'staff', 'admin'] } },
        _count: { role: true }
      })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      summary: {
        activeCount,
        inactiveCount,
        roleCounts: roleCounts.reduce((acc, item) => {
          acc[item.role] = item._count.role
          return acc
        }, {} as Record<string, number>)
      }
    })

  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/clients - Create a new client
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const validatedData = createClientSchema.parse(body)

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      )
    }

    // Generate a random password for the new client
    const tempPassword = Math.random().toString(36).slice(-8)
    const passwordHash = await import('bcryptjs').then(bcrypt =>
      bcrypt.hash(tempPassword, 10)
    )

    const client = await prisma.user.create({
      data: {
        ...validatedData,
        passwordHash,
        clientSince: new Date()
      },
      select: {
        id: true,
        email: true,
        name: true,
        Nume: true,
        Prenume: true,
        Companie: true,
        Telefon: true,
        Oras: true,
        Address: true,
        PostalCode: true,
        Country: true,
        Website: true,
        Notes: true,
        isActive: true,
        clientSince: true,
        role: true,
        createdAt: true
      }
    })

    // TODO: Send welcome email with temporary password
    console.log(`New client created: ${client.email}, temporary password: ${tempPassword}`)

    return NextResponse.json({
      client,
      tempPassword // Only return temp password for initial setup
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating client:', error)

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

// PUT /api/admin/clients - Update multiple clients (bulk operations)
export async function PUT(request: NextRequest) {
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

    const body = await request.json()
    const { clientIds, updateData } = body

    if (!Array.isArray(clientIds) || clientIds.length === 0) {
      return NextResponse.json(
        { error: 'Client IDs array is required' },
        { status: 400 }
      )
    }

    const validatedData = updateClientSchema.parse(updateData)

    // Update clients
    const result = await prisma.user.updateMany({
      where: {
        id: { in: clientIds },
        role: 'client' // Only update client roles
      },
      data: validatedData
    })

    return NextResponse.json({
      updatedCount: result.count,
      message: `Successfully updated ${result.count} clients`
    })

  } catch (error) {
    console.error('Error updating clients:', error)

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

// DELETE /api/admin/clients - Delete multiple clients (bulk operations)
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const clientIds = searchParams.get('ids')?.split(',').filter(Boolean)

    if (!Array.isArray(clientIds) || clientIds.length === 0) {
      return NextResponse.json(
        { error: 'Client IDs are required' },
        { status: 400 }
      )
    }

    // Check if clients have active projects
    const clientsWithProjects = await prisma.user.findMany({
      where: {
        id: { in: clientIds },
        projects: {
          some: {
            status: {
              notIn: ['done', 'rejected']
            }
          }
        }
      },
      select: { id: true, email: true }
    })

    if (clientsWithProjects.length > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete clients with active projects',
          clients: clientsWithProjects
        },
        { status: 400 }
      )
    }

    // Soft delete by setting isActive to false
    const result = await prisma.user.updateMany({
      where: {
        id: { in: clientIds },
        role: 'client'
      },
      data: {
        isActive: false
      }
    })

    return NextResponse.json({
      deletedCount: result.count,
      message: `Successfully deactivated ${result.count} clients`
    })

  } catch (error) {
    console.error('Error deleting clients:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}