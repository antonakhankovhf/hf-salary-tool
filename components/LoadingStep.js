"use client";

import { useEffect, useState } from "react";
import { loadingSteps } from "@/lib/data";

// Rein kosmetisch: die eigentliche Fertigstellung steuert page.js über das
// Promise von fetchMarketSnapshot(), nicht dieser Timer.
export default function LoadingStep() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i + 1) % loadingSteps.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min(96, 15 + stepIndex * 28);

  return (
    <div id="loading">
      <div className="spinner" />
      <div id="loading-step">{loadingSteps[stepIndex]}</div>
      <div className="progress-track">
        <div className="progress-bar" style={{ width: progress + "%" }} />
      </div>
    </div>
  );
}
