"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnimatedButton from "../animation/AnimatedButton";
import { usePathname } from "next/navigation";
import ThemeSwitcherButton from "./ColorSwitcher";

export default function Header1() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHidden(currentScrollPos > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header" className={`mxd-header ${isHidden ? "is-hidden" : ""}`}>
      {/* header logo */}
      <div className="mxd-header__logo loading__fade">
        <Link href={`/`} className="mxd-logo">
          {/* logo icon */}
          <svg
            className="mxd-logo__image"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="66"
            height="66"
            viewBox="0 0 140 140"
            enableBackground="new 0 0 140 140"
            xmlSpace="preserve"
          >
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html:
                  "\n              .mxd-logo__bg {\n                fill: #000000;\n              }\n              .mxd-logo__letters {\n                fill: #ffffff;\n              }\n              html[color-scheme=\"dark\"] .mxd-logo__bg {\n                fill: #ffffff;\n                stroke: #000000;\n                stroke-width: 3px;\n              }\n              html[color-scheme=\"dark\"] .mxd-logo__letters {\n                fill: #000000;\n              }\n            ",
              }}
            />
            <path
              className="mxd-logo__bg"
              d="M70,10 C95,8 120,25 128,50 C135,75 120,105 95,125 C70,138 40,130 20,105 C5,80 8,50 25,30 C40,15 55,12 70,10 Z"
            />
            <g className="mxd-logo__letters">
              {/* V */}
              <rect x="38" y="45" width="8" height="40"/>
              <rect x="46" y="60" width="8" height="25"/>
              <rect x="54" y="45" width="8" height="40"/>
              {/* S */}
              <rect x="75" y="45" width="20" height="8"/>
              <rect x="75" y="53" width="8" height="16"/>
              <rect x="75" y="69" width="20" height="8"/>
              <rect x="87" y="77" width="8" height="16"/>
              <rect x="75" y="93" width="20" height="8"/>
            </g>
          </svg>
          {/* logo text */}
          <span className="mxd-logo__text">
            visual
            <br />
            studio
          </span>
        </Link>
      </div>
      {/* header controls */}
      <div className="mxd-header__controls loading__fade">
        <ThemeSwitcherButton />

        <a
  href="/contact"
  className="btn btn-anim btn-default btn-mobile-icon btn-outline slide-right"
  onClick={(e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.href = '/contact';
    }, 300);
  }}
>
  Say Hello
  <i className="ph-bold ph-arrow-up-right" />
</a>
      </div>
    </header>
  );
}
