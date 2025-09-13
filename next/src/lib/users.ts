import { promises as fs } from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

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
  await ensureStore()
  const raw = await fs.readFile(usersFile, 'utf-8')
  return JSON.parse(raw)
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await listUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

export async function createUser(params: { name?: string; email: string; password: string }) {
  const { name, email, password } = params
  const existing = await findUserByEmail(email)
  if (existing) throw new Error('Email already registered')
  const passwordHash = await bcrypt.hash(password, 10)
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

