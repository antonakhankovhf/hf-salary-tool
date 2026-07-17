import { jobData, cityFactors, REFERENCE_RADIUS_KM } from "./data";

export function fmt(n) {
  return n.toLocaleString("de-DE") + " €";
}

export function round500(n) {
  return Math.round(n / 500) * 500;
}

// Deterministischer Pseudo-Zufall aus Job+Region+Radius (gleiche Eingabe = gleiche Zahlen)
export function seedFrom(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return function () {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
}

// Normalisiert Umlaute/Diakritika/Transliterationen, damit z.B. "munchen",
// "muenchen" und "münchen" beim Abgleich als gleich gelten.
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

// Liefert den passenden jobData-Eintrag oder undefined, falls der Jobtitel nicht bekannt ist.
export function findJobMatch(job) {
  const jl = normalizeText(job);
  return jobData.find((j) => j.keys.some((k) => jl.includes(normalizeText(k))));
}

// Liefert den passenden cityFactors-Eintrag oder undefined, falls die Region nicht bekannt ist.
export function findCityMatch(region) {
  const rl = normalizeText(region);
  return cityFactors.find((c) => c.keys.some((k) => rl.includes(normalizeText(k))));
}

// System-Output 2: Durchschnittsgehalt als einzelne Zahl (kein Min/Max mehr)
// Erwartet bereits validierte Werte (siehe findJobMatch/findCityMatch).
// Spanne um den Durchschnitt für die Min/Max-Anzeige (Marktschwankung, keine echten Perzentile).
const SALARY_RANGE_SPREAD = 0.12;

export function computeAverageSalary(job, region) {
  const base = findJobMatch(job)?.base ?? 48000;
  const cityFactor = findCityMatch(region)?.f ?? 1.0;
  const salary = round500(base * cityFactor);
  const min = round500(salary * (1 - SALARY_RANGE_SPREAD));
  const max = round500(salary * (1 + SALARY_RANGE_SPREAD));
  return { salary, min, max, base, cityFactor };
}

// candidatesPerJob liegt immer zwischen 9 und 25 (siehe computeBenchmark) –
// unabhängig vom Radius. describeCompetition() streckt das auf einen 0–100-Index
// (wenige Kandidaten pro Stelle => hoher Index => starker Wettbewerb) und
// ordnet ihn einer von drei Wettbewerbsstufen zu.
const CANDIDATES_PER_JOB_MIN = 9;
const CANDIDATES_PER_JOB_MAX = 25;

export function describeCompetition(candidatesPerJob) {
  const ratio =
    (CANDIDATES_PER_JOB_MAX - candidatesPerJob) / (CANDIDATES_PER_JOB_MAX - CANDIDATES_PER_JOB_MIN);
  const index = Math.round(Math.min(1, Math.max(0, ratio)) * 100);

  if (index < 34) {
    return { index, level: "good", qualifier: "Schwacher", label: "Schwacher Wettbewerb" };
  }
  if (index < 67) {
    return { index, level: "warning", qualifier: "Mittlerer", label: "Mittlerer Wettbewerb" };
  }
  return { index, level: "critical", qualifier: "Starker", label: "Starker Wettbewerb" };
}

// System-Output 1 & 3: Benchmark-Score (Jobs gesucht / Kandidaten bei Hforce) + Anzahl CVs
export function computeBenchmark(job, region, radiusKm, cityFactor, base) {
  const rnd = seedFrom((job + "|" + region + "|" + radiusKm).toLowerCase());

  const citySize = cityFactor >= 1.06 ? 3 : cityFactor >= 1.0 ? 2 : 1;
  const volume = base > 70000 ? 0.6 : base > 50000 ? 1 : 1.5;
  const radiusFactor = Math.max(radiusKm, 1) / REFERENCE_RADIUS_KM;
  const candidatesPerJob = CANDIDATES_PER_JOB_MIN + rnd() * (CANDIDATES_PER_JOB_MAX - CANDIDATES_PER_JOB_MIN);

  // SOURCE: Jobs gesucht in der Region (später: Databricks/Leadscoring)
  const jobsSearched = Math.max(1, Math.round((80 + rnd() * 220) * citySize * volume * radiusFactor));
  // SOURCE: Kandidaten im System (später: Hforce Profile Count)
  const candidatesCount = Math.max(1, Math.round(jobsSearched * candidatesPerJob * radiusFactor));
  // Weitere Kennzahl: Anzahl Lebensläufe im System (später: Hforce).
  // Nicht jedes Kandidatenprofil hat einen hinterlegten Lebenslauf, daher immer <= candidatesCount.
  const cvCount = Math.round(candidatesCount * (0.55 + rnd() * 0.3));
  // RESULT: Score = Jobs gesucht / Kandidaten-Anzahl
  const score = jobsSearched / candidatesCount;
  const competition = describeCompetition(candidatesPerJob);

  return { jobsSearched, candidatesCount, cvCount, score, competition };
}
