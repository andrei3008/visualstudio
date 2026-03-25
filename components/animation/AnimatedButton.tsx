"use client";

import {
  ElementType,
  ComponentPropsWithoutRef,
  useMemo,
  useState,
} from "react";
import Link from "next/link";

type OwnProps = {
  text: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: string;
};

type PolyProps<As extends ElementType> = OwnProps &
  Omit<ComponentPropsWithoutRef<As>, keyof OwnProps | "className"> & {
    as?: As;
  };

const splitToLetters = (s: string) =>
  [...s].map((ch, i) => (
    <span key={i} className="btn-anim__letter">
      {ch.trim() === "" ? "\u00A0" : ch}
    </span>
  ));

export default function AnimatedButton<As extends ElementType = "div">(
  props: PolyProps<As> & { position?: "previous" | "next" }
) {
  const {
    as,
    className = "",
    text,
    children,
    position = "next",
    href,
    target,
    ...rest
  } = props as PolyProps<ElementType>;

  // Determine the tag to use
  // If href is provided and it's internal (starts with /), use Link
  // If href is provided and external or target="_blank", use 'a'
  // Otherwise use the specified 'as' or default to 'div'
  let Tag: ElementType;
  let isInternalLink = false;

  if (href) {
    if (href.startsWith("/") && !target) {
      Tag = Link;
      isInternalLink = true;
    } else {
      Tag = "a";
    }
  } else {
    Tag = (as || "div") as ElementType;
  }

  const [play, setPlay] = useState(false);
  const letters = useMemo(() => splitToLetters(text), [text]);

  // Build props based on tag type
  const tagProps = {
    className: `btn-anim ${className}`,
    "aria-label": text,
    ...(href && !isInternalLink ? { href, target } : {}),
    ...(isInternalLink ? { href } : {}),
    ...rest,
  };

  const animatedTagProps = {
    ...tagProps,
    className: `btn-anim ${className} ${play ? "play" : ""}`,
    onMouseEnter: () => setPlay(true),
    onAnimationEnd: () => setPlay(false),
    onMouseLeave: () => setPlay(false),
  };

  return (
    <>
      <Tag {...animatedTagProps}>
        {position === "previous" ? <> {children}</> : null}
        <span className="btn-caption">
          <div className="btn-anim__block">{letters}</div>
          <div className="btn-anim__block" aria-hidden="true">
            {letters}
          </div>
        </span>

        {position === "next" ? <> {children}</> : null}
      </Tag>
    </>
  );
}
