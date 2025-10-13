// Idempotent seed: creates an admin user, maintenance packages and a sample project if missing
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

async function main() {
  const prisma = new PrismaClient()

  // Create admin user
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'changeme123'
  const name = process.env.SEED_ADMIN_NAME || 'Admin'

  const passwordHash = await bcrypt.hash(password, 10)
  const adminUser = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name, passwordHash, role: 'admin' },
  })

  // Create maintenance packages
  const packages = [
    {
      name: 'Basic',
      type: 'basic',
      priceCents: 29900, // 299 EUR
      description: 'Perfect pentru proiecte mici și mentenanță',
      features: [
        'Mentenanță & bugfix',
        'Mică dezvoltare',
        'Suport email',
        'Raport lunar',
        '1 proiect gratuit'
      ],
      includedProjects: 1
    },
    {
      name: 'Growth',
      type: 'growth',
      priceCents: 79900, // 799 EUR
      description: 'Ideal pentru afaceri în creștere',
      features: [
        'Iterații feature',
        'Optimizări & A/B',
        'PM inclus',
        'Suport prioritar',
        '3 proiecte gratuite',
        'Raport săptămânal'
      ],
      includedProjects: 3
    },
    {
      name: 'Pro',
      type: 'pro',
      priceCents: 199900, // 1999 EUR
      description: 'Pentru companii cu nevoi complexe',
      features: [
        'Roadmap dedicat',
        'Integrare CI/CD',
        'Suport prioritar 24/7',
        'Proiecte nelimitate',
        'Dedicated team lead',
        'Raport zilnic'
      ],
      includedProjects: -1 // -1 means unlimited
    }
  ]

  for (const pkg of packages) {
    await prisma.maintenancePackage.upsert({
      where: { type: pkg.type },
      update: pkg,
      create: pkg,
    })
  }

  // Create sample project for admin
  const existingProjects = await prisma.project.count({ where: { userId: adminUser.id } })
  if (existingProjects === 0) {
    await prisma.project.create({
      data: { userId: adminUser.id, name: 'Proiect demo', status: 'in_progress' },
    })
  }

  await prisma.$disconnect()
  console.log(`[seed] Admin User: ${email} (password: ${password})`) // visible in container logs
  console.log(`[seed] Maintenance packages created: ${packages.length}`)
}

main().catch(async (e) => {
  console.error('[seed] failed:', e)
  process.exit(1)
})
