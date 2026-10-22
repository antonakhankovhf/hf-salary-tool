"use client";

import { useRef, useState } from "react";
import Hero from "@/components/Hero";
import SalaryForm from "@/components/SalaryForm";
import LoadingStep from "@/components/LoadingStep";
import ResultStep from "@/components/ResultStep";
import SuccessStep from "@/components/SuccessStep";
import { fetchMarketSnapshot, submitLead } from "@/lib/api";
import { describeCompetition } from "@/lib/calculate";
import { isValidEmail, isValidPhone, parseKununuScore } from "@/lib/validation";
import { track } from "@/lib/tracking";

const initialLead = {
  vorname: "",
  nachname: "",
  firma: "",
  email: "",
  telefon: "",
  erfahrung: "",
  kununuScore: "",
  consent: false,
};

export default function Home() {
  const [step, setStep] = useState("input"); // input | loading | result | success
  const [values, setValues] = useState({ jobtitel: "", region: "", radius: "" });
  const [errors, setErrors] = useState({ job: null, region: null, radius: null });
  const [apiError, setApiError] = useState(null);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);
  const [leadValues, setLeadValues] = useState(initialLead);
  const [leadError, setLeadError] = useState(false);
  const [leadScoreError, setLeadScoreError] = useState(false);
  const [leadPhoneError, setLeadPhoneError] = useState(false);
  const [leadApiError, setLeadApiError] = useState(null);
  const leadStarted = useRef(false);

  function handleChange(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function handleLeadChange(field, value) {
    setLeadValues((v) => ({ ...v, [field]: value }));
    if (!leadStarted.current) {
      leadStarted.current = true;
      track("gehaltscheck_lead_start");
    }
  }

  async function handleCalculate() {
    const job = values.jobtitel.trim();
    const region = values.region.trim();
    const radius = values.radius;

    const newErrors = {
      job: !job ? "required" : null,
      region: !region ? "required" : null,
      radius: !radius ? "required" : null,
    };
    setErrors(newErrors);
    if (newErrors.job || newErrors.region || newErrors.radius) return;

    setApiError(null);
    setStep("loading");

    try {
      const data = await fetchMarketSnapshot({
        jobTitle: job,
        location: region,
        radiusKm: Number(radius),
      });

      // Bei nicht eindeutig auflösbaren Orten liefert die API 200 OK, aber ohne
      // jobMarket/candidates (statt der dokumentierten 400) - das behandeln wir als Fehler.
      if (!data.jobMarket || !data.candidates) {
        throw new Error(
          "Für diese Kombination aus Jobtitel und Region konnten wir keine Marktdaten finden. Bitte prüfe die Eingabe."
        );
      }

      setResult({
        salary: data.jobMarket.avgYearlySalary,
        min: data.jobMarket.minYearlySalary,
        max: data.jobMarket.maxYearlySalary,
      });
      setStats({
        jobsSearched: data.jobMarket.openJobsCount,
        candidatesCount: data.candidates.matchingCandidates,
        candidatesCapped: data.candidates.capped,
        competition: describeCompetition(data.jobMarket.openJobsCount, data.candidates.matchingCandidates),
      });
      setStep("result");
      track("gehaltscheck_calculate", {
        job_title: job,
        region,
        radius_km: Number(radius),
        avg_salary: data.jobMarket.avgYearlySalary,
      });
    } catch (err) {
      setApiError(err.message);
      setStep("input");
      track("gehaltscheck_calculate_error", { job_title: job, region, radius_km: Number(radius), error_message: err.message });
    }
  }

  async function handleSubmitLead() {
    const phone = leadValues.telefon.trim();

    // Erstes ungültiges Feld in fester Reihenfolge - die Werte gehen nicht an GA4, nur der Feldname.
    let invalidField = null;
    if (!leadValues.vorname.trim()) invalidField = "first_name";
    else if (!leadValues.nachname.trim()) invalidField = "last_name";
    else if (!isValidEmail(leadValues.email.trim())) invalidField = "email";
    else if (!leadValues.consent) invalidField = "consent";
    else if (phone && !isValidPhone(phone)) invalidField = "phone";
    else if (Number.isNaN(parseKununuScore(leadValues.kununuScore.trim()))) invalidField = "kununu_score";

    if (invalidField) {
      setLeadError(!["phone", "kununu_score"].includes(invalidField));
      setLeadPhoneError(invalidField === "phone");
      setLeadScoreError(invalidField === "kununu_score");
      track("gehaltscheck_lead_invalid", { invalid_field: invalidField });
      return;
    }

    setLeadError(false);
    setLeadScoreError(false);
    setLeadPhoneError(false);
    setLeadApiError(null);

    try {
      await submitLead({
        vorname: leadValues.vorname.trim(),
        nachname: leadValues.nachname.trim(),
        firma: leadValues.firma.trim(),
        email: leadValues.email.trim(),
        telefon: phone,
        erfahrung: leadValues.erfahrung,
        kununuScore: leadValues.kununuScore.trim(),
        consent: leadValues.consent,
        job: values.jobtitel.trim(),
        region: values.region.trim(),
        radiusKm: Number(values.radius),
      });
      setStep("success");
      track("gehaltscheck_lead_submit", {
        job_title: values.jobtitel.trim(),
        region: values.region.trim(),
        radius_km: Number(values.radius),
        has_phone: Boolean(phone),
        min_experience: leadValues.erfahrung || "",
      });
    } catch (err) {
      setLeadApiError(err.message);
      track("gehaltscheck_lead_error", { error_message: err.message });
    }
  }

  function handleBack() {
    setStep("input");
  }

  return (
    <div className="page">
      <Hero />
      <div className="card">
        {step === "input" && (
          <SalaryForm
            values={values}
            errors={errors}
            apiError={apiError}
            onChange={handleChange}
            onSubmit={handleCalculate}
          />
        )}
        {step === "loading" && <LoadingStep />}
        {step === "result" && (
          <ResultStep
            job={values.jobtitel.trim()}
            region={values.region.trim()}
            radius={values.radius}
            result={result}
            stats={stats}
            leadValues={leadValues}
            leadError={leadError}
            leadScoreError={leadScoreError}
            leadPhoneError={leadPhoneError}
            leadApiError={leadApiError}
            onLeadChange={handleLeadChange}
            onSubmitLead={handleSubmitLead}
            onBack={handleBack}
          />
        )}
        {step === "success" && <SuccessStep />}
      </div>
    </div>
  );
}
