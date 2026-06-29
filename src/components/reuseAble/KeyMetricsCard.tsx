// components/KeyMetricsCard.tsx

import { formatCurrencyDecimal } from "@/utils/calculations";
import CardContainer from "../common/CardContainer";
import CommonHeader from "../common/header/CommonHeader";
import MetricCard from "./MetricCard";

interface KeyMetricsCardProps {
  monthlyCashFlow: number;
  annualNetCashFlow: string | null;
  cashOnCashReturn: number | null;
  postRefiCoC: string | null;
  capRate: number | null;
  dscr: number | null;
  noi: number;
}

const KeyMetricsCard: React.FC<KeyMetricsCardProps> = ({
  monthlyCashFlow,
  annualNetCashFlow,
  cashOnCashReturn,
  postRefiCoC,
  capRate,
  dscr,
  noi,
}) => {
  return (
    <CardContainer>
      <CommonHeader className="pb-4">Key Metrics</CommonHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <MetricCard
          label="Monthly Cash Flow"
          value={`$${monthlyCashFlow.toFixed(2)}/mo`}
        />

        <MetricCard
          label="Annual Net Cash Flow"
          value={annualNetCashFlow ? `$${annualNetCashFlow}` : "N/A"}
        />

        <MetricCard
          label="Post-Refi Cash-on-Cash"
          value={
            cashOnCashReturn != null
              ? `${cashOnCashReturn.toFixed(2)}%`
              : postRefiCoC != null
                ? `${Number(postRefiCoC).toFixed(2)}%`
                : "N/A"
          }
        />

        <MetricCard
          label="Cap Rate"
          value={capRate != null ? `${capRate.toFixed(2)}%` : "N/A"}
        />

        <MetricCard
          label="DSCR"
          value={dscr != null ? dscr.toFixed(2) : "N/A"}
        />

        <MetricCard
          label="Net Operating Income (NOI)"
          value={noi > 0 ? `${formatCurrencyDecimal(noi)}/yr` : "N/A"}
        />
      </div>
    </CardContainer>
  );
};

export default KeyMetricsCard;
