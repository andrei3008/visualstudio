import Link from "next/link";
import Image from "next/image";
import socials from "@/data/socials.json";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import SearchForm from "@/components/blogs/SearchForm";
import AnimatedButton from "@/components/animation/AnimatedButton";
import { getPublishedPosts, getAllCategories } from "@/lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Visual Studio Concept",
  description:
    "Articole despre dezvoltare software, automatizare, produs digital, AI și decizii tehnice care au impact într-un business real.",
  alternates: {
    canonical: "https://visualstudio.ro/blog",
  },
  openGraph: {
    title: "Blog | Visual Studio Concept",
    description: "Articole despre dezvoltare software, automatizări, DevOps și tendințe din industria tech.",
    url: "https://visualstudio.ro/blog",
    siteName: "Visual Studio Concept",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/img/hero/hero-11.webp",
        width: 1200,
        height: 630,
        alt: "Blog | Visual Studio Concept",
      },
    ],
  },
};

// -------------------- Small helpers --------------------
const StarSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 20 20">
    <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
  </svg>
);

const MetaTag: React.FC<{ label: string }> = ({ label }) => (
  <span className="meta-tag">
    <a href="#">{label}</a>
    <StarSvg />
  </span>
);

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  const months = [
    "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
    "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// -------------------- Page --------------------
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const categorySlug = params.category || undefined;

  const [{ posts, totalPages }, categories] = await Promise.all([
    getPublishedPosts(currentPage, 5, categorySlug),
    getAllCategories(),
  ]);

  const featured = posts.length > 0 ? posts[0] : null;
  const regularPosts = posts.length > 1 ? posts.slice(1) : [];
  const recentPosts = posts.slice(0, 4);

  const headlineTags = categories.map((c) => c.name);

  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        {/* Section - Inner Page Headline Start */}
        <div className="mxd-section mxd-section-inner-headline padding-blog-default-pre-grid">
          <div className="mxd-container grid-container">
            <div className="mxd-block loading-wrap">
              <div className="container-fluid px-0">
                <div className="row gx-0">
                  <div className="col-12" />
                  <div className="col-12 col-xl-10 mxd-grid-item no-margin">
                    <div className="mxd-block__content">
                      <div className="mxd-block__inner-headline loading__item">
                        <h1 className="inner-headline__title headline-img-before headline-img-06">
                          Digest digital
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="col-12" />
                </div>

                <div className="row g-0">
                  <div className="col-12" />
                  {/* Headline tags via map */}
                  <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                    <div className="inner-headline__blogtags loading__item">
                      {headlineTags.map((t) => (
                        <span
                          key={t}
                          className="tag tag-default tag-outline tag-link-outline"
                        >
                          <a href="#">{t}</a>
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Breadcrumbs */}
                  <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                    <div className="inner-headline__breadcrumbs loading__fade">
                      <div className="breadcrumbs__nav">
                        <span>
                          <Link href={`/`}>Acasă</Link>
                        </span>
                        <span className="current-item">Blog</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Inner Headline Tags End */}
              </div>
            </div>
          </div>
        </div>
        {/* Section - Inner Page Headline End */}

        {/* Section - Blog Start */}
        <div className="mxd-section padding-default">
          <div className="mxd-container grid-container">
            <div className="mxd-posts-area loading__fade">
              {/* Posts Container Start */}
              <div className="mxd-posts-container mxd-grid-item">
                {/* Featured Post */}
                {featured && (
                  <article
                    key={featured.id}
                    className="mxd-post post-featured radius-m"
                  >
                    <Link className="post-featured__thumb" href={`/blog/${featured.slug}`}>
                      {featured.featuredImage && (
                        <Image
                          alt={featured.title}
                          src={featured.featuredImage}
                          width={1400}
                          height={900}
                        />
                      )}
                    </Link>

                    <div className="post-featured__categories">
                      {featured.categories.map((c) => (
                        <span
                          key={c.id}
                          className="tag tag-default tag-outline-permanent tag-link-outline-premanent"
                        >
                          <Link href={`/blog?category=${c.slug}`}>{c.name}</Link>
                        </span>
                      ))}
                    </div>

                    <div className="post-featured__content">
                      <div className="post-featured__meta">
                        {featured.categories.map((c) => (
                          <MetaTag key={c.id} label={c.name} />
                        ))}
                        <span className="meta-date">{formatDate(featured.publishedAt)}</span>
                      </div>

                      <h3 className="post-featured__title">
                        <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                      </h3>

                      <div className="post-featured__excerpt">
                        <p>{featured.excerpt}</p>
                      </div>
                    </div>
                  </article>
                )}

                {/* Regular posts via map */}
                {regularPosts.map((p) => (
                  <article className="mxd-post post-simple" key={p.id}>
                    <Link
                      className="post-simple__thumb radius-m"
                      href={`/blog/${p.slug}`}
                    >
                      {p.featuredImage && (
                        <Image
                          alt={p.title}
                          src={p.featuredImage}
                          width={800}
                          height={680}
                        />
                      )}
                      <div className="mxd-preview-hover">
                        <i className="mxd-preview-hover__icon icon-small">
                          <Image
                            alt="Eye Icon"
                            src="/img/icons/icon-eye.svg"
                            width={38}
                            height={21}
                          />
                        </i>
                      </div>
                    </Link>

                    <div className="post-simple__content">
                      <div className="post-simple__descr">
                        <div className="post-simple__meta">
                          {p.categories.map((c) => (
                            <MetaTag key={c.id} label={c.name} />
                          ))}
                          <span className="meta-date">{formatDate(p.publishedAt)}</span>
                        </div>

                        <div className="post-simple__title">
                          <h5>
                            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                          </h5>
                        </div>
                      </div>

                      <div className="post-simple__btn">
                        <AnimatedButton
                          className="btn btn-anim btn-default btn-outline slide-right-up"
                          text="Citește mai mult"
                          href={`/blog/${p.slug}`}
                        >
                          <i className="ph ph-arrow-up-right" />
                        </AnimatedButton>
                      </div>
                    </div>
                  </article>
                ))}

                {/* Blog Pagination */}
                {totalPages > 1 && (
                  <div className="mxd-blog-pagination">
                    <div className="mxd-blog-pagination__inner">
                      <nav className="mxd-blog-pagination__items">
                        {currentPage > 1 && (
                          <AnimatedButton
                            href={`/blog?page=${currentPage - 1}${categorySlug ? `&category=${categorySlug}` : ""}`}
                            className="mxd-blog-pagination__item blog-pagination-control prev btn btn-anim btn-line-small btn-bright anim-no-delay slide-left"
                            as={"a"}
                            text="Anterior"
                            position={"previous"}
                          >
                            <i className="ph ph-arrow-left" />
                          </AnimatedButton>
                        )}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                          <AnimatedButton
                            key={n}
                            className={`mxd-blog-pagination__item blog-pagination-number btn btn-anim ${
                              n === currentPage ? "active" : ""
                            }`}
                            as={"a"}
                            text={n.toString()}
                            href={`/blog?page=${n}${categorySlug ? `&category=${categorySlug}` : ""}`}
                          />
                        ))}
                        {currentPage < totalPages && (
                          <AnimatedButton
                            as={"a"}
                            text="Următorul"
                            className="mxd-blog-pagination__item blog-pagination-control next btn btn-anim btn-line-small btn-bright anim-no-delay slide-right"
                            href={`/blog?page=${currentPage + 1}${categorySlug ? `&category=${categorySlug}` : ""}`}
                          >
                            <i className="ph ph-arrow-right" />
                          </AnimatedButton>
                        )}
                      </nav>
                    </div>
                  </div>
                )}
              </div>
              {/* Posts Container End */}

              {/* Sidebar Start */}
              <div className="mxd-sidebar mxd-grid-item">
                {/* search widget */}
                <div className="mxd-sidebar__widget bg-base-tint radius-m widget-search">
                  <SearchForm />
                </div>

                {/* categories widget */}
                <div className="mxd-sidebar__widget bg-base-tint radius-m">
                  <div className="widget__title">
                    <p>Categorii</p>
                  </div>
                  <ul className="widget__categories">
                    {categories.map((c) => (
                      <li className="categories__item" key={c.id}>
                        <Link href={`/blog?category=${c.slug}`} className="categories__link">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* recent posts */}
                <div className="mxd-sidebar__widget bg-base-tint radius-m">
                  <div className="widget__title">
                    <p>Articole recente</p>
                  </div>
                  <ul className="widget__recent-posts">
                    {recentPosts.map((rp) => (
                      <li className="recent-post__item" key={rp.id}>
                        <div className="recent-post__thumb">
                          <Link href={`/blog/${rp.slug}`}>
                            {rp.featuredImage && (
                              <Image
                                alt={rp.title}
                                src={rp.featuredImage}
                                width={300}
                                height={300}
                              />
                            )}
                          </Link>
                        </div>
                        <div className="recent-post__content">
                          <div className="recent-post__meta">
                            <span className="meta-tag">
                              <StarSvg />
                              <a href="#">{rp.categories[0]?.name ?? ""}</a>
                            </span>
                          </div>
                          <div className="recent-post__title">
                            <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ad */}
                <div className="mxd-sidebar__widget radius-m widget-ad">
                  <a className="widget__image" href="#" target="_blank">
                    <Image
                      alt="Ad Image"
                      src="/img/blog/1200x1320_ad-01.webp"
                      width={1200}
                      height={1320}
                    />
                  </a>
                  <div className="widget__tags">
                    <span className="tag tag-default tag-permanent">
                      Sponsorizat
                    </span>
                  </div>
                </div>

                {/* about widget */}
                <div className="mxd-sidebar__widget bg-base-tint radius-m widget-about">
                  <div className="widget__title">
                    <p>Despre</p>
                  </div>
                  <div className="widget__descr">
                    <p className="t-small">
                      Articole scurte și directe despre decizii de produs,
                      dezvoltare software, automatizare și infrastructură.
                    </p>
                  </div>
                </div>

                {/* socials */}
                <div className="mxd-sidebar__widget bg-base-tint radius-m widget-socials">
                  <div className="widget__title">
                    <p>Ecosistem</p>
                  </div>
                  <div className="widget__descr">
                    <p className="t-small">
                      Urmărește-ne pentru a fi la curent cu toate noutățile
                      și alte informații interesante!
                    </p>
                  </div>

                  <div className="widget__social-links-small">
                    {socials.map(({ title, url }) => (
                      <div className="social-links-small__item" key={title}>
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href={url}
                          target="_blank"
                        >
                          <p className="social-links-small__title">{title}</p>
                          <div className="social-links-small__icon">
                            <i className="ph-bold ph-arrow-up-right" />
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Sidebar End */}
            </div>
          </div>
        </div>
        {/* Section - Blog End */}
        <Cta />
      </main>
      <Footer />
    </>
  );
}
