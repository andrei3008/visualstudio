import factsData from "@/data/facts-simple.json";
import Counter from "@/components/common/Counter";

const icons: Record<number, React.ReactNode> = {
  1: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width={80} height={80}>
      {/* Building icon — Companii */}
      <rect x="8" y="20" width="20" height="38" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="12" y="26" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="20" y="26" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="12" y="34" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="20" y="34" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="12" y="42" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="20" y="42" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="36" y="12" width="20" height="46" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <rect x="40" y="18" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="48" y="18" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="40" y="26" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="48" y="26" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="40" y="34" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="48" y="34" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="40" y="42" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="48" y="42" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
      <line x1="4" y1="58" x2="60" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  2: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width={80} height={80}>
      {/* Returning clients — handshake */}
      <path d="M10 34H18L24 28L32 36L40 28L46 34H54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 34V46L32 50L46 46V34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="22" r="6" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="46" cy="22" r="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 40H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 44H38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  3: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width={80} height={80}>
      {/* Experience — shield with star */}
      <path d="M32 6L8 16V30C8 45.5 18.5 56.5 32 60C45.5 56.5 56 45.5 56 30V16L32 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 18L35.5 27.5H46L37.5 33.5L40.5 43L32 37.5L23.5 43L26.5 33.5L18 27.5H28.5L32 18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  4: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width={80} height={80}>
      {/* Projects delivered — rocket */}
      <path d="M32 8C32 8 26 16 26 30V42H38V30C38 16 32 8 32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="32" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M26 36L20 42V48L26 44" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M38 36L44 42V48L38 44" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="28" y1="48" x2="28" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="48" x2="32" y2="56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="48" x2="36" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 54L32 50L44 54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Facts() {
  return (
    <div className="mxd-section padding-default">
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-section-title">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle anim-uni-in-up">
                    <h2>Argumente care reduc riscul unei decizii greșite</h2>
                  </div>
                </div>
                <div className="col-12 col-xl-1 mxd-grid-item no-margin"></div>
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr anim-uni-in-up">
                    <p className="t-large t-bright">
                      Dacă intri în discuție cu noi, nu pornești de la zero.
                      Venim cu experiență practică în proiecte care trebuie să
                      funcționeze, nu doar să arate bine în prezentare.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Statistics Cards Start */}
        <div className="mxd-block">
          <div className="mxd-stats-simple">
            <div className="container-fluid p-0">
              <div className="row g-0 mxd-stats-simple">
                {factsData.map((fact) => (
                  <div
                    key={fact.id}
                    className="col-12 col-lg-3 mxd-stats-simple__item mxd-grid-item"
                  >
                    <div className="mxd-stats-simple__inner animate-card-4">
                      {/* counter */}
                      <div className="mxd-counter">
                        <p
                          id={fact.counterId}
                          className="mxd-stats-number mxd-stats-simple__counter"
                        >
                          <Counter max={fact.number} />
                          {fact.suffix}
                        </p>
                      </div>
                      {/* icon */}
                      <div className="mxd-stats-simple__image" style={{ display: "flex", justifyContent: "center" }}>
                        {icons[fact.id]}
                      </div>
                      {/* description */}
                      <p className="mxd-stats-simple__descr t-140 t-bright">
                        {fact.description.split("\n").map((line, index) => (
                          <span key={index}>
                            {line}
                            {index <
                              fact.description.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Block - Statistics Cards End */}
      </div>
    </div>
  );
}
