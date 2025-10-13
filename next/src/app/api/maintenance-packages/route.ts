import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// GET all maintenance packages (public endpoint)
export async function GET() {
  try {
    const packages = await prisma.maintenancePackage.findMany({
      where: {
        isPublic: true
      },
      orderBy: {
        priceCents: 'asc'
      }
    })

    return NextResponse.json({
      packages: packages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        type: pkg.type,
        price: pkg.priceCents / 100, // Convert from cents to EUR
        description: pkg.description,
        features: pkg.features,
        includedProjects: pkg.includedProjects === -1 ? 'unlimited' : pkg.includedProjects,
        createdAt: pkg.createdAt
      }))
    })
  } catch (error) {
    console.error('[MAINTENANCE_PACKAGES_GET]', error)
    return NextResponse.json(
      { error: 'Failed to fetch maintenance packages' },
      { status: 500 }
    )
  }
}

// POST - Create new maintenance package (admin only)
export async function POST(req: Request) {
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
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await req.json()
    const { name, type, price, description, features, includedProjects, isPublic } = body

    if (!name || !type || !price || !description || !features) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const maintenancePackage = await prisma.maintenancePackage.create({
      data: {
        name,
        type,
        priceCents: Math.round(price * 100), // Convert to cents
        description,
        features,
        includedProjects: includedProjects === 'unlimited' ? -1 : parseInt(includedProjects) || 0,
        isPublic: isPublic !== false
      }
    })

    return NextResponse.json({
      package: {
        id: maintenancePackage.id,
        name: maintenancePackage.name,
        type: maintenancePackage.type,
        price: maintenancePackage.priceCents / 100,
        description: maintenancePackage.description,
        features: maintenancePackage.features,
        includedProjects: maintenancePackage.includedProjects === -1 ? 'unlimited' : maintenancePackage.includedProjects,
        isPublic: maintenancePackage.isPublic,
        createdAt: maintenancePackage.createdAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('[MAINTENANCE_PACKAGES_POST]', error)
    return NextResponse.json(
      { error: 'Failed to create maintenance package' },
      { status: 500 }
    )
  }
}