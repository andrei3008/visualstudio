// Idempotent seed: creates an admin user and a sample project if missing
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

async function main() {
  const prisma = new PrismaClient()
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'changeme123'
  const name = process.env.SEED_ADMIN_NAME || 'Admin'

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name, passwordHash },
  })

  const existingProjects = await prisma.project.count({ where: { userId: user.id } })
  if (existingProjects === 0) {
    await prisma.project.create({
      data: { userId: user.id, name: 'Proiect demo', status: 'in_progress' },
    })
  }

  await prisma.$disconnect()
  console.log(`[seed] User: ${email} (password: ${password})`) // visible in container logs
}

main().catch(async (e) => {
  console.error('[seed] failed:', e)
  process.exit(1)
})

