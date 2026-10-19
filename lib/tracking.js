// Events für Google Tag Manager / GA4. Die App wechselt die Schritte ohne neue URL,
// daher sieht GA4 Berechnung und Lead-Anfrage nur über diese dataLayer-Events.
// Keine personenbezogenen Daten (Name, E-Mail, Telefon) mitschicken.
export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
