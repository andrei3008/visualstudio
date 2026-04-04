"use client";
import AnimateRotation from "@/components/animation/AnimateRotation";
import Image from "next/image";
import { useState } from "react";

interface ParallaxDividerProps {
  scrollToContact?: boolean;
}

export default function ParallaxDivider({
  scrollToContact = false,
}: ParallaxDividerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (scrollToContact) {
      const contactSection = document.querySelector("#contact-form");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="mxd-section padding-pre-title">
        <div className="mxd-container">
          <div className="mxd-divider">
            <div className="mxd-divider__css-bg" />
            <div className="mxd-divider__trigger">
              <a
                onClick={handleClick}
                href="#contact-form"
                id="showreel-trigger"
                className="btn-rotating btn-rotating-blur-outline showreel-trigger"
              >
                {/* SVG rotating text */}
                <AnimateRotation
                  as="svg"
                  version="1.1"
                  id="scrollDown"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 160 160"
                  enableBackground={"new 0 0 160 160"}
                  xmlSpace="preserve"
                  className="btn-rotating__text animate-rotation"
                  value={360}
                >
                  <defs>
                    <path
                      id="textPath"
                      d="M149.7,80c0,38.5-31.2,69.7-69.7,69.7S10.3,118.5,10.3,80S41.5,10.3,80,10.3S149.7,41.5,149.7,80z"
                    />
                  </defs>
                  <g>
                    <use xlinkHref="#textPath" fill="none" />
                    <text>
                      <textPath xlinkHref="#textPath">
                        {scrollToContact
                          ? "Hai să vorbim * Hai să vorbim * Hai să vorbim * "
                          : "Play showreel * Play showreel * Play showreel * "}
                      </textPath>
                    </text>
                  </g>
                </AnimateRotation>
                {/* image or play icon */}
                {scrollToContact ? (
                  <div
                    className="btn-rotating__play"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-text, #fff)",
                    }}
                  >
                    <svg
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width={60}
                      height={60}
                    >
                      <polygon
                        points="28,18 62,40 28,62"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ) : (
                  <Image
                    className="btn-rotating__image"
                    alt="Object"
                    src="/img/icons/300x300_obj-btn-02.webp"
                    width={300}
                    height={300}
                  />
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
