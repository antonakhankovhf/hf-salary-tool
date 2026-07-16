const RADIUS = 54;
const STROKE = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CompetitionGauge({ job, region, competition }) {
  const { index, level, label, qualifier } = competition;
  const offset = CIRCUMFERENCE * (1 - index / 100);

  return (
    <div className="gauge-card">
      <div className="gauge-card-header">
        <span className="gauge-card-title">Wettbewerbslage</span>
      </div>
      <div className="gauge-card-body">
        <div className="gauge-ring-wrap">
          <svg className="gauge-ring" viewBox="0 0 120 120" width="120" height="120">
            <circle className="gauge-track" cx="60" cy="60" r={RADIUS} strokeWidth={STROKE} fill="none" />
            <circle
              className={"gauge-fill gauge-fill-" + level}
              cx="60"
              cy="60"
              r={RADIUS}
              strokeWidth={STROKE}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="gauge-ring-center">
            <span className="gauge-value">{index}</span>
            <span className="gauge-max">/100</span>
          </div>
        </div>
        <div className="gauge-details">
          <span className={"gauge-badge gauge-badge-" + level}>{label}</span>
          <p className="gauge-note">
            Für Stellen als <span className="white-bold-text">{job}</span> in <span className="white-bold-text">{region}</span> herrscht im Vergleich zu anderen
            Arbeitsmärkten {qualifier.toLowerCase()} Wettbewerb.
          </p>
        </div>
      </div>
    </div>
  );
}
