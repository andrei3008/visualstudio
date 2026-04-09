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

const webhookPutSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().max(500).optional(),
  categorySlugs: z.array(z.string()).optional(),
  authorName: z.string().max(100).optional(),
  featuredImage: z.string().optional(),
  publish: z.boolean().optional(),
});

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("Authorization");
  const apiKey = process.env.PAPERCLIP_API_KEY;
  return !!authHeader && authHeader === `Bearer ${apiKey}`;
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // slug from query param: PUT /api/posts/webhook?slug=the-slug
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing ?slug= query param" }, { status: 400 });
  }

  let body: z.infer<typeof webhookPutSchema>;
  try {
    body = webhookPutSchema.parse(await request.json());
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: e.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Resolve categories if provided
  if (body.categorySlugs !== undefined) {
    await prisma.postCategory.deleteMany({ where: { postId: existing.id } });
    if (body.categorySlugs.length > 0) {
      const categories = await prisma.category.findMany({
        where: { slug: { in: body.categorySlugs } },
        select: { id: true },
      });
      await prisma.postCategory.createMany({
        data: categories.map((c) => ({ postId: existing.id, categoryId: c.id })),
      });
    }
  }

  const status = body.publish ? "PUBLISHED" : undefined;
  const publishedAt =
    body.publish && existing.status !== "PUBLISHED" ? new Date() : undefined;

  const post = await prisma.post.update({
    where: { id: existing.id },
    data: {
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.content !== undefined ? { content: body.content } : {}),
      ...(body.excerpt !== undefined ? { excerpt: body.excerpt } : {}),
      ...(body.authorName !== undefined ? { authorName: body.authorName } : {}),
      ...(body.featuredImage !== undefined ? { featuredImage: body.featuredImage } : {}),
      ...(status !== undefined ? { status } : {}),
      ...(publishedAt !== undefined ? { publishedAt } : {}),
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

  return NextResponse.json(flattened);
}
