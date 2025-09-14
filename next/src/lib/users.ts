import { promises as fs } from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export type User = {
  id: string
  name?: string
  email: string
  passwordHash: string
  createdAt: string
}

const dataDir = path.join(process.cwd(), 'storage')
const usersFile = path.join(dataDir, 'users.json')

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true })
  try {
    await fs.access(usersFile)
  } catch {
    await fs.writeFile(usersFile, '[]', 'utf-8')
  }
}

export async function listUsers(): Promise<User[]> {
  if (process.env.DATABASE_URL) {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } })
    return users.map((u: any) => ({ id: u.id, name: u.name ?? undefined, email: u.email, passwordHash: u.passwordHash, createdAt: u.createdAt.toISOString() }))
  }
  await ensureStore()
  const raw = await fs.readFile(usersFile, 'utf-8')
  return JSON.parse(raw)
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  if (process.env.DATABASE_URL) {
    const u = await prisma.user.findUnique({ where: { email } })
    if (!u) return undefined
    return { id: u.id, name: u.name ?? undefined, email: u.email, passwordHash: u.passwordHash, createdAt: u.createdAt.toISOString() }
  }
  const users = await listUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

export async function createUser(params: { name?: string; email: string; password: string }) {
  const { name, email, password } = params
  const passwordHash = await bcrypt.hash(password, 10)
  if (process.env.DATABASE_URL) {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) throw new Error('Email already registered')
    const u = await prisma.user.create({ data: { email, name, passwordHash } })
    return { id: u.id, name: u.name ?? undefined, email: u.email, passwordHash: u.passwordHash, createdAt: u.createdAt.toISOString() }
  }
  const existing = await findUserByEmail(email)
  if (existing) throw new Error('Email already registered')
  const user: User = {
    id: Math.random().toString(36).slice(2),
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  const users = await listUsers()
  users.push(user)
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8')
  return user
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email)
  if (!user) return null
  const ok = await bcrypt.compare(password, user.passwordHash)
  return ok ? user : null
}

export async function updateUserName(email: string, name: string): Promise<User | null> {
  if (process.env.DATABASE_URL) {
    const u = await prisma.user.update({ where: { email }, data: { name } }).catch(() => null)
    if (!u) return null
    return { id: u.id, name: u.name ?? undefined, email: u.email, passwordHash: u.passwordHash, createdAt: u.createdAt.toISOString() }
  }
  await ensureStore()
  const raw = await fs.readFile(usersFile, 'utf-8')
  const users: User[] = JSON.parse(raw)
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase())
  if (idx === -1) return null
  users[idx] = { ...users[idx], name }
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8')
  return users[idx]
}

export async function updateUserPassword(email: string, currentPassword: string, newPassword: string): Promise<boolean> {
  if (process.env.DATABASE_URL) {
    const u = await prisma.user.findUnique({ where: { email } })
    if (!u) return false
    const ok = await bcrypt.compare(currentPassword, u.passwordHash)
    if (!ok) return false
    const passwordHash = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({ where: { email }, data: { passwordHash } })
    return true
  }
  await ensureStore()
  const raw = await fs.readFile(usersFile, 'utf-8')
  const users: User[] = JSON.parse(raw)
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase())
  if (idx === -1) return false
  const user = users[idx]
  const ok = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!ok) return false
  const passwordHash = await bcrypt.hash(newPassword, 10)
  users[idx] = { ...user, passwordHash }
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8')
  return true
}
