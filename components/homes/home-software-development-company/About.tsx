import AnimatedButton from "@/components/animation/AnimatedButton";
import RevealText from "@/components/animation/RevealText";

export default function About() {
  return (
    <div className="mxd-section padding-default">
      <div className="mxd-container grid-container">
        {/* Block - About Description with H2 Title and Paragraph Start */}
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0">
              <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                <div className="mxd-block__name">
                  <RevealText as="h2" className="reveal-type anim-uni-in-up">
                    Dezvoltăm software care rezolvă probleme reale de business
                  </RevealText>
                </div>
              </div>
              <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  <div className="mxd-block__paragraph">
                    <p className="t-large t-bright anim-uni-in-up">
                      Lucrăm cu firme care au nevoie de mai mult decât un site
                      de prezentare. Construim platforme, aplicații și
                      automatizări care simplifică operațiunile, susțin vânzarea
                      și permit echipei tale să scaleze fără haos tehnic.
                    </p>
                    <div className="mxd-paragraph__lists">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-6 col-xl-5">
                            <ul>
                              <li>
                                <p className="anim-uni-in-up">Analiză clară a nevoilor</p>
                              </li>
                              <li>
                                <p className="anim-uni-in-up">Arhitectură gândită pentru creștere</p>
                              </li>
                              <li>
                                <p className="anim-uni-in-up">Cod curat și mentenabil</p>
                              </li>
                            </ul>
                          </div>
                          <div className="col-6 col-xl-5">
                            <ul>
                              <li>
                                <p className="anim-uni-in-up">Livrare etapizată și predictibilă</p>
                              </li>
                              <li>
                                <p className="anim-uni-in-up">Integrări, cloud și automatizare</p>
                              </li>
                              <li>
                                <p className="anim-uni-in-up">Suport după lansare</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mxd-paragraph__controls anim-uni-in-up">
                      <AnimatedButton
                        text="Vezi cum lucrăm"
                        className="btn btn-anim btn-default btn-outline slide-right-up"
                        href={`/despre-noi`}
                      >
                        <i className="ph-bold ph-arrow-up-right" />
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - About Description with H2 Title and Paragraph End */}
      </div>
    </div>
  );
}
