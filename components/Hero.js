export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-eyebrow">Gehalts-Check für Arbeitgeber</div>
      <h2>
        Finde mit unserem kostenlosen <span className="accent-bg">Gehalts-Check heraus</span>, was deine Stelle{" "}
        wirklich wert ist.
      </h2>
      <p className="hero-sub">
        Zu niedrige Gehälter sind der häufigste Grund, warum Stellen unbesetzt bleiben. Unser
        Predictor zeigt dir in Sekunden, welches Gehalt am Markt realistisch ist – basierend auf
        aktuellen Vergütungsdaten im DACH-Raum.
      </p>
      <ul className="hero-points">
        <li>
          <span className="tick">✓</span>
          <div>
            <strong>Marktdaten in Echtzeit</strong>
            <p>Prognose auf Basis tausender aktueller Stellenanzeigen und Vergütungsdaten.</p>
          </div>
        </li>
        <li>
          <span className="tick">✓</span>
          <div>
            <strong>Regional &amp; nach Suchradius</strong>
            <p>Region und Suchradius fließen direkt in die Gehaltsanalyse und den Benchmark ein.</p>
          </div>
        </li>
        <li>
          <span className="tick">✓</span>
          <div>
            <strong>Ehrliche Einschätzung</strong>
            <p>
              Auf Wunsch melden wir uns mit einer detaillierten Analyse für deine Stelle –
              kostenlos &amp; unverbindlich.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
