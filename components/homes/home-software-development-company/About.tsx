import AnimatedButton from "@/components/animation/AnimatedButton";
import RevealText from "@/components/animation/RevealText";
import Link from "next/link";

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
                    Întotdeauna la zi cu trendurile tech
                  </RevealText>
                </div>
              </div>
              <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                <div className="mxd-block__content">
                  <div className="mxd-block__paragraph">
                    <p className="t-large t-bright anim-uni-in-up">
                      De la soluții digitale complete eligibile PNRR, la automatizări inteligente cu AI și cod impecabil pe microservicii, fiecare proiect este realizat cu maximă atenție pentru a-ți aduce rezultate reale și sustenabile – rapid și fără bătăi de cap.
                    </p>
                    <div className="mxd-paragraph__lists">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-6 col-xl-5">
                            <ul>
                              <li>
                                <p className="anim-uni-in-up">Inovație continuă</p>
                              </li>
                              <li>
                                <p className="anim-uni-in-up">Experiență 15 ani</p>
                              </li>
                              <li>
                                <p className="anim-uni-in-up">Cod curat & scalabil</p>
                              </li>
                            </ul>
                          </div>
                          <div className="col-6 col-xl-5">
                            <ul>
                              <li>
                                <p className="anim-uni-in-up">Implementare rapidă</p>
                              </li>
                              <li>
                                <p className="anim-uni-in-up">DevOps & Cloud expert</p>
                              </li>
                              <li>
                                <p className="anim-uni-in-up">Suport permanent</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mxd-paragraph__controls anim-uni-in-up">
                      <AnimatedButton
                        text="Hai să discutăm proiectul tău"
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
