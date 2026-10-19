"use client";

import { useEffect } from "react";

// Der Custom Code der Webflow-Site (inkl. GTM) wird in die Webflow-Cloud-App
// nicht eingebunden - daher hier nachgebaut.
// GTM wird nur auf der Live-Domain geladen, damit Staging (*.webflow.io) und die
// Vorschau im Webflow Designer (*.canvas.webflow.com, Titel "Canvas App")
// keine Daten in GA4 schreiben.
const GTM_ID = "GTM-KDGGDWXB";
const LIVE_HOSTNAMES = ["www.headfound.com", "headfound.com"];

export default function GoogleTagManager() {
  useEffect(() => {
    if (!LIVE_HOSTNAMES.includes(window.location.hostname)) return;
    if (window.__hfGtmLoaded) return;
    window.__hfGtmLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
