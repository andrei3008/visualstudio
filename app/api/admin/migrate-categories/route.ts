import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

/**
 * ONE-TIME migration: rename blog categories to be client-needs-oriented.
 * DELETE this file after running the migration in production.
 *
 * Call: POST /api/admin/migrate-categories
 */
export async function POST() {
  const prisma = new PrismaClient();

  try {
    const results: string[] = [];

    // 1. Rename existing categories
    const renames = [
      { old: "ai", name: "AI pentru Business", slug: "ai-business", desc: "Cum poti folosi AI-ul in firma ta pentru a creste productivitatea si a reduce costurile" },
      { old: "automatizare", name: "Automatizari pentru Firme", slug: "automatizari-firme", desc: "Automatizari care elimina munca manuala si iti economisesc timp si bani" },
      { old: "dezvoltare", name: "Software Custom", slug: "software-custom", desc: "Solutii software personalizate pentru nevoile unice ale afacerii tale" },
      { old: "produs-digital", name: "Site-uri & Magazine Online", slug: "site-uri-magazine-online", desc: "Site-uri de prezentare si magazine online care iti aduc clienti noi" },
      { old: "tendinte", name: "Optimizare & Performanta", slug: "optimizare-performanta", desc: "Cum sa imbunatatesti performanta site-ului si sa cresti conversiile" },
    ];

    for (const r of renames) {
      const count = await prisma.$executeRaw`
        UPDATE Category SET name = ${r.name}, slug = ${r.slug}, description = ${r.desc}
        WHERE slug = ${r.old}
      `;
      results.push(`${r.old} -> ${r.name} (${count} rows)`);
    }

    // 2. Create new category: Ghiduri & Tutoriale
    const existing = await prisma.category.findUnique({ where: { slug: "ghiduri-tutoriale" } });
    if (!existing) {
      await prisma.category.create({
        data: {
          name: "Ghiduri & Tutoriale",
          slug: "ghiduri-tutoriale",
          description: "Ghiduri practice si tutoriale pas cu pas pentru antreprenori si manageri",
          color: "#9f8be7",
        },
      });
      results.push("Created: Ghiduri & Tutoriale");
    } else {
      results.push("Skipped: Ghiduri & Tutoriale (already exists)");
    }

    // 3. Move DevOps posts
    const softwareCustom = await prisma.category.findUnique({ where: { slug: "software-custom" } });
    const autoFirme = await prisma.category.findUnique({ where: { slug: "automatizari-firme" } });
    const devops = await prisma.category.findUnique({ where: { slug: "devops" } });

    if (devops && softwareCustom) {
      const stackPosts = await prisma.post.findMany({ where: { title: { contains: "stack-ul tehnic" } } });
      for (const post of stackPosts) {
        await prisma.$executeRaw`
          UPDATE PostCategory SET categoryId = ${softwareCustom.id}
          WHERE postId = ${post.id} AND categoryId = ${devops.id}
        `;
      }
      results.push(`Moved ${stackPosts.length} stack posts -> Software Custom`);
    }

    if (devops && autoFirme) {
      const devopsPosts = await prisma.post.findMany({ where: { title: { contains: "DevOps" } } });
      for (const post of devopsPosts) {
        await prisma.$executeRaw`
          UPDATE PostCategory SET categoryId = ${autoFirme.id}
          WHERE postId = ${post.id} AND categoryId = ${devops.id}
        `;
      }
      results.push(`Moved ${devopsPosts.length} devops posts -> Automatizari pentru Firme`);
    }

    // 4. Delete orphan links and old categories
    if (devops) {
      await prisma.$executeRaw`DELETE FROM PostCategory WHERE categoryId = ${devops.id}`;
      await prisma.category.delete({ where: { slug: "devops" } });
      results.push("Deleted: DevOps");
    }

    const uxui = await prisma.category.findUnique({ where: { slug: "ux-ui" } });
    if (uxui) {
      await prisma.$executeRaw`DELETE FROM PostCategory WHERE categoryId = ${uxui.id}`;
      await prisma.category.delete({ where: { slug: "ux-ui" } });
      results.push("Deleted: UX/UI");
    }

    // 5. Verify
    const categories = await prisma.category.findMany({
      include: { posts: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      results,
      categories: categories.map((c) => ({
        name: c.name,
        slug: c.slug,
        posts: c.posts.length,
      })),
    });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
