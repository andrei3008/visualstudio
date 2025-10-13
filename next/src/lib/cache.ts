import { cache } from 'react'
import { prisma } from './prisma'

// Cached user queries
export const getCachedUser = cache(async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
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
})

export const getCachedUserByEmail = cache(async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true }
  })
})

export const getCachedUsersList = cache(async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  })
})

// Cached contact queries
export const getCachedContacts = cache(async (userId: string) => {
  return await prisma.contact.findMany({
    where: { clientId: userId },
    orderBy: [
      { isPrimary: 'desc' },
      { name: 'asc' }
    ],
    select: {
      id: true,
      name: true,
      position: true,
      email: true,
      phone: true,
      isPrimary: true,
      notes: true,
      createdAt: true,
      updatedAt: true
    }
  })
})

// Cached project queries
export const getCachedProjects = cache(async (userId: string, options?: {
  status?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}) => {
  const { status, sortBy = 'createdAt', sortOrder = 'desc', limit, offset } = options || {}

  const whereClause: any = { userId }
  if (status && status !== 'all') {
    whereClause.status = status
  }

  const orderByClause: any = {}
  orderByClause[sortBy] = sortOrder

  return await prisma.project.findMany({
    where: whereClause,
    orderBy: orderByClause,
    select: {
      id: true,
      name: true,
      status: true,
      description: true,
      budget: true,
      deadline: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          proposals: true,
          tasks: true,
          milestones: true,
          messages: true
        }
      }
    },
    ...(limit && { take: limit }),
    ...(offset && { skip: offset })
  })
})

export const getCachedProjectStats = cache(async (userId: string) => {
  const stats = await prisma.project.groupBy({
    by: ['status'],
    where: { userId },
    _count: { status: true }
  })

  return stats.reduce((acc, stat) => {
    acc[stat.status] = stat._count.status
    return acc
  }, {} as Record<string, number>)
})

// Cache invalidation helpers
export function invalidateUserCache(id: string) {
  // React cache invalidation will happen automatically on next request
  // For more aggressive invalidation, you can use a proper cache solution like Redis
}

export function invalidateContactsCache(userId: string) {
  // Invalidate contacts cache for a specific user
}

export function invalidateProjectsCache(userId: string) {
  // Invalidate projects cache for a specific user
}