"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieConsentUI() {
  const {
    consent,
    isLoaded,
    isBannerOpen,
    isModalOpen,
    openModal,
    closeModal,
    acceptAll,
    acceptNecessaryOnly,
    savePreferences,
  } = useCookieConsent();

  const modalRef = useRef<HTMLDivElement>(null);

  const [preferences, setPreferences] = useState({
    preferences: false,
    analytics: false,
    marketing: false,
  });

  const syncPreferencesFromConsent = () => {
    setPreferences({
      preferences: consent?.categories.preferences ?? false,
      analytics: consent?.categories.analytics ?? false,
      marketing: consent?.categories.marketing ?? false,
    });
  };

  // Focus trap + ESC close for modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Focus first element when modal opens
    const timer = setTimeout(() => {
      const first = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isModalOpen, closeModal]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {isBannerOpen ? (
        <div className="vsc-cookie-banner" role="dialog" aria-live="polite">
          <div className="vsc-cookie-banner__content">
            <p className="vsc-cookie-banner__eyebrow">Setări cookie</p>
            <h3 className="vsc-cookie-banner__title">
              Folosim doar ce este necesar, iar restul rămâne sub controlul tău
            </h3>
            <p className="vsc-cookie-banner__text">
              Site-ul folosește mecanisme tehnice necesare și poate folosi, în
              viitor, cookie-uri pentru preferințe, analiză sau marketing doar
              cu acordul tău.
            </p>
            <p className="vsc-cookie-banner__meta">
              Vezi detalii în{" "}
              <Link href="/politica-de-cookie-uri">politica de cookie-uri</Link>.
            </p>
            <div className="vsc-cookie-banner__actions">
              <button
                type="button"
                className="vsc-cookie-btn vsc-cookie-btn--ghost"
                onClick={acceptNecessaryOnly}
              >
                Doar necesare
              </button>
              <button
                type="button"
                className="vsc-cookie-btn vsc-cookie-btn--ghost"
                onClick={() => {
                  syncPreferencesFromConsent();
                  openModal();
                }}
              >
                Personalizează
              </button>
              <button
                type="button"
                className="vsc-cookie-btn vsc-cookie-btn--primary"
                onClick={acceptAll}
              >
                Acceptă tot
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="vsc-cookie-settings"
        onClick={() => {
          syncPreferencesFromConsent();
          openModal();
        }}
        aria-label="Deschide setările de cookie"
      >
        <i className="ph ph-cookie" />
        <span>Cookie</span>
      </button>

      {isModalOpen ? (
        <div className="vsc-cookie-modal" role="dialog" aria-modal="true" ref={modalRef}>
          <div className="vsc-cookie-modal__backdrop" onClick={closeModal} />
          <div className="vsc-cookie-modal__panel">
            <div className="vsc-cookie-modal__header">
              <div>
                <p className="vsc-cookie-banner__eyebrow">Preferințe</p>
                <h3 className="vsc-cookie-modal__title">Setări cookie</h3>
              </div>
              <button
                type="button"
                className="vsc-cookie-close"
                onClick={closeModal}
                aria-label="Închide"
              >
                <i className="ph ph-x" />
              </button>
            </div>

            <div className="vsc-cookie-modal__body">
              <CookieToggle
                title="Strict necesare"
                description="Necesare pentru funcționarea de bază a site-ului. Nu pot fi dezactivate."
                checked
                disabled
                onChange={() => undefined}
              />
              <CookieToggle
                title="Preferințe"
                description="Memorează opțiuni precum tema vizuală sau alte preferințe de afișare."
                checked={preferences.preferences}
                onChange={(checked) =>
                  setPreferences((current) => ({
                    ...current,
                    preferences: checked,
                  }))
                }
              />
              <CookieToggle
                title="Analiză"
                description="Poate fi folosită ulterior pentru analytics și măsurarea traficului, doar cu acordul tău."
                checked={preferences.analytics}
                onChange={(checked) =>
                  setPreferences((current) => ({
                    ...current,
                    analytics: checked,
                  }))
                }
              />
              <CookieToggle
                title="Marketing"
                description="Poate fi folosit pentru campanii, remarketing sau pixeli publicitari, doar cu acordul tău."
                checked={preferences.marketing}
                onChange={(checked) =>
                  setPreferences((current) => ({
                    ...current,
                    marketing: checked,
                  }))
                }
              />
            </div>

            <div className="vsc-cookie-modal__footer">
              <button
                type="button"
                className="vsc-cookie-btn vsc-cookie-btn--ghost"
                onClick={acceptNecessaryOnly}
              >
                Doar necesare
              </button>
              <button
                type="button"
                className="vsc-cookie-btn vsc-cookie-btn--primary"
                onClick={() => savePreferences(preferences)}
              >
                Salvează preferințele
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CookieToggle({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="vsc-cookie-toggle">
      <div className="vsc-cookie-toggle__copy">
        <p className="vsc-cookie-toggle__title">{title}</p>
        <p className="vsc-cookie-toggle__description">{description}</p>
      </div>
      <label className="vsc-cookie-switch">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="vsc-cookie-switch__slider" />
      </label>
    </div>
  );
}
