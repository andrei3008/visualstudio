import { approach1 } from "@/data/approach.json";
import RevealText from "../animation/RevealText";
import AnimatedButton from "../animation/AnimatedButton";

const approachIcons = [
  (
    <svg
      key="approach-icon-1"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="12" y="12" width="40" height="40" rx="12" stroke="currentColor" strokeWidth="2.5" />
      <path d="M23 33l6 6 12-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg
      key="approach-icon-2"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M32 10l4.8 9.9L48 24.7l-8 7.8 1.9 11L32 38.1l-9.9 5.4 1.9-11-8-7.8 11.2-4.8L32 10z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg
      key="approach-icon-3"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="10" y="14" width="44" height="30" rx="8" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 50h16M32 44v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 26h20M22 32h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg
      key="approach-icon-4"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="10" y="18" width="16" height="28" rx="6" stroke="currentColor" strokeWidth="2.5" />
      <rect x="38" y="18" width="16" height="28" rx="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M26 32h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg
      key="approach-icon-5"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M32 50s-14-8.4-14-20a8 8 0 0114-5 8 8 0 0114 5c0 11.6-14 20-14 20z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 22v14M25 29h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
];

export default function Approch() {
  return (
    <div className="mxd-section padding-pre-grid mobile-grid-s">
      <div className="mxd-container grid-container">
        {/* Block - Section Title Start */}
        <div className="mxd-block">
          <div className="mxd-section-title">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle anim-uni-in-up">
                    <RevealText as="h2" className="reveal-type">
                      Cum abordăm fiecare proiect
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p className="anim-uni-in-up">Strategie</p>
                    <p className="anim-uni-in-up">Execuție</p>
                    <p className="anim-uni-in-up">Infrastructură</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrcontrols anim-uni-in-up">
                    <AnimatedButton
                      text="Discută cu noi"
                      className="btn btn-anim btn-default btn-outline slide-right-up"
                      href={`/contact`}
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
          <div className="mxd-approach-list">
            {approach1.map((item, idx) => (
              <div className="mxd-approach-list__item" key={idx}>
                <div className="mxd-approach-list__border anim-uni-in-up" />
                <div className="mxd-approach-list__inner">
                  <div className="container-fluid px-0">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                        <div
                          className="mxd-approach-list__image anim-uni-in-up"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            minHeight: "100%",
                          }}
                        >
                          <div
                            style={{
                              width: 210,
                              height: 210,
                              display: "grid",
                              placeItems: "center",
                              color: "currentColor",
                            }}
                          >
                            <div style={{ width: 84, height: 84 }}>
                              {approachIcons[idx] || approachIcons[0]}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                        <div className="mxd-approach-list__title anim-uni-in-up">
                          <h6>{item.title}</h6>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                        <div className="mxd-approach-list__descr anim-uni-in-up">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mxd-approach-list__border anim-uni-in-up" />
              </div>
            ))}
          </div>
        </div>
        {/* Block - Approach and Philosophy List Start */}
      </div>
    </div>
  );
}
