"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CookieConsentCategories = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentState = {
  version: number;
  updatedAt: string;
  categories: CookieConsentCategories;
};

type CookieConsentContextValue = {
  consent: CookieConsentState | null;
  isLoaded: boolean;
  isBannerOpen: boolean;
  isModalOpen: boolean;
  openBanner: () => void;
  openModal: () => void;
  closeModal: () => void;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  savePreferences: (categories: Omit<CookieConsentCategories, "necessary">) => void;
  canUse: (category: keyof CookieConsentCategories) => boolean;
};

const COOKIE_CONSENT_KEY = "vsc_cookie_consent";
const COOKIE_CONSENT_VERSION = 1;

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

const buildConsentState = (
  categories: Omit<CookieConsentCategories, "necessary">
): CookieConsentState => ({
  version: COOKIE_CONSENT_VERSION,
  updatedAt: new Date().toISOString(),
  categories: {
    necessary: true,
    ...categories,
  },
});

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const rawValue = localStorage.getItem(COOKIE_CONSENT_KEY);

        if (!rawValue) {
          setIsBannerOpen(true);
          setIsLoaded(true);
          return;
        }

        const parsed = JSON.parse(rawValue) as CookieConsentState;

        if (parsed.version !== COOKIE_CONSENT_VERSION) {
          localStorage.removeItem(COOKIE_CONSENT_KEY);
          setIsBannerOpen(true);
          setIsLoaded(true);
          return;
        }

        setConsent(parsed);
        setIsBannerOpen(false);
        setIsLoaded(true);
      } catch {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        setIsBannerOpen(true);
        setIsLoaded(true);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!consent) {
      document.documentElement.removeAttribute("data-cookie-analytics");
      document.documentElement.removeAttribute("data-cookie-marketing");
      document.documentElement.removeAttribute("data-cookie-preferences");
      return;
    }

    document.documentElement.setAttribute(
      "data-cookie-preferences",
      String(consent.categories.preferences)
    );
    document.documentElement.setAttribute(
      "data-cookie-analytics",
      String(consent.categories.analytics)
    );
    document.documentElement.setAttribute(
      "data-cookie-marketing",
      String(consent.categories.marketing)
    );
  }, [consent]);

  const persistConsent = (nextConsent: CookieConsentState) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(nextConsent));
    setConsent(nextConsent);
    setIsBannerOpen(false);
    setIsModalOpen(false);
  };

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      isLoaded,
      isBannerOpen,
      isModalOpen,
      openBanner: () => setIsBannerOpen(true),
      openModal: () => {
        setIsBannerOpen(false);
        setIsModalOpen(true);
      },
      closeModal: () => setIsModalOpen(false),
      acceptAll: () =>
        persistConsent(
          buildConsentState({
            preferences: true,
            analytics: true,
            marketing: true,
          })
        ),
      acceptNecessaryOnly: () =>
        persistConsent(
          buildConsentState({
            preferences: false,
            analytics: false,
            marketing: false,
          })
        ),
      savePreferences: (categories) => persistConsent(buildConsentState(categories)),
      canUse: (category) => {
        if (category === "necessary") {
          return true;
        }

        return consent?.categories[category] ?? false;
      },
    }),
    [consent, isLoaded, isBannerOpen, isModalOpen]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }

  return context;
}
