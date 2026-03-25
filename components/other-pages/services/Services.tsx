"use client";
import Image from "next/image";
import { useState } from "react";
import services from "@/data/services-other-pages.json";
import { Service2 } from "@/types/services";

type ServicesProps = {
  items?: Service2[];
  introTitle?: string;
  introText?: string;
};

type HoverState = {
  activeIndex: number | null;
  x: number;
};
export default function Services({
  items,
  introTitle,
  introText,
}: ServicesProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    activeIndex: null,
    x: 0,
  });
  const serviceItems = items ?? services;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, index: number) => {
    setHoverState({
      activeIndex: index,
      x: e.clientX,
    });
  };

  const handleMouseLeave = () => {
    setHoverState((pre) => {
      return {
        activeIndex: null,
        x: pre.x,
      };
    });
  };
  return (
    <div className="mxd-section overflow-hidden padding-default">
      <div className="mxd-container grid-container">
        {introTitle || introText ? (
          <div className="mxd-block">
            <div className="mxd-section-title">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                    <div className="mxd-section-title__hrtitle anim-uni-in-up">
                      {introTitle ? <h2>{introTitle}</h2> : null}
                    </div>
                  </div>
                  <div className="col-12 col-xl-1 mxd-grid-item no-margin"></div>
                  <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                    <div className="mxd-section-title__hrdescr anim-uni-in-up">
                      {introText ? (
                        <p className="t-large t-bright">{introText}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* Block - Services List Start */}
        <div className="mxd-block">
          <div className="mxd-services-list grid-top hover-reveal">
            {serviceItems.map((s: Service2, idx: number) => (
              <div
                key={idx}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={handleMouseLeave}
                className="mxd-services-list__item hover-reveal__item"
              >
                <div className="mxd-services-list__border anim-uni-in-up" />
                <div
                  style={{
                    opacity: hoverState.activeIndex === idx ? 1 : 0,
                    transform: "translate(-80%, -50%)",
                    left: hoverState.x,

                    pointerEvents: "none",
                    transition: "opacity 0.3s ease",
                  }}
                  className="hover-reveal__content hover-reveal-360x440"
                >
                  <Image
                    style={{
                      transform:
                        hoverState.activeIndex === idx
                          ? "scale(1,1)"
                          : "scale(1,1.4)",
                      transition: "transform 0.3s ease",
                    }}
                    className="hover-reveal__image"
                    alt=""
                    src={s.image}
                    width={360}
                    height={440}
                  />
                </div>
                <div className="mxd-services-list__inner">
                  <div className="container-fluid px-0">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-7 mxd-grid-item no-margin">
                        <div className="mxd-services-list__title anim-uni-in-up">
                          <p>{s.title}</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                        <div className="mxd-services-list__descr anim-uni-in-up">
                          <p>{s.desc}</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                        <div className="mxd-services-list__tagslist">
                          <ul>
                            {s.tags.map((tag, tIdx) => (
                              <li key={tIdx} className="anim-uni-in-up">
                                <p>{tag}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mxd-services-list__border anim-uni-in-up" />
              </div>
            ))}
          </div>
        </div>
        {/* Block - Services List End */}
      </div>
    </div>
  );
}
