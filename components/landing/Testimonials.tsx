import { Testimonial } from "@/types/landing";

type TestimonialsProps = {
  items: Testimonial[];
  sectionTitle?: string;
};

export default function Testimonials({
  items,
  sectionTitle = "Ce spun clienții",
}: TestimonialsProps) {
  return (
    <div className="mxd-section padding-default">
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="container-fluid px-0">
            <div className="row gx-0" style={{ marginBottom: "4rem" }}>
              <div className="col-12 mxd-grid-item no-margin">
                <h2 className="inner-headline__title">{sectionTitle}</h2>
              </div>
            </div>
            <div className="row gx-0">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="col-12 col-md-6 col-xl-4 mxd-grid-item"
                >
                  <div className="landing-testimonial">
                    <div className="landing-testimonial__stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`ph-fill ph-star ${
                            i < item.rating ? "star-filled" : "star-empty"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="landing-testimonial__text">
                      &ldquo;{item.text}&rdquo;
                    </p>
                    <div className="landing-testimonial__author">
                      <div className="landing-testimonial__avatar">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="landing-testimonial__name">{item.name}</p>
                        <p className="landing-testimonial__role">
                          {item.role}, {item.company}
                        </p>
                      </div>
                    </div>
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
