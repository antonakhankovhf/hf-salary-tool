"use client";

import { useEffect } from "react";

// Der Custom Code der Webflow-Site (Calendly-Popup für alle .is-calendly-Buttons)
// wird in die Webflow-Cloud-App nicht eingebunden - daher hier nachgebaut,
// 1:1 nach dem Skript auf headfound.com (inkl. dataLayer-Events).
const CALENDAR_NAME = "sophie-janssen";
const CALENDLY_URL = "https://calendly.com/headfound-de/meeting-mit-sophie-janssen?hide_gdpr_banner=1";

export default function CalendlyPopup() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    let lastCalendar = null;
    let isLoading = false;

    function handleMessage(e) {
      if (e.origin !== "https://calendly.com") return;
      if (!e.data || typeof e.data.event !== "string") return;
      if (e.data.event.indexOf("calendly.") !== 0) return;
      window.dataLayer.push({
        event: "calendly",
        calendlyStep: e.data.event.replace("calendly.", ""),
        calendlyCalendar: lastCalendar,
      });
    }

    function handleClick(e) {
      const btn = e.target.closest(".is-calendly");
      if (!btn) return;
      e.preventDefault();

      lastCalendar = CALENDAR_NAME;
      window.dataLayer.push({ event: "calendly_open", calendlyCalendar: CALENDAR_NAME });

      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        return;
      }
      if (isLoading) return;
      isLoading = true;

      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(css);

      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.onload = () => {
        isLoading = false;
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      };
      document.body.appendChild(script);
    }

    window.addEventListener("message", handleMessage);
    document.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
