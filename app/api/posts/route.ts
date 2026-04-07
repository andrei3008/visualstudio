import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const postCreateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  authorName: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const session = await auth();
  const isAdmin = session?.user && (session.user as { role: string }).role === "ADMIN";

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
  const statusParam = searchParams.get("status");
  const categorySlug = searchParams.get("category");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};

  // Non-admin users only see PUBLISHED posts
  if (!isAdmin) {
    where.status = "PUBLISHED";
  } else if (statusParam) {
    where.status = statusParam;
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
    ];
  }

  if (categorySlug) {
    where.categories = {
      some: {
        category: { slug: categorySlug },
      },
    };
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        categories: {
          include: { category: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  const flattened = posts.map((post) => ({
    ...post,
    categories: post.categories.map((pc) => pc.category),
  }));

  return NextResponse.json({
    posts: flattened,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: z.infer<typeof postCreateSchema>;
  try {
    body = postCreateSchema.parse(await request.json());
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: e.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        featuredImage: body.featuredImage,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        status: body.status,
        authorName: body.authorName || "Visual Studio",
        publishedAt: body.status === "PUBLISHED" ? new Date() : null,
        categories: {
          create: (body.categoryIds || []).map((categoryId) => ({
            categoryId,
          })),
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
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
    }
    throw e;
  }
}
