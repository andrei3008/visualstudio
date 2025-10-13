import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// GET specific maintenance package
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pkg = await prisma.maintenancePackage.findUnique({
      where: { id: params.id }
    })

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    return NextResponse.json({
      package: {
        id: pkg.id,
        name: pkg.name,
        type: pkg.type,
        price: pkg.priceCents / 100,
        description: pkg.description,
        features: pkg.features,
        includedProjects: pkg.includedProjects === -1 ? 'unlimited' : pkg.includedProjects,
        isPublic: pkg.isPublic,
        createdAt: pkg.createdAt
      }
    })
  } catch (error) {
    console.error('[MAINTENANCE_PACKAGE_GET]', error)
    return NextResponse.json(
      { error: 'Failed to fetch maintenance package' },
      { status: 500 }
    )
  }
}

// PUT - Update maintenance package (admin only)
export async function PUT(
  req: Request,
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
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await req.json()
    const { name, type, price, description, features, includedProjects, isPublic } = body

    const pkg = await prisma.maintenancePackage.findUnique({
      where: { id: params.id }
    })

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    const updatedPackage = await prisma.maintenancePackage.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(price !== undefined && { priceCents: Math.round(price * 100) }),
        ...(description !== undefined && { description }),
        ...(features !== undefined && { features }),
        ...(includedProjects !== undefined && {
          includedProjects: includedProjects === 'unlimited' ? -1 : parseInt(includedProjects) || 0
        }),
        ...(isPublic !== undefined && { isPublic })
      }
    })

    return NextResponse.json({
      package: {
        id: updatedPackage.id,
        name: updatedPackage.name,
        type: updatedPackage.type,
        price: updatedPackage.priceCents / 100,
        description: updatedPackage.description,
        features: updatedPackage.features,
        includedProjects: updatedPackage.includedProjects === -1 ? 'unlimited' : updatedPackage.includedProjects,
        isPublic: updatedPackage.isPublic,
        createdAt: updatedPackage.createdAt
      }
    })

  } catch (error) {
    console.error('[MAINTENANCE_PACKAGE_PUT]', error)
    return NextResponse.json(
      { error: 'Failed to update maintenance package' },
      { status: 500 }
    )
  }
}

// DELETE - Delete maintenance package (admin only)
export async function DELETE(
  req: Request,
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
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // Check if package has active subscriptions
    const activeSubscriptions = await prisma.subscription.count({
      where: {
        maintenancePackageId: params.id,
        status: 'active'
      }
    })

    if (activeSubscriptions > 0) {
      return NextResponse.json(
        { error: 'Cannot delete package with active subscriptions' },
        { status: 400 }
      )
    }

    await prisma.maintenancePackage.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Package deleted successfully' })

  } catch (error) {
    console.error('[MAINTENANCE_PACKAGE_DELETE]', error)
    return NextResponse.json(
      { error: 'Failed to delete maintenance package' },
      { status: 500 }
    )
  }
}