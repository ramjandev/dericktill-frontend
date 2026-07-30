import type { DealStatus, ScoreStatus, StrategyType } from "./calculation";

export type NameForAll = {
  name: string;
};
export type SaveBRRRRPayload = NameForAll & SaveBRRRR;
export type SaveBRRRR = {
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

export interface BrrrrCalculationResponse {
  data: SaveBRRRR;

  statusCode: number;
  timestamp: string;
  path: string;
}

/// turnkey

export type SaveTurnkeyPayload = NameForAll & SaveTurnkey;
export type SaveTurnkey = {
  strategy: "TURNKEY";
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
        loanPointsCost: number;
        lenderFees: number;
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
};

export interface TurnkeyCalculationResponse {
  data: SaveTurnkey;

  statusCode: number;
  timestamp: string;
  path: string;
}

/// section 8

export type SaveSection8Payload = NameForAll &
  SaveSection8 & {
    studio: number;
    oneBedroom: number;
    twoBedroom: number;
    threeBedroom: number;
    fourBedroom: number;
    latitude: number;
    longitude: number;
  };
export type SaveSection8 = {
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
interface Section8ResponseData {
  KeyMetrics: {
    DSCR: number;
    netOperatingIncome: number;
    monthlyCashFlow: number;
    annualCashFlow: number;
    capRate: number;
    CashOnCashReturn: number;
    OnePercentRule: boolean;

    // Added
    initialCashInvested: number;
    rentVsMarket: number;
    avgCompRent: number;

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
      monthlyRent: number;

      // Added
      section8Rent: number;

      annualRent: number;
      effectiveIncome: number;
    };

    expenses: {
      totalExpenses: number;
      complianceCost: number;
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
      loanPointsCost: number;
      lenderFees: number;

      // Added
      closingCost: number;
      rehabCost: number;
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
