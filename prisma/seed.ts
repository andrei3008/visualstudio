import { PrismaClient, Role } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  }),
});

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
