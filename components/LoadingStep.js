"use client";

import { useEffect, useState } from "react";
import { loadingSteps } from "@/lib/data";

export default function LoadingStep({ onDone }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < loadingSteps.length) {
        setStepIndex(i);
        setProgress(15 + i * 28);
      } else {
        clearInterval(interval);
        setProgress(100);
        setTimeout(onDone, 500);
      }
    }, 900);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
