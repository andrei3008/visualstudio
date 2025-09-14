import { promises as fs } from 'fs'
import path from 'path'
import { prisma } from './prisma'

const dataDir = path.join(process.cwd(), 'storage')
const projectsFile = path.join(dataDir, 'projects.json')

export type Project = {
  id: string
  userId: string
  name: string
  status: 'new' | 'in-progress' | 'scoping' | 'review' | 'done'
  createdAt: string
}

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true })
  try {
    await fs.access(projectsFile)
  } catch {
    await fs.writeFile(projectsFile, '[]', 'utf-8')
  }
}

export async function listProjectsByUserId(userId: string): Promise<Project[]> {
  if (process.env.DATABASE_URL) {
    const rows = await prisma.project.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
    return rows.map(r => ({ id: r.id, userId: r.userId, name: r.name, status: (r.status as any).replace('_', '-') as any, createdAt: r.createdAt.toISOString() }))
  }
  await ensureStore()
  const raw = await fs.readFile(projectsFile, 'utf-8')
  const all: Project[] = JSON.parse(raw)
  return all.filter(p => p.userId === userId)
}

export async function createProject(userId: string, name: string, status: Project['status'] = 'new'): Promise<Project> {
  if (process.env.DATABASE_URL) {
    const enumStatus = (status || 'new').replace('-', '_') as any
    const r = await prisma.project.create({ data: { userId, name, status: enumStatus } })
    return { id: r.id, userId: r.userId, name: r.name, status, createdAt: r.createdAt.toISOString() }
  }
  await ensureStore()
  const raw = await fs.readFile(projectsFile, 'utf-8')
  const all: Project[] = JSON.parse(raw)
  const project: Project = {
    id: Math.random().toString(36).slice(2),
    userId,
    name,
    status,
    createdAt: new Date().toISOString(),
  }
  all.push(project)
  await fs.writeFile(projectsFile, JSON.stringify(all, null, 2), 'utf-8')
  return project
}
