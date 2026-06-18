import type {
  DealStatus,
  ScoreStatus,
  StrategyType,
} from "@/store/features/property/types/calculation";
import type {
  BrrrrCalculationResponse,
  Section8DSCRResponse,
  TurnkeyCalculationResponse,
} from "@/store/features/property/types/output";
import type { DealInputs } from "../types";
import { formatCurrencyDecimal } from "../utils/calculations";
import CardContainer from "./common/CardContainer";
import CommonHeader from "./common/header/CommonHeader";
import DealScorecard from "./DealScorecard";
import MetricCard from "./MetricCard";
export interface NormalizedResults {
  monthlyCashFlow: number;
  annualROI: number;
  cocReturn: number;
  capRate: number;
  dscr: number;
  onePercentRule: boolean;
  noi: number;
  mortgagePayment: number;
  vacancy: number;
  maintenance: number;
  capex: number;
  propertyMgmt: number;
  totalExpenses: number;
  dealRating: string;

  incomeExpance?: {
    income: {
      monthlyRent: number;
      annualRent: number;
      effectiveIncome: number;
    };
    expenses: {
      totalExpenses: number;
    };
    netCashFlow: {
      monthly: number;
      annual: number;
    };
    mortgage: {
      monthlyMortgage: number;
      annualMortgage: number;
    };
    financing: {
      purchaseLoanAmount: number;
      refinanceLoanAmount: number;
      loanPointsCost: number;
    };
  };

  allInCost?: number;
  initialCashInvested?: number;
  refinanceLoanAmount?: number;
  cashOutAmount?: number;
  cashLeftInDeal?: number;
  equityCaptured?: number;

  dealScoreboard?: {
    totalScore: number;
    rating: DealStatus;
    breakdown: {
      name: string;
      value: number | boolean;
      score: number;
      status: ScoreStatus;
    }[];
  };
}

