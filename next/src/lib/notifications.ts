import { prisma } from './prisma'

export async function createNotification(userId: string, type: string, payload?: any) {
  try {
    await prisma.notification.create({ data: { userId, type, payload } })
  } catch {
    // best effort
  }
}

export async function notifyAdmins(type: string, payload?: any) {
  const admins = await prisma.user.findMany({ where: { role: 'admin' }, select: { id: true } })
  await Promise.all(admins.map(a => createNotification(a.id, type, payload)))
}

