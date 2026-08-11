"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import SalaryForm from "@/components/SalaryForm";
import LoadingStep from "@/components/LoadingStep";
import ResultStep from "@/components/ResultStep";
import SuccessStep from "@/components/SuccessStep";
import { fetchMarketSnapshot } from "@/lib/api";
import { describeCompetition } from "@/lib/calculate";

const initialLead = {
  name: "",
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

  function handleSubmitLead() {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadValues.email.trim());
    if (!leadValues.name.trim() || !validEmail || !leadValues.telefon.trim() || !leadValues.consent) {
      setLeadError(true);
      return;
    }
    setLeadError(false);
    // TODO: Formulardaten an Backend/CRM senden (fetch POST)
    setStep("success");
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
