"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import SalaryForm from "@/components/SalaryForm";
import LoadingStep from "@/components/LoadingStep";
import ResultStep from "@/components/ResultStep";
import SuccessStep from "@/components/SuccessStep";
import { computeAverageSalary, computeBenchmark, findJobMatch, findCityMatch } from "@/lib/calculate";

const initialLead = { name: "", firma: "", email: "", telefon: "", consent: false };

export default function Home() {
  const [step, setStep] = useState("input"); // input | loading | result | success
  const [values, setValues] = useState({ jobtitel: "", region: "", radius: "" });
  const [errors, setErrors] = useState({ job: null, region: null, radius: null });
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

  function handleCalculate() {
    const job = values.jobtitel.trim();
    const region = values.region.trim();
    const radius = values.radius;

    const newErrors = {
      job: !job ? "required" : !findJobMatch(job) ? "unknown" : null,
      region: !region ? "required" : !findCityMatch(region) ? "unknown" : null,
      radius: !radius ? "required" : null,
    };
    setErrors(newErrors);
    if (newErrors.job || newErrors.region || newErrors.radius) return;

    setStep("loading");
  }

  function handleLoadingDone() {
    const job = values.jobtitel.trim();
    const region = values.region.trim();
    const radiusKm = parseFloat(values.radius);

    const { salary, base, cityFactor } = computeAverageSalary(job, region);
    const benchmark = computeBenchmark(job, region, radiusKm, cityFactor, base);

    setResult({ salary });
    setStats(benchmark);
    setStep("result");
  }

  function handleSubmitLead() {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadValues.email.trim());
    if (!leadValues.name.trim() || !validEmail || !leadValues.consent) {
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
          <SalaryForm values={values} errors={errors} onChange={handleChange} onSubmit={handleCalculate} />
        )}
        {step === "loading" && <LoadingStep onDone={handleLoadingDone} />}
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
