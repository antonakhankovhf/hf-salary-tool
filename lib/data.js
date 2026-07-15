// Platzhalter-Daten, solange die echten Endpunkte fehlen.
// Later: Basisgehälter/Region-Faktoren kommen von der Gehalts-API,
// jobsSearched von Databricks/Leadscoring, candidatesCount & cvCount von Hforce.

// Basisgehälter (Brutto/Jahr) nach Berufsgruppen – Näherungswerte DACH.
// `label` ist der Anzeigename für die Autocomplete-Vorschläge im Formular.
// Verwandte Rollen teilen sich bewusst ein paar generische `keys` (z.B.
// "entwickler"/"developer" bei allen Dev-Rollen) – so schlägt die Suche bei
// einem generischen Begriff gleich alle passenden Spezialisierungen vor.
export const jobData = [
  // IT & Software
  { keys: ["softwareentwickler", "entwickler", "developer", "programmierer", "software engineer"], base: 65000, label: "Softwareentwickler" },
  { keys: ["frontend entwickler", "frontend developer", "front-end", "frontend", "entwickler", "developer"], base: 62000, label: "Frontend Entwickler" },
  { keys: ["backend entwickler", "backend developer", "back-end", "backend", "entwickler", "developer"], base: 66000, label: "Backend Entwickler" },
  { keys: ["fullstack entwickler", "full stack", "fullstack developer", "fullstack", "entwickler", "developer"], base: 68000, label: "Fullstack Entwickler" },
  { keys: ["web entwickler", "web developer", "entwickler", "developer"], base: 60000, label: "Web Entwickler" },
  { keys: ["ios entwickler", "ios developer", "swift entwickler", "entwickler", "developer"], base: 70000, label: "iOS Entwickler" },
  { keys: ["android entwickler", "android developer", "kotlin entwickler", "entwickler", "developer"], base: 68000, label: "Android Entwickler" },
  { keys: ["data scientist", "data science"], base: 72000, label: "Data Scientist" },
  { keys: ["data engineer", "entwickler", "developer"], base: 70000, label: "Data Engineer" },
  { keys: ["machine learning", "ml engineer", "ki engineer", "ai engineer", "entwickler", "developer"], base: 75000, label: "Machine Learning Engineer" },
  { keys: ["data analyst", "datenanalyst"], base: 58000, label: "Data Analyst" },
  { keys: ["devops", "devops engineer", "entwickler", "developer"], base: 68000, label: "DevOps Engineer" },
  { keys: ["cloud engineer", "cloud architect", "entwickler", "developer"], base: 70000, label: "Cloud Engineer" },
  { keys: ["system administrator", "systemadministrator", "sysadmin"], base: 55000, label: "Systemadministrator" },
  { keys: ["netzwerkadministrator", "network administrator"], base: 54000, label: "Netzwerkadministrator" },
  { keys: ["datenbankadministrator", "dba", "database administrator"], base: 60000, label: "Datenbankadministrator" },
  { keys: ["it-support", "it support", "helpdesk", "first level support"], base: 40000, label: "IT-Support" },
  { keys: ["qa engineer", "softwaretester", "tester", "quality assurance"], base: 52000, label: "QA Engineer" },
  { keys: ["security engineer", "it-sicherheit", "informationssicherheit", "cyber security"], base: 75000, label: "Security Engineer" },
  { keys: ["cybersecurity analyst", "security analyst"], base: 62000, label: "Cybersecurity Analyst" },
  { keys: ["solutions architect", "softwarearchitekt", "software architect"], base: 85000, label: "Solutions Architect" },
  { keys: ["scrum master", "agile coach"], base: 70000, label: "Scrum Master" },
  { keys: ["projektmanager", "project manager", "projektleiter"], base: 68000, label: "Projektmanager" },
  { keys: ["produktmanager", "product manager"], base: 72000, label: "Produktmanager" },
  { keys: ["product owner"], base: 68000, label: "Product Owner" },
  { keys: ["business analyst", "prozessmanager", "prozessmanagement"], base: 62000, label: "Business Analyst" },
  { keys: ["ux designer", "ux", "user experience"], base: 55000, label: "UX Designer" },
  { keys: ["ui designer", "ui", "user interface"], base: 52000, label: "UI Designer" },
  { keys: ["grafikdesigner", "grafik designer", "grafik"], base: 45000, label: "Grafikdesigner" },

  // Vertrieb & Marketing
  { keys: ["vertrieb", "sales", "vertriebsmitarbeiter"], base: 55000, label: "Vertriebsmitarbeiter" },
  { keys: ["account manager", "account executive"], base: 58000, label: "Account Manager" },
  { keys: ["key account manager"], base: 68000, label: "Key Account Manager" },
  { keys: ["marketing", "marketing manager"], base: 55000, label: "Marketing Manager" },
  { keys: ["seo", "seo manager", "search engine optimization"], base: 50000, label: "SEO Manager" },
  { keys: ["content manager", "content marketing"], base: 48000, label: "Content Manager" },
  { keys: ["social media manager", "social media"], base: 46000, label: "Social Media Manager" },
  { keys: ["performance marketing", "paid ads", "sea"], base: 55000, label: "Performance Marketing Manager" },

  // Personalwesen
  { keys: ["personalreferent", "personaler"], base: 50000, label: "Personalreferent" },
  { keys: ["recruiter", "talent acquisition", "talent"], base: 48000, label: "Recruiter" },
  { keys: ["personalsachbearbeiter", "hr"], base: 42000, label: "Personalsachbearbeiter" },

  // Ingenieurwesen
  { keys: ["maschinenbau", "maschinenbauingenieur", "ingenieur", "engineer"], base: 65000, label: "Maschinenbauingenieur" },
  { keys: ["elektrotechnik", "elektroingenieur", "ingenieur", "engineer"], base: 66000, label: "Elektroingenieur" },
  { keys: ["verfahrenstechnik", "verfahrenstechniker", "ingenieur", "engineer"], base: 63000, label: "Verfahrenstechniker" },
  { keys: ["bauingenieur", "statiker", "ingenieur", "engineer"], base: 62000, label: "Bauingenieur" },

  // Bau
  { keys: ["bauleiter"], base: 60000, label: "Bauleiter" },
  { keys: ["architekt"], base: 58000, label: "Architekt" },
  { keys: ["vermessungstechniker"], base: 48000, label: "Vermessungstechniker" },
  { keys: ["bautechniker"], base: 46000, label: "Bautechniker" },
  { keys: ["maurer"], base: 40000, label: "Maurer" },
  { keys: ["zimmerer", "zimmermann"], base: 42000, label: "Zimmerer" },
  { keys: ["betonbauer"], base: 40000, label: "Betonbauer" },

  // Gesundheit & Medizin
  { keys: ["krankenpfleger", "pflegefachkraft", "gesundheits- und krankenpfleger"], base: 44000, label: "Pflegefachkraft" },
  { keys: ["altenpfleger", "altenpflege"], base: 40000, label: "Altenpfleger" },
  { keys: ["arzt", "ärztin", "mediziner", "facharzt", "assistenzarzt"], base: 92000, label: "Arzt" },
  { keys: ["zahnarzt", "zahnärztin"], base: 85000, label: "Zahnarzt" },
  { keys: ["zahnmedizinische fachangestellte", "zfa"], base: 32000, label: "Zahnmedizinische Fachangestellte" },
  { keys: ["apotheker", "pharmazeutisch-technische assistentin", "pta"], base: 58000, label: "Apotheker" },
  { keys: ["physiotherapeut"], base: 38000, label: "Physiotherapeut" },
  { keys: ["ergotherapeut"], base: 37000, label: "Ergotherapeut" },
  { keys: ["logopäde", "logopaede"], base: 39000, label: "Logopäde" },
  { keys: ["hebamme"], base: 42000, label: "Hebamme" },
  { keys: ["rettungssanitäter", "rettungssanitaeter", "notfallsanitäter", "notfallsanitaeter", "rettungsdienst"], base: 38000, label: "Rettungs-/Notfallsanitäter" },

  // Recht & Finanzen
  { keys: ["anwalt", "jurist", "rechtsanwalt", "legal"], base: 75000, label: "Rechtsanwalt" },
  { keys: ["notar"], base: 90000, label: "Notar" },
  { keys: ["wirtschaftsprüfer", "wirtschaftspruefer"], base: 80000, label: "Wirtschaftsprüfer" },
  { keys: ["steuerfachangestellte", "steuerfachwirt"], base: 44000, label: "Steuerfachangestellte" },
  { keys: ["steuerberater", "tax consultant"], base: 78000, label: "Steuerberater" },
  { keys: ["buchhalter", "bilanzbuchhalter", "finanzbuchhalter", "accountant"], base: 52000, label: "Buchhalter" },
  { keys: ["controller", "controlling"], base: 62000, label: "Controller" },
  { keys: ["finanzanalyst"], base: 68000, label: "Finanzanalyst" },
  { keys: ["investmentbanker"], base: 95000, label: "Investmentbanker" },
  { keys: ["versicherungskaufmann", "kreditsachbearbeiter"], base: 46000, label: "Versicherungskaufmann" },

  // Logistik & Transport
  { keys: ["lagerist", "lager", "logistik", "fachkraft für lagerlogistik", "kommissionierer"], base: 36000, label: "Lagerist" },
  { keys: ["fahrer", "kraftfahrer", "lkw", "berufskraftfahrer"], base: 36000, label: "Berufskraftfahrer" },
  { keys: ["disponent"], base: 44000, label: "Disponent" },
  { keys: ["speditionskaufmann"], base: 40000, label: "Speditionskaufmann" },
  { keys: ["supply chain manager", "supply chain"], base: 65000, label: "Supply Chain Manager" },
  { keys: ["einkäufer", "einkaeufer", "einkauf", "procurement"], base: 55000, label: "Einkäufer" },

  // Handwerk
  { keys: ["elektriker", "elektroinstallateur"], base: 44000, label: "Elektriker" },
  { keys: ["elektroniker"], base: 46000, label: "Elektroniker" },
  { keys: ["mechatroniker"], base: 46000, label: "Mechatroniker" },
  { keys: ["industriemechaniker"], base: 45000, label: "Industriemechaniker" },
  { keys: ["schlosser"], base: 42000, label: "Schlosser" },
  { keys: ["schweißer", "schweisser"], base: 40000, label: "Schweißer" },
  { keys: ["schreiner", "tischler"], base: 40000, label: "Schreiner / Tischler" },
  { keys: ["maler", "lackierer"], base: 36000, label: "Maler / Lackierer" },
  { keys: ["dachdecker"], base: 38000, label: "Dachdecker" },
  { keys: ["klempner", "installateur", "sanitär", "sanitaer", "heizung"], base: 39000, label: "Klempner / SHK-Installateur" },
  { keys: ["gärtner", "gaertner", "landschaftsgärtner", "landschaftsgaertner"], base: 36000, label: "Gärtner" },

  // Handel & Büro
  { keys: ["verkäufer", "verkaeufer", "einzelhandel", "kaufmann im einzelhandel"], base: 34000, label: "Verkäufer" },
  { keys: ["bürokauffrau", "buerokauffrau", "bürokaufmann", "buerokaufmann"], base: 38000, label: "Bürokauffrau / Bürokaufmann" },
  { keys: ["sachbearbeiter", "office"], base: 39000, label: "Sachbearbeiter" },
  { keys: ["assistenz", "office manager"], base: 42000, label: "Assistenz / Office Manager" },
  { keys: ["empfangskraft", "rezeptionist", "rezeptionistin"], base: 34000, label: "Empfangskraft" },
  { keys: ["store manager", "filialleiter"], base: 45000, label: "Store Manager" },
  { keys: ["immobilienmakler", "immobilien"], base: 55000, label: "Immobilienmakler" },
  { keys: ["property manager", "hausverwaltung"], base: 50000, label: "Property Manager" },

  // Führung & Consulting
  { keys: ["geschäftsführer", "geschaeftsfuehrer", "ceo", "cfo", "cto", "director"], base: 120000, label: "Geschäftsführer" },
  { keys: ["teamleiter", "abteilungsleiter", "head of", "schichtleiter"], base: 82000, label: "Teamleiter" },
  { keys: ["consultant", "berater", "unternehmensberater"], base: 66000, label: "Unternehmensberater" },

  // Gastronomie
  { keys: ["koch", "köchin", "koechin", "küchenchef", "kuechenchef"], base: 34000, label: "Koch / Köchin" },
  { keys: ["kellner", "servicekraft", "hotelfachmann", "barista"], base: 30000, label: "Servicekraft" },
  { keys: ["bäcker", "baecker", "konditor"], base: 32000, label: "Bäcker" },
  { keys: ["fleischer", "metzger"], base: 32000, label: "Fleischer" },

  // Bildung & Soziales
  { keys: ["erzieher", "erzieherin"], base: 40000, label: "Erzieher" },
  { keys: ["sozialpädagoge", "sozialpaedagoge", "sozialarbeiter"], base: 44000, label: "Sozialpädagoge" },
  { keys: ["lehrer", "lehrerin"], base: 52000, label: "Lehrer" },
  { keys: ["dozent"], base: 50000, label: "Dozent" },
  { keys: ["ausbilder"], base: 48000, label: "Ausbilder" },

  // Wissenschaft
  { keys: ["chemiker"], base: 58000, label: "Chemiker" },
  { keys: ["biologe"], base: 54000, label: "Biologe" },
  { keys: ["physiker"], base: 60000, label: "Physiker" },
  { keys: ["laborant"], base: 38000, label: "Laborant" },

  // Produktion
  { keys: ["produktionsmitarbeiter", "fertigungsmechaniker"], base: 40000, label: "Produktionsmitarbeiter" },
  { keys: ["qualitätsmanager", "qualitaetsmanager", "qualitätssicherung", "qualitaetssicherung"], base: 58000, label: "Qualitätsmanager" },

  // Sonstiges
  { keys: ["hausmeister", "facility manager"], base: 38000, label: "Hausmeister / Facility Manager" },
  { keys: ["sicherheitsmitarbeiter", "wachmann", "werkschutz"], base: 32000, label: "Sicherheitsmitarbeiter" },
  { keys: ["reinigungskraft", "gebäudereiniger", "gebaeudereiniger"], base: 28000, label: "Reinigungskraft" },
  { keys: ["journalist", "redakteur"], base: 42000, label: "Journalist / Redakteur" },
  { keys: ["videograf", "video editor", "cutter"], base: 40000, label: "Videograf / Video Editor" },
  { keys: ["landwirt", "landwirtschaft"], base: 38000, label: "Landwirt" },
];

