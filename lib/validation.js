// Gemeinsame Regeln für das Lead-Formular: der Browser nutzt sie für sofortiges
// Feedback, die API-Route /api/lead noch einmal - nur die Server-Prüfung lässt
// sich nicht umgehen (z.B. bei direkten Requests von Bots).
import { experienceOptions, radiusOptions } from "./data";

export const MAX_LENGTH = 100;

export function isValidEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Nur Ziffern, Leerzeichen, ()/-, "+" nur vorne, 6–15 Ziffern (E.164).
export function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "").length;
  return /^\+?[\d\s()\/-]+$/.test(phone) && digits >= 6 && digits <= 15;
}

// "" -> null, "3,8"/"3.8" -> 3.8, alles außerhalb 1–5 -> NaN.
export function parseKununuScore(raw) {
  if (raw === "") return null;
  const score = Number(raw.replace(",", "."));
  return score >= 1 && score <= 5 ? score : NaN;
}

const str = (v) => (typeof v === "string" ? v.trim() : "");

// Prüft einen Lead-Request vollständig. Liefert { data } mit bereinigten Werten
// oder { error } mit einer Meldung für den Client.
export function validateLead(body) {
  const b = body ?? {};
  const data = {
    vorname: str(b.vorname),
    nachname: str(b.nachname),
    firma: str(b.firma),
    email: str(b.email),
    telefon: str(b.telefon),
    erfahrung: str(b.erfahrung),
    kununuScore: str(b.kununuScore),
    job: str(b.job),
    region: str(b.region),
    radiusKm: Number(b.radiusKm) || null,
  };

  if (!data.vorname || !data.nachname || !data.email || b.consent !== true) {
    return { error: "Vorname, Nachname, E-Mail und Einwilligung sind erforderlich." };
  }
  const tooLong = ["vorname", "nachname", "firma", "job", "region"].find((k) => data[k].length > MAX_LENGTH);
  if (tooLong) return { error: `Feld "${tooLong}" ist zu lang.` };
  if (!isValidEmail(data.email)) return { error: "Ungültige E-Mail-Adresse." };
  if (data.telefon && !isValidPhone(data.telefon)) return { error: "Ungültige Telefonnummer." };
  if (data.erfahrung && !experienceOptions.some((o) => o.value === data.erfahrung)) {
    return { error: "Ungültige Berufserfahrung." };
  }
  if (Number.isNaN(parseKununuScore(data.kununuScore))) return { error: "Kununu-Score muss zwischen 1 und 5 liegen." };
  if (data.radiusKm !== null && !radiusOptions.some((o) => Number(o.value) === data.radiusKm)) {
    return { error: "Ungültiger Radius." };
  }

  // Score bleibt ein String wie bisher ("3.8"), das CRM erwartet dieses Format.
  return { data: { ...data, kununuScore: data.kununuScore.replace(",", ".") } };
}
