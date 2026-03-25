import Image from "next/image";
import CommentForm from "./CommentForm";
import AnimatedButton from "../animation/AnimatedButton";

export default function Comments() {
  return (
    <div className="mxd-article-comments">
      <div className="mxd-article-comments__container">
        <h3>3 comentarii</h3>
        <div className="mxd-article-comments__list">
          <ul className="mxd-comment__main">
            <li className="mxd-comment">
              <div className="mxd-comment__container">
                <div className="mxd-comment__avatar">
                  <Image
                    alt="Comment Avatar"
                    src="/img/avatars/300x300_ava-08.webp"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="mxd-comment__content">
                  <div className="mxd-comment__info">
                    <p className="mxd-comment__date t-small t-140">
                      28 January, 2025
                    </p>
                    <h6 className="mxd-comment__name">
                      <a href="#">Lea Tomato</a>
                    </h6>
                  </div>
                    <p className="t-small">
                    Automatizarea și AI-ul sunt impresionante, dar cred că
                    diferența reală apare când sunt folosite de o echipă care
                    înțelege bine și partea de business, nu doar tehnologia.
                  </p>
                  <div className="mxd-comment__reply">
                    <AnimatedButton
                      className="btn btn-anim btn-default btn-small btn-outline slide-right-up"
                      as={"a"}
                      position={"next"}
                      text="Răspunde"
                      href="#"
                    >
                      <i className="ph ph-arrow-up-right" />
                    </AnimatedButton>
                  </div>
                </div>
              </div>
              <ul className="mxd-comment__children">
                <li className="mxd-comment">
                  <div className="mxd-comment__container">
                    <div className="mxd-comment__avatar">
                      <Image
                        alt="Comment Avatar"
                        src="/img/avatars/300x300_ava-02.webp"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="mxd-comment__content">
                      <div className="mxd-comment__info">
                        <p className="mxd-comment__date t-small t-140">
                          28 January, 2025
                        </p>
                        <h6 className="mxd-comment__name">
                          <a href="#">Patrick Pineapple</a>
                        </h6>
                      </div>
                      <p className="t-small">
                        Exact. Instrumentele bune accelerează munca și reduc
                        blocajele, dar tot oamenii decid direcția, arhitectura
                        și prioritățile care contează.
                      </p>
                      <div className="mxd-comment__reply">
                        <AnimatedButton
                          position={"next"}
                          as={"a"}
                          className="btn btn-anim btn-default btn-small btn-outline slide-right-up"
                          text="Răspunde"
                          href="#"
                        >
                          <i className="ph ph-arrow-up-right" />
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li className="mxd-comment">
              <div className="mxd-comment__container">
                <div className="mxd-comment__avatar">
                  <Image
                    alt="Comment Avatar"
                    src="/img/avatars/300x300_ava-09.webp"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="mxd-comment__content">
                  <div className="mxd-comment__info">
                    <p className="mxd-comment__date t-small t-140">
                      01 February, 2025
                    </p>
                    <h6 className="mxd-comment__name">
                      <a href="#">Mary Cucumber</a>
                    </h6>
                  </div>
                  <p className="t-small">
                    În proiectele digitale bune, tehnologia trebuie să lase loc
                    pentru decizii mai bune, nu doar pentru viteză. Asta se
                    vede imediat în rezultat și în experiența finală.
                  </p>
                  <div className="mxd-comment__reply">
                    <AnimatedButton
                      position={"next"}
                      as={"a"}
                      className="btn btn-anim btn-default btn-small btn-outline slide-right-up"
                      text="Răspunde"
                      href="#"
                    >
                      <i className="ph ph-arrow-up-right" />
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="mxd-article-comments__respond">
        <h3>Tu ce părere ai?</h3>
        <p>
          Poți lăsa un răspuns mai jos. Adresa de e-mail nu va fi publicată.
          Câmpurile obligatorii sunt marcate cu *
        </p>
        <div className="comments-respond__form">
          <CommentForm />
        </div>
      </div>
    </div>
  );
}
