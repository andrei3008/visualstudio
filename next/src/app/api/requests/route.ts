import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { findUserByEmail } from '@/lib/users'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await findUserByEmail(session.user.email)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const requests = await prisma.project.findMany({
      where: {
        userId: user.id,
        status: { in: ['request', 'proposal_review', 'estimation', 'estimation_review'] }
      },
      include: {
        _count: {
          select: {
            proposals: true,
            tasks: true,
            milestones: true,
            messages: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const formattedRequests = requests.map(request => ({
      id: request.id,
      name: request.name,
      status: request.status,
      description: request.description,
      createdAt: request.createdAt,
      requestDetails: request.requestDetails,
      _count: request._count
    }))

    return NextResponse.json(formattedRequests)

  } catch (error) {
    console.error('Error fetching project requests:', error)
    return NextResponse.json({
      error: 'A apărut o eroare la încărcarea cererilor'
    }, { status: 500 })
  }
}