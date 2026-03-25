const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const googleAdsLeadLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

function isBrowser() {
  return typeof window !== "undefined";
}

export function trackPageView(path: string) {
  if (!isBrowser()) return;

  if (window.gtag) {
    if (googleTagId) {
      window.gtag("config", googleTagId, {
        page_path: path,
      });
    }

    if (googleAdsId) {
      window.gtag("config", googleAdsId, {
        page_path: path,
      });
    }
  }

  if (metaPixelId && window.fbq) {
    window.fbq("track", "PageView");
  }
}

type LeadParams = {
  projectType?: string;
  budget?: string;
  source?: string;
};

export function trackLead(params: LeadParams = {}) {
  if (!isBrowser()) return;

  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "contact",
      event_label: params.projectType ?? "formular_contact",
      value: 1,
      currency: "EUR",
      project_type: params.projectType,
      budget_range: params.budget,
      source: params.source ?? "contact_form",
    });

    if (googleAdsId && googleAdsLeadLabel) {
      window.gtag("event", "conversion", {
        send_to: `${googleAdsId}/${googleAdsLeadLabel}`,
        value: 1,
        currency: "EUR",
      });
    }
  }

  if (metaPixelId && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: params.projectType ?? "formular_contact",
      status: "submitted",
      budget_range: params.budget,
      source: params.source ?? "contact_form",
    });
  }
}

export function trackContactClick(channel: "whatsapp" | "phone" | "email") {
  if (!isBrowser()) return;

  if (window.gtag) {
    window.gtag("event", "contact_click", {
      event_category: "contact",
      event_label: channel,
      method: channel,
    });
  }

  if (metaPixelId && window.fbq) {
    window.fbq("trackCustom", "ContactClick", {
      method: channel,
    });
  }
}
