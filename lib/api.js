// Die App hat nur eine Seite ("/"), ihr Pfad im Browser ist also genau der
// Mount-Path: lokal "/gehalts-tool", auf der webflow.io-Testdomain "/", auf
// headfound.com "/gehalts-check". Wir leiten das Prefix daraus ab, statt es
// hart zu verdrahten - der Mount-Path kann je nach Webflow-Site abweichen.
function apiUrl(path) {
  const base = typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") : "";
  return base + path;
}

// Ruft unsere eigene API-Route auf (nicht Hforce direkt) - der API-Key bleibt server-seitig.
export async function fetchMarketSnapshot({ jobTitle, location, radiusKm }) {
  const res = await fetch(apiUrl("/api/market-snapshot"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobTitle, location, radiusKm }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || "Marktdaten konnten nicht geladen werden.");
  }

  return data;
}

// Ruft unsere eigene API-Route auf, die den Lead an den Webhook weiterleitet
// (Webhook-URL bleibt server-seitig).
export async function submitLead(payload) {
  const res = await fetch(apiUrl("/api/lead"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || "Anfrage konnte nicht gesendet werden.");
  }

  return data;
}
