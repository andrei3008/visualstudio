import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(
  req: Request,
  ctx: { params: { token: string } }
) {
  try {
    const { action, feedback } = await req.json()

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Find proposal by public token
    const proposal = await prisma.proposal.findUnique({
      where: { publicToken: ctx.params.token },
      include: {
        project: true,
        items: true
      }
    })

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      )
    }

    // Check if proposal can be reviewed
    if (proposal.status !== 'client_review' && proposal.status !== 'submitted') {
      return NextResponse.json(
        { error: 'Proposal cannot be reviewed at this stage' },
        { status: 400 }
      )
    }

    const newStatus = action === 'approve' ? 'approved' : 'client_rejected'

    // Update proposal
    const updatedProposal = await prisma.proposal.update({
      where: { id: proposal.id },
      data: {
        status: newStatus,
        approvedAt: action === 'approve' ? new Date() : null,
        clientFeedback: action === 'reject' ? feedback : null,
        updatedAt: new Date()
      },
      include: {
        items: true
      }
    })

    // Update project status based on proposal decision
    const newProjectStatus = action === 'approve' ? 'estimation' : 'proposal_review'

    await prisma.project.update({
      where: { id: proposal.projectId },
      data: {
        status: newProjectStatus,
        updatedAt: new Date(),
        adminNotes: {
          ...(proposal.project.adminNotes as any || {}),
          proposalDecision: {
            action,
            timestamp: new Date().toISOString(),
            proposalId: proposal.id,
            proposalTitle: proposal.title
          }
        }
      }
    })

    // Create notification for admin
    await prisma.notification.create({
      data: {
        userId: 'admin', // You might need to get actual admin user IDs
        type: action === 'approve' ? 'proposal_approved' : 'proposal_rejected',
        payload: {
          proposalId: proposal.id,
          projectName: proposal.project.name,
          proposalTitle: proposal.title,
          action,
          feedback: action === 'reject' ? feedback : null
        }
      }
    })

    // Calculate totals for response
    const subtotal = updatedProposal.items.reduce(
      (sum, item) => sum + item.qty * item.unitPriceCents,
      0
    )
    const vat = subtotal * 0.19
    const total = subtotal + vat

    return NextResponse.json({
      success: true,
      proposal: {
        ...updatedProposal,
        pricing: {
          subtotal,
          vat,
          total
        }
      }
    })

  } catch (error) {
    console.error('Error processing proposal action:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  req: Request,
  ctx: { params: { token: string } }
) {
  try {
    // Find proposal by public token
    const proposal = await prisma.proposal.findUnique({
      where: { publicToken: ctx.params.token },
      include: {
        project: {
          include: {
            user: {
              select: {
                email: true,
                name: true
              }
            }
          }
        },
        items: true
      }
    })

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      )
    }

    // Don't allow access to draft proposals
    if (proposal.status === 'draft') {
      return NextResponse.json(
        { error: 'Proposal not available' },
        { status: 404 }
      )
    }

    // Calculate totals
    const subtotal = proposal.items.reduce(
      (sum, item) => sum + item.qty * item.unitPriceCents,
      0
    )
    const vat = subtotal * 0.19
    const total = subtotal + vat

    return NextResponse.json({
      proposal: {
        ...proposal,
        pricing: {
          subtotal,
          vat,
          total
        }
      }
    })

  } catch (error) {
    console.error('Error fetching proposal:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}