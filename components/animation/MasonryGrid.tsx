"use client";

import { useEffect, useRef } from "react";

export default function MasonryGrid({
  children,
  className = "",
  itemSelector = ".gallery__item",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  itemSelector?: string;
}) {
  const isotopContainer = useRef<HTMLDivElement | null>(null);
  const isotopeRef = useRef<any>(null);

  useEffect(() => {
    let destroyed = false;

    const timeoutId = setTimeout(async () => {
      if (destroyed || !isotopContainer.current) return;

      const Isotope = (await import("isotope-layout")).default;
      const imagesloaded = (await import("imagesloaded")).default;

      if (!isotopContainer.current) return;

      const isotope = new Isotope(isotopContainer.current, {
        itemSelector: itemSelector,
        layoutMode: "masonry",
      });
      isotopeRef.current = isotope;

      const imgLoader = imagesloaded(isotopContainer.current);
      const onProgress = () => {
        if (!destroyed) {
          isotope.layout?.();
        }
      };
      imgLoader.on("progress", onProgress);
    }, 100);

    return () => {
      destroyed = true;
      if (isotopeRef.current) {
        isotopeRef.current.destroy();
        isotopeRef.current = null;
      }
    };
  }, [itemSelector]);

  return (
    <div className={className} ref={isotopContainer} {...rest}>
      {children}
    </div>
  );
}