function normalizeResponse(
  response:
    | BrrrrCalculationResponse
    | TurnkeyCalculationResponse
    | Section8DSCRResponse,
  activeTab: StrategyType,
): NormalizedResults {
  if (activeTab === "BRRRR") {
    const d = (response as BrrrrCalculationResponse).data;
    const ie = d?.incomeExpance;
    const mortgage = ie?.mortgage?.monthlyMortgage ?? 0;

    return {
      monthlyCashFlow: d?.monthlyCashFlow_m ?? 0,
      annualROI: d?.incomeExpance?.netCashFlow?.annual ?? 0,
      cocReturn: d?.postRefiCoC_m ?? 0,
      capRate: d?.capRate_m ?? 0,
      dscr: d?.DSCR_m ?? 0,
      onePercentRule: false,
      noi: d?.netOperatingIncome_m ?? 0,
      mortgagePayment: mortgage,
      vacancy: d.vacancyRate,
      maintenance: d.maintenanceRate,
      capex: d.capexRate,
      propertyMgmt: d.managementRate,
      totalExpenses: ie?.expenses?.totalExpenses ?? 0,
      dealRating: d?.dealScoreboard?.rating ?? "",

      incomeExpance: ie,

      allInCost: d?.allInCost_m ?? 0,
      initialCashInvested: d?.initialCashInvested_m ?? 0,
      refinanceLoanAmount: d?.refinanceLoanAmount_m ?? 0,
      cashOutAmount: d?.cashOutAmount_m ?? 0,
      cashLeftInDeal: d?.cashLeftInDeal_m ?? 0,
      equityCaptured: d?.equityCaptured_m ?? 0,
      dealScoreboard: d?.dealScoreboard
        ? {
            totalScore: d.dealScoreboard.totalScore,
            rating: d.dealScoreboard.rating,
            breakdown: d.dealScoreboard.breakdown,
          }
        : undefined,
    };
  }

  if (activeTab === "TURNKEY") {
    const d = (response as TurnkeyCalculationResponse).data;
    const km = d.responseData.KeyMetrics;
    const ie = d.responseData.incomeExpance;

    return {
      monthlyCashFlow: km.monthlyCashFlow ?? 0,
      annualROI: km.CashOnCashReturn ?? 0,
      cocReturn: km.CashOnCashReturn ?? 0,
      capRate: km.capRate ?? 0,
      dscr: km.DSCR ?? 0,
      onePercentRule: km.OnePercentRule ?? false,
      noi: ie?.noi ?? 0,

      mortgagePayment: ie?.mortgage?.monthlyMortgage ?? 0,

      vacancy: d.vacancyRate,
      maintenance: d.maintenanceRate,
      capex: d.capexRate,
      propertyMgmt: d.managementRate,

      totalExpenses: ie?.noi ? 0 : 0, // or remove if not available

      dealRating: d.responseData.dealScoreboard?.rating ?? "",

      incomeExpance: {
        income: {
          monthlyRent: 0,
          annualRent: 0,
          effectiveIncome: 0,
        },
        expenses: {
          totalExpenses: 0,
        },
        netCashFlow: {
          monthly: ie?.netCashFlow?.monthly ?? 0,
          annual: ie?.netCashFlow?.annual ?? 0,
        },
        mortgage: {
          monthlyMortgage: ie?.mortgage?.monthlyMortgage ?? 0,
          annualMortgage: ie?.mortgage?.annualMortgage ?? 0,
        },
        financing: {
          purchaseLoanAmount: km.loanAmount ?? 0,
          refinanceLoanAmount: 0,
          loanPointsCost: km.loanPointsCost ?? 0,
        },
      },
      dealScoreboard: d.responseData.dealScoreboard
        ? {
            totalScore: d.responseData.dealScoreboard.totalScore,
            rating: d.responseData.dealScoreboard.rating,
            breakdown: d.responseData.dealScoreboard.breakdown,
          }
        : undefined,
    };
  }

  // SECTION_8

  const d = (response as Section8DSCRResponse).data;
  const km = d?.responseData?.KeyMetrics;
  const ie = d?.responseData?.incomeExpance;

  return {
    monthlyCashFlow: km?.monthlyCashFlow ?? 0,
    annualROI: km?.annualCashFlow ?? 0,
    cocReturn: km?.CashOnCashReturn ?? 0,
    capRate: km?.capRate ?? 0,
    dscr: km?.DSCR ?? 0,
    onePercentRule: km?.OnePercentRule ?? false,

    noi: km?.netOperatingIncome ?? 0,

    mortgagePayment: ie?.mortgage?.monthlyMortgage ?? 0,

    vacancy: d.vacancyRate,
    maintenance: d.maintenanceRate,
    capex: d.capexRate,
    propertyMgmt: d.managementRate,

    totalExpenses: ie?.expenses?.totalExpenses ?? 0,

    dealRating: d?.responseData?.dealScoreboard?.rating ?? "",

    // ✅ ADD THIS (CRITICAL FIX)
    incomeExpance: {
      income: {
        monthlyRent: ie?.income?.section8Rent ?? 0,
        annualRent: ie?.income?.annualIncome ?? 0,
        effectiveIncome: ie?.income?.effectiveIncome ?? 0,
      },

      expenses: {
        totalExpenses: ie?.expenses?.totalExpenses ?? 0,
      },

      netCashFlow: {
        monthly: ie?.netCashFlow?.monthly ?? 0,
        annual: ie?.netCashFlow?.annual ?? 0,
      },

      mortgage: {
        monthlyMortgage: ie?.mortgage?.monthlyMortgage ?? 0,
        annualMortgage: ie?.mortgage?.annualDebtService ?? 0,
      },

      financing: {
        purchaseLoanAmount: km?.loanAmount ?? 0,
        refinanceLoanAmount: 0,
        loanPointsCost: 0,
      },
    },
    dealScoreboard: d.responseData.dealScoreboard
      ? {
          totalScore: d.responseData.dealScoreboard.totalScore,
          rating: d.responseData.dealScoreboard.rating,
          breakdown: d.responseData.dealScoreboard.breakdown,
        }
      : undefined,
  };
}
interface DealResultsPanelProps {
  response:
    | BrrrrCalculationResponse
    | TurnkeyCalculationResponse
    | Section8DSCRResponse;
  activeTab: StrategyType;
  inputs: DealInputs;
}

