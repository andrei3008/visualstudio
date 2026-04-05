import { Step } from "@/types/landing";

type HowItWorksProps = {
  items: Step[];
  sectionTitle?: string;
  sectionSubtitle?: string;
};

export default function HowItWorks({
  items,
  sectionTitle = "Cum funcționează",
  sectionSubtitle = "Proces simplu, comunicare clară, rezultate rapide.",
}: HowItWorksProps) {
  return (
    <div className="mxd-section padding-default" id="how-it-works">
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0" style={{ marginBottom: "5rem" }}>
              <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                <h2 className="inner-headline__title">{sectionTitle}</h2>
              </div>
              <div className="col-12 col-xl-7 mxd-grid-item no-margin">
                <p className="inner-headline__text t-large t-bright">
                  {sectionSubtitle}
                </p>
              </div>
            </div>
            <div className="row gx-0">
              {items.map((step, idx) => (
                <div
                  key={idx}
                  className="col-12 col-md-6 col-xl-3 mxd-grid-item"
                >
                  <div className="landing-step">
                    <div className="landing-step__number">{step.number}</div>
                    <div className="landing-step__icon">
                      <i className={`ph-bold ${step.icon}`} />
                    </div>
                    <h4 className="landing-step__title">{step.title}</h4>
                    <p className="landing-step__desc">{step.description}</p>
                  </div>
                  {idx < items.length - 1 && (
                    <div className="landing-step__connector" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
