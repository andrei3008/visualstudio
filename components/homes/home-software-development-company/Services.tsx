import AnimatedButton from "@/components/animation/AnimatedButton";
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
                        Site-uri de prezentare
                        <br />
                        și Magazine Online
                      </h3>
                    </div>
                    <div className="mxd-services-cards-s__info width-50 vsc-services-card__info-main">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Generare lead-uri
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Pagini pentru reclame
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          SEO & Performanță
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Mobile-first
                        </span>
                      </div>
                      <p className="anim-uni-in-up">
                        Facem site-uri care arată bine, se încarcă repede și au
                        structură clară pentru cereri de ofertă, apeluri și
                        conversii din reclame Meta sau Google.
                      </p>
                      <div
                        className="anim-uni-in-up"
                        style={{ marginTop: "18px" }}
                      >
                        <AnimatedButton
                          text="Vezi oferta"
                          className="btn btn-anim btn-default btn-outline slide-right-up"
                          href="/site-uri-prezentare-magazine-online"
                        >
                          <i className="ph-bold ph-arrow-up-right" />
                        </AnimatedButton>
                      </div>
                    </div>
                    <div className="mxd-services-cards-s__image image-right">
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/vector-15.webp"
                        width={910}
                        height={1200}
                      />
                    </div>
                  </div>
                </div>
                {/* item */}
                <div className="col-12 col-xl-4 mxd-services-cards-s__item mxd-grid-item anim-uni-scale-in-left">
                  <div className="mxd-services-cards-s__inner justify-end bg-accent radius-l padding-4">
                    <div
                      className="anim-uni-in-up vsc-services-card__cta-top-left"
                    >
                      <AnimatedButton
                        text="Vezi oferta"
                        className="btn btn-anim btn-default slide-right-up vsc-services-card__button-light"
                        href="/automatizari-firme"
                      >
                          <i className="ph-bold ph-arrow-up-right" />
                      </AnimatedButton>
                    </div>
                    <div className="mxd-services-cards-s__title">
                      <h3 className="opposite anim-uni-in-up">Automatizări</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Email & formulare
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          WhatsApp & CRM
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Fluxuri repetitive
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        Automatizăm task-urile care consumă timp inutil:
                        preluare lead-uri, notificări, ofertare, centralizare de
                        date și integrarea dintre instrumentele deja folosite în
                        companie.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-top-right vsc-services-card__image-automatizari">
                      <Image
                        className="mxd-move"
                        alt="Illustration"
                        src="/img/illustrations/vector-16.webp"
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
                      <h3 className="anim-uni-in-up">Software custom</h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          CRM intern
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          ERP light
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Portal client
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Dashboard-uri
                        </span>
                      </div>
                      <p className="t-bright anim-uni-in-up">
                        Construim aplicații și platforme interne pentru firme
                        care au depășit Excel-ul, tool-urile împrăștiate și
                        procesele manuale greu de controlat.
                      </p>
                      <div
                        className="anim-uni-in-up"
                        style={{ marginTop: "18px" }}
                      >
                        <AnimatedButton
                          text="Vezi oferta"
                          className="btn btn-anim btn-default btn-outline slide-right-up"
                          href="/software-custom-firme"
                        >
                          <i className="ph-bold ph-arrow-up-right" />
                        </AnimatedButton>
                      </div>
                    </div>
                    <div
                      className="mxd-services-cards-s__image image-bottom"
                      style={{ bottom: "-60px" }}
                    >
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/vector-19.webp"
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
                      <h3 className="opposite anim-uni-in-up">DevOps
                        <br />
                        și cloud
                      </h3>
                    </div>
                    <div className="mxd-services-cards-s__info">
                      <div className="mxd-services-cards-s__tags">
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Deploy stabil
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          CI/CD
                        </span>
                        <span className="tag tag-default tag-outline-opposite anim-uni-in-up">
                          Infrastructură scalabilă
                        </span>
                      </div>
                      <p className="t-opposite anim-uni-in-up">
                        Punem ordine în zona tehnică din spate, astfel încât
                        produsul să fie mai sigur, mai ușor de lansat și mai
                        simplu de susținut când business-ul crește.
                      </p>
                    </div>
                    <div
                      className="mxd-services-cards-s__image image-bottom image-bottom-2"
                      style={{ bottom: "-60px" }}
                    >
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/vector-18.webp"
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
                          Monitorizare
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Backup
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Actualizări
                        </span>
                        <span className="tag tag-default tag-outline anim-uni-in-up">
                          Suport lunar
                        </span>
                      </div>
                      <p className="anim-uni-in-up">
                        După lansare, rămânem aproape de proiect cu
                        monitorizare, update-uri și intervenții rapide, ca să nu
                        se transforme o problemă mică într-un blocaj scump.
                      </p>
                    </div>
                    <div className="mxd-services-cards-s__image image-top vsc-services-card__image-top">
                      <Image
                        alt="Illustration"
                        src="/img/illustrations/vector-20.webp"
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