const DealResultsPanel: React.FC<DealResultsPanelProps> = ({
  response,
  activeTab,
}) => {
  const results = normalizeResponse(response, activeTab);

  console.log("results", results);
  return (
    <div className="flex flex-col  gap-6">
      <div className="flex-1 space-y-6">
        <CardContainer>
          <CommonHeader className="pb-4">Key Metrics</CommonHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MetricCard
              label="Monthly Cash Flow"
              value={`${formatCurrencyDecimal(results.monthlyCashFlow)}/mo`}
            />

            <MetricCard
              label="Annual Net Cash Flow"
              value={formatCurrencyDecimal(results.annualROI)}
            />

            <MetricCard
              label="Post-Refi Cash-on-Cash"
              value={`${results.cocReturn.toFixed(2)}%`}
            />

            <MetricCard
              label="Cap Rate"
              value={`${results.capRate.toFixed(2)}%`}
            />

            <MetricCard label="DSCR" value={results.dscr.toFixed(2)} />

            <MetricCard
              label="Net Operating Income (NOI)"
              value={formatCurrencyDecimal(results.noi)}
            />
          </div>
        </CardContainer>

        {/* Income & Expenses */}
        <CardContainer>
          <CommonHeader size="lg" className="pb-4">
            Income & Expenses
          </CommonHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CardContainer
              size="sm"
              className="rounded-[10px]! border-[1.173px] border-[#B9F8CF]! bg-[#F0FDF4]! space-y-3"
            >
              <CommonHeader size="lg" className="text-[#008236]!">
                Income
              </CommonHeader>

              <div className="flex justify-between">
                <CommonHeader size="sm">Gross Monthly Rent</CommonHeader>
                <CommonHeader
                  size="md"
                  className="text-[#101828]! font-semibold!"
                >
                  {formatCurrencyDecimal(
                    results.incomeExpance?.income?.monthlyRent ?? 0,
                  )}
                </CommonHeader>
              </div>

              <div className="flex justify-between border-b-[1.173px] pb-2 border-[#F3F4F6]">
                <CommonHeader size="sm">Gross Annual Rent</CommonHeader>
                <CommonHeader
                  size="md"
                  className="text-[#101828]! font-semibold!"
                >
                  {formatCurrencyDecimal(
                    results.incomeExpance?.income?.annualRent ?? 0,
                  )}
                </CommonHeader>
              </div>

              <div className="flex justify-between">
                <CommonHeader size="sm">
                  Effective Income (after vacancy)
                </CommonHeader>
                <CommonHeader
                  size="md"
                  className="text-[#101828]! font-semibold!"
                >
                  {formatCurrencyDecimal(
                    results.incomeExpance?.income?.effectiveIncome ?? 0,
                  )}
                </CommonHeader>
              </div>
            </CardContainer>

            <CardContainer
              size="sm"
              className="rounded-[10px]! border-[1.173px] border-[#FFD6A8]! bg-[#FFF7ED]! space-y-3"
            >
              <CommonHeader size="lg" className="text-[#C10007]!">
                Expenses
              </CommonHeader>

              <div className="flex justify-between border-b-[1.173px] pb-2 border-[#F3F4F6]">
                <CommonHeader size="sm">Total Operating Expenses</CommonHeader>
                <CommonHeader
                  size="md"
                  className="text-[#C10007]! font-medium!"
                >
                  {formatCurrencyDecimal(
                    results.incomeExpance?.expenses?.totalExpenses ?? 0,
                  )}
                </CommonHeader>
              </div>

              <div className="flex justify-between">
                <CommonHeader size="sm" className="font-bold!">
                  Net Cash Flow
                </CommonHeader>
                <CommonHeader size="md" className="text-[#9F0712]! font-bold!">
                  {formatCurrencyDecimal(
                    results.incomeExpance?.netCashFlow?.annual ?? 0,
                  )}
                </CommonHeader>
              </div>
            </CardContainer>
          </div>
        </CardContainer>

        {activeTab === "BRRRR" && (
          <CardContainer>
            <CommonHeader size="lg" className="mb-4">
              BRRRR Core Metrics
            </CommonHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MetricCard
                label="Total All-In Cost"
                value={formatCurrencyDecimal(results.allInCost ?? 0)}
              />

              <MetricCard
                label="Initial Cash Invested"
                value={formatCurrencyDecimal(results.initialCashInvested ?? 0)}
              />

              <MetricCard
                label="Refinance Loan Amount"
                value={formatCurrencyDecimal(results.refinanceLoanAmount ?? 0)}
                textColor="text-[#155DFC]!"
              />

              <MetricCard
                label="Cash Pulled Out (Refi)"
                value={formatCurrencyDecimal(results.cashOutAmount ?? 0)}
                textColor="text-[#00A63E]!"
              />

              <MetricCard
                label="Cash Left in Deal"
                value={formatCurrencyDecimal(results.cashLeftInDeal ?? 0)}
                textColor="text-[#C2410C]!"
              />

              <MetricCard
                label="Equity Captured"
                value={formatCurrencyDecimal(results.equityCaptured ?? 0)}
                textColor="text-[#9810FA]!"
              />
            </div>
          </CardContainer>
        )}

        {/* Financing & Mortgages */}
        <CardContainer>
          <CommonHeader size="lg" className="pb-4">
            Financing & Mortgages
          </CommonHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CardContainer
              size="sm"
              className="rounded-[10px]! border-[1.173px] border-[#BAE6FD]! bg-[#F0F9FF]! space-y-3"
            >
              <CommonHeader size="lg" className="text-[#1C398E]!">
                Initial Loan
              </CommonHeader>

              <div className="flex justify-between">
                <CommonHeader size="sm">Purchase Loan Amount</CommonHeader>
                <CommonHeader
                  size="md"
                  className="text-[#101828]! font-semibold!"
                >
                  {formatCurrencyDecimal(
                    results.incomeExpance?.financing?.purchaseLoanAmount ?? 0,
                  )}
                </CommonHeader>
              </div>

              <div className="flex justify-between border-b-[1.173px] pb-2 border-[#F3F4F6]">
                <CommonHeader size="sm">Loan Points Cost</CommonHeader>
                <CommonHeader
                  size="md"
                  className="text-[#101828]! font-semibold!"
                >
                  {formatCurrencyDecimal(
                    results.incomeExpance?.financing?.loanPointsCost ?? 0,
                  )}
                </CommonHeader>
              </div>
            </CardContainer>

            <CardContainer
              size="sm"
              className="rounded-[10px]! border-[1.173px] border-[#B9F8CF]! bg-[#F0FDF4]! space-y-3"
            >
              <CommonHeader size="lg" className="text-[#008236]!">
                Refinance Mortgage
              </CommonHeader>

              <div className="flex justify-between text-sm border-b-[1.173px] pb-2 border-[#F3F4F6]">
                <CommonHeader size="sm">Monthly Payment</CommonHeader>
                <CommonHeader
                  size="md"
                  className="text-[#C10007]! font-medium!"
                >
                  {formatCurrencyDecimal(
                    results.incomeExpance?.mortgage?.monthlyMortgage ?? 0,
                  )}
                </CommonHeader>
              </div>

              <div className="flex justify-between text-sm">
                <CommonHeader size="sm">Annual Payment</CommonHeader>
                <CommonHeader size="md" className="text-[#9F0712]!">
                  {formatCurrencyDecimal(
                    results.incomeExpance?.mortgage?.annualMortgage ?? 0,
                  )}
                </CommonHeader>
              </div>
            </CardContainer>
          </div>
        </CardContainer>

        <DealScorecard results={results} />
      </div>
    </div>
  );
};

export default DealResultsPanel;
