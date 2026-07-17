export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-eyebrow">Gehalts-Check für Arbeitgeber</div>
      <h2>
        Zahlst du genug, um <span className="accent-bg">die Stelle zu besetzen</span>?
      </h2>
      <p className="hero-sub">
        Zu niedrige Gehälter sind der häufigste Grund, warum Stellen unbesetzt bleiben. Der Gehalts-Check zeigt dir in Sekunden, welches Gehalt am Markt realistisch ist – auf Basis aktueller Vergütungsdaten aus dem DACH-Raum.
      </p>
      <ul className="hero-points">
        <li>
          <span className="tick">✓</span>
          <div>
            <strong>Marktdaten in Echtzeit</strong>
            <p>Prognose auf Basis tausender aktueller Stellenanzeigen, eigener Daten und Vergütungsdaten.</p>
          </div>
        </li>
        <li>
          <span className="tick">✓</span>
          <div>
            <strong>Regional &amp; nach Suchradius</strong>
            <p>Region und Suchradius fließen direkt in die Gehaltsprognose und den Benchmark ein.</p>
          </div>
        </li>
        <li>
          <span className="tick">✓</span>
          <div>
            <strong>Ehrliche Einschätzung</strong>
            <p>
              Auf Wunsch melden wir uns mit einer detaillierten Analyse deiner Stelle. Kostenlos und unverbindlich.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
