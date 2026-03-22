"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";

export default function RouteScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetScroll = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    requestAnimationFrame(() => {
      resetScroll();
      setTimeout(resetScroll, 0);
      setTimeout(resetScroll, 50);
      setTimeout(resetScroll, 150);
    });

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, [lenis, pathname, searchParams]);

  return null;
}
