"use client";
import servicesData from "@/data/about-services.json";
import RevealText from "@/components/animation/RevealText";
import AnimatedButton from "@/components/animation/AnimatedButton";

export default function Awards() {
  return (
    <div className="mxd-section overflow-hidden padding-default mobile-title">
      <div className="mxd-container grid-container">
        {/* Block - Section Title Start */}
        <div className="mxd-block">
          <div className="mxd-section-title">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle anim-uni-in-up">
                    <RevealText as="h2" className="reveal-type">
                      Servicii
                      <br />
                      principale
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin" />
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrcontrols pre-title anim-uni-in-up">
                    <AnimatedButton
                      text="Vezi serviciile"
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
        {/* Block - Approach and Philosophy List Start */}
        <div className="mxd-block">
          <div className="mxd-awards-list hover-reveal">
            {servicesData.map((item, idx) => (
              <a
                className="mxd-awards-list__item"
                href={item.url}
                key={idx}
              >
                <div className="mxd-awards-list__border anim-uni-in-up" />
                <div className="mxd-awards-list__inner">
                  <div className="container-fluid px-0">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                        <div className="mxd-awards-list__title anim-uni-in-up">
                          <div className="mxd-awards-list__icon">
                            <i className="ph ph-arrow-right" />
                          </div>
                          <p>{item.title}</p>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-item no-margin">
                        <div className="mxd-awards-list__tagslist">
                          <ul>
                            {item.tags.map((tag, tagIdx) => (
                              <li className="anim-uni-in-up" key={tagIdx}>
                                <p className="t-small">{tag}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-item no-margin">
                        <div className="mxd-awards-list__date anim-uni-in-up">
                          <p className="t-small">{item.meta}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mxd-awards-list__border anim-uni-in-up" />
              </a>
            ))}
          </div>
        </div>
        {/* Block - Approach and Philosophy List Start */}
      </div>
    </div>
  );
}
