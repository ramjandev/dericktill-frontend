import React from "react";
import CardContainer from "./common/CardContainer";
import CommonHeader from "./common/header/CommonHeader";
import type { Scoreboard } from "./DealResultsPanel";

type ScoreColor = "red" | "amber" | "green";

interface Metric {
  label: string;
  score: number;
  max: number;
  color: ScoreColor;
}

interface DealScorecardProps {
  results: Scoreboard;
}

const COLOR_MAP: Record<
  ScoreColor,
  { text: string; bar: string; badge: string }
> = {
  red: {
    text: "text-red-500",
    bar: "bg-[#EF4444]",
    badge: "bg-red-50 border-red-200 text-red-700",
  },
  amber: {
    text: "text-amber-500",
    bar: "bg-[#F59E0B]",
    badge: "bg-amber-50 border-amber-200 text-amber-700",
  },
  green: {
    text: "text-green-500",
    bar: "bg-[#10B981]",
    badge: "bg-green-50 border-green-200 text-green-700",
  },
};

const DEAL_LABELS: Record<ScoreColor, string> = {
  red: "BAD DEAL",
  amber: "AVERAGE DEAL",
  green: "GOOD DEAL",
};

function getColorFromRating(rating?: string): ScoreColor {
  switch (rating) {
    case "GOOD DEAL":
      return "green";
    case "AVERAGE DEAL":
      return "amber";
    case "BAD DEAL":
    default:
      return "red";
  }
}

const DealScorecard: React.FC<DealScorecardProps> = ({ results }) => {
  const totalScore = results?.totalScore ?? 0;
  const totalMax = 100;

  const overallColor = getColorFromRating(results?.rating);

  const { badge: badgeClass } = COLOR_MAP[overallColor];

  const dealLabel = results?.rating ?? DEAL_LABELS[overallColor];

  const metrics: Metric[] =
    results?.breakdown?.map((item) => {
      const max =
        item.name === "Cash Flow"
          ? 25
          : item.name === "Post-Refi CoC"
            ? 25
            : item.name === "Cap Rate"
              ? 20
              : item.name === "DSCR"
                ? 20
                : 10;

      const color: ScoreColor =
        item.status === "GOOD"
          ? "green"
          : item.status === "AVERAGE"
            ? "amber"
            : "red";

      return {
        label: item.name,
        score: item.score,
        max,
        color,
      };
    }) ?? [];

  return (
    <CardContainer>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <CommonHeader size="lg" className="mb-4">
          Deal Scorecard
        </CommonHeader>

        <div
          className={`flex items-center gap-2 border rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide ${badgeClass}`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-current opacity-80" />
          {dealLabel}&nbsp;·&nbsp;{totalScore}/{totalMax}
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-5">
        {metrics.map(({ label, score, max, color }) => {
          const pct = Math.min(100, Math.round((score / max) * 100));
          const { text, bar } = COLOR_MAP[color];

          return (
            <div key={label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-500">{label}</span>

                <span className={`text-sm font-semibold ${text}`}>
                  {score}/{max}
                </span>
              </div>

              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </CardContainer>
  );
};

export default DealScorecard;
