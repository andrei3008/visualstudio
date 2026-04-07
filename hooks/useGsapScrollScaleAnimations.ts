"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function useGsapScrollScaleAnimations() {
  const pathname = usePathname();
  useEffect(() => {
    const docStyle = getComputedStyle(document.documentElement);
    const triggers: ScrollTrigger[] = [];

    // ✅ Fade & slide up — batched for performance
    const animateInUp = document.querySelectorAll(".anim-uni-in-up");
    if (animateInUp.length) {
      gsap.set(animateInUp, { opacity: 0, y: 50 });
      const batch = ScrollTrigger.batch(animateInUp, {
        start: "top 95%",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "sine",
            stagger: 0.08,
            overwrite: true,
          }),
        onLeave: (els) => gsap.set(els, { opacity: 1, y: 0, overwrite: true }),
        onEnterBack: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "sine",
            stagger: 0.08,
            overwrite: true,
          }),
        onLeaveBack: (els) =>
          gsap.set(els, { opacity: 0, y: 50, overwrite: true }),
      });
      triggers.push(...batch);
    }

    // ✅ Scale-in center — batched
    const animateScaleIn = document.querySelectorAll(".anim-uni-scale-in");
    if (animateScaleIn.length) {
      gsap.set(animateScaleIn, { opacity: 0, y: 50, scale: 1.2 });
      const batch = ScrollTrigger.batch(animateScaleIn, {
        start: "top 85%",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "sine",
            stagger: 0.08,
            overwrite: true,
          }),
        onLeave: (els) =>
          gsap.set(els, { opacity: 1, y: 0, scale: 1, overwrite: true }),
        onEnterBack: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "sine",
            stagger: 0.08,
            overwrite: true,
          }),
        onLeaveBack: (els) =>
          gsap.set(els, { opacity: 0, y: 50, scale: 1.2, overwrite: true }),
      });
      triggers.push(...batch);
    }

    // ✅ Scale-in from right — batched
    const animateInUpRight = document.querySelectorAll(
      ".anim-uni-scale-in-right"
    );
    if (animateInUpRight.length) {
      gsap.set(animateInUpRight, { opacity: 0, y: 50, x: -70, scale: 1.2 });
      const batch = ScrollTrigger.batch(animateInUpRight, {
        start: "top 85%",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "sine",
            stagger: 0.08,
            overwrite: true,
          }),
        onLeave: (els) =>
          gsap.set(els, { opacity: 1, y: 0, x: 0, scale: 1, overwrite: true }),
        onEnterBack: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "sine",
            stagger: 0.08,
            overwrite: true,
          }),
        onLeaveBack: (els) =>
          gsap.set(els, { opacity: 0, y: 50, x: -70, scale: 1.2, overwrite: true }),
      });
      triggers.push(...batch);
    }

    // ✅ Scale-in from left — batched
    const animateInUpLeft = document.querySelectorAll(
      ".anim-uni-scale-in-left"
    );
    if (animateInUpLeft.length) {
      gsap.set(animateInUpLeft, { opacity: 0, y: 50, x: 70, scale: 1.2 });
      const batch = ScrollTrigger.batch(animateInUpLeft, {
        start: "top 85%",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "sine",
            stagger: 0.08,
            overwrite: true,
          }),
        onLeave: (els) =>
          gsap.set(els, { opacity: 1, y: 0, x: 0, scale: 1, overwrite: true }),
        onEnterBack: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "sine",
            stagger: 0.08,
            overwrite: true,
          }),
        onLeaveBack: (els) =>
          gsap.set(els, { opacity: 0, y: 50, x: 70, scale: 1.2, overwrite: true }),
      });
      triggers.push(...batch);
    }

    // ✅ Top to bottom animation (scrub-based, keep individual)
    const toBottomEl = document.querySelectorAll(".anim-top-to-bottom");
    toBottomEl.forEach((e) => {
      const st = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".fullwidth-text__tl-trigger",
            start: "top 99%",
            end: "top 24%",
            scrub: true,
          },
        })
        .fromTo(
          e,
          { transform: "translate3d(0, -100%, 0)" },
          { transform: "translate3d(0, 0, 0)" }
        );
      triggers.push(st.scrollTrigger!);
    });

    // ✅ Zoom animations
    const zoomInContainer = document.querySelectorAll(
      ".anim-zoom-in-container"
    );
    zoomInContainer.forEach((el) => {
      const st = gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "top 14%",
            scrub: true,
          },
        })
        .fromTo(
          el,
          { borderRadius: "200px", transform: "scale3d(0.94, 1, 1)" },
          {
            borderRadius: docStyle.getPropertyValue("--_radius-l"),
            transform: "scale3d(1, 1, 1)",
          }
        );
      triggers.push(st.scrollTrigger!);
    });

    const zoomOutContainer = document.querySelectorAll(
      ".anim-zoom-out-container"
    );
    zoomOutContainer.forEach((el) => {
      const st = gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "top 14%",
            scrub: true,
          },
        })
        .fromTo(
          el,
          { borderRadius: "200px", transform: "scale3d(1.14, 1, 1)" },
          {
            borderRadius: docStyle.getPropertyValue("--_radius-l"),
            transform: "scale3d(1, 1, 1)",
          }
        );
      triggers.push(st.scrollTrigger!);
    });

    // ✅ Batched card animations
    const addCardBatch = (
      selector: string,
      opts: { batchMax: number; gridCols: number; delay?: number }
    ) => {
      const hasAny = document.querySelector(selector);
      if (!hasAny) return;

      gsap.set(selector, { y: 50, opacity: 0 });

      const batch = ScrollTrigger.batch(selector, {
        interval: 0.1,
        batchMax: opts.batchMax,
        start: "top 80%",
        end: "bottom 20%",
        ...(opts.delay ? { delay: opts.delay } : {}),
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            ease: "sine",
            stagger: { each: 0.15, grid: [1, opts.gridCols] },
            overwrite: true,
          }),
        onLeave: (els) =>
          gsap.set(els, { opacity: 1, y: 0, overwrite: true }),
        onEnterBack: (els) =>
          gsap.to(els, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
        onLeaveBack: (els) =>
          gsap.set(els, { opacity: 0, y: 50, overwrite: true }),
      });
      triggers.push(...batch);
    };

    addCardBatch(".animate-card-2", { batchMax: 2, gridCols: 2 });
    addCardBatch(".animate-card-3", { batchMax: 3, gridCols: 3 });
    addCardBatch(".animate-card-4", { batchMax: 4, gridCols: 4, delay: 1000 });
    addCardBatch(".animate-card-5", { batchMax: 5, gridCols: 5, delay: 1000 });

    // ✅ Loading animation
    const loadingWrap = document.querySelector(".loading-wrap");
    if (loadingWrap) {
      const loadingItems = loadingWrap.querySelectorAll(".loading__item");
      const fadeInItems = document.querySelectorAll(".loading__fade");

      console.log("[GSAP] loading-wrap found. Items:", loadingItems.length, "Fade items:", fadeInItems.length);

      gsap.set(loadingItems, { opacity: 0 });
      gsap.to(loadingItems, {
        duration: 1.1,
        ease: "power4",
        startAt: { y: 120 },
        y: 0,
        opacity: 1,
        delay: 0.8,
        stagger: 0.08,
        onComplete: () => console.log("[GSAP] loading__item animation COMPLETE"),
      });

      gsap.set(fadeInItems, { opacity: 0 });
      gsap.to(fadeInItems, {
        duration: 0.8,
        ease: "none",
        opacity: 1,
        delay: 1.2,
        onComplete: () => console.log("[GSAP] loading__fade animation COMPLETE"),
      });
    } else {
      console.warn("[GSAP] NO .loading-wrap found in DOM!");
    }

    return () => {
      triggers.forEach((st) => st.kill());
      ScrollTrigger.clearScrollMemory();
    };
  }, [pathname]);
}
