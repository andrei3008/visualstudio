import RevealText from "../animation/RevealText";
import BackgroundParallax from "../animation/BackgroundParallax";

export default function Solutions() {
  return (
    <>
      {/* Project Block - Solution Description with H2 Title and Paragraph Start */}
      <div className="mxd-project__block">
        <div className="container-fluid px-0">
          <div className="row gx-0">
            <div className="col-12 col-xl-5 mxd-grid-item no-margin">
              <div className="mxd-project__subtitle">
                <RevealText as="h2" className="reveal-type anim-uni-in-up">
                  Solution
                </RevealText>
              </div>
            </div>
            <div className="col-12 col-xl-6 mxd-grid-item no-margin">
              <div className="mxd-project__content">
                <div className="mxd-project__paragraph medium-text">
                  <p className="anim-uni-in-up">
                    Am construit o arhitectură modulară care separă frontend-ul
                    de backend, permițând scalare independentă și dezvoltare
                    rapidă. Am folosit Next.js pentru performanță optimă și SEO,
                    cu o bază de date PostgreSQL gestionată în cloud.
                  </p>
                  <p className="anim-uni-in-up">
                    Procesul a inclus definirea arhitecturii, prototipare rapidă
                    cu feedback continuu de la client, și o strategie de deployment
                    automat prin CI/CD. Rezultatul: o aplicație stabilă, rapidă și
                    ușor de extins pe viitor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project Block - Solution Description with H2 Title and Paragraph End */}
      {/* Project Block - Parallax Fullwidth Image Start */}
      <div className="mxd-project__block mxd-grid-item no-margin">
        <div className="mxd-divider">
          <BackgroundParallax
            scale={1.5}
            className="mxd-divider__image prj-details-img-02 parallax-img"
          />
        </div>
      </div>
      {/* Project Block - Parallax Fullwidth Image End */}
    </>
  );
}
