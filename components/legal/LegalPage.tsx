import Footer from "@/components/footers/Footer";

type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
};

export default function LegalPage({
  title,
  intro,
  updatedAt,
  sections,
}: LegalPageProps) {
  return (
    <>
      <main
        id="mxd-page-content"
        className="mxd-page-content inner-page-content"
      >
        <div className="mxd-section mxd-section-inner-headline padding-s-headline-pre-grid">
          <div className="mxd-container grid-container">
            <div className="mxd-block loading-wrap">
              <div className="container-fluid px-0">
                <div className="row gx-0">
                  <div className="col-12 col-xl-2 mxd-grid-item no-margin">
                    <div className="mxd-block__name name-inner-headline loading__item">
                      <p className="mxd-point-subtitle">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20px"
                          height="20px"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill="currentColor"
                            d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2
                    c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4
                    c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2
                    c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6
                    c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4
                    c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6
                    c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"
                          />
                        </svg>
                        <span>Document legal</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 mxd-grid-item no-margin">
                    <div className="mxd-block__content">
                      <div className="mxd-block__inner-headline">
                        <h1 className="inner-headline__title loading__item">
                          {title}
                        </h1>
                        <p className="inner-headline__text t-large t-bright loading__item">
                          {intro}
                        </p>
                        <p className="t-xsmall t-muted loading__item">
                          Ultima actualizare: {updatedAt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mxd-section padding-default">
          <div className="mxd-container" style={{ maxWidth: "980px" }}>
            <div
              className="mxd-block"
              style={{
                display: "grid",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: "1.2rem",
                }}
              >
                {sections.map((section) => (
                  <section
                    key={section.title}
                    className="anim-uni-in-up"
                    style={{
                      padding: "2rem",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "20px",
                      background: "rgba(255,255,255,0.02)",
                      display: "grid",
                      gap: "1rem",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                        lineHeight: 1.15,
                      }}
                    >
                      {section.title}
                    </h2>
                    <div style={{ display: "grid", gap: "0.9rem" }}>
                      {section.paragraphs.map((paragraph, index) => (
                        <p
                          key={`${section.title}-p-${index}`}
                          className="t-medium"
                          style={{ margin: 0 }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.items && section.items.length > 0 && (
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: "1.2rem",
                          display: "grid",
                          gap: "0.6rem",
                        }}
                      >
                        {section.items.map((item, index) => (
                          <li
                            key={`${section.title}-i-${index}`}
                            className="t-medium"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
