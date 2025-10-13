import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// GET user one-time projects
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        oneTimeProjects: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      projects: user.oneTimeProjects.map(project => ({
        id: project.id,
        name: project.name,
        description: project.description,
        price: project.priceCents / 100,
        status: project.status,
        stripePaymentIntentId: project.stripePaymentIntentId,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }))
    })
  } catch (error) {
    console.error('[ONE_TIME_PROJECTS_GET]', error)
    return NextResponse.json(
      { error: 'Failed to fetch one-time projects' },
      { status: 500 }
    )
  }
}

// POST - Create new one-time project purchase
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await req.json()
    const { name, description, price } = body

    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    // Create one-time project (pending payment)
    const oneTimeProject = await prisma.oneTimeProject.create({
      data: {
        userId: user.id,
        name,
        description: description || '',
        priceCents: Math.round(price * 100), // Convert to cents
        status: 'pending'
      }
    })

    return NextResponse.json({
      project: {
        id: oneTimeProject.id,
        name: oneTimeProject.name,
        description: oneTimeProject.description,
        price: oneTimeProject.priceCents / 100,
        status: oneTimeProject.status,
        stripePaymentIntentId: oneTimeProject.stripePaymentIntentId,
        createdAt: oneTimeProject.createdAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('[ONE_TIME_PROJECTS_POST]', error)
    return NextResponse.json(
      { error: 'Failed to create one-time project' },
      { status: 500 }
    )
  }
}