import footerNav from "@/data/footer-nav.json";
import socials from "@/data/socials.json";
import AnimatedButton from "../animation/AnimatedButton";
import SubscribeForm from "./SubscribeForm";

export default function Footer() {
  return (
    <footer id="mxd-footer" className="mxd-footer">
      {/* Footer Block - Fullwidth Text Start */}
      <div className="mxd-footer__text-wrap">
        <div className="fullwidth-text__tl-trigger" />
        <div className="mxd-footer__fullwidth-text anim-top-to-bottom">
          <span
            className="mxd-footer__svg-v2-mobile custom-visualstudio-text"
            style={{
              fontSize: 'clamp(60px, 15vw, 120px)',
              fontWeight: '900',
              lineHeight: '1',
              color: '#161616',
              textShadow: '0 0 2px rgba(0,0,0,0.8)'
            }}
          >
            
          </span>
          <span
            className="mxd-footer__svg-v2 custom-visualstudio-text"
            style={{
              fontSize: 'clamp(125px, 25vw, 285px)',
              fontWeight: '900',
              lineHeight: '1',
              color: '#161616',
              textShadow: '0 0 2px rgba(0,0,0,0.8)'
            }}
          >
            
          </span>
        </div>
      </div>
      {/* Footer Block - Fullwidth Text End */}
      {/* Footer Block - Info Columns Start */}
      <div className="mxd-footer__footer-blocks">
        {/* single column */}
        <div className="footer-blocks__column animate-card-3">
          {/* inner card */}
          <div className="footer-blocks__card fullheight-card">
            {/* footer navigation */}
            <div className="footer-blocks__nav">
              <ul className="footer-nav">
                {footerNav.map(
                  (
                    item: { label: string; href: string; counter?: number },
                    idx: number
                  ) => (
                    <li className="footer-nav__item anim-uni-in-up" key={idx}>
                      <AnimatedButton
                        href={item.href}
                        text={item.label}
                        className="footer-nav__link btn-anim"
                      />

                      {item.counter && (
                        <p className="footer-nav__counter">
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
                          <span>{item.counter}</span>
                        </p>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
            {/* links */}
            <div className="footer-blocks__links anim-uni-in-up">
              <AnimatedButton
                text="Politica de confidentialitate"
                as={"a"}
                className="btn btn-line-xsmall btn-muted slide-right anim-no-delay"
                href="/politica-de-confidentialitate"
              >
                <i className="ph ph-arrow-right" />
              </AnimatedButton>
              <AnimatedButton
                text="Termeni si conditii"
                as={"a"}
                className="btn btn-line-xsmall btn-muted slide-right anim-no-delay"
                href="/termeni-si-conditii"
              >
                <i className="ph ph-arrow-right" />
              </AnimatedButton>
              <AnimatedButton
                text="Politica de cookie-uri"
                as={"a"}
                className="btn btn-line-xsmall btn-muted slide-right anim-no-delay"
                href="/politica-de-cookie-uri"
              >
                <i className="ph ph-arrow-right" />
              </AnimatedButton>
            </div>
          </div>
        </div>
        {/* single column */}
        <div className="footer-blocks__column animate-card-3">
          {/* inner card */}
          <div className="footer-blocks__card">
            <p className="mxd-point-subtitle anim-uni-in-up">
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
              <a href="mailto:salut@visualstudio.ro?subject=Message%20from%20your%20site">
                salut@visualstudio.ro
              </a>
            </p>
          </div>
          {/* inner card */}
          <div className="footer-blocks__card">
            <p className="mxd-point-subtitle anim-uni-in-up">
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
              <a
                href="https://wa.me/40770561719"
                target="_blank"
                rel="noreferrer"
              >
                0770 561 719
              </a>
            </p>
          </div>
          {/* inner card */}
          <div className="footer-blocks__card fill-card notify">
            {/* card title */}
              <div className="footer-blocks__title anim-uni-in-up">
                <p className="footer-blocks__title-m">
                  Primește noutăți și idei utile:
                </p>
              </div>
            {/* subscribe form container */}
            <div className="form-container anim-uni-in-up">
              {/* reply messages */}
              <div className="form__reply subscription-ok">
                <span className="reply__text">
                  Mulțumim. Te-am înscris cu succes.
                </span>
              </div>
              <div className="form__reply subscription-error">
                <span className="reply__text">
                  A apărut o problemă. Încearcă din nou mai târziu.
                </span>
              </div>
              {/* subscribe form */}
              <SubscribeForm />
            </div>
          </div>
        </div>
        {/* single column */}
        <div className="footer-blocks__column animate-card-3">
          {/* inner card */}
          <div className="footer-blocks__card fullheight-card">
            {/* nav block */}
            <div className="footer-blocks__block">
              {/* card title */}
              <div className="footer-blocks__title anim-uni-in-up">
                <p className="footer-blocks__title-l">Social media</p>
              </div>
              {/* footer socials */}
              <div className="footer-blocks__socials">
                <ul className="footer-socials">
                  {socials.map((social, i) => (
                    <li key={i} className="footer-socials__item anim-uni-in-up">
                      <a
                        href={social.url}
                        className="footer-socials__link"
                        target="_blank"
                      >
                        {social.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* links */}
            <div className="footer-blocks__links anim-uni-in-up">
              <p className="t-xsmall t-muted">
                <span className="no-effect">VISUAL STUDIO CONCEPT SRL</span>
                <i className="ph-bold ph-copyright" />
                {new Date().getFullYear()}
              </p>
              <p className="t-xsmall t-muted">CUI 43527366</p>
              <p className="t-xsmall t-muted">J16/53/2021</p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Block - Info Columns End */}
    </footer>
  );
}
