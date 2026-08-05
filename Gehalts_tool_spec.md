# Gehalts-Tool — what we need from your side

The salary calculator currently runs on mock (made-up) data hardcoded in the app.
To show real numbers, we need to pull data from your system.
We need 4 things:

---

## 1. Salary data

We send: **job title + city + radius (km)**.
You return: **average salary or min, max and average or min and max** (gross, EUR per year).

- Only `avg` is required. If you don't provide `min`/`max`, we calculate them ourselves (±12%).
- If the job title or city is unknown — return an error, e.g. `{ "error": "unknown_job" }`.

## 2. Market statistics

Same parameters (job + city + radius) — three numbers:

```json
{
  "jobsSearched": 480,      // open jobs searched within the radius
  "candidatesCount": 7200,  // candidate profiles in your database
  "cvCount": 5100           // how many of them have a CV attached
}
```

One combined endpoint or two separate ones — whatever is easier for you, just let us know.

## 3. Reference lists for form autocomplete

The form suggests job titles and cities while the user types, and rejects anything
not in the database. We need two lists — a one-time JSON file is fine:

```json
// job titles
[{ "label": "Softwareentwickler", "aliases": ["developer", "programmierer"] }]

// cities
[{ "label": "München", "aliases": ["Munich"] }]
```

`aliases` (alternative spellings) are optional but improve matching.

## 4. Lead submission endpoint

When a user submits the contact form, we need the URL of your CRM/system and an access key.
We will POST this payload:

```json
{
  "name": "Max Mustermann",
  "company": "ACME GmbH",
  "email": "max@acme.de",
  "phone": "+49 170 0000000",
  "consent": true,
  "request": {
    "job": "Buchhalter",
    "region": "München",
    "radiusKm": 25,
  }
}
```

---
