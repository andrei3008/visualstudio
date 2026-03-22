import VelocityMarquee from "@/components/animation/VelocityMarquee";
import VideoParallax from "@/components/animation/VideoParallax";
import AnimatedButton from "@/components/animation/AnimatedButton";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="mxd-section mxd-hero-section padding-grid-pre-mtext">
      <div className="mxd-hero-03">
        <div className="mxd-hero-03__wrap loading-wrap">
          {/* top part */}
          <div className="mxd-hero-03__top">
            {/* marquee */}
            <div className="mxd-hero-03__marquee loading__item">
              {/* Marquee Start */}
              <VelocityMarquee className="marquee marquee-right--gsap">
                {/* item */}
                <div className="marquee__item one-line">
                  <div className="hero-03-marquee__image">
                    <Image
                      className="mxd-move"
                      alt="Image"
                      src="/img/hero/hero-15.png"
                      width={1000}
                      height={1532}
                    />
                  </div>
                </div>
                {/* item */}
                <div className="marquee__item one-line">
                  <div className="hero-03-marquee__image">
                    <Image
                      className="mxd-move"
                      alt="Image"
                      src="/img/hero/hero-2.png"
                      width={1000}
                      height={1532}
                    />
                  </div>
                </div>
                {/* item */}
                <div className="marquee__item one-line">
                  <div className="hero-03-marquee__image">
                    <Image
                      className="mxd-pulse-small"
                      alt="Image"
                      src="/img/hero/hero-16.png"
                      width={800}
                      height={780}
                    />
                  </div>
                </div>
                {/* item */}
                <div className="marquee__item one-line">
                  <div className="hero-03-marquee__image">
                    <Image
                      className="mxd-rotate-slow"
                      alt="Image"
                      src="/img/hero/hero-13.png"
                      width={1410}
                      height={1056}
                    />
                  </div>
                </div>
                {/* item */}
                <div className="marquee__item one-line">
                  <div className="hero-03-marquee__image">
                    <Image
                      className="mxd-move"
                      alt="Image"
                      src="/img/hero/hero-11.png"
                      width={2152}
                      height={2015}
                    />
                  </div>
                </div>
                {/* item */}
                <div className="marquee__item one-line">
                  <div className="hero-03-marquee__image">
                    <Image
                      className="mxd-pulse-small"
                      alt="Image"
                      src="/img/hero/hero-14.png"
                      width={800}
                      height={780}
                    />
                  </div>
                </div>
              </VelocityMarquee>
              {/* Marquee End */}
            </div>
            {/* headline */}
            <div className="mxd-hero-03__headline">
              <p className="hero-03-headline__caption loading__item">
                Partener Tehnic
                <br />
                Soluții software inteligente
              </p>
              <h1 className="hero-03-headline__title loading__item">
                <span className="hero-03-headline__hidden">visualstudio</span>
                <span
                  className="hero-03-headline__svg-mobile custom-visualstudio-text"
                  style={{
                    fontSize: 'clamp(60px, 15vw, 120px)',
                    fontWeight: '900',
                    lineHeight: '1',
                    color: '#161616',
                    textShadow: '0 0 2px rgba(0,0,0,0.8)'
                  }}
                >
                  visualstudio
                </span>
                <span
                  className="hero-03-headline__svg custom-visualstudio-text"
                  style={{
                    fontSize: 'clamp(125px, 25vw, 285px)',
                    fontWeight: '900',
                    lineHeight: '1',
                    color: '#161616',
                    textShadow: '0 0 2px rgba(0,0,0,0.8)'
                  }}
                >
                  visualstudio
                </span>
              </h1>
            </div>
          </div>
          {/* bottom part */}
          <div className="mxd-hero-03__bottom">
            <div className="mxd-container">
              {/* video divider */}
              <div className="mxd-divider">
                <div className="mxd-divider__video">
                  <VideoParallax
                    className="video parallax-video"
                    scale={1.5}
                    src="/video/video-1.mp4"
                    poster="/video/video-1-poster.svg"
                  />
                </div>
              </div>
              {/* message below video */}
              <div className="t-large t-bright anim-uni-in-up" style={{ textAlign: 'center', marginTop: '30px', fontSize: 'clamp(24px, 3vw, 36px)' }}>
                Alături de tine de la primul pas până la scalare reală
              </div>
              {/* contact button */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <AnimatedButton
                  text="Contactează-ne"
                  className="btn btn-anim btn-default btn-outline slide-right"
                  href="/contact"
                >
                  <i className="ph-bold ph-arrow-up-right" />
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
