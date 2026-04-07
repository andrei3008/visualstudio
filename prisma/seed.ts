import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@2026!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@visualstudio.ro" },
    update: {},
    create: {
      email: "admin@visualstudio.ro",
      name: "Admin",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log(`Admin user created: ${admin.email}`);

  const categories = [
    { name: "Dezvoltare", slug: "dezvoltare", description: "Articole despre dezvoltare software și programare" },
    { name: "Automatizare", slug: "automatizare", description: "Automatizări și optimizări de procese" },
    { name: "AI", slug: "ai", description: "Inteligentă artificială și machine learning" },
    { name: "Produs Digital", slug: "produs-digital", description: "Crearea și lansarea de produse digitale" },
    { name: "DevOps", slug: "devops", description: "DevOps, CI/CD și infrastructură" },
    { name: "UX/UI", slug: "ux-ui", description: "Design UX/UI și experiența utilizatorului" },
    { name: "Tendințe", slug: "tendinte", description: "Tendințe și noutăți din industria tech" },
    { name: "Studii de caz", slug: "studii-de-caz", description: "Studii de caz și proiecte realizate" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log(`Seeded ${categories.length} categories`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
