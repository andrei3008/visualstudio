"use client";
import ReactLenis, { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisSmoothScroll() {
  const lenis = useLenis();
  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!lenis) return;

    // Create scrollerProxy for better ScrollTrigger integration
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      scrollLeft(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // Ensure scrollbar is visible and working
    document.body.style.overflow = "auto";

    // Update ScrollTrigger when Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);

    // Debounced refresh - prevents recursive refresh loop
    const debouncedRefresh = () => {
      if (refreshTimeout.current) return; // Already scheduled, skip
      refreshTimeout.current = setTimeout(() => {
        refreshTimeout.current = null;
        ScrollTrigger.refresh();
      }, 100);
    };

    // Handle window resize with debounce
    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    // Initial refresh after mount
    debouncedRefresh();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      ScrollTrigger.scrollerProxy(document.body, {});
      document.body.style.overflow = "";
    };
  }, [lenis]);

  // return null for ios
  if (
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  ) {
    return null;
  }
  return <ReactLenis root />;
}