// Regionale Gehaltsfaktoren nach Stadt/Region – Näherungswerte DACH.
// Die Suche ist diakritik-unabhängig (siehe normalizeText in calculate.js),
// z.B. matcht "munchen" automatisch auf "münchen".
export const cityFactors = [
  // Deutschland – Top-Standorte
  { keys: ["münchen", "munich"], f: 1.14, label: "München" },
  { keys: ["frankfurt"], f: 1.1, label: "Frankfurt am Main" },
  { keys: ["stuttgart"], f: 1.08, label: "Stuttgart" },
  { keys: ["hamburg"], f: 1.06, label: "Hamburg" },
  { keys: ["düsseldorf"], f: 1.06, label: "Düsseldorf" },
  { keys: ["köln", "cologne"], f: 1.04, label: "Köln" },
  { keys: ["berlin"], f: 1.03, label: "Berlin" },
  { keys: ["wiesbaden"], f: 1.04, label: "Wiesbaden" },
  { keys: ["karlsruhe"], f: 1.02, label: "Karlsruhe" },
  { keys: ["mainz"], f: 1.02, label: "Mainz" },
  { keys: ["bonn"], f: 1.01, label: "Bonn" },
  // Deutschland – weitere Großstädte
  { keys: ["hannover"], f: 1.0, label: "Hannover" },
  { keys: ["nürnberg"], f: 1.0, label: "Nürnberg" },
  { keys: ["dortmund"], f: 0.98, label: "Dortmund" },
  { keys: ["essen"], f: 0.98, label: "Essen" },
  { keys: ["bremen"], f: 1.0, label: "Bremen" },
  { keys: ["duisburg"], f: 0.96, label: "Duisburg" },
  { keys: ["bochum"], f: 0.97, label: "Bochum" },
  { keys: ["wuppertal"], f: 0.96, label: "Wuppertal" },
  { keys: ["bielefeld"], f: 0.97, label: "Bielefeld" },
  { keys: ["münster"], f: 1.0, label: "Münster" },
  { keys: ["mannheim"], f: 1.02, label: "Mannheim" },
  { keys: ["augsburg"], f: 1.0, label: "Augsburg" },
  { keys: ["mönchengladbach"], f: 0.96, label: "Mönchengladbach" },
  { keys: ["braunschweig"], f: 0.98, label: "Braunschweig" },
  { keys: ["kiel"], f: 0.97, label: "Kiel" },
  { keys: ["aachen"], f: 0.98, label: "Aachen" },
  { keys: ["freiburg"], f: 1.02, label: "Freiburg im Breisgau" },
  { keys: ["krefeld"], f: 0.95, label: "Krefeld" },
  { keys: ["lübeck"], f: 0.96, label: "Lübeck" },
  { keys: ["oberhausen"], f: 0.94, label: "Oberhausen" },
  { keys: ["kassel"], f: 0.96, label: "Kassel" },
  { keys: ["hagen"], f: 0.93, label: "Hagen" },
  { keys: ["saarbrücken"], f: 0.95, label: "Saarbrücken" },
  { keys: ["potsdam"], f: 1.0, label: "Potsdam" },
  { keys: ["ludwigshafen"], f: 1.0, label: "Ludwigshafen am Rhein" },
  { keys: ["oldenburg"], f: 0.97, label: "Oldenburg" },
  { keys: ["osnabrück"], f: 0.97, label: "Osnabrück" },
  { keys: ["heidelberg"], f: 1.04, label: "Heidelberg" },
  { keys: ["darmstadt"], f: 1.04, label: "Darmstadt" },
  { keys: ["regensburg"], f: 1.02, label: "Regensburg" },
  { keys: ["würzburg"], f: 1.0, label: "Würzburg" },
  { keys: ["ingolstadt"], f: 1.05, label: "Ingolstadt" },
  { keys: ["wolfsburg"], f: 1.06, label: "Wolfsburg" },
  { keys: ["ulm"], f: 1.02, label: "Ulm" },
  { keys: ["heilbronn"], f: 1.02, label: "Heilbronn" },
  { keys: ["pforzheim"], f: 0.98, label: "Pforzheim" },
  { keys: ["göttingen"], f: 0.97, label: "Göttingen" },
  { keys: ["reutlingen"], f: 1.0, label: "Reutlingen" },
  { keys: ["koblenz"], f: 0.96, label: "Koblenz" },
  { keys: ["trier"], f: 0.94, label: "Trier" },
  { keys: ["jena"], f: 0.94, label: "Jena" },
  // Deutschland – Osten (niedrigere Referenzwerte)
  { keys: ["leipzig"], f: 0.92, label: "Leipzig" },
  { keys: ["dresden"], f: 0.92, label: "Dresden" },
  { keys: ["erfurt"], f: 0.9, label: "Erfurt" },
  { keys: ["magdeburg"], f: 0.89, label: "Magdeburg" },
  { keys: ["rostock"], f: 0.9, label: "Rostock" },
  { keys: ["chemnitz"], f: 0.88, label: "Chemnitz" },
  { keys: ["halle"], f: 0.89, label: "Halle (Saale)" },
  { keys: ["cottbus"], f: 0.87, label: "Cottbus" },
  { keys: ["schwerin"], f: 0.89, label: "Schwerin" },
  // Österreich
  { keys: ["wien", "vienna"], f: 1.0, label: "Wien" },
  { keys: ["graz"], f: 0.92, label: "Graz" },
  { keys: ["linz"], f: 0.95, label: "Linz" },
  { keys: ["salzburg"], f: 0.97, label: "Salzburg" },
  { keys: ["innsbruck"], f: 0.96, label: "Innsbruck" },
  { keys: ["klagenfurt"], f: 0.88, label: "Klagenfurt" },
  // Schweiz (deutlich höheres Lohnniveau)
  { keys: ["zürich", "zurich"], f: 1.55, label: "Zürich" },
  { keys: ["genf", "geneve", "geneva"], f: 1.5, label: "Genf" },
  { keys: ["basel"], f: 1.45, label: "Basel" },
  { keys: ["bern"], f: 1.4, label: "Bern" },
  { keys: ["lausanne"], f: 1.42, label: "Lausanne" },
  { keys: ["winterthur"], f: 1.35, label: "Winterthur" },
  { keys: ["luzern", "lucerne"], f: 1.35, label: "Luzern" },
  { keys: ["zug"], f: 1.55, label: "Zug" },
  { keys: ["st. gallen", "st gallen", "sankt gallen"], f: 1.3, label: "St. Gallen" },
  // Remote
  { keys: ["remote", "homeoffice", "home office"], f: 1.0, label: "Remote / Homeoffice" },
];

export const loadingSteps = [
  "Marktdaten werden geladen ...",
  "Stellenanzeigen im Umkreis werden analysiert ...",
  "Kandidatenpool wird abgeglichen ...",
  "Benchmark wird berechnet ...",
];

// Referenzradius, auf den die Mock-Formeln kalibriert sind (siehe Beispiel-Screens: 25 km)
export const REFERENCE_RADIUS_KM = 25;

export const radiusOptions = [
  { value: "5", label: "5 km" },
  { value: "10", label: "10 km" },
  { value: "25", label: "25 km" },
  { value: "50", label: "50 km" },
  { value: "75", label: "75 km" },
  { value: "100", label: "100 km" },
  { value: "150", label: "150 km" },
  { value: "200", label: "Deutschlandweit (200+ km)" },
];
