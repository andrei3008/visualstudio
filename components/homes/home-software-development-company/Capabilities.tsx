"use client";
import capabilities from "@/data/capabilities.json";
import RevealText from "@/components/animation/RevealText";
import AnimatedButton from "@/components/animation/AnimatedButton";
import { compatibility } from "@/types/capabilities";

export default function Capabilities() {
  return (
    <div className="mxd-section overflow-hidden padding-grid-pre-pinned">
      <div className="mxd-container grid-container">
        {/* Block - Section Title Start */}
        <div className="mxd-block">
          <div className="mxd-section-title">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <RevealText as="h2" className="reveal-type">
                      Servicii care mută proiectul din idee în produs lansat
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin"></div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrcontrols anim-uni-in-up">
                    <AnimatedButton
                      text="Vezi toate serviciile"
                      className="btn btn-anim btn-default btn-outline slide-right-up"
                      href={`/servicii`}
                    >
                      <i className="ph-bold ph-arrow-up-right" />
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Section Title End */}
        {/* Block - Our Capabilities List Start */}
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-12 mxd-grid-item no-margin">
                <div className="mxd-cpb-list">
                  {capabilities.map((item: compatibility, idx: number) => (
                    <div
                      className="mxd-cpb-list__item"
                      key={idx}
                    >
                      <div className="mxd-cpb-list__divider anim-uni-in-up" />
                      <div className="mxd-cpb-list__content anim-uni-in-up">
                        <h6 className="mxd-cpb-list__title">{item.title}</h6>
                        <div className="mxd-cpb-list__num">
                          <span>{item.num}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Our Capabilities List Start */}
      </div>
    </div>
  );
}
