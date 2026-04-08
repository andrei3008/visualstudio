"use client";

import Link from "next/link";
import Image from "next/image";

import { blogs1 } from "@/data/blogs.json";
import RevealText from "../animation/RevealText";
import BackgroundParallax from "../animation/BackgroundParallax";
import AnimatedButton from "../animation/AnimatedButton";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  categories: { id: string; name: string; slug: string }[];
};

export default function BlogsClient({
  title,
  desc,
  posts,
}: {
  title: string;
  desc: string;
  posts: BlogPost[];
}) {
  const hasPosts = posts && posts.length > 0;

  return (
    <div className="mxd-section padding-blog">
      <div className="mxd-container grid-container">
        {/* Block - Section Title Start */}
        <div className="mxd-block">
          <div className="mxd-section-title pre-grid">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <RevealText as="h2" className="reveal-type anim-uni-in-up">
                      {title}
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p className="anim-uni-in-up">{desc}</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrcontrols anim-uni-in-up">
                    <AnimatedButton
                      text="Toate articolele"
                      className="btn btn-anim btn-default btn-outline slide-right-up"
                      href={`/blog`}
                    >
                      <i className="ph-bold ph-arrow-up-right" />
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Section Title End */}

        {/* Block - Blog Preview Cards Start */}
        <div className="mxd-block">
          <div className="mxd-blog-preview">
            <div className="container-fluid p-0">
              <div className="row g-0">
                {hasPosts ? renderDynamicPosts(posts) : renderStaticPosts()}
              </div>
            </div>
          </div>
        </div>
        {/* Block - Blog Preview Cards End */}
      </div>
    </div>
  );
}

function renderDynamicPosts(posts: BlogPost[]) {
  return posts.map((post) => (
    <div
      key={post.id}
      className="col-12 col-xl-4 mxd-blog-preview__item mxd-grid-item animate-card-3"
    >
      <Link className="mxd-blog-preview__media" href={`/blog/${post.slug}`}>
        {post.featuredImage ? (
          <Image
            alt={post.title}
            src={post.featuredImage}
            width={1000}
            height={1250}
            className="mxd-blog-preview__image"
          />
        ) : (
          <BackgroundParallax
            className="mxd-blog-preview__image blog-preview-image-1 parallax-img-small"
          />
        )}
        <div className="mxd-preview-hover">
          <i className="mxd-preview-hover__icon">
            <Image
              alt="Eye Icon"
              src="/img/icons/icon-eye.svg"
              width={38}
              height={21}
            />
          </i>
        </div>
        <div className="mxd-blog-preview__tags">
          {post.categories.slice(0, 2).map((cat) => (
            <span key={cat.id} className="tag tag-default tag-permanent">
              {cat.name}
            </span>
          ))}
        </div>
      </Link>

      <div className="mxd-blog-preview__data">
        <Link className="anim-uni-in-up" href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </div>
    </div>
  ));
}

function renderStaticPosts() {
  return blogs1.map((item, idx) => (
    <div
      key={idx}
      className="col-12 col-xl-4 mxd-blog-preview__item mxd-grid-item animate-card-3"
    >
      <Link className="mxd-blog-preview__media" href={`/blog-article`}>
        <BackgroundParallax
          className={`mxd-blog-preview__image ${item.imageClass} parallax-img-small`}
        />
        <div className="mxd-preview-hover">
          <i className="mxd-preview-hover__icon">
            <Image
              alt="Eye Icon"
              src="/img/icons/icon-eye.svg"
              width={38}
              height={21}
            />
          </i>
        </div>
        <div className="mxd-blog-preview__tags">
          {item.tags.map((tag, tIdx) => (
            <span key={tIdx} className="tag tag-default tag-permanent">
              {tag}
            </span>
          ))}
        </div>
      </Link>

      <div className="mxd-blog-preview__data">
        <Link className="anim-uni-in-up" href={`/blog-article`}>
          {item.title.before ?? ""}{" "}
          {item.title.highlight ? <span>{item.title.highlight}</span> : null}{" "}
          {item.title.after ?? ""}
        </Link>
      </div>
    </div>
  ));
}
