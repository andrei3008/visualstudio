import { getLatestPosts } from "@/lib/blog";
import BlogsClient from "./BlogsClient";

const defaultDesc = `Articole practice despre dezvoltare software, automatizare, produse digitale și decizii tehnice care contează într-un business real.`;

export default async function Blogs({
  title = "Noutăți recente",
  desc = defaultDesc,
}: {
  title?: string;
  desc?: string;
}) {
  const posts = await getLatestPosts(3);
  return <BlogsClient title={title} desc={desc} posts={posts} />;
}
