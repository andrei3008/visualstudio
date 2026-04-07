import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

export async function getPublishedPosts(page = 1, limit = 9, categorySlug?: string) {
  const where: Prisma.PostWhereInput = {
    status: "PUBLISHED",
    ...(categorySlug ? { categories: { some: { category: { slug: categorySlug } } } } : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { categories: { include: { category: true } } },
    }),
    prisma.post.count({ where }),
  ]);

  return {
    posts: posts.map(p => ({ ...p, categories: p.categories.map(pc => pc.category) })),
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { categories: { include: { category: true } } },
  });
  if (!post || post.status !== "PUBLISHED") return null;
  return { ...post, categories: post.categories.map(pc => pc.category) };
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });
}

export async function getRelatedPosts(postId: string, categoryIds: string[], limit = 3) {
  return prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: postId },
      categories: { some: { categoryId: { in: categoryIds } } },
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: { categories: { include: { category: true } } },
  }).then(posts => posts.map(p => ({ ...p, categories: p.categories.map(pc => pc.category) })));
}

export async function getAllPublishedSlugs() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });
}
