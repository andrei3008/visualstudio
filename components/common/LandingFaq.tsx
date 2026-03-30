"use client";

import { useEffect, useRef, useState } from "react";
import { Faq } from "@/types/faq";

type LandingFaqProps = {
  items: Faq[];
};

export default function LandingFaq({ items }: LandingFaqProps) {
  const faqContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [faqContentHeights, setFaqContentHeights] = useState<number[]>([]);
  const [activeFaq, setActiveFaq] = useState(-1);

  useEffect(() => {
    const heights = faqContentRefs.current.map((el) =>
      el ? el.scrollHeight : 0
    );
    setFaqContentHeights(heights);
  }, []);

  return (
    <div className="mxd-section padding-default">
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                <div className="mxd-block__name name-inner-headline">
                  <p className="mxd-point-subtitle">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20px"
                      height="20px"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill="currentColor"
                        d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2 c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4 c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2 c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6 c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4 c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6 c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"
                      />
                    </svg>
                    <span>Întrebări frecvente</span>
                  </p>
                </div>
              </div>
              <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  <div className="mxd-block__inner-headline" style={{ marginBottom: "2rem" }}>
                    <h2 className="inner-headline__title headline-img-before headline-img-02">
                      Întrebări frecvente
                    </h2>
                  </div>
                  <div className="mxd-accordion">
                    {items.map((f: Faq, idx: number) => (
                      <div key={idx} className="mxd-accordion__item">
                        <div className="mxd-accordion__divider anim-uni-in-up" />
                        <div
                          onClick={() =>
                            setActiveFaq((prev) => (prev === idx ? -1 : idx))
                          }
                          className="mxd-accordion__title anim-uni-in-up"
                          role="button"
                          tabIndex={0}
                          aria-expanded={activeFaq === idx}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setActiveFaq((prev) => (prev === idx ? -1 : idx));
                            }
                          }}
                        >
                          <h6>{f.question}</h6>
                          <div
                            className={`mxd-accordion__arrow ${
                              idx === activeFaq ? "accordion-rotate" : ""
                            }`}
                          >
                            <i className="ph ph-plus" />
                          </div>
                        </div>
                        <div
                          className="mxd-accordion__content"
                          style={{
                            display: "block",
                            height:
                              activeFaq === idx
                                ? `calc(${faqContentHeights[idx]}px + 3.4rem)`
                                : 0,
                            paddingBottom: activeFaq === idx ? "3.4rem" : 0,
                            transition: "all 0.3s ease",
                          }}
                          ref={(el) => {
                            faqContentRefs.current[idx] = el;
                          }}
                        >
                          <p className="mxd-accordion__text">{f.answer}</p>
                        </div>
                        <div className="mxd-accordion__divider anim-uni-in-up" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
