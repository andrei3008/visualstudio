import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { findUserByEmail } from '@/lib/users'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await findUserByEmail(session.user.email)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    const {
      name,
      description,
      category,
      budget,
      timeline,
      requirements,
      deliverables,
      targetAudience,
      technicalRequirements
    } = body

    // Validate required fields
    if (!name?.trim() || !description?.trim() || !category || !requirements?.trim()) {
      return NextResponse.json({
        error: 'Toate câmpurile marcate cu * sunt obligatorii'
      }, { status: 400 })
    }

    // Project requests are unlimited - no limit checking needed

    // Create project request
    const project = await prisma.project.create({
      data: {
        userId: user.id,
        name: name.trim(),
        description: description.trim(),
        status: 'proposal_review', // Direct to proposal review since we create a proposal
        requestDetails: {
          category,
          budget,
          timeline,
          requirements: requirements.trim(),
          deliverables: deliverables?.trim() || '',
          targetAudience: targetAudience?.trim() || '',
          technicalRequirements: technicalRequirements?.trim() || '',
          submittedAt: new Date().toISOString()
        }
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })

    // Create a draft proposal automatically
    const publicToken = crypto.randomUUID()

    const proposal = await prisma.proposal.create({
      data: {
        projectId: project.id,
        title: `Propunere pentru ${name.trim()}`,
        description: description.trim(),
        status: 'draft',
        publicToken,
        adminNotes: {
          category,
          budget,
          timeline,
          requirements: requirements.trim(),
          deliverables: deliverables?.trim() || '',
          targetAudience: targetAudience?.trim() || '',
          technicalRequirements: technicalRequirements?.trim() || '',
          submittedAt: new Date().toISOString()
        }
      }
    })

    // Create notification for admin
    await prisma.notification.create({
      data: {
        userId: (await prisma.user.findFirst({
          where: { role: 'admin' },
          select: { id: true }
        }))?.id || user.id, // Fallback to user if no admin found
        type: 'project_request',
        payload: {
          projectId: project.id,
          projectName: project.name,
          clientEmail: user.email,
          clientName: user.name || user.email,
          proposalId: proposal.id,
          proposalTitle: proposal.title
        }
      }
    })

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        status: project.status,
        createdAt: project.createdAt,
        proposalId: proposal.id,
        proposalTitle: proposal.title
      }
    })

  } catch (error: any) {
    console.error('Error creating project request:', error)
    return NextResponse.json({
      error: error?.message || 'A apărut o eroare la crearea cererii de proiect'
    }, { status: 500 })
  }
}