import CardContainer from "@/components/common/CardContainer";
import CommonContainer from "@/components/common/CommonContainer";
import CommonHeader from "@/components/common/header/CommonHeader";
import type {
  DealStatus,
  PropertyData,
  ScoreStatus,
} from "@/store/features/property/types/calculation";
import { formatDateTime } from "@/utils/calculations";
import { Calendar } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import BrrrCoreMetricsCard from "./BrrrCoreMetricsCard";
import type { Scoreboard } from "./DealResultsPanel";
import DealScorecard from "./DealScorecard";
import FinancingMortgagesCard from "./FinancingMortgagesCard";
import IncomeExpensesCard from "./IncomeExpensesCard";
import KeyMetricsCard from "./KeyMetricsCard";
import StatusBoardDeal from "./StatusBoardDeal";

interface SaveDetailsProps {
  selectedDeal: PropertyData;
  setSelectedDealId: React.Dispatch<React.SetStateAction<string | null>>;
  setPage: (page: number) => void;
}

const SaveDetails: React.FC<SaveDetailsProps> = ({
  selectedDeal,
  setSelectedDealId,
  setPage,
}) => {
  const monthlyCashFlow = parseFloat(selectedDeal?.monthlyNetCashFlow ?? "0");
  const annualNetCashFlow = parseFloat(selectedDeal?.annualNetCashFlow ?? "0");
  const noi = parseFloat(
    selectedDeal?.noi ?? selectedDeal?.netOperatingIncome ?? "0",
  );
  const capRate = selectedDeal?.capRate ?? 0;
  const cashOnCashReturn = selectedDeal?.cashOnCashReturn ?? 0;

  const dealMetrics = [
    { label: "Cash Flow", value: `$${monthlyCashFlow.toFixed(2)}/mo` },
    { label: "CoC Return", value: `${cashOnCashReturn}%` },
    { label: "Cap Rate", value: `${capRate}%` },
  ];

  const handleBackClick = () => {
    setSelectedDealId(null);
    setPage(1);
  };

  // Derived income fields from flat saved data
  const monthlyRent = parseFloat(selectedDeal?.monthlyRent ?? "0");
  const annualRent = parseFloat(selectedDeal?.annualRent ?? "0");
  const effectiveIncome = parseFloat(selectedDeal?.effectiveIncome ?? "0");
  const totalExpenses = parseFloat(selectedDeal?.totalExpenses ?? "0");
  const monthlyMortgage = parseFloat(selectedDeal?.monthlyMortgage ?? "0");
  const annualMortgage = parseFloat(selectedDeal?.annualMortgage ?? "0");
  const purchaseLoanAmount = parseFloat(
    selectedDeal?.purchaseLoanAmount ?? "0",
  );
  const loanPointsCost = parseFloat(selectedDeal?.loanPointsCost ?? "0");

  type ScoreBreakdown = {
    scoreBreakdownId: string;
    propertyId: string;
    name: string;
    value: number;
    score: number;
    status: ScoreStatus;
  };
  const scoreboard: Scoreboard = {
    totalScore: selectedDeal.totalScore ?? 0,
    rating: (selectedDeal.scoreBoardStatus as DealStatus) ?? "BAD DEAL",
    breakdown: selectedDeal.breakdown.map((item: ScoreBreakdown) => ({
      name: item.name,
      value: item.value,
      score: item.score,
      status: item.status,
    })),
  };

  const ratingColorClass =
    scoreboard.rating === "GOOD DEAL"
      ? "text-green-600"
      : scoreboard.rating === "AVERAGE DEAL"
        ? "text-yellow-600"
        : "text-red-600";
  return (
    <div>
      <CommonContainer>
        <StatusBoardDeal
          dealMetrics={dealMetrics}
          dealRating={scoreboard.rating}
          ratingColorClass={ratingColorClass}
        />

        <div className="my-6 flex justify-end">
          <button
            className="
              text-white text-base font-medium
              px-6 py-3.5
              rounded-[8.812px]
              bg-[linear-gradient(180deg,rgba(1,36,38,0.78)_3.34%,rgba(102,102,102,0)_100%),linear-gradient(180deg,#00848A_0%,#001617_115%)]
              shadow-[0_2px_12px_rgba(0,132,138,0.35),0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
              hover:shadow-[0_4px_20px_rgba(0,132,138,0.5),0_2px_6px_rgba(0,0,0,0.4)]
              hover:scale-[1.025]
              active:scale-[0.975]
              transition-all duration-150
              flex items-center gap-2 cursor-pointer
            "
            onClick={handleBackClick}
          >
            <IoIosArrowBack size={20} />
            Back Deal
          </button>
        </div>

        <CardContainer className="">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CommonHeader size="2xl" className="text-gray-900">
                {selectedDeal?.strategy}
              </CommonHeader>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                <Calendar size={14} />
                Saved on {formatDateTime(selectedDeal?.createdAt)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#F0FDF4] border border-[#B9F8CF] p-4 rounded-2xl text-center">
                <p className="text-xs text-[#008236] mb-1">Purchase Price</p>
                <p className="text-lg font-semibold text-[#0D542B]">
                  ${selectedDeal?.purchasePrice ?? "N/A"}
                </p>
              </div>
              <div className="bg-[#EFF6FF] border border-[#BEDBFF] p-4 rounded-2xl text-center">
                <p className="text-xs text-[#1447E6] mb-1">Monthly Rent</p>
                <p className="font-semibold text-[#1C398E]">
                  $
                  {selectedDeal?.monthlyRent ??
                    selectedDeal?.annualRent ??
                    "N/A"}
                </p>
              </div>
            </div>
          </div>
        </CardContainer>

        <div className="pt-6 flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-6 lg:max-w-87.5 w-full">
            <div className="bg-white rounded-2xl shadow-sm p-5 w-full">
              <CommonHeader className="pb-4">Deal Inputs</CommonHeader>
              <div className="space-y-3 w-full">
                {[
                  {
                    label: "Purchase Price",
                    value: selectedDeal?.purchasePrice,
                  },
                  { label: "Down Payment", value: selectedDeal?.downPayment },
                  {
                    label: "All-In Cost",
                    value: selectedDeal?.allInCost ?? "N/A",
                  },
                  {
                    label: "Initial Cash Invested",
                    value: selectedDeal?.initialCashInvested ?? "N/A",
                  },
                  {
                    label: "Property Tax",
                    value: selectedDeal?.annualPropertyTax,
                    suffix: "/yr",
                  },
                  {
                    label: "Insurance",
                    value: selectedDeal?.annualInsurance,
                    suffix: "/yr",
                  },
                  {
                    label: "Loan Points Cost",
                    value: selectedDeal?.loanPointsCost ?? "N/A",
                  },
                  {
                    label: "Lender Fees",
                    value: selectedDeal?.lenderFees ?? "N/A",
                  },
                ].map(({ label, value, suffix }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center border-b pb-3 border-[#000]/10 last:border-0"
                  >
                    <CommonHeader size="sm" className="text-gray-600">
                      {label}
                    </CommonHeader>
                    <CommonHeader
                      size="sm"
                      className="font-semibold text-gray-900"
                    >
                      {value !== "N/A" ? `$${value}` : "N/A"}
                      {suffix && value !== "N/A" ? suffix : ""}
                    </CommonHeader>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 w-full">
              <CommonHeader className="pb-4">Analysis Settings</CommonHeader>
              <div className="space-y-3 w-full">
                {[
                  { label: "Vacancy Rate", value: selectedDeal?.vacancyRate },
                  {
                    label: "Maintenance Rate",
                    value: selectedDeal?.maintenanceRate,
                  },
                  {
                    label: "CapEx Rate",
                    value: selectedDeal?.capexRate ?? "N/A",
                  },
                  {
                    label: "Property Management",
                    value: selectedDeal?.managementRate,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <CommonHeader size="sm" className="text-gray-600">
                      {label}
                    </CommonHeader>
                    <CommonHeader
                      size="sm"
                      className="font-semibold text-gray-900"
                    >
                      {value !== "N/A" ? `${value}%` : "N/A"}
                    </CommonHeader>
                  </div>
                ))}
              </div>
            </div>

            {selectedDeal.strategy === "BRRRR" && (
              <div className="bg-white rounded-2xl shadow-sm p-5 w-full">
                <CommonHeader className="pb-4">Refinance Details</CommonHeader>
                <div className="space-y-3 w-full">
                  {[
                    {
                      label: "Purchase Loan Amount",
                      value: selectedDeal?.purchaseLoanAmount ?? "N/A",
                    },
                    {
                      label: "Refinance Loan Amount",
                      value: selectedDeal?.refinanceLoanAmount ?? "N/A",
                    },
                    {
                      label: "Cash Out Amount",
                      value: selectedDeal?.cashOutAmount ?? "N/A",
                    },
                    {
                      label: "Cash Left In Deal",
                      value: selectedDeal?.cashLeftInDeal ?? "N/A",
                    },
                    {
                      label: "Equity Captured",
                      value: selectedDeal?.equityCaptured ?? "N/A",
                    },
                    {
                      label: "Post-Refi CoC",
                      value: selectedDeal?.postRefiCoC ?? "N/A",
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center border-b pb-3 border-[#000]/10 last:border-0"
                    >
                      <CommonHeader size="sm" className="text-gray-600">
                        {label}
                      </CommonHeader>
                      <CommonHeader
                        size="sm"
                        className="font-semibold text-gray-900"
                      >
                        {value !== "N/A" ? `$${value}` : "N/A"}
                      </CommonHeader>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <KeyMetricsCard
              monthlyCashFlow={monthlyCashFlow}
              annualNetCashFlow={selectedDeal.annualNetCashFlow}
              cashOnCashReturn={selectedDeal.cashOnCashReturn}
              postRefiCoC={selectedDeal.postRefiCoC}
              capRate={selectedDeal.capRate}
              dscr={selectedDeal.dscr}
              noi={noi}
            />

            <IncomeExpensesCard
              monthlyRent={monthlyRent}
              annualRent={annualRent}
              effectiveIncome={effectiveIncome}
              totalExpenses={totalExpenses}
              netCashFlow={annualNetCashFlow}
            />

            {selectedDeal.strategy === "BRRRR" && (
              <BrrrCoreMetricsCard
                allInCost={parseFloat(selectedDeal.allInCost ?? "0")}
                initialCashInvested={parseFloat(
                  selectedDeal.initialCashInvested ?? "0",
                )}
                refinanceLoanAmount={parseFloat(
                  selectedDeal.refinanceLoanAmount ?? "0",
                )}
                cashOutAmount={parseFloat(selectedDeal.cashOutAmount ?? "0")}
                cashLeftInDeal={parseFloat(selectedDeal.cashLeftInDeal ?? "0")}
                equityCaptured={parseFloat(selectedDeal.equityCaptured ?? "0")}
              />
            )}

            <FinancingMortgagesCard
              purchaseLoanAmount={purchaseLoanAmount}
              loanPointsCost={loanPointsCost}
              monthlyMortgage={monthlyMortgage}
              annualMortgage={annualMortgage}
            />

            <DealScorecard results={scoreboard} />
          </div>
        </div>
      </CommonContainer>
    </div>
  );
};

export default SaveDetails;
