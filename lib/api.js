import { BASE_PATH } from "./config";

// Lokal (next dev) liegt die Seite wirklich unter BASE_PATH, Next erzwingt das
// Prefix selbst. Auf Webflow Cloud schreibt der Edge-Proxy den Mount-Path schon
// serverseitig um, die Seite erscheint dem Browser unter "/" - ein zusätzliches
// Prefix im Fetch würde dort einen doppelten, nicht existierenden Pfad ergeben
// (-> 404). Wir spiegeln deshalb einfach, wie die aktuelle Seite tatsächlich
// aufgerufen wurde, statt das Prefix hart zu verdrahten.
function apiUrl(path) {
  const hasBasePath = typeof window !== "undefined" && window.location.pathname.startsWith(BASE_PATH);
  return (hasBasePath ? BASE_PATH : "") + path;
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
