export default function SuccessStep() {
  return (
    <div id="success">
      <div className="check-circle">✓</div>
      <h2>Anfrage erfolgreich gesendet!</h2>
      <p className="success-cta-text">
        Bitte bestätige noch deine E-Mail-Adresse. Wir haben dir dafür gerade eine E-Mail geschickt. Erst nach deiner Bestätigung können wir dir deine Gehaltsanalyse zusenden.
      </p>
      <p className="success-cta-text">
        Keine E-Mail da? Schau bitte auch im Spam-Ordner nach.
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
