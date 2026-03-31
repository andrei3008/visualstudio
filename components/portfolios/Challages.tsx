import Image from "next/image";

import RevealText from "../animation/RevealText";

export default function Challages() {
  return (
    <>
      {/* Project Block - Challenge Description with H2 Title and Paragraph Start */}
      <div className="mxd-project__block pre-grid">
        <div className="container-fluid px-0">
          <div className="row gx-0">
            <div className="col-12 col-xl-5 mxd-grid-item no-margin">
              <div className="mxd-project__subtitle">
                <RevealText as="h2" className="reveal-type anim-uni-in-up">
                  Challenge
                </RevealText>
              </div>
            </div>
            <div className="col-12 col-xl-6 mxd-grid-item no-margin">
              <div className="mxd-project__content">
                <div className="mxd-project__paragraph">
                  <p className="t-large t-bright anim-uni-in-up">
                    Clientul avea nevoie de o soluție digitală care să
                    automatizeze procesele interne și să ofere o experiență
                    fluidă utilizatorilor finali.
                  </p>
                  <p className="anim-uni-in-up">
                    Provocarea principală a fost integrarea cu sistemele existente
                    și migrarea datelor fără downtime. Am optat pentru o abordare
                    incrementală, cu teste riguroase la fiecare etapă, asigurând
                    continuitatea operațională pe toată durata proiectului.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project Block - Challenge Description with H2 Title and Paragraph End */}
      {/* Project Block - Images Cards Start */}
      <div className="mxd-project__block no-margin">
        <div className="mxd-project-cards">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              {/* item */}
              <div className="col-12 col-xl-5 mxd-project-cards__item mxd-grid-item anim-uni-scale-in-right">
                <div className="mxd-project-cards__inner align-end bg-accent radius-m">
                  <Image
                    alt="Project Preview"
                    src="/img/works/1200x1200_prj-details-01.webp"
                    width={1200}
                    height={1200}
                  />
                </div>
              </div>
              {/* item */}
              <div className="col-12 col-xl-7 mxd-project-cards__item mxd-grid-item anim-uni-scale-in-left">
                <div className="mxd-project-cards__inner align-end bg-base-tint radius-m">
                  <Image
                    alt="Project Preview"
                    src="/img/works/1400x1000_prj-details-01.webp"
                    width={1400}
                    height={1000}
                  />
                </div>
              </div>
              {/* item */}
              <div className="col-12 col-xl-7 mxd-project-cards__item mxd-grid-item anim-uni-scale-in-right">
                <div className="mxd-project-cards__inner bg-base-tint radius-m">
                  <Image
                    alt="Project Preview"
                    src="/img/works/1400x1000_prj-details-02.webp"
                    width={1400}
                    height={1000}
                  />
                </div>
              </div>
              {/* item */}
              <div className="col-12 col-xl-5 mxd-project-cards__item mxd-grid-item anim-uni-scale-in-left">
                <div className="mxd-project-cards__inner bg-base-tint radius-m">
                  <Image
                    alt="Project Preview"
                    src="/img/works/1200x1200_prj-details-02.webp"
                    width={1200}
                    height={1200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project Block - Images Cards End */}
    </>
  );
}
