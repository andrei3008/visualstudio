import Image from "next/image";

import RevealText from "../animation/RevealText";

export default function Features2() {
  return (
    <div className="mxd-section">
      <div className="mxd-container no-padding-container">
        {/* Block - Features Promo Start */}
        <div className="mxd-block">
          <div className="mxd-features-promo">
            <div className="container-fluid p-0">
              <div className="row g-0">
                {/* left side */}
                <div className="col-12 col-xl-5 mxd-features-promo__item">
                  <div className="mxd-container grid-container no-padding-right">
                    <div className="mxd-block mxd-grid-item no-margin">
                      <div className="mxd-features-promo__content">
                        <RevealText
                          as="h2"
                          className="mxd-pinned__title centered-mobile h2-small anim-uni-in-up reveal-type"
                        >
                          Componente bune, gata de reutilizare
                        </RevealText>
                        <div className="mxd-pinned__tags centered-mobile anim-uni-in-up">
                          <span className="tag tag-default tag-outline">
                            Animații
                          </span>
                          <span className="tag tag-default tag-outline">
                            Componente
                          </span>
                          <span className="tag tag-default tag-outline">
                            Secțiuni
                          </span>
                        </div>
                        <p className="anim-uni-in-up centered-mobile">
                          Zona de preview grupează elementele care pot fi
                          refolosite ușor: secțiuni animate, layout-uri, carduri
                          și componente de prezentare pentru paginile site-ului.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* right side (media) */}
                <div className="col-12 col-xl-7 mxd-features-promo__item">
                  <div className="mxd-features-promo__image anim-uni-in-up">
                    <Image
                      alt="Preview componente"
                      width={1614}
                      height={800}
                      src="/img/demo/01_fea-img.webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Features Promo End */}
      </div>
    </div>
  );
}
