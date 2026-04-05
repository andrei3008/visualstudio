import { PainPoint } from "@/types/landing";

type PainPointsProps = {
  items: PainPoint[];
  sectionTitle?: string;
};

export default function PainPoints({
  items,
  sectionTitle = "Sună cunoscut?",
}: PainPointsProps) {
  return (
    <div className="mxd-section padding-default" id="pain-points">
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0 align-items-center" style={{ marginBottom: "4rem" }}>
              <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                <h2 className="inner-headline__title">{sectionTitle}</h2>
              </div>
              <div className="col-12 col-xl-7 mxd-grid-item no-margin">
                <p className="inner-headline__text t-large t-bright">
                  Înainte să construim soluția, ne asigurăm că înțelegem exact problema.
                </p>
              </div>
            </div>
            <div className="row gx-0">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="col-12 col-md-6 col-xl-3 mxd-grid-item"
                >
                  <div className="landing-pain-point">
                    <div className="landing-pain-point__icon">
                      <i className={`ph-bold ${item.icon}`} />
                    </div>
                    <h4 className="landing-pain-point__title">{item.title}</h4>
                    <p className="landing-pain-point__desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
