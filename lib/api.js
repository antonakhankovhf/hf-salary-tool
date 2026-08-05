import { BASE_PATH } from "./config";

// Ruft unsere eigene API-Route auf (nicht Hforce direkt) - der API-Key bleibt server-seitig.
export async function fetchMarketSnapshot({ jobTitle, location, radiusKm }) {
  const res = await fetch(`${BASE_PATH}/api/market-snapshot`, {
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
