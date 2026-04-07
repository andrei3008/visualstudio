import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const postUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().nullable().optional(),
  content: z.string().min(1).optional(),
  featuredImage: z.string().nullable().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  authorName: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const isAdmin = session?.user && (session.user as { role: string }).role === "ADMIN";

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      categories: {
        include: { category: true },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Non-admin can only see published posts
  if (!isAdmin && post.status !== "PUBLISHED") {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const flattened = {
    ...post,
    categories: post.categories.map((pc) => pc.category),
  };

  return NextResponse.json(flattened);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: z.infer<typeof postUpdateSchema>;
  try {
    body = postUpdateSchema.parse(await request.json());
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: e.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Check if post exists
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // If categoryIds provided, replace categories
  if (body.categoryIds !== undefined) {
    await prisma.postCategory.deleteMany({ where: { postId: id } });
    if (body.categoryIds.length > 0) {
      await prisma.postCategory.createMany({
        data: body.categoryIds.map((categoryId) => ({
          postId: id,
          categoryId,
        })),
      });
    }
  }

  // If status changes to PUBLISHED and wasn't published before, set publishedAt
  const publishedAt =
    body.status === "PUBLISHED" && existing.status !== "PUBLISHED"
      ? new Date()
      : undefined;

  const { categoryIds, ...updateData } = body;

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...updateData,
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await prisma.post.delete({ where: { id } });

  return NextResponse.json({ message: "Post deleted" });
}
