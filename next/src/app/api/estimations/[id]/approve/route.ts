import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { InvoiceService } from '@/lib/invoice-service'
import { z } from 'zod'

// Schema for estimation approval
const approveEstimationSchema = z.object({
  createInvoice: z.boolean().default(true),
  clientNotes: z.string().optional(),
  sendNotification: z.boolean().default(true)
})

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get session and authenticate user
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      )
    }

    // Get user information
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true, name: true, email: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = approveEstimationSchema.parse(body)

    const estimationId = params.id

    // Get estimation with project details
    const estimation = await prisma.estimation.findUnique({
      where: { id: estimationId },
      include: {
        project: {
          include: {
            user: true
          }
        }
      }
    })

    if (!estimation) {
      return NextResponse.json(
        { error: 'Estimation not found' },
        { status: 404 }
      )
    }

    // Check authorization - user must be the client who owns the project or admin
    const isClient = estimation.project.userId === user.id
    const isAdmin = user.role === 'admin'

    if (!isClient && !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - You can only approve your own estimations' },
        { status: 403 }
      )
    }

    // Check if estimation is in a status that can be approved
    if (estimation.status !== 'submitted' && estimation.status !== 'client_review') {
      return NextResponse.json(
        {
          error: 'Estimation cannot be approved',
          details: `Current status is "${estimation.status}". Estimation must be submitted or in client review.`
        },
        { status: 400 }
      )
    }

    // Check if estimation is already approved
    if (estimation.status === 'approved' as any) {
      return NextResponse.json(
        {
          error: 'Estimation already approved',
          estimation: estimation
        },
        { status: 400 }
      )
    }

    // Update estimation status to approved
    const updatedEstimation = await prisma.estimation.update({
      where: { id: estimationId },
      data: {
        status: 'approved',
        approvedAt: new Date(),
        // Store client notes if provided
        ...(validatedData.clientNotes && {
          aiInsights: {
            ...(estimation.aiInsights as any || {}),
            clientApprovalNotes: validatedData.clientNotes
          }
        })
      },
      include: {
        project: {
          include: {
            user: true
          }
        }
      }
    })

    // Update project status if needed
    const projectStatusUpdate = await prisma.project.update({
      where: { id: estimation.projectId },
      data: {
        status: 'approved',
        // Store approval information in adminNotes
        adminNotes: {
          ...(estimation.project.adminNotes as any || {}),
          estimationApproved: {
            estimationId: estimation.id,
            approvedAt: new Date().toISOString(),
            approvedBy: user.id,
            approvedByName: user.name || user.email
          }
        }
      }
    })

    let invoice = null
    let invoiceError = null

    // Create invoice if requested
    if (validatedData.createInvoice) {
      try {
        invoice = await InvoiceService.createInvoiceFromEstimation(estimationId)
        console.log(`Invoice ${invoice.invoiceNumber} created for estimation ${estimationId}`)
      } catch (error) {
        invoiceError = error instanceof Error ? error.message : 'Failed to create invoice'
        console.error('Failed to create invoice:', error)
      }
    }

    // Create notification for client (if not the client who approved)
    if (validatedData.sendNotification && !isClient) {
      await prisma.notification.create({
        data: {
          userId: estimation.project.userId,
          type: 'estimation_approved',
          payload: {
            estimationId: estimation.id,
            estimationTitle: estimation.title,
            projectId: estimation.projectId,
            projectName: estimation.project.name,
            approvedBy: user.name || user.email,
            invoiceCreated: !!invoice,
            invoiceNumber: invoice?.invoiceNumber
          }
        }
      })
    }

    // Create notification for admin (if client approved)
    if (validatedData.sendNotification && isClient) {
      // Find admin users to notify
      const adminUsers = await prisma.user.findMany({
        where: { role: 'admin' }
      })

      for (const admin of adminUsers) {
        await prisma.notification.create({
          data: {
            userId: admin.id,
            type: 'estimation_approved_by_client',
            payload: {
              estimationId: estimation.id,
              estimationTitle: estimation.title,
              projectId: estimation.projectId,
              projectName: estimation.project.name,
              clientName: estimation.project.user.name || estimation.project.user.email,
              invoiceCreated: !!invoice,
              invoiceNumber: invoice?.invoiceNumber
            }
          }
        })
      }
    }

    // Return response with all relevant information
    const response = {
      success: true,
      message: 'Estimation approved successfully',
      estimation: updatedEstimation,
      project: projectStatusUpdate,
      invoice: invoice,
      invoiceError: invoiceError
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('Error approving estimation:', error)

    // Handle validation errors
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

    // Handle Prisma errors
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Estimation not found' },
        { status: 404 }
      )
    }

    // Generic error handling
    return NextResponse.json(
      {
        error: 'Failed to approve estimation',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get session and authenticate user
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      )
    }

    // Get user information
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const estimationId = params.id

    // Get estimation with details
    const estimation = await prisma.estimation.findUnique({
      where: { id: estimationId },
      include: {
        project: {
          include: {
            user: true
          }
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    if (!estimation) {
      return NextResponse.json(
        { error: 'Estimation not found' },
        { status: 404 }
      )
    }

    // Check authorization
    const isClient = estimation.project.userId === user.id
    const isAdmin = user.role === 'admin'

    if (!isClient && !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - You can only view your own estimations' },
        { status: 403 }
      )
    }

    // Check if estimation can be approved
    const canApprove = (estimation.status === 'submitted' || estimation.status === 'client_review') &&
                      estimation.status !== ('approved' as any)

    // Check if invoice already exists
    const hasInvoice = estimation.invoices.length > 0

    return NextResponse.json({
      estimation,
      canApprove,
      hasInvoice,
      latestInvoice: estimation.invoices[0] || null
    })

  } catch (error) {
    console.error('Error fetching estimation details:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch estimation details',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}