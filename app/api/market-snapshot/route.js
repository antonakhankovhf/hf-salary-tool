const HFORCE_ENDPOINT = "https://api.hforce.ai/digital-recruiter/candidates/market-snapshot";

// Läuft server-seitig, damit der HFORCE_API_KEY nie an den Browser geht.
export async function POST(request) {
  const apiKey = process.env.HFORCE_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "HFORCE_API_KEY ist auf dem Server nicht konfiguriert." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ungültiger Request-Body." }, { status: 400 });
  }

  const { jobTitle, location, radiusKm } = body ?? {};
  if (!jobTitle || !location) {
    return Response.json({ error: "jobTitle und location sind erforderlich." }, { status: 400 });
  }

  let upstreamRes;
  try {
    upstreamRes = await fetch(HFORCE_ENDPOINT, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        jobTitle,
        location,
        ...(radiusKm ? { radiusKm } : {}),
      }),
    });
  } catch {
    return Response.json({ error: "Der Marktdaten-Dienst ist gerade nicht erreichbar." }, { status: 502 });
  }

  const data = await upstreamRes.json().catch(() => null);

  if (!upstreamRes.ok) {
    return Response.json(
      { error: data?.message || data?.error || "Marktdaten konnten nicht geladen werden." },
      { status: upstreamRes.status }
    );
  }

  return Response.json(data);
}
