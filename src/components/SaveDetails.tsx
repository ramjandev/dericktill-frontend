import CardContainer from "@/components/common/CardContainer";
import CommonContainer from "@/components/common/CommonContainer";
import CommonHeader from "@/components/common/header/CommonHeader";
import type { PropertyData } from "@/store/features/property/types/calculation";
import { formatDateTime } from "@/utils/calculations";
import { Calendar, CheckCircle, Home, TrendingUp, XCircle } from "lucide-react";
import { FaPercent } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { LuDollarSign } from "react-icons/lu";
import { RiCircleFill } from "react-icons/ri";
import { formatCurrencyDecimal } from "../utils/calculations";
import MetricCard from "./MetricCard";

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
  const dscr = selectedDeal?.dscr ?? 0;
  const capRate = selectedDeal?.capRate ?? 0;
  const cashOnCashReturn = selectedDeal?.cashOnCashReturn ?? 0;
  const onePercentRule = selectedDeal?.onePercentRule ?? false;

  const dealMetrics = [
    { label: "Cash Flow", value: `$${monthlyCashFlow.toFixed(2)}/mo` },
    { label: "CoC Return", value: `${cashOnCashReturn}%` },
    { label: "Cap Rate", value: `${capRate}%` },
  ];

  const ratingColor =
    selectedDeal.scoreBoardStatus === "GOOD DEAL"
      ? {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          dot: "bg-green-500",
        }
      : selectedDeal.scoreBoardStatus === "AVERAGE DEAL"
        ? {
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            text: "text-yellow-700",
            dot: "bg-yellow-500",
          }
        : {
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-red-600",
            dot: "bg-red-500",
          };

  const handleBackClick = () => {
    setSelectedDealId(null);
    setPage(1);
  };
  return (
    <div>
      <CommonContainer>
        <CardContainer className="bg-[#FEF2F2]! border border-[#FFC9C9]! flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#9F0712]">
              <RiCircleFill size={24} />
            </span>
            <span className="text-[#9F0712] text-2xl font-extrabold tracking-tight">
              {selectedDeal?.scoreBoardStatus ?? "N/A"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {dealMetrics.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="text-xs text-[#4A5565] font-medium">
                  {label}
                </span>
                <span className="text-xl text-[#9F0712] font-bold">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </CardContainer>

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
            <CardContainer className="">
              <CommonHeader className="pb-4">Key Metrics</CommonHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <MetricCard
                  label="Monthly Cash Flow"
                  value={`$${monthlyCashFlow.toFixed(2)}/mo`}
                  icon={<LuDollarSign />}
                  iconBgColor="bg-[#DCFCE7]"
                  iconColor="text-[#00A63E]"
                />
                <MetricCard
                  label="Annual Net Cash Flow"
                  value={
                    selectedDeal?.annualNetCashFlow
                      ? `$${annualNetCashFlow.toFixed(2)}`
                      : "N/A"
                  }
                  icon={<TrendingUp />}
                  iconBgColor="bg-[#DBEAFE]"
                  iconColor="text-[#155DFC]"
                />
                <MetricCard
                  label="Cash-on-Cash Return"
                  value={
                    cashOnCashReturn !== null ? `${cashOnCashReturn}%` : "N/A"
                  }
                  icon={<FaPercent />}
                  iconBgColor="bg-[#F3E8FF]"
                  iconColor="text-[#9810FA]"
                />
                <MetricCard
                  label="Cap Rate"
                  value={capRate !== null ? `${capRate}%` : "N/A"}
                  icon={<Home />}
                  iconBgColor="bg-[#FFEDD4]"
                  iconColor="text-[#F54900]"
                />
                <MetricCard label="DSCR" value={dscr ? `${dscr}` : "N/A"} />
                <MetricCard
                  label="1% Rule"
                  value={
                    onePercentRule !== null
                      ? onePercentRule
                        ? "✓ Pass"
                        : "✗ Fail"
                      : "N/A"
                  }
                />
              </div>
              <div className="mt-3 bg-[#F3F4F6] rounded-xl p-4">
                <CommonHeader size="sm">
                  Net Operating Income (NOI)
                </CommonHeader>
                <CommonHeader size="2xl">${noi.toFixed(2)}/mo</CommonHeader>
              </div>
            </CardContainer>

            <CardContainer className="">
              <CommonHeader size="lg">Income & Expenses</CommonHeader>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center">
                  <CommonHeader size="lg" className="text-[#008236]!">
                    Income
                  </CommonHeader>
                </div>
                <div className="flex justify-between">
                  <CommonHeader size="sm">Monthly Income</CommonHeader>
                  <CommonHeader
                    size="md"
                    className="text-[#008236]! font-medium!"
                  >
                    $
                    {selectedDeal?.monthlyRent ??
                      selectedDeal?.effectiveIncome ??
                      "N/A"}
                  </CommonHeader>
                </div>
                {selectedDeal?.effectiveIncome && (
                  <div className="flex justify-between">
                    <CommonHeader size="sm">Effective Income</CommonHeader>
                    <CommonHeader
                      size="md"
                      className="text-[#008236]! font-medium!"
                    >
                      ${selectedDeal.effectiveIncome}
                    </CommonHeader>
                  </div>
                )}
                {selectedDeal?.annualRent && (
                  <div className="flex justify-between">
                    <CommonHeader size="sm">Annual Rent</CommonHeader>
                    <CommonHeader
                      size="md"
                      className="text-[#008236]! font-medium!"
                    >
                      ${selectedDeal.annualRent}
                    </CommonHeader>
                  </div>
                )}

                <div className="border-t-[1.173px] border-[#F3F4F6] pt-2 mt-2">
                  <CommonHeader size="lg" className="text-[#C10007]!">
                    Expenses
                  </CommonHeader>
                </div>
                {[
                  {
                    label: "Mortgage Payment",
                    value: selectedDeal?.monthlyMortgage ?? null,
                  },
                  {
                    label: "Annual Mortgage",
                    value: selectedDeal?.annualMortgage ?? null,
                  },
                  {
                    label: "Property Tax",
                    value: selectedDeal?.annualPropertyTax,
                  },
                  { label: "Insurance", value: selectedDeal?.annualInsurance },
                  { label: "Vacancy", value: `${selectedDeal?.vacancyRate}%` },
                  {
                    label: "Maintenance",
                    value: `${selectedDeal?.maintenanceRate}%`,
                  },
                  {
                    label: "CapEx",
                    value: selectedDeal?.capexRate
                      ? `${selectedDeal.capexRate}%`
                      : null,
                  },
                  {
                    label: "Property Management",
                    value: `${selectedDeal?.managementRate}%`,
                  },
                  {
                    label: "Loan Points Cost",
                    value: selectedDeal?.loanPointsCost ?? null,
                  },
                  {
                    label: "Lender Fees",
                    value: selectedDeal?.lenderFees ?? null,
                  },
                ]
                  .filter(({ value }) => value !== null)
                  .map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between text-sm border-b-[1.173px] pb-2 last:border-b-0! border-[#F3F4F6]"
                    >
                      <CommonHeader size="sm">{label}</CommonHeader>
                      <CommonHeader
                        size="md"
                        className="text-[#C10007]! font-medium!"
                      >
                        {value}
                      </CommonHeader>
                    </div>
                  ))}

                <div className="border-t-[1.173px] py-2 border-[#D1D5DC] flex justify-between text-sm font-semibold">
                  <CommonHeader
                    size="md"
                    className="text-[#101828]! font-semibold!"
                  >
                    Total Expenses
                  </CommonHeader>
                  <span className="text-red-500 font-bold">
                    {selectedDeal?.totalExpenses
                      ? `$${selectedDeal.totalExpenses}`
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between bg-[#F9FAFB] p-6 border-[1.173px] border-[#E5E7EB] rounded-xl">
                  <CommonHeader
                    size="md"
                    className="text-[#101828]! font-semibold!"
                  >
                    Net Cash Flow
                  </CommonHeader>
                  <span
                    className={`text-2xl font-bold ${annualNetCashFlow >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {selectedDeal?.annualNetCashFlow
                      ? formatCurrencyDecimal(annualNetCashFlow)
                      : formatCurrencyDecimal(monthlyCashFlow)}
                  </span>
                </div>
              </div>
            </CardContainer>

            <CardContainer className="">
              <CommonHeader size="lg" className="mb-4">
                Deal Scorecard
              </CommonHeader>
              <div className="space-y-3">
                {[
                  {
                    label: "Cash Flow",
                    sub: "Positive cash flow",
                    value: `$${monthlyCashFlow.toFixed(2)}/mo`,
                    pass: monthlyCashFlow >= 0,
                  },
                  {
                    label: "Cap Rate",
                    sub: "≥ 8% is good",
                    value: capRate !== null ? `${capRate}%` : "N/A",
                    pass: (capRate ?? 0) >= 8,
                  },
                  {
                    label: "DSCR",
                    sub: "≥ 1.25 is good",
                    value: dscr ? dscr.toFixed(2) : "N/A",
                    pass: (dscr ?? 0) >= 1.25,
                  },
                  {
                    label: "1% Rule",
                    sub: "Rent ≥ 1% of price",
                    value:
                      onePercentRule !== null
                        ? onePercentRule
                          ? "Pass"
                          : "Fail"
                        : "N/A",
                    pass: onePercentRule ?? false,
                  },
                ].map(({ label, sub, value, pass }) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between rounded-xl p-4 border-[1.173px] ${pass ? "bg-green-50" : "bg-[#FEF2F2] border-[#FFC9C9]"}`}
                  >
                    <div className="flex items-center gap-2">
                      {pass ? (
                        <CheckCircle size={24} className="text-green-500" />
                      ) : (
                        <XCircle size={24} className="text-red-500" />
                      )}
                      <div>
                        <CommonHeader
                          size="md"
                          className="text-[#101828]! font-bold!"
                        >
                          {label}
                        </CommonHeader>
                        <CommonHeader size="sm">{sub}</CommonHeader>
                      </div>
                    </div>
                    <CommonHeader
                      size="md"
                      className="text-[#101828]! font-bold!"
                    >
                      {value}
                    </CommonHeader>
                  </div>
                ))}

                {selectedDeal?.breakdown?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <CommonHeader size="sm" className="text-gray-500">
                      Full Scorecard Breakdown
                    </CommonHeader>
                    {selectedDeal.breakdown.map((item) => (
                      <div
                        key={item.scoreBreakdownId}
                        className={`flex items-center justify-between rounded-xl p-3 border-[1.173px] ${item.status === "GOOD" ? "bg-green-50 border-green-200" : item.status === "AVERAGE" ? "bg-yellow-50 border-yellow-200" : "bg-[#FEF2F2] border-[#FFC9C9]"}`}
                      >
                        <div className="flex items-center gap-2">
                          {item.status === "GOOD" ? (
                            <CheckCircle size={18} className="text-green-500" />
                          ) : (
                            <XCircle size={18} className="text-red-500" />
                          )}
                          <CommonHeader
                            size="sm"
                            className="text-[#101828]! font-medium!"
                          >
                            {item.name}
                          </CommonHeader>
                        </div>
                        <div className="flex items-center gap-3">
                          <CommonHeader size="sm" className="text-[#101828]!">
                            {item.value.toFixed(2)}
                          </CommonHeader>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={`mt-4 rounded-2xl border-2 ${ratingColor.border} ${ratingColor.bg} p-4 text-center`}
              >
                <CommonHeader
                  size="sm"
                  className="mb-1 text-center! justify-center!"
                >
                  Final Deal Rating
                </CommonHeader>
                <div
                  className={`font-display text-2xl font-bold ${ratingColor.text}`}
                >
                  {selectedDeal.scoreBoardStatus ?? "N/A"}
                </div>
              </div>
            </CardContainer>
          </div>
        </div>
      </CommonContainer>
    </div>
  );
};

export default SaveDetails;
