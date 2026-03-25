import Image from "next/image";

import RevealText from "../animation/RevealText";

export default function Features() {
  return (
    <div className="mxd-section">
      <div className="mxd-container no-padding-container">
        {/* Block - Responsive Promo Start */}
        <div className="mxd-block">
          <div className="mxd-resp-promo">
            <div className="container-fluid p-0">
              <div className="row g-0">
                {/* left side */}
                <div className="col-12 col-xl-6 mxd-resp-promo__item">
                  <div className="mxd-container grid-container">
                    <div className="mxd-block mxd-grid-item no-margin">
                      <div className="mxd-resp-promo__content">
                        <div className="mxd-resp-promo__manifest anim-uni-in-up">
                          <RevealText as="p" className="reveal-type">
                            Layout-urile din proiect sunt gândite să rămână
                            stabile și lizibile pe orice dispozitiv, de la mobil
                            până la desktop.
                          </RevealText>
                        </div>
                        <div className="mxd-demo-cards__icons justify-start-desktop">
                          <div className="demo-icons__item animate-card-4">
                            <div className="demo-icons__icon transparent">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="0 0 56 56"
                              >
                                <path d="M54.8,28c0,10.6-2.8,26.8-26.8,26.8S1.2,38.6,1.2,28,4,1.2,28,1.2s26.8,16.2,26.8,26.8Z" />
                              </svg>
                              <i className="ph ph-device-mobile-camera" />
                            </div>
                            <p className="demo-icons__caption">Telefon</p>
                          </div>
                          <div className="demo-icons__item animate-card-4">
                            <div className="demo-icons__icon transparent">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="0 0 56 56"
                              >
                                <path d="M54.8,28c0,10.6-2.8,26.8-26.8,26.8S1.2,38.6,1.2,28,4,1.2,28,1.2s26.8,16.2,26.8,26.8Z" />
                              </svg>
                              <i className="ph ph-device-tablet-camera" />
                            </div>
                            <p className="demo-icons__caption">Tabletă</p>
                          </div>
                          <div className="demo-icons__item animate-card-4">
                            <div className="demo-icons__icon transparent">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="0 0 56 56"
                              >
                                <path d="M54.8,28c0,10.6-2.8,26.8-26.8,26.8S1.2,38.6,1.2,28,4,1.2,28,1.2s26.8,16.2,26.8,26.8Z" />
                              </svg>
                              <i className="ph ph-laptop" />
                            </div>
                            <p className="demo-icons__caption">Laptop</p>
                          </div>
                          <div className="demo-icons__item animate-card-4">
                            <div className="demo-icons__icon transparent">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="0 0 56 56"
                              >
                                <path d="M54.8,28c0,10.6-2.8,26.8-26.8,26.8S1.2,38.6,1.2,28,4,1.2,28,1.2s26.8,16.2,26.8,26.8Z" />
                              </svg>
                              <i className="ph ph-desktop" />
                            </div>
                            <p className="demo-icons__caption">Desktop</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* right side (media) */}
                <div className="col-12 col-xl-6 mxd-resp-promo__item">
                  <div className="mxd-resp-promo__image anim-uni-in-up">
                    <Image
                      alt="Preview responsive"
                      width={1200}
                      height={767}
                      src="/img/demo/01_resp-img.webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Responsive Promo End */}
      </div>
    </div>
  );
}
