import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        projects: true,
        subscriptions: {
          where: { status: 'active' },
          include: {
            maintenancePackage: true
          }
        },
        oneTimeProjects: {
          where: { status: 'paid' }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has active subscription
    const activeSubscription = user.subscriptions[0]

    let canCreateProject = false
    let maxProjects = 0
    let currentProjects = user.projects.length
    let remainingProjects = 0
    let planType = 'free'
    let subscriptionName = null

    if (activeSubscription) {
      // User has active subscription
      const includedProjects = activeSubscription.maintenancePackage.includedProjects

      if (includedProjects === -1) {
        // Unlimited projects
        canCreateProject = true
        maxProjects = -1
        remainingProjects = -1
        planType = 'unlimited'
      } else {
        // Limited projects
        const usedProjects = activeSubscription.projectsUsed
        const availableProjects = includedProjects

        maxProjects = availableProjects
        remainingProjects = Math.max(0, availableProjects - usedProjects)
        canCreateProject = remainingProjects > 0
        planType = 'subscription'
      }

      subscriptionName = activeSubscription.maintenancePackage.name
    } else {
      // Free user - can only create one-time projects
      canCreateProject = false
      maxProjects = 0
      remainingProjects = 0
      planType = 'free'
    }

    return NextResponse.json({
      canCreateProject,
      currentProjects,
      maxProjects,
      remainingProjects,
      planType,
      subscriptionName,
      message: !canCreateProject ? (
        planType === 'free'
          ? 'Trebuie să abonezi la un plan pentru a crea proiecte'
          : `Ai atins limita de ${maxProjects} proiecte. Upgradează planul pentru mai multe proiecte.`
      ) : null
    })

  } catch (error) {
    console.error('[PROJECTS_CHECK_LIMIT]', error)
    return NextResponse.json(
      { error: 'Failed to check project limit' },
      { status: 500 }
    )
  }
}