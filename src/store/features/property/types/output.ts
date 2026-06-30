import type { DealStatus, ScoreStatus, StrategyType } from "./calculation";

export interface BrrrrCalculationResponse {
  data: {
    strategy: StrategyType;
    stateAddress: string;
    purchasePrice: number;
    downPayment: number;
    annualInsurance: number;
    annualPropertyTax: number;
    vacancyRate: number;
    maintenanceRate: number;
    managementRate: number;
    capexRate: number;

    allInCost_m: number;
    initialCashInvested_m: number;
    monthlyCashFlow_m: number;
    postRefiCoC_m: number;
    cashOutAmount_m: number;
    cashLeftInDeal_m: number;
    equityCaptured_m: number;
    refinanceLoanAmount_m: number;
    capRate_m: number;
    DSCR_m: number;
    netOperatingIncome_m: number;

    incomeExpance: {
      income: {
        monthlyRent: number;
        annualRent: number;
        effectiveIncome: number;
      };
      expenses: {
        totalExpenses: number;
      };
      noi: number;
      mortgage: {
        monthlyMortgage: number;
        annualMortgage: number;
      };
      netCashFlow: {
        monthly: number;
        annual: number;
      };
      financing: {
        purchaseLoanAmount: number;
        refinanceLoanAmount: number;
        loanPointsCost: number;
      };
    };

    dealScoreboard: {
      totalScore: number;
      rating: DealStatus;
      breakdown: {
        name: string;
        value: number | boolean;
        score: number;
        status: ScoreStatus;
      }[];
    };
  };

  statusCode: number;
  timestamp: string;
  path: string;
}

export interface TurnkeyCalculationResponse {
  data: {
    strategy: StrategyType;
    stateAddress: string;
    purchasePrice: number;
    downPayment: number;
    annualInsurance: number;
    annualPropertyTax: number;
    vacancyRate: number;
    maintenanceRate: number;
    managementRate: number;
    capexRate: number;

    responseData: {
      KeyMetrics: {
        allInCost: number;
        initialCashInvested: number;
        loanAmount: number;
        loanPointsCost: number;
        lenderFees: number;

        monthlyCashFlow: number;
        CashOnCashReturn: number;
        capRate: number;
        DSCR: number;
        OnePercentRule: boolean;
        netOperatingIncome: number;
      };

      incomeExpance: {
        noi: number;
        mortgage: {
          monthlyMortgage: number;
          annualMortgage: number;
        };
        netCashFlow: {
          monthly: number;
          annual: number;
        };
      };

      dealScoreboard: {
        totalScore: number;
        rating: DealStatus;
        breakdown: {
          name: string;
          value: number | boolean; // <-- FIX: supports One Percent Rule false/true
          score: number;
          status: ScoreStatus;
        }[];
      };
    };
  };

  statusCode: number;
  timestamp: string;
  path: string;
}

interface Section8ResponseData {
  KeyMetrics: {
    DSCR: number;
    netOperatingIncome: number;
    monthlyCashFlow: number;
    annualCashFlow: number;
    capRate: number;
    CashOnCashReturn: number;
    OnePercentRule: boolean;

    section8Rent: number;
    hudFmrRent: number;
    hudCap: number;

    stabilityFactor: number;
    complianceCost: number;

    loanAmount: number;
    monthlyMortgage: number;
    annualDebtService: number;
  };

  incomeExpance: {
    income: {
      section8Rent: number;
      annualIncome: number;
      effectiveIncome: number;
    };

    expenses: {
      totalExpenses: number;
      complianceCost: number;
    };

    noi: number;

    mortgage: {
      monthlyMortgage: number;
      annualDebtService: number;
    };

    netCashFlow: {
      monthly: number;
      annual: number;
    };
  };

  dealScoreboard: {
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
export interface Section8DSCRResponse {
  data: {
    strategy: StrategyType;
    stateAddress: string;
    purchasePrice: number;
    downPayment: number;
    annualInsurance: number;
    annualPropertyTax: number;
    vacancyRate: number;
    maintenanceRate: number;
    managementRate: number;
    capexRate: number;

    responseData: Section8ResponseData;
  };

  statusCode: number;
  timestamp: string;
  path: string;
}

// save property

export type SaveBRRRR = {
  strategy: StrategyType;
  name: string;
  stateAddress: string;
  purchasePrice: number;
  downPayment: number;
  annualInsurance: number;
  annualPropertyTax: number;
  vacancyRate: number;
  maintenanceRate: number;
  managementRate: number;
  capexRate: number;
  allInCost_m: number;
  initialCashInvested_m: number;
  monthlyCashFlow_m: number;
  postRefiCoC_m: number;
  cashOutAmount_m: number;
  cashLeftInDeal_m: number;
  equityCaptured_m: number;
  refinanceLoanAmount_m: number;
  capRate_m: number;
  DSCR_m: number;
  crimeScore: number;
  netOperatingIncome_m: number;
  incomeExpance: {
    income: {
      monthlyRent: number;
      annualRent: number;
      effectiveIncome: number;
    };
    expenses: {
      totalExpenses: number;
    };
    noi: number;
    mortgage: {
      monthlyMortgage: number;
      annualMortgage: number;
    };
    netCashFlow: {
      monthly: number;
      annual: number;
    };
    financing: {
      purchaseLoanAmount: number;
      refinanceLoanAmount: number;
      loanPointsCost: number;
    };
  };
  dealScoreboard: {
    totalScore: number;
    rating: DealStatus;
    breakdown: {
      name: string;
      value: number;
      score: number;
      status: ScoreStatus;
    }[];
  };
};
export type SaveTurnkey = {
  strategy: StrategyType;
  name: string;
  stateAddress: string;
  purchasePrice: number;
  downPayment: number;
  annualInsurance: number;
  annualPropertyTax: number;
  vacancyRate: number;
  maintenanceRate: number;
  managementRate: number;
  capexRate: number;
  responseData: {
    KeyMetrics: {
      allInCost: number;
      initialCashInvested: number;
      monthlyCashFlow: number;
      CashOnCashReturn: number;
      capRate: number;
      DSCR: number;
      OnePercentRule: boolean;
      netOperatingIncome: number;
    };
    incomeExpance: {
      noi: number;
      netCashFlow: {
        monthly: number;
        annual: number;
      };
      mortgage: {
        monthlyMortgage: number;
      };
    };
    dealScoreboard: {
      totalScore: number;
      rating: string;
      breakdown: {
        name: string;
        value: number;
        score: number;
        status: ScoreStatus;
      }[];
    };
  };
};

export type SaveSection8 = {
  strategy: StrategyType;
  name: string;
  stateAddress: string;
  purchasePrice: number;
  downPayment: number;
  annualInsurance: number;
  annualPropertyTax: number;
  vacancyRate: number;
  maintenanceRate: number;
  managementRate: number;
  capexRate: number;
  crimeScore: number;
  latitude: number;
  longitude: number;
  fmrStudio: number;
  fmrOneBed: number;
  fmrTwoBed: number;
  fmrThreeBed: number;
  fmrFourBed: number;

  responseData: Section8ResponseData;
};
