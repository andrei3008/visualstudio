import RevealText from "../animation/RevealText";

export default function Feedback() {
  return (
    <div className="mxd-project__block">
      <div className="container-fluid px-0">
        <div className="row gx-0">
          <div className="col-12 col-xl-5 mxd-grid-item no-margin">
            <div className="mxd-project__subtitle">
              <RevealText as="h2" className="reveal-type anim-uni-in-up">
                Feedback de
                <br />
                la client
              </RevealText>
            </div>
          </div>
          <div className="col-12 col-xl-6 mxd-grid-item no-margin">
            <div className="mxd-project__content">
              <div className="mxd-project__paragraph medium-text">
                <p className="anim-uni-in-up">
                  Colaborarea a fost eficientă și bine structurată de la primul
                  workshop până la lansare. Echipa a înțeles rapid nevoile
                  operaționale, a propus o direcție clară și a livrat un produs
                  care a fost bine primit imediat de utilizatori.
                </p>
                <div className="mxd-project__client anim-uni-in-up">
                  <h5 className="anim-uni-in-up">Lea Toma</h5>
                  <p className="t-small anim-uni-in-up">
                    Senior designer la
                    <a className="" href="#">
                      The Way
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
