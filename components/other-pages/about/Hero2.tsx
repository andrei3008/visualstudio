import BackgroundParallax from "@/components/animation/BackgroundParallax";
import AnimatedButton from "@/components/animation/AnimatedButton";
import RevealText from "@/components/animation/RevealText";

export default function Hero2() {
  return (
    <>
      {/* Section - Inner Page Headline Start */}
      <div className="mxd-section mxd-section-inner-headline padding-headline-pre-block">
        <div className="mxd-container grid-container">
          {/* Block - Inner Page Headline Start */}
          <div className="mxd-block loading-wrap">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {/* Inner Headline Name Start */}
                <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                  <div className="mxd-block__name name-inner-headline loading__item">
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
                          d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2
                    c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4
                    c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2
                    c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6
                    c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4
                    c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6
                    c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"
                        />
                      </svg>
                      <span>Despre noi</span>
                    </p>
                  </div>
                </div>
                {/* Inner Headline Name Start */}
                {/* Inner Headline Content Start */}
                <div className="col-12 col-xl-10 mxd-grid-item no-margin">
                  <div className="mxd-block__content">
                    <div className="mxd-block__inner-headline">
                      <h1 className="inner-headline__title headline-img-before headline-img-06 loading__item">
                        Construim produse digitale care ajută business-urile să crească
                      </h1>
                      <p className="inner-headline__text t-large t-bright loading__item">
                        Combinăm strategie, design, dezvoltare și automatizare
                        pentru a livra site-uri, aplicații și sisteme care arată
                        bine, se mișcă rapid și susțin vânzări reale.
                      </p>
                      <div
                        className="loading__item"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "12px",
                          marginTop: "24px",
                        }}
                      >
                        <AnimatedButton
                          text="Cere o ofertă"
                          className="btn btn-anim btn-default btn-outline slide-right-up"
                          href="/contact"
                        >
                          <i className="ph-bold ph-arrow-up-right" />
                        </AnimatedButton>
                        <AnimatedButton
                          text="Vezi serviciile"
                          className="btn btn-anim btn-default btn-outline slide-right-up"
                          href="/servicii"
                        >
                          <i className="ph-bold ph-arrow-up-right" />
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Inner Headline Content End */}
              </div>
            </div>
          </div>
          {/* Block - Inner Page Headline End */}
        </div>
      </div>
      {/* Section - Inner Page Headline End */}
      {/* Section - Culture & Values Start */}
      <div className="mxd-section padding-grid-pre-mtext">
        <div className="mxd-container grid-container">
          {/* Block - Culture & Values Start */}
          <div className="mxd-block">
            <div className="mxd-values loading__fade">
              <div className="container-fluid p-0">
                <div className="row g-0 d-flex">
                  <div className="col-12 col-xl-2 mxd-values__item order-2 order-xl-1 mxd-grid-item no-margin animate-card-2">
                    <div className="mxd-values__lists fullheight-xl">
                      <div className="container-fluid p-0 fullheight-xl">
                        <div className="row g-0 fullheight-xl d-xl-flex flex-xl-column justify-content-xl-between">
                          <div className="col-12 col-sm-6 col-xl-12 mxd-values__lists-item">
                            <ul>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  Next.js
                                </p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  React
                                </p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  Automatizări AI
                                </p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  CRM & ERP
                                </p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  E-commerce
                                </p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  DevOps & Cloud
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="col-12 col-sm-6 col-xl-12 mxd-values__lists-item">
                            <ul>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  Strategie digitală
                                </p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">UI/UX</p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  Arhitectură scalabilă
                                </p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  Performanță tehnică
                                </p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">
                                  Mentenanță
                                </p>
                              </li>
                              <li>
                                <p className="t-small anim-uni-in-up">Creștere continuă</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-4 mxd-values__item order-1 order-xl-2 mxd-grid-item no-margin animate-card-2">
                    <BackgroundParallax className="mxd-values__image image-large-desktop image-values-1 parallax-img-small" />
                  </div>
                  <div className="col-12 col-xl-6 mxd-values__item order-3 order-xl-3 mobile-reverse mxd-grid-item no-margin animate-card-2">
                    <BackgroundParallax className="mxd-values__image image-small-desktop image-values-2 parallax-img-small" />
                    <div className="mxd-values__descr has-top-list anim-uni-in-up">
                      <RevealText
                        as="p"
                        className="t-bright t-large reveal-type"
                      >
                        Suntem un partener tehnic pentru companii care vor mai
                        mult decât un site frumos. Gândim procese, construim
                        produse digitale solide și optimizăm fiecare detaliu,
                        astfel încât tehnologia să susțină obiectivele reale ale
                        afacerii.
                      </RevealText>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Culture & Values Start */}
        </div>
      </div>
      {/* Section - Culture & Values End */}
    </>
  );
}
