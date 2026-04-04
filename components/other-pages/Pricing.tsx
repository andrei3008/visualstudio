import { PricingItem } from "@/types/pricing";

interface PricingProps {
  items: PricingItem[];
  sectionLabel?: string;
  sectionTitle?: string;
}

export default function Pricing({
  items,
  sectionLabel = "Pachete orientative",
  sectionTitle = "Exemple de investiție pentru proiecte digitale",
}: PricingProps) {
  return (
    <>
      {/* Section - Pricing Cards Start */}
      <div className="mxd-section padding-grid-pre-mtext">
        <div className="mxd-container grid-container">
          {/* Block - Pricing Cards Start */}
          <div className="mxd-block">
            <div className="mxd-pricing-table loading__fade">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {items.map((p: PricingItem, idx: number) => (
                    <div
                      key={idx}
                      className="col-12 col-xl-4 mxd-pricing-table__item mxd-grid-item animate-card-3"
                    >
                      <div
                        className={`mxd-pricing-table__inner ${
                          p.best ? "best-choice" : ""
                        }`}
                      >
                        {p.tag && (
                          <div className="mxd-pricing-table__tag">
                            <span className={`tag ${p.tagClass || ""}`}>
                              {p.tag}
                            </span>
                          </div>
                        )}
                        <div className="mxd-pricing-table__data">
                          <div className="pricing-data__header">
                            {p.title && (
                              <h4 className="pricing-header__title anim-uni-in-up">
                                {p.title}
                              </h4>
                            )}
                            {p.descr && (
                              <p className="pricing-header__descr anim-uni-in-up">
                                {p.descr}
                              </p>
                            )}
                          </div>
                          <div className="pricing-data__info">
                            {p.amount && (
                              <div className="pricing-data__price">
                                <div className="pricing-data__num anim-uni-in-up">
                                  {p.currency && (
                                    <span className="pricing-data__currency">
                                      {p.currency}
                                    </span>
                                  )}
                                  <span className="pricing-data__amount">
                                    {p.amount}
                                  </span>
                                  {p.period && (
                                    <span className="pricing-data__period">
                                      {p.period}
                                    </span>
                                  )}
                                </div>
                                {p.timeline && (
                                  <p className="t-small t-muted t-140 anim-uni-in-up">
                                    {p.timeline}
                                  </p>
                                )}
                              </div>
                            )}
                            <div className="pricing-data__btnholder anim-uni-in-up">
                              <a
                                className="btn btn-anim btn-default btn-opposite btn-fullwidth slide-right-up"
                                href={p.btnHref || "contact.html"}
                              >
                                <span className="btn-caption">
                                  {p.btnText || "Cere o estimare"}
                                </span>
                                <i className="ph-bold ph-arrow-up-right" />
                              </a>
                            </div>
                            <div className="pricing-data__divider anim-uni-in-up" />
                          </div>
                        </div>
                        {p.features && (
                          <div className="mxd-pricing-table__plan">
                            <p className="pricing-plan__caption t-semibold t-bright anim-uni-in-up">
                              Ce este inclus:
                            </p>
                            <div className="pricing-plan__list">
                              <ul className="mxd-check-list">
                                {p.features.map((f, fIdx) => (
                                  <li key={fIdx} className="anim-uni-in-up">
                                    <i className="ph ph-check" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                        <div className="mxd-pricing-table__link anim-uni-in-up">
                          <a href={p.linkHref || "contact.html"}>
                            {p.linkText || "Ai nevoie de mai multe detalii? Hai să vorbim."}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Block - Pricing Cards End */}
        </div>
      </div>
      {/* Section - Pricing Cards End */}
    </>
  );
}
