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
import BrrrCoreMetricsCard from "./BrrrCoreMetricsCard";
import DealScorecard from "./DealScorecard";
import FinancingMortgagesCard from "./FinancingMortgagesCard";
import IncomeExpensesCard from "./IncomeExpensesCard";
import KeyMetricsCard from "./KeyMetricsCard";

export interface Scoreboard {
  totalScore: number;
  rating: DealStatus;
  breakdown: {
    name: string;
    value: number | boolean;
    score: number;
    status: ScoreStatus;
  }[];
}
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

  dealScoreboard?: Scoreboard;
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

  return (
    <div className="flex flex-col  gap-6">
      <div className="flex-1 space-y-6">
        <KeyMetricsCard
          monthlyCashFlow={results.monthlyCashFlow}
          annualNetCashFlow={results.annualROI ? `${results.annualROI}` : null}
          cashOnCashReturn={results.cocReturn}
          postRefiCoC={results.cocReturn ? `${results.capex}` : null}
          capRate={results.capRate}
          dscr={results.dscr}
          noi={results.noi}
        />
        <IncomeExpensesCard
          monthlyRent={results.incomeExpance?.income?.monthlyRent ?? 0}
          annualRent={results.incomeExpance?.income?.annualRent ?? 0}
          effectiveIncome={results.incomeExpance?.income?.effectiveIncome ?? 0}
          totalExpenses={
            results.incomeExpance?.expenses?.totalExpenses ??
            results.totalExpenses
          }
          netCashFlow={
            results.incomeExpance?.netCashFlow?.annual ??
            results.monthlyCashFlow
          }
        />

        {activeTab === "BRRRR" && (
          <BrrrCoreMetricsCard
            allInCost={results.allInCost ?? 0}
            initialCashInvested={results.initialCashInvested ?? 0}
            refinanceLoanAmount={results.refinanceLoanAmount ?? 0}
            cashOutAmount={results.cashOutAmount ?? 0}
            cashLeftInDeal={results.cashLeftInDeal ?? 0}
            equityCaptured={results.equityCaptured ?? 0}
          />
        )}

        <FinancingMortgagesCard
          purchaseLoanAmount={
            results.incomeExpance?.financing?.purchaseLoanAmount ?? 0
          }
          loanPointsCost={results.incomeExpance?.financing?.loanPointsCost ?? 0}
          monthlyMortgage={
            results.incomeExpance?.mortgage?.monthlyMortgage ??
            results.mortgagePayment
          }
          annualMortgage={results.incomeExpance?.mortgage?.annualMortgage ?? 0}
        />
        {results?.dealScoreboard && (
          <DealScorecard results={results?.dealScoreboard} />
        )}
      </div>
    </div>
  );
};

export default DealResultsPanel;
