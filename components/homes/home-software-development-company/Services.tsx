import Image from "next/image";

export default function Services() {
  return (
    <div className="mxd-section overflow-hidden padding-pre-title">
      <div className="mxd-container grid-container">
        {/* Block - Services Cards #02 Start */}
        <div className="mxd-block">
          <div className="mxd-services-cards-s">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {/* item */}
                <div className="col-12 col-xl-8 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-right">
                  <div className="mxd-services-cards-s__inner justify-between bg-base-tint radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">
                        Site-uri &
                        <br />
                        eCommerce
                      </h3>
                    </div>
                    <div className="mxd-services-cards-s__info width-50">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Next.js/Tailwind
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Shopify/Woo
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          SEO & Performanță
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Mobile-First
                        </span>
                      </div>
                      <p className="anim-uni-in-up">
                        Site-uri moderne, magazine online rapide și sigure – integrări cu e-Factura, plăți și automatizări. Crește vânzările și vizibilitatea online.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-right">
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/vector-7.png"
                        width={910}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-left">
                  <div className="mxd-services-cards-s__inner justify-end bg-accent radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="opposite anim-uni-in-up">Digitalizare
                        <br />
                        PNRR
                      </h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          e-Factura
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          ANAF Integrări
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          CRM Simplu
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        Implementăm rapid soluțiile eligibile PNRR – site, e-Factura, automatizări de bază. Ajutăm IMM-urile să nu piardă grantul și să atingă minim 6-8 criterii DESI.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-top-right" style={{ marginTop: '100px', marginLeft: '-40px' }}>
                      <Image
                        className="mxd-move"
                        alt="Illustration"
                        src="/img/illustrations/vector-2.png"
                        width={1200}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-right">
                  <div className="mxd-services-cards-s__inner bg-additional radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">Software Custom &
                        <br />
                        Dezvoltare
                      </h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Full-Stack
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Microservicii
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Web/Mobile Apps
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Backend Robust
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Backend
                        </span>
                      </div>
                      <p className="t-bright anim-uni-in-up">
                        Aplicații web/mobile la comandă, sisteme de gestiune (ERP light, CRM custom, tool-uri interne) – adaptate perfect business-ului tău.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-bottom" style={{ bottom: '-60px' }}>
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/vector-9.png"
                        width={1200}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in">
                  <div className="mxd-services-cards-s__inner bg-base-opp radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="opposite anim-uni-in-up">DevOps &
                        <br />
                        Cloud
                      </h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          AWS/Azure
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          CI/CD Pipelines
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Optimizare Costuri
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Server Mgmt
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        Migrăm și optimizăm infrastructura în cloud, reducem costurile cu 30-50%, asigurăm uptime și securitate – inclusiv setup WSL/hybrid.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-bottom image-bottom-2" style={{ bottom: '-60px' }}>
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/vector-4.png"
                        width={891}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-left">
                  <div className="mxd-services-cards-s__inner justify-end bg-base-tint radius-l padding-4">
                    <div className="mxd-services-cards-s__title">
                      <h3 className="anim-uni-in-up">Securitate &
                        <br />
                        Mentenanță
                      </h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Cybersecurity
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Backup & Recovery
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Abonament Lunar
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Suport 24/7
                        </span>
                      </div>
                      <p className="anim-uni-in-up">
                        Protecție date, monitorizare servere, backup automat și mentenanță lunară – ca să nu ai downtime sau atacuri.
                        <br />
                        Abonamente de la 400 €/lună.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-top" style={{ marginTop: '60px' }}>
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/vector-5.png"
                        width={1200}
                        height={996}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Services Cards #02 End */}
      </div>
    </div>
  );
}
