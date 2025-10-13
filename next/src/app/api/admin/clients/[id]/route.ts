import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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

// GET /api/admin/clients/[id] - Get a specific client with detailed information
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

    const client = await prisma.user.findUnique({
      where: { id: clientId },
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
            estimates: true,
            notifications: true,
            uploadedFiles: true
          }
        }
      }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Get additional details for the client
    const [
      recentProjects,
      recentTickets,
      activeContracts,
      totalExpenses,
      totalInvoices
    ] = await Promise.all([
      prisma.project.findMany({
        where: { userId: clientId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          budget: true
        }
      }),
      prisma.ticket.findMany({
        where: { clientId },
        take: 5,
        orderBy: { openedAt: 'desc' },
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          openedAt: true
        }
      }),
      prisma.contract.findMany({
        where: {
          clientId,
          status: { in: ['sent', 'signed', 'active'] }
        },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          status: true,
          type: true,
          value: true,
          startDate: true,
          endDate: true
        }
      }),
      prisma.expense.aggregate({
        where: { clientId },
        _sum: { amount: true },
        _count: true
      }),
      prisma.invoice.aggregate({
        where: {
          clientEmail: client.email,
          status: { not: 'cancelled' }
        },
        _sum: { totalAmount: true },
        _count: true
      })
    ])

    // Calculate financial summary
    const financialSummary = {
      totalExpenses: totalExpenses._sum.amount || 0,
      expenseCount: totalExpenses._count,
      totalInvoices: totalInvoices._sum.totalAmount || 0,
      invoiceCount: totalInvoices._count,
      projectValue: recentProjects.reduce((sum, project) => sum + (project.budget || 0), 0)
    }

    return NextResponse.json({
      client,
      details: {
        recentProjects,
        recentTickets,
        activeContracts,
        financialSummary
      }
    })

  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/clients/[id] - Update a specific client
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
    const validatedData = updateClientSchema.parse(body)

    // Check if client exists
    const existingClient = await prisma.user.findUnique({
      where: { id: clientId }
    })

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // If updating email, check if it's already taken
    if (validatedData.email && validatedData.email !== existingClient.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email: validatedData.email }
      })

      if (emailTaken) {
        return NextResponse.json(
          { error: 'Email is already taken by another user' },
          { status: 409 }
        )
      }
    }

    const updatedClient = await prisma.user.update({
      where: { id: clientId },
      data: validatedData,
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

    return NextResponse.json({
      client: updatedClient,
      message: 'Client updated successfully'
    })

  } catch (error) {
    console.error('Error updating client:', error)

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

// DELETE /api/admin/clients/[id] - Delete a specific client
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

    // Check if client exists
    const client = await prisma.user.findUnique({
      where: { id: clientId },
      include: {
        _count: {
          select: {
            projects: true
          }
        }
      }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Check if client has active projects
    const activeProjects = await prisma.project.count({
      where: {
        userId: clientId,
        status: {
          notIn: ['done', 'rejected']
        }
      }
    })

    if (activeProjects > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete client with active projects',
          activeProjects
        },
        { status: 400 }
      )
    }

    // Soft delete by setting isActive to false
    await prisma.user.update({
      where: { id: clientId },
      data: { isActive: false }
    })

    return NextResponse.json({
      message: 'Client deactivated successfully'
    })

  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}