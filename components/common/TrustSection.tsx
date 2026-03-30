"use client";

import Counter from "@/components/common/Counter";

const stats = [
  { number: 15, suffix: "+", label: "Ani de experiență" },
  { number: 70, suffix: "+", label: "Proiecte livrate cu succes" },
  { number: 48, suffix: "h", label: "Timp maxim de răspuns" },
  { number: 100, suffix: "%", label: "Proiecte livrate la timp" },
];

export default function TrustSection() {
  return (
    <div className="mxd-section padding-default">
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0 align-items-center">
              <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                <div className="mxd-block__inner-headline anim-uni-in-up">
                  <h2 className="inner-headline__title headline-img-before headline-img-02">
                    De ce Visual Studio Concept
                  </h2>
                  <p className="inner-headline__text t-large t-bright">
                    Suntem un partener tehnic, nu o agenție care vinde iluzii.
                    Construim soluții reale, livrăm la timp și răspundem
                    prompt.
                  </p>
                </div>
              </div>
              <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                <div className="container-fluid px-0">
                  <div className="row gx-0">
                    {stats.map((s, idx) => (
                      <div
                        key={idx}
                        className="col-12 col-sm-6 col-xl-3 mxd-grid-item anim-uni-in-up"
                      >
                        <div
                          style={{
                            padding: "2.4rem 1.6rem",
                            textAlign: "center",
                          }}
                        >
                          <p
                            className="mxd-counter__number mxd-stats-number"
                            style={{ fontSize: "4rem", lineHeight: 1 }}
                          >
                            <Counter max={s.number} />
                            {s.suffix}
                          </p>
                          <p
                            className="mxd-counter__descr t-140 t-bright"
                            style={{ marginTop: "0.8rem" }}
                          >
                            {s.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
