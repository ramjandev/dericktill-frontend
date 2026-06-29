import { Shield } from "lucide-react";

type RiskLevel = "low" | "medium" | "high";

interface CrimeScoreCardProps {
  score?: number | null;
}

function getRiskLevel(score: number): RiskLevel {
  if (score <= 40) return "low";
  if (score <= 70) return "medium";
  return "high";
}

const riskConfig: Record<
  RiskLevel,
  {
    label: string;
    iconColor: string;
    scoreColor: string;
    trackBg: string;
    barBg: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    accentBar: string;
  }
> = {
  low: {
    label: "Low Risk",
    iconColor: "text-green-600",
    scoreColor: "text-green-700",
    trackBg: "bg-green-200",
    barBg: "bg-green-600",
    badgeBg: "bg-green-100",
    badgeText: "text-green-700",
    badgeBorder: "border-green-300",
    accentBar: "bg-green-600",
  },
  medium: {
    label: "Medium Risk",
    iconColor: "text-amber-600",
    scoreColor: "text-amber-700",
    trackBg: "bg-amber-200",
    barBg: "bg-amber-500",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-300",
    accentBar: "bg-amber-500",
  },
  high: {
    label: "High Risk",
    iconColor: "text-red-600",
    scoreColor: "text-red-700",
    trackBg: "bg-red-200",
    barBg: "bg-red-600",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    badgeBorder: "border-red-300",
    accentBar: "bg-red-600",
  },
};

export default function CrimeScoreCard({ score }: CrimeScoreCardProps) {
  if (!score) return null;

  const safeScore = Math.min(100, Math.max(0, score));
  const risk = getRiskLevel(safeScore);
  const config = riskConfig[risk];

  return (
    <div className="relative inline-block overflow-hidden rounded-xl border border-gray-200 bg-white px-6 py-5 text-center w-full">
      <div
        className={`absolute left-0 right-0 top-0 h-[3px] rounded-t-xl ${config.accentBar}`}
      />

      {/* Label row */}
      <div className="mb-2.5 flex items-center justify-center gap-1.5">
        <Shield
          size={13}
          strokeWidth={2}
          className={config.iconColor}
          aria-hidden
        />
        <span className="text-[11px] font-medium uppercase tracking-widest text-gray-500">
          Crime Score
        </span>
      </div>

      {/* Score value */}
      <p
        className={`mb-2.5 text-[34px] font-semibold leading-none ${config.scoreColor}`}
      >
        {safeScore}
      </p>

      {/* Progress bar */}
      <div className="mb-2.5 flex items-center gap-1.5">
        <div
          className={`h-1.5 flex-1 overflow-hidden rounded-full ${config.trackBg}`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${config.barBg}`}
            style={{ width: `${safeScore}%` }}
          />
        </div>
        <span className="whitespace-nowrap text-[11px] text-gray-400">
          / 100
        </span>
      </div>

      {/* Risk badge */}
      <span
        className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${config.badgeBg} ${config.badgeText} ${config.badgeBorder}`}
      >
        {config.label}
      </span>
    </div>
  );
}
