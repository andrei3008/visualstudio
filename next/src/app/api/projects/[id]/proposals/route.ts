import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true }
  })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const proposals = await prisma.proposal.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })
  const withTotals = proposals.map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    createdAt: p.createdAt,
    totalCents: p.items.reduce((sum, it) => sum + it.qty * it.unitPriceCents, 0),
  }))
  return NextResponse.json(withTotals)
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true, name: true, role: true }
  })
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      title,
      description,
      items,
      adminNotes,
      estimatedTimeline,
      estimatedStartDate,
      estimatedEndDate,
      deliverables,
      status = 'draft'
    } = body

    // Validate required fields
    if (!title?.trim() || !description?.trim() || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({
        error: 'Toate câmpurile obligatorii trebuie completate'
      }, { status: 400 })
    }

    // Validate items
    for (const item of items) {
      if (!item.description?.trim() || !item.qty || item.qty <= 0 || !item.unitPrice || item.unitPrice <= 0) {
        return NextResponse.json({
          error: 'Toate itemele trebuie să aibă descriere, cantitate și preț valide'
        }, { status: 400 })
      }
    }

    // Check if project exists and is in request status
    const project = await prisma.project.findFirst({
      where: {
        id: params.id,
        status: 'request'
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found or not in request status' }, { status: 404 })
    }

    // Create proposal
    const proposal = await prisma.proposal.create({
      data: {
        projectId: params.id,
        title: title.trim(),
        description: description.trim(),
        status: status,
        publicToken: crypto.randomBytes(32).toString('hex'),
        submittedAt: status === 'submitted' ? new Date() : null,
        adminNotes: adminNotes || null,
        aiGeneratedTasks: {
          estimatedTimeline,
          estimatedStartDate,
          estimatedEndDate,
          deliverables: deliverables || []
        }
      }
    })

    // Create proposal items
    const proposalItems = await Promise.all(
      items.map((item: any) =>
        prisma.proposalItem.create({
          data: {
            proposalId: proposal.id,
            description: item.description.trim(),
            qty: parseInt(item.qty),
            unitPriceCents: Math.round(parseFloat(item.unitPrice) * 100)
          }
        })
      )
    )

    // Update project status based on proposal status
    const newProjectStatus = status === 'submitted' ? 'proposal_review' : 'request'
    await prisma.project.update({
      where: { id: params.id },
      data: {
        status: newProjectStatus,
        adminNotes: {
          proposalId: proposal.id,
          proposalTitle: title,
          createdAt: new Date().toISOString(),
          adminEmail: user.email
        }
      }
    })

    // Create notification for client
    if (status === 'submitted') {
      await prisma.notification.create({
        data: {
          userId: project.userId,
          type: 'proposal_submitted',
          payload: {
            proposalId: proposal.id,
            projectName: project.name,
            proposalTitle: title,
            publicToken: proposal.publicToken
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      proposal: {
        ...proposal,
        items: proposalItems
      }
    })

  } catch (error) {
    console.error('Error creating proposal:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 })
  }
}

