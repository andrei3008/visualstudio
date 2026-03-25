import Image from "next/image";
import Link from "next/link";
import Comments from "./Comments";
import AnimatedButton from "../animation/AnimatedButton";

export default function BlogDetails() {
  return (
    <div className="mxd-section padding-pre-title">
      <div className="mxd-container grid-container">
        <div className="mxd-article-area loading-wrap">
          {/* Article Container Start */}
          <div className="mxd-article-container mxd-grid-item no-margin">
            {/* Article Start */}
            <article className="mxd-article">
              {/* Article Headline Start */}
              <div className="mxd-article__headline">
                <div className="mxd-article__meta">
                  <div className="mxd-article__breadcrumbs loading__item">
                    <span>
                      <Link href={`/`}>Acasă</Link>
                    </span>
                    <span>
                      <Link href={`/blog`}>Blog</Link>
                    </span>
                    <span className="current-item">
                      Cum introduci AI în procese fără să creezi haos
                    </span>
                  </div>
                  <div className="mxd-article__data loading__item">
                    <span className="meta-date">
                      22 ianuarie 2025
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 20 20"
                      >
                        <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
                      </svg>
                    </span>
                    <span className="meta-time">5 min. de citit</span>
                  </div>
                </div>
                <div className="mxd-article__title loading__item">
                  <h1 className="h1-small">
                    Cum introduci AI în procese fără să creezi haos
                  </h1>
                </div>
                <div className="mxd-article__tags loading__item">
                  <span className="tag tag-default tag-outline tag-link-outline">
                    <Link href={`/blog`}>AI</Link>
                  </span>
                  <span className="tag tag-default tag-outline tag-link-outline">
                    <Link href={`/blog`}>Automatizare</Link>
                  </span>
                  <span className="tag tag-default tag-outline tag-link-outline">
                    <Link href={`/blog`}>Business</Link>
                  </span>
                </div>
              </div>
              {/* Article Headline End */}
              {/* Article Thumb Start */}
              <div className="mxd-article__thumb loading__fade">
                <Image
                  alt="Article Thumbnail"
                  src="/img/blog/article/1920x1280_tm-01.webp"
                  width={1920}
                  height={1280}
                />
              </div>
              {/* Article Thumb End */}
              {/* Article Content Start */}
              <div className="mxd-article__content">
                <div className="mxd-article__block">
                  <p className="t-large mxd-article__excerpt">
                    AI poate accelera serios o companie, dar doar dacă este
                    introdus în procese clare. Altfel, ajunge rapid să fie doar
                    un experiment scump, greu de întreținut și imposibil de
                    măsurat.
                  </p>
                  <p>
                    În loc să pornești de la instrument, merită să pornești de
                    la blocaj: unde se pierde timp, unde apar erori repetitive,
                    unde răspunde echipa prea lent sau unde informația circulă
                    greu între oameni și sisteme.
                  </p>
                </div>
                <div className="mxd-article__block block-table-of-contents">
                  <p className="table-of-contents__title">Cuprins:</p>
                  <ul className="table-of-contents__nav">
                    <li>
                      <a href="#chapter-01">De unde începi</a>
                    </li>
                    <li>
                      <a href="#chapter-02">Ce merită automatizat</a>
                    </li>
                    <li>
                      <a href="#chapter-03">Cum implementezi corect</a>
                    </li>
                    <li>
                      <a href="#chapter-04">Riscuri frecvente</a>
                    </li>
                    <li>
                      <a href="#chapter-05">De ce merită să continui</a>
                    </li>
                    <li>
                      <a href="#chapter-06">Concluzie</a>
                    </li>
                  </ul>
                </div>
                <div id="chapter-01" className="mxd-article__block">
                  <h3>De unde începi</h3>
                  <p>
                    Primul pas nu este să alegi un model sau o platformă, ci să
                    identifici un proces repetitiv, clar și suficient de
                    important încât să merite optimizat. Exemple bune: lead
                    qualification, suport inițial, completarea de date,
                    generarea de răspunsuri standard sau sincronizarea între
                    tool-uri interne.
                  </p>
                </div>
                <div className="mxd-article__block block-quote">
                  <blockquote>
                    <p className="quote__text">
                      AI nu înlocuiește o echipă bună. O echipă bună îl folosește
                      ca să elimine munca inutilă și să ia decizii mai repede.
                    </p>
                    <p className="quote__cite">
                      <cite>Visual Studio Concept</cite>
                    </p>
                  </blockquote>
                </div>
                <div className="mxd-article__block">
                  <p>
                    Dacă procesul este ambiguu, nici automatizarea nu va fi
                    stabilă. De aceea, înainte de integrare, trebuie să existe
                    reguli clare, surse de date curate și o definiție bună a
                    rezultatului pe care îl aștepți.
                  </p>
                </div>
                <div id="chapter-02" className="mxd-article__block">
                  <h3>Ce merită automatizat</h3>
                  <p>
                    În practică, cele mai bune rezultate apar de obicei în trei
                    zone:
                  </p>
                  <ol className="article-ol">
                    <li>
                      Task-uri repetitive cu volum mare
                      <ul className="article-ul">
                        <li>răspunsuri standard, clasificare, sumarizare;</li>
                        <li>actualizare de câmpuri și sincronizare de date.</li>
                      </ul>
                    </li>
                    <li>
                      Fluxuri unde timpul de reacție contează
                      <ul>
                        <li>preluare lead-uri și trimitere către echipa potrivită;</li>
                        <li>asistenți interni pentru suport sau knowledge base.</li>
                      </ul>
                    </li>
                    <li>
                      Procese cu mulți pași manuali
                      <ul>
                        <li>documentare, raportare, verificări repetitive;</li>
                        <li>pregătirea informației înainte de decizia umană.</li>
                      </ul>
                    </li>
                  </ol>
                </div>
                <div className="mxd-article__block block-image">
                  <div className="block-image__container">
                    <Image
                      alt="Article Image"
                      src="/img/blog/article/1920x1280_img-01.webp"
                      width={1920}
                      height={1280}
                    />
                    <div className="block-image__tags">
                      <span className="tag tag-default tag-permanent">
                        Automatizare operațională
                      </span>
                    </div>
                  </div>
                </div>
                <div id="chapter-03" className="mxd-article__block">
                  <h3>Cum implementezi corect</h3>
                  <p>
                    O implementare sănătoasă are de obicei patru pași:
                  </p>
                  <h5>Audit</h5>
                  <p>
                    Identifici punctele cu fricțiune și definești clar ce
                    înseamnă succesul: timp redus, cost mai mic, mai puține
                    erori sau răspuns mai rapid.
                  </p>
                  <h5>Prototip limitat</h5>
                  <p>
                    Începi cu un caz restrâns, măsurabil, nu cu o transformare
                    completă a companiei.
                  </p>
                  <h5>Integrare</h5>
                  <p>
                    Conectezi automatizarea la CRM, e-mail, tool-uri interne sau
                    baze de date, astfel încât rezultatul să fie util imediat.
                  </p>
                  <h5>Control și măsurare</h5>
                  <p>
                    Adaugi validări, logare și puncte unde omul poate interveni.
                    Fără asta, orice economie aparentă de timp se poate întoarce
                    împotriva ta.
                  </p>
                </div>
                <div className="mxd-article__block block-image">
                  <div className="block-image__container">
                    <Image
                      alt="Article Image"
                      src="/img/blog/article/1200x1200_img-01.webp"
                      width={1200}
                      height={1200}
                    />
                    <div className="block-image__tags">
                      <span className="tag tag-default tag-permanent">
                        Integrare în procese reale
                      </span>
                    </div>
                  </div>
                  <div className="block-image__container">
                    <Image
                      alt="Article Image"
                      src="/img/blog/article/1200x1200_img-02.webp"
                      width={1200}
                      height={1200}
                    />
                    <div className="block-image__tags">
                      <span className="tag tag-default tag-permanent">
                        Control și observabilitate
                      </span>
                    </div>
                  </div>
                </div>
                <div id="chapter-04" className="mxd-article__block">
                  <h3>Riscuri frecvente</h3>
                  <p>
                    <span>Procese prost definite.</span> Dacă echipa nu lucrează
                    consecvent nici fără AI, rezultatele vor fi greu de folosit.
                  </p>
                  <p>
                    <span>Date slabe.</span>
                    Orice automatizare bazată pe informații incomplete sau
                    contradictorii va produce erori mai repede, nu soluții.
                  </p>
                  <p>
                    <span>Lipsa controlului.</span>
                    Fără validări, rate limits, audit și ownership clar,
                    implementarea devine fragilă și greu de întreținut.
                  </p>
                </div>
                <div id="chapter-05" className="mxd-article__block">
                  <h3>De ce merită să continui</h3>
                  <p>
                    Când este introdus corect, AI-ul nu înlocuiește echipele.
                    Le ajută să:
                  </p>
                  <ul>
                    <li>răspundă mai repede și mai coerent;</li>
                    <li>reducă munca manuală și erorile repetitive;</li>
                    <li>scoată mai multă valoare din datele și tool-urile existente.</li>
                  </ul>
                </div>
                <div id="chapter-06" className="mxd-article__block">
                  <h3>Concluzie</h3>
                  <p>
                    Dacă vrei să introduci AI într-un business, nu porni de la
                    hype. Pornește de la proces, metrică și responsabilitate.
                    Acolo apar rezultatele bune și sustenabile.
                  </p>
                  <ul>
                    <li>
                      <span>Analizează:</span> găsește blocajul care costă cel
                      mai mult;
                    </li>
                    <li>
                      <span>Testează:</span> implementează întâi un flux mic și
                      măsurabil;
                    </li>
                    <li>
                      <span>Controlează:</span> păstrează vizibilitate și puncte
                      clare de validare umană.
                    </li>
                  </ul>
                </div>
              </div>
              {/* Article Content End */}
            </article>
            {/* Article End */}
            {/* Article Author Start */}
            <div className="mxd-article-author">
              <div className="mxd-article-author__data">
                <a className="mxd-article-author__avatar" href="#">
                  <Image
                    alt="Avatar"
                    src="/img/avatars/300x300_ava-07.webp"
                    width={300}
                    height={300}
                  />
                </a>
                <div className="mxd-article-author__info">
                  <h5 className="mxd-article-author__name">
                    <a href="#">Ioana</a>
                    <small className="mxd-article-author__position">
                      Brand & Experience Lead
                    </small>
                  </h5>
                  <div className="mxd-article-author__socials">
                    <span className="tag tag-default tag-opposite tag-link-opposite">
                      <a href="https://www.linkedin.com/" target="_blank">
                        LinkedIn
                      </a>
                    </span>
                    <span className="tag tag-default tag-opposite tag-link-opposite">
                      <a href="https://www.behance.net/" target="_blank">
                        Behance
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mxd-article-author__quote">
                <p>
                  Lucrează la intersecția dintre claritate de produs, experiență
                  și decizii de business. Când nu desenează fluxuri sau
                  interfețe, documentează tendințe și structuri care fac
                  produsele digitale mai ușor de înțeles și folosit.
                </p>
              </div>
            </div>
            {/* Article Author End */}
            {/* Article Navigation Start */}
            <div className="mxd-article-navigation">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-6 mxd-article-navigation__navitem left">
                    <AnimatedButton
                      className="btn btn-line-small btn-muted anim-no-delay slide-left"
                      as={"a"}
                      text="Anterior"
                      position={"previous"}
                    >
                      <i className="ph ph-arrow-left" />
                    </AnimatedButton>
                    <a className="mxd-article-navigation__link" href="#">
                      <span>
                        Cum proiectezi o experiență digitală care chiar reduce fricțiunea
                      </span>
                    </a>
                  </div>
                  <div className="col-6 mxd-article-navigation__navitem right">
                    <AnimatedButton
                      className="btn btn-line-small btn-muted anim-no-delay slide-right"
                      as={"a"}
                      text="Următor"
                      position={"next"}
                    >
                      <i className="ph ph-arrow-right" />
                    </AnimatedButton>
                    <a className="mxd-article-navigation__link" href="#">
                      <span>
                        De ce simplitatea bine executată vinde mai bine decât efectele inutile
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Article Navigation End */}
            {/* Article Comments Start */}
            <Comments />
            {/* Article Comments End */}
          </div>
          {/* Article Container End */}
        </div>
      </div>
    </div>
  );
}
