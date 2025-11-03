"use client"

import { useEffect } from "react"
import Script from "next/script"

interface MetaPixelProps {
  pixelId: string
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  useEffect(() => {
    // Initialize fbq if not already present
    if (typeof window !== "undefined" && pixelId) {
      // @ts-ignore
      window.fbq = function () {
        // @ts-ignore
        window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments)
      }
      // @ts-ignore
      if (!window._fbq) window._fbq = window.fbq
      // @ts-ignore
      window.fbq.push = window.fbq
      // @ts-ignore
      window.fbq.loaded = true
      // @ts-ignore
      window.fbq.version = "2.0"
      // @ts-ignore
      window.fbq.queue = []
    }
  }, [pixelId])

  if (!pixelId) return null

  return (
    <>
      <Script
        id="meta-pixel-init"
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
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt="Meta Pixel"
        />
      </noscript>
    </>
  )
}
