export default function SuccessStep() {
  return (
    <div id="success">
      <div className="check-circle">✓</div>
      <h2>Anfrage erfolgreich gesendet!</h2>
      <p>
        Vielen Dank! Wir prüfen deine Angaben und melden uns in Kürze mit einer detaillierten
        Gehaltsanalyse bei dir.
      </p>
      <p className="success-cta-text">
        Noch schneller geht's mit einem kurzen Gespräch – buche dir direkt einen Termin.
      </p>
      <div className="success-cta-wrapper">
        <a href="#" className="success-cta-btn is-calendly">
          Termin buchen
        </a>
      </div>
    </div>
  );
}
