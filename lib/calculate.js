export function fmt(n) {
  return n.toLocaleString("de-DE") + " €";
}

// Normalisiert Umlaute/Diakritika/Transliterationen, damit z.B. "munchen",
// "muenchen" und "münchen" beim Abgleich als gleich gelten (für die Autocomplete-Suche).
export function normalizeText(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // ä/ö/ü/é/... -> a/o/u/e/...
    .replace(/ue/g, "u")
    .replace(/oe/g, "o")
    .replace(/ae/g, "a");
}

// Ordnet das Verhältnis offene Stellen / passende Kandidaten (aus der Hforce
// Market-Snapshot-API) einer von drei Wettbewerbsstufen zu. >=2 Stellen pro
// Kandidat gilt als maximaler Wettbewerb (Index 100), 0 Stellen pro Kandidat
// als keiner (Index 0).
const JOBS_PER_CANDIDATE_MAX = 2;

export function describeCompetition(openJobsCount, candidatesCount) {
  const jobsPerCandidate = openJobsCount / Math.max(candidatesCount, 1);
  const ratio = Math.min(1, Math.max(0, jobsPerCandidate / JOBS_PER_CANDIDATE_MAX));
  const index = Math.round(ratio * 100);

  if (index < 34) {
    return { index, level: "good", qualifier: "Schwacher", label: "Schwacher Wettbewerb" };
  }
  if (index < 67) {
    return { index, level: "warning", qualifier: "Mittlerer", label: "Mittlerer Wettbewerb" };
  }
  return { index, level: "critical", qualifier: "Starker", label: "Starker Wettbewerb" };
}
