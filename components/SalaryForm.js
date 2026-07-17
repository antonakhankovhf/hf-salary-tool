"use client";

import { jobData, cityFactors, radiusOptions } from "@/lib/data";
import Autocomplete from "./Autocomplete";

export default function SalaryForm({ values, errors, onChange, onSubmit }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <div id="step-input">
      <div className="eyebrow">KOSTENLOSER GEHALTS-CHECK FÜR ARBEITEGBER</div>
      <h1>Was ist deine Stelle wirklich wert?</h1>
      <p className="intro">
        Jobtitel und Standort eingeben, Ergebnis in Sekunden – auf Basis aktueller Vergütungsdaten aus dem DACH-Raum.
      </p>

      <div className="section-title">Zur Stelle</div>

      <div className="field-group">
        <label htmlFor="jobtitel">Jobtitel / Qualifikation</label>
        <Autocomplete
          id="jobtitel"
          placeholder="z.B. Buchhalter (Bitte nur den Jobtitel ohne Ergänzungen eingeben)"
          value={values.jobtitel}
          onChange={(value) => onChange("jobtitel", value)}
          onSubmit={onSubmit}
          options={jobData}
        />
        {errors.job && (
          <div className="error-msg" style={{ display: "block" }}>
            {errors.job === "unknown"
              ? "Diesen Jobtitel konnten wir nicht zuordnen. Bitte nutze eine gängige Berufsbezeichnung (z. B. Buchhalter, Softwareentwickler, Vertrieb ...)."
              : "Bitte gib einen Jobtitel ein."}
          </div>
        )}
      </div>

      <div className="row">
        <div className="field-group">
          <label htmlFor="region">Region</label>
          <Autocomplete
            id="region"
            placeholder="z.B. München, remote ..."
            value={values.region}
            onChange={(value) => onChange("region", value)}
            onSubmit={onSubmit}
            options={cityFactors}
          />
          {errors.region && (
            <div className="error-msg" style={{ display: "block" }}>
              {errors.region === "unknown"
                ? "Diese Region konnten wir nicht zuordnen. Bitte nutze eine Stadt im DACH-Raum oder 'remote'."
                : "Bitte gib eine Region ein."}
            </div>
          )}
        </div>
        <div className="field-group">
          <label htmlFor="radius">Suchradius</label>
          <select
            id="radius"
            value={values.radius}
            onChange={(e) => onChange("radius", e.target.value)}
            onKeyDown={handleKeyDown}
          >
            <option value="" disabled>
              Bitte wählen ...
            </option>
            {radiusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.radius && (
            <div className="error-msg" style={{ display: "block" }}>
              Bitte wähle einen Suchradius.
            </div>
          )}
        </div>
      </div>

      <button className="btn" onClick={onSubmit}>
        Jetzt berechnen
      </button>
      <p className="footnote">Die Prognose basiert auf aktuellen Markt- und Vergütungsdaten im DACH-Raum.</p>
    </div>
  );
}
