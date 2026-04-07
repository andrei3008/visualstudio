import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const webhookPostSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(300).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional(),
  categorySlugs: z.array(z.string()).optional(),
  authorName: z.string().max(100).default("Paperclip AI"),
  featuredImage: z.string().optional(),
  publish: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  // API key auth check
  const authHeader = request.headers.get("Authorization");
  const apiKey = process.env.PAPERCLIP_API_KEY;

  if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Body validation
  let body: z.infer<typeof webhookPostSchema>;
  try {
    body = webhookPostSchema.parse(await request.json());
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: e.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Resolve categorySlugs to category IDs
  let categoryIds: string[] = [];
  if (body.categorySlugs && body.categorySlugs.length > 0) {
    const categories = await prisma.category.findMany({
      where: { slug: { in: body.categorySlugs } },
      select: { id: true },
    });
    categoryIds = categories.map((c) => c.id);
  }

  const status = body.publish ? "PUBLISHED" : "DRAFT";
  const publishedAt = body.publish ? new Date() : null;

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        authorName: body.authorName,
        featuredImage: body.featuredImage,
        status,
        publishedAt,
        categories: {
          create: categoryIds.map((categoryId) => ({ categoryId })),
        },
      },
      include: {
        categories: {
          include: { category: true },
        },
      },
    });

    const flattened = {
      ...post,
      categories: post.categories.map((pc) => pc.category),
    };

    return NextResponse.json(flattened, { status: 201 });
  } catch (e: unknown) {
    if (
      typeof e === "object" &&
      e !== null &&
      "code" in e &&
      (e as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }
    throw e;
  }
}
