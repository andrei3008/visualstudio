import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { handleApiError, NotFoundError, UnauthorizedError, ForbiddenError, ValidationError } from '@/lib/error-handler'
import { validateUpdateUser } from '@/lib/validation'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      throw new UnauthorizedError()
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true }
    })
    if (!currentUser) {
      throw new UnauthorizedError('User not found')
    }

    // Only admins can get user details
    if (currentUser.role !== 'admin') {
      throw new ForbiddenError()
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        Telefon: true,
        Address: true,
        Oras: true,
        Country: true,
        isActive: true
      }
    })

    if (!targetUser) {
      throw new NotFoundError('User')
    }

    // Map database fields to standard frontend field names
    const userWithStatus = {
      ...targetUser,
      status: targetUser.isActive ? 'active' : 'inactive',
      lastLogin: null, // You can add this field if you track login times
      phone: targetUser.Telefon,
      address: targetUser.Address,
      city: targetUser.Oras,
      country: targetUser.Country,
      // Remove original database fields
      Telefon: undefined,
      Address: undefined,
      Oras: undefined,
      Country: undefined,
      isActive: undefined
    }

    return NextResponse.json({ user: userWithStatus })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      throw new UnauthorizedError()
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true }
    })
    if (!currentUser) {
      throw new UnauthorizedError('User not found')
    }

    // Only admins can update users
    if (currentUser.role !== 'admin') {
      throw new ForbiddenError()
    }

    const body = await request.json()
    const validatedData = validateUpdateUser(body)

    // Check if email is already taken by another user
    if (validatedData.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: validatedData.email,
          id: { not: params.id }
        }
      })
      if (existingUser) {
        throw new ValidationError('Email already exists', 'email')
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(validatedData.name && { name: validatedData.name }),
        ...(validatedData.email && { email: validatedData.email }),
        ...(validatedData.role && { role: validatedData.role }),
        ...(validatedData.phone !== undefined && { Telefon: validatedData.phone }),
        ...(validatedData.address !== undefined && { Address: validatedData.address }),
        ...(validatedData.city !== undefined && { Oras: validatedData.city }),
        ...(validatedData.country !== undefined && { Country: validatedData.country }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        Telefon: true,
        Address: true,
        Oras: true,
        Country: true,
        isActive: true
      }
    })

    // Map database fields to standard frontend field names
    const userWithStatus = {
      ...updatedUser,
      status: updatedUser.isActive ? 'active' : 'inactive',
      lastLogin: null,
      phone: updatedUser.Telefon,
      address: updatedUser.Address,
      city: updatedUser.Oras,
      country: updatedUser.Country,
      // Remove original database fields
      Telefon: undefined,
      Address: undefined,
      Oras: undefined,
      Country: undefined,
      isActive: undefined
    }

    return NextResponse.json({ user: userWithStatus })
  } catch (error) {
    return handleApiError(error)
  }
}