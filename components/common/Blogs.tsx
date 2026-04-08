import BlogsClient from "./BlogsClient";

const defaultDesc = `Articole practice despre dezvoltare software, automatizare, produse digitale și decizii tehnice care contează într-un business real.`;

export default function Blogs({
  title = "Noutăți recente",
  desc = defaultDesc,
}: {
  title?: string;
  desc?: string;
}) {
  return <BlogsClient title={title} desc={desc} />;
}
