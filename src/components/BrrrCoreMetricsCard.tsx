// components/BrrrCoreMetricsCard.tsx

import { formatCurrencyDecimal } from "../utils/calculations";
import CardContainer from "./common/CardContainer";
import CommonHeader from "./common/header/CommonHeader";
import MetricCard from "./MetricCard";

interface BrrrCoreMetricsCardProps {
  allInCost: number;
  initialCashInvested: number;
  refinanceLoanAmount: number;
  cashOutAmount: number;
  cashLeftInDeal: number;
  equityCaptured: number;
}

const BrrrCoreMetricsCard: React.FC<BrrrCoreMetricsCardProps> = ({
  allInCost,
  initialCashInvested,
  refinanceLoanAmount,
  cashOutAmount,
  cashLeftInDeal,
  equityCaptured,
}) => {
  return (
    <CardContainer>
      <CommonHeader size="lg" className="mb-4">
        BRRRR Core Metrics
      </CommonHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <MetricCard
          label="Total All-In Cost"
          value={formatCurrencyDecimal(allInCost)}
        />

        <MetricCard
          label="Initial Cash Invested"
          value={formatCurrencyDecimal(initialCashInvested)}
        />

        <MetricCard
          label="Refinance Loan Amount"
          value={formatCurrencyDecimal(refinanceLoanAmount)}
          textColor="text-[#155DFC]!"
        />

        <MetricCard
          label="Cash Pulled Out (Refi)"
          value={formatCurrencyDecimal(cashOutAmount)}
          textColor="text-[#00A63E]!"
        />

        <MetricCard
          label="Cash Left in Deal"
          value={formatCurrencyDecimal(cashLeftInDeal)}
          textColor="text-[#C2410C]!"
        />

        <MetricCard
          label="Equity Captured"
          value={formatCurrencyDecimal(equityCaptured)}
          textColor="text-[#9810FA]!"
        />
      </div>
    </CardContainer>
  );
};

export default BrrrCoreMetricsCard;
