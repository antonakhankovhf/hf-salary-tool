"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import SalaryForm from "@/components/SalaryForm";
import LoadingStep from "@/components/LoadingStep";
import ResultStep from "@/components/ResultStep";
import SuccessStep from "@/components/SuccessStep";
import { fetchMarketSnapshot, submitLead } from "@/lib/api";
import { describeCompetition } from "@/lib/calculate";
import { isValidEmail, isValidPhone, parseKununuScore } from "@/lib/validation";

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

  function handleChange(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function handleLeadChange(field, value) {
    setLeadValues((v) => ({ ...v, [field]: value }));
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
    } catch (err) {
      setApiError(err.message);
      setStep("input");
    }
  }

  async function handleSubmitLead() {
    const validEmail = isValidEmail(leadValues.email.trim());
    if (
      !leadValues.vorname.trim() ||
      !leadValues.nachname.trim() ||
      !validEmail ||
      !leadValues.consent
    ) {
      setLeadError(true);
      setLeadScoreError(false);
      setLeadPhoneError(false);
      return;
    }

    const phone = leadValues.telefon.trim();
    if (phone && !isValidPhone(phone)) {
      setLeadPhoneError(true);
      setLeadError(false);
      setLeadScoreError(false);
      return;
    }

    if (Number.isNaN(parseKununuScore(leadValues.kununuScore.trim()))) {
      setLeadScoreError(true);
      setLeadError(false);
      setLeadPhoneError(false);
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
    } catch (err) {
      setLeadApiError(err.message);
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
