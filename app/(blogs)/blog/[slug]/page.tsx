import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";
import Cta from "@/components/common/Cta";
import Footer from "@/components/footers/Footer";
import AnimatedButton from "@/components/animation/AnimatedButton";
import { getPostBySlug, getRelatedPosts, getAllPublishedSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Articol | Visual Studio Concept" };

  return {
    title: `${post.title} | Visual Studio Concept`,
    description: post.metaDescription || post.excerpt || "",
    alternates: {
      canonical: `https://visualstudio.ro/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Visual Studio Concept`,
      description: post.metaDescription || post.excerpt || "",
      url: `https://visualstudio.ro/blog/${post.slug}`,
      siteName: "Visual Studio Concept",
      locale: "ro_RO",
      type: "article",
      ...(post.featuredImage
        ? {
            images: [
              {
                url: post.featuredImage,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ],
          }
        : {}),
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  const months = [
    "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
    "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categoryIds = post.categories.map((c) => c.id);
  const relatedPosts = await getRelatedPosts(post.id, categoryIds, 3);
  const contentHtml = await marked(post.content || "");

  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <div className="mxd-section padding-pre-title">
          <div className="mxd-container grid-container">
            <div className="mxd-article-area loading-wrap">
              {/* Article Container Start */}
              <div className="mxd-article-container mxd-grid-item no-margin">
                {/* Article Start */}
                <article className="mxd-article">
                  {/* Article Headline Start */}
                  <div className="mxd-article__headline">
                    <div className="mxd-article__meta">
                      <div className="mxd-article__breadcrumbs loading__item">
                        <span>
                          <Link href={`/`}>Acasă</Link>
                        </span>
                        <span>
                          <Link href={`/blog`}>Blog</Link>
                        </span>
                        <span className="current-item">{post.title}</span>
                      </div>
                      <div className="mxd-article__data loading__item">
                        <span className="meta-date">
                          {formatDate(post.publishedAt)}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.0"
                            viewBox="0 0 20 20"
                          >
                            <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
                          </svg>
                        </span>
                        <span className="meta-time">5 min. de citit</span>
                      </div>
                    </div>
                    <div className="mxd-article__title loading__item">
                      <h1 className="h1-small">{post.title}</h1>
                    </div>
                    <div className="mxd-article__tags loading__item">
                      {post.categories.map((c) => (
                        <span
                          key={c.id}
                          className="tag tag-default tag-outline tag-link-outline"
                        >
                          <Link href={`/blog?category=${c.slug}`}>{c.name}</Link>
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Article Headline End */}

                  {/* Article Thumb Start */}
                  {post.featuredImage && (
                    <div className="mxd-article__thumb loading__fade">
                      <Image
                        alt={post.title}
                        src={post.featuredImage}
                        width={1920}
                        height={1280}
                      />
                    </div>
                  )}
                  {/* Article Thumb End */}

                  {/* Article Content Start */}
                  <div className="mxd-article__content">
                    {post.excerpt && (
                      <div className="mxd-article__block">
                        <p className="t-large mxd-article__excerpt">
                          {post.excerpt}
                        </p>
                      </div>
                    )}
                    <div className="mxd-article__block">
                      <div
                        className="blog-article-content"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                      />
                    </div>
                  </div>
                  {/* Article Content End */}
                </article>
                {/* Article End */}

                {/* Article Author Start */}
                <div className="mxd-article-author">
                  <div className="mxd-article-author__data">
                    <a className="mxd-article-author__avatar" href="#">
                      <Image
                        alt="Avatar"
                        src="/img/avatars/300x300_ava-07.webp"
                        width={300}
                        height={300}
                      />
                    </a>
                    <div className="mxd-article-author__info">
                      <h5 className="mxd-article-author__name">
                        <a href="#">{post.authorName}</a>
                        <small className="mxd-article-author__position">
                          Visual Studio Concept
                        </small>
                      </h5>
                    </div>
                  </div>
                  <div className="mxd-article-author__quote">
                    <p>
                      Articol publicat de echipa Visual Studio Concept.
                    </p>
                  </div>
                </div>
                {/* Article Author End */}
              </div>
              {/* Article Container End */}
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mxd-section padding-default">
            <div className="mxd-container grid-container">
              <div className="mxd-block loading-wrap">
                <div className="mxd-block__content">
                  <div className="mxd-block__inner-headline loading__item">
                    <h2 className="inner-headline__title">Articole similare</h2>
                  </div>
                </div>
              </div>
              <div className="mxd-posts-area loading__fade">
                <div className="mxd-posts-container mxd-grid-item">
                  {relatedPosts.map((rp) => (
                    <article className="mxd-post post-simple" key={rp.id}>
                      <Link
                        className="post-simple__thumb radius-m"
                        href={`/blog/${rp.slug}`}
                      >
                        {rp.featuredImage && (
                          <Image
                            alt={rp.title}
                            src={rp.featuredImage}
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
                            {rp.categories.map((c) => (
                              <span key={c.id} className="meta-tag">
                                <a href="#">{c.name}</a>
                              </span>
                            ))}
                            <span className="meta-date">
                              {formatDate(rp.publishedAt)}
                            </span>
                          </div>
                          <div className="post-simple__title">
                            <h5>
                              <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                            </h5>
                          </div>
                        </div>
                        <div className="post-simple__btn">
                          <AnimatedButton
                            className="btn btn-anim btn-default btn-outline slide-right-up"
                            text="Citește mai mult"
                            href={`/blog/${rp.slug}`}
                          >
                            <i className="ph ph-arrow-up-right" />
                          </AnimatedButton>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <Cta />
      </main>
      <Footer />
    </>
  );
}
