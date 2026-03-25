"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

// ✅ Only allow HTML tags here, not SVG:
type HtmlTag = keyof HTMLElementTagNameMap; // 'div' | 'span' | 'h1' | 'a' | ...

type RevealTextProps<T extends HtmlTag = "span"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  stagger?: number;
  opacityFrom?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function RevealText<T extends HtmlTag = "span">({
  as,
  className,
  children,
  start = "top 80%",
  end = "top 20%",
  scrub = true,
  stagger = 0.1,
  opacityFrom = 0.2,
  ...rest
}: RevealTextProps<T>) {
  const Tag = (as || "span") as unknown as React.ElementType;
  const elRef = useRef<HTMLElement | null>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const createAnimation = () => {
      const element = elRef.current;
      if (!element) return;

      // Revert previous split if exists
      splitRef.current?.revert();

      const split = new SplitType(element, { types: "words,chars" });
      splitRef.current = split;

      const anim = gsap.from(split.chars, {
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
          toggleActions: "play none none reverse",
        },
        opacity: opacityFrom,
        duration: 1.2,
        stagger,
        ease: "power2.out",
      });

      animRef.current = anim;
    };
    // Small delay to ensure DOM is ready
    timeoutId = setTimeout(() => {
      createAnimation();
    }, 100);
    const triggerElement = elRef.current;

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Clean up animation
      animRef.current?.kill();

      // Clean up SplitType
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }

      // Clean up ScrollTrigger instances for this element
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === triggerElement)
        .forEach((t) => t.kill());
    };
  }, [start, end, scrub, stagger, opacityFrom]);

  return (
    <Tag
      ref={elRef}
      className={["reveal-type", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
