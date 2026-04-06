"use client";

import { useEffect, useRef, useState } from "react";

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on mobile
    if (window.innerWidth >= 768) return;

    const hero = document.querySelector<HTMLElement>(
      ".mxd-section-inner-headline, .mxd-hero-03, [class*='mxd-section']"
    );
    const contactForm = document.querySelector<HTMLElement>("#contact-form");

    if (!hero) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // When hero scrolls out of view, show the bar
        if (!entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0 }
    );

    heroObserver.observe(hero);

    const contactObserver: IntersectionObserver | null = contactForm
      ? new IntersectionObserver(
          ([entry]) => {
            // When contact form comes into view, hide the bar
            if (entry.isIntersecting) {
              setVisible(false);
            }
          },
          { threshold: 0, rootMargin: "0px 0px -10% 0px" }
        )
      : null;

    if (contactObserver && contactForm) {
      contactObserver.observe(contactForm);
    }

    return () => {
      heroObserver.disconnect();
      if (contactObserver) contactObserver.disconnect();
    };
  }, []);

  const handleClick = () => {
    const el = document.querySelector("#contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={barRef}
      className={`vsc-mobile-sticky-cta${visible ? " vsc-mobile-sticky-cta--visible" : ""}`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        className="vsc-mobile-sticky-cta__btn"
        onClick={handleClick}
      >
        <i className="ph-bold ph-chat-circle-dots" />
        Discută cu noi
      </button>
    </div>
  );
}
