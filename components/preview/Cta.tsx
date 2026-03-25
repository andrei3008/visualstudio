import RevealText from "../animation/RevealText";
import AnimatedButton from "../animation/AnimatedButton";

export default function Cta() {
  return (
    <div className="mxd-section padding-default">
      <div className="mxd-container">
        {/* Block - Demo CTA Start */}
        <div className="mxd-block">
          <div className="mxd-demo-cta">
            <div className="mxd-demo-cta__caption anim-uni-in-up">
              <RevealText as="h2" className="h2-small reveal-type">
                Continuă din preview către paginile reale ale site-ului
              </RevealText>
            </div>
            <div className="mxd-demo-cta__btn anim-uni-in-up">
              <AnimatedButton
                text="Deschide contactul"
                as={"a"}
                className="btn btn-anim btn-default btn-large btn-additional slide-right"
                href="/contact"
              >
                <i className="ph-bold ph-arrow-up-right" />
              </AnimatedButton>
            </div>
          </div>
        </div>
        {/* Block - Demo CTA End */}
      </div>
    </div>
  );
}
