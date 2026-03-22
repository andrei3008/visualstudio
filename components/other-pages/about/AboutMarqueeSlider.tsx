import Link from "next/link";
import Image from "next/image";
import React from "react";

import VelocityMarquee from "@/components/animation/VelocityMarquee";

const aboutMarqueeTop = [
  "/img/marquee/about/about-marquee-01.jpg",
  "/img/marquee/about/about-marquee-02.jpg",
  "/img/marquee/about/about-marquee-03.jpg",
  "/img/marquee/about/about-marquee-04.jpg",
];

const aboutMarqueeBottom = [
  "/img/marquee/about/about-marquee-05.jpg",
  "/img/marquee/about/about-marquee-06.jpg",
  "/img/marquee/about/about-marquee-07.jpg",
  "/img/marquee/about/about-marquee-08.jpg",
];

function MarqueeLine({ images }: { images: string[] }) {
  return (
    <>
      {images.map((src, idx) => (
        <React.Fragment key={idx}>
          <div className="marquee__item image">
            <Link className="marquee__link" href="/contact">
              <Image
                alt="Visual Studio Concept"
                src={src}
                width={1200}
                height={1000}
                style={{ objectPosition: "center center" }}
              />
            </Link>
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

export default function AboutMarqueeSlider() {
  return (
    <div className="mxd-section padding-pre-title">
      <div className="mxd-container fullwidth-container">
        <div className="mxd-block">
          <VelocityMarquee direction="left" className="marquee marquee--gsap">
            <MarqueeLine images={aboutMarqueeTop} />
          </VelocityMarquee>
          <VelocityMarquee direction="right" className="marquee marquee--gsap">
            <MarqueeLine images={aboutMarqueeBottom} />
          </VelocityMarquee>
        </div>
      </div>
    </div>
  );
}
