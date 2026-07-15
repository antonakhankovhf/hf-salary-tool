"use client";

import { fmt } from "@/lib/calculate";
import CompetitionGauge from "./CompetitionGauge";

export default function ResultStep({
  job,
  region,
  radius,
  result,
  stats,
  leadValues,
  leadError,
  onLeadChange,
  onSubmitLead,
  onBack,
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmitLead();
    }
  }

  return (
    <div id="result">
      <button className="back-btn" onClick={onBack}>
        <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13 8H3M3 8L7 4M3 8L7 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Neue Suche
      </button>
      <div className="eyebrow">Dein Ergebnis</div>
      <h1 id="result-title">Gehaltsprognose</h1>
      <p className="intro" id="result-subtitle">
        Für die Position <b>„{job}“</b> in {region} (Umkreis <b>{radius}</b> km) haben wir folgende Werte
        ermittelt:
      </p>

      <div className="result-box">
        <div className="result-label">Durchschnittliches Bruttogehalt / Jahr</div>
        <div className="result-range" id="range-text">
          {fmt(result.salary)}
        </div>
        <p className="result-note">
          Dieser Wert ist eine erste Einschätzung auf Basis von Marktdaten. Faktoren wie Branche,
          Unternehmensgröße und Benefits können das Ergebnis deutlich beeinflussen.
        </p>
      </div>

      <div className="stats-title">
        Benchmark: {job} in {region}
      </div>

      <CompetitionGauge job={job} region={region} competition={stats.competition} />

      <div className="stats-grid stats-grid-3">
        <div className="stat-tile">
          <div className="stat-value">{stats.jobsSearched.toLocaleString("de-DE")}</div>
          <div className="stat-label">
            Gesuchte Stellen
            <br />
            im Umkreis
          </div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{stats.candidatesCount.toLocaleString("de-DE")}</div>
          <div className="stat-label">
            Kandidaten im System
            <br />
            (Hforce)
          </div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{stats.cvCount.toLocaleString("de-DE")}</div>
          <div className="stat-label">
            Lebensläufe im System
            <br />
            (Hforce)
          </div>
        </div>
      </div>

      <div className="section-title">Genaue Analyse anfordern</div>
      <p className="intro" style={{ marginBottom: 24 }}>
        Du möchtest eine detaillierte Gehaltsanalyse für deine Stelle? Hinterlasse deine
        Kontaktdaten und wir melden uns mit einer ehrlichen Einschätzung bei dir.
      </p>

      <div className="row">
        <div className="field-group">
          <label htmlFor="name">Vorname &amp; Nachname</label>
          <input
            type="text"
            id="name"
            placeholder="Max Mustermann"
            value={leadValues.name}
            onChange={(e) => onLeadChange("name", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="field-group">
          <label htmlFor="firma">Unternehmen</label>
          <input
            type="text"
            id="firma"
            placeholder="Muster GmbH"
            value={leadValues.firma}
            onChange={(e) => onLeadChange("firma", e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="email">E-Mail-Adresse</label>
        <input
          type="email"
          id="email"
          placeholder="company@mail.de"
          value={leadValues.email}
          onChange={(e) => onLeadChange("email", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="field-group">
        <label htmlFor="telefon">Telefon</label>
        <input
          type="tel"
          id="telefon"
          placeholder="+49 ..."
          value={leadValues.telefon}
          onChange={(e) => onLeadChange("telefon", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="consent">
        <input
          type="checkbox"
          id="consent"
          checked={leadValues.consent}
          onChange={(e) => onLeadChange("consent", e.target.checked)}
        />
        <p>
          Mit der Anforderung einer Gehaltsanalyse willigst du freiwillig in die Übermittlung von
          E-Mails und die Kontaktaufnahme per Telefon ein. Du kannst deine Einwilligung jederzeit
          mit Wirkung für die Zukunft widerrufen. Durch den Widerruf der Einwilligung wird die
          Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung
          nicht berührt. Mit deiner Handlung bestätigst du ebenfalls, die{" "}
          <a href="#">Datenschutzerklärung</a> und das <a href="#">Transparenzdokument</a> gelesen
          und zur Kenntnis genommen zu haben.
        </p>
      </div>
      {leadError && (
        <div className="error-msg" style={{ display: "block", marginBottom: 8 }}>
          Bitte fülle Name und E-Mail aus und bestätige die Einwilligung.
        </div>
      )}

      <button className="btn" onClick={onSubmitLead}>
        Analyse anfordern &nbsp;→
      </button>
      <p className="footnote">Kostenlos &amp; unverbindlich. Wir melden uns innerhalb von 24 Stunden bei dir.</p>
    </div>
  );
}
