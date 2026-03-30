"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

import { trackContactClick, trackPageView } from "@/lib/marketing";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";

const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const googleLoaderId = googleTagId || googleAdsId;

export default function TrackingProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { canUse, isLoaded } = useCookieConsent();

  const canTrack = isLoaded && canUse("analytics");
  const canMarket = isLoaded && canUse("marketing");

  useEffect(() => {
    if (!canTrack) return;

    const search = searchParams.toString();
    const path = search ? `${pathname}?${search}` : pathname;

    trackPageView(path);
  }, [pathname, searchParams, canTrack]);

  useEffect(() => {
    if (!canTrack) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href") ?? "";

      if (href.includes("wa.me")) {
        trackContactClick("whatsapp");
      } else if (href.startsWith("tel:")) {
        trackContactClick("phone");
      } else if (href.startsWith("mailto:")) {
        trackContactClick("email");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [canTrack]);

  return (
    <>
      {googleLoaderId && canTrack ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleLoaderId}`}
            strategy="afterInteractive"
          />
          <Script
            id="vsc-gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                ${
                  googleTagId
                    ? `gtag('config', '${googleTagId}', { send_page_view: false });`
                    : ""
                }
                ${
                  googleAdsId && canMarket
                    ? `gtag('config', '${googleAdsId}', { send_page_view: false });`
                    : ""
                }
              `,
            }}
          />
        </>
      ) : null}

      {metaPixelId && canMarket ? (
        <>
          <Script
            id="vsc-meta-pixel-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
              `,
            }}
          />
          <noscript>
            {/* Meta Pixel fallback requires a plain img beacon. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}
