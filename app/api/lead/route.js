// Läuft server-seitig, damit die Webhook-URL nie an den Browser geht.
export async function POST(request) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ error: "LEAD_WEBHOOK_URL ist auf dem Server nicht konfiguriert." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ungültiger Request-Body." }, { status: 400 });
  }

  const { vorname, nachname, firma, email, telefon, erfahrung, kununuScore, consent, job, region, radiusKm } =
    body ?? {};
  if (!vorname || !nachname || !email || !telefon || !consent) {
    return Response.json(
      { error: "vorname, nachname, email, telefon und consent sind erforderlich." },
      { status: 400 }
    );
  }

  const payload = {
    firstName: vorname,
    lastName: nachname,
    name: `${vorname} ${nachname}`,
    company: firma || null,
    email,
    phone: telefon,
    consent: true,
    consentGivenAt: new Date().toISOString(),
    request: {
      job: job || null,
      region: region || null,
      radiusKm: radiusKm || null,
      minExperience: erfahrung || null,
      kununuScore: kununuScore || null,
    },
  };

  let upstreamRes;
  try {
    upstreamRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return Response.json({ error: "Der Lead-Dienst ist gerade nicht erreichbar." }, { status: 502 });
  }

  if (!upstreamRes.ok) {
    return Response.json({ error: "Die Anfrage konnte nicht übermittelt werden." }, { status: upstreamRes.status });
  }

  return Response.json({ ok: true });
}
