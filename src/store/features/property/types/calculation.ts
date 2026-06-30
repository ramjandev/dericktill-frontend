export type ScoreStatus = "GOOD" | "AVERAGE" | "BAD";
export type DealStatus = "GOOD DEAL" | "AVERAGE DEAL" | "BAD DEAL";
export type StrategyType = "BRRRR" | "TURNKEY" | "SECTION_8";

type ScoreBreakdown = {
  scoreBreakdownId: string;
  propertyId: string;
  name: string;
  value: number;
  score: number;
  status: ScoreStatus;
};

type PropertyCalculation = {
  name: string | null;
  propertyId: string;
  strategy: StrategyType;
  stateAddress: string;
  userId: string;
  allInCost: string | null;
  initialCashInvested: string | null;
  monthlyNetCashFlow: string | null;
  postRefiCoC: string | null;
  cashOutAmount: string | null;
  cashLeftInDeal: string | null;
  equityCaptured: string | null;
  cashOnCashReturn: number | null;
  stabilityFactor: number | null;
  capRate: number | null;
  dscr: number | null;
  onePercentRule: boolean | null;
  hudCap: number | null;
  netOperatingIncome: string | null;
  monthlyRent: string | null;
  annualRent: string | null;
  effectiveIncome: string | null;
  totalExpenses: string | null;
  noi: string | null;
  monthlyMortgage: string | null;
  annualMortgage: string | null;
  mortgage: string | null;
  purchasePrice: string | null;
  downPayment: string | null;
  crimeScore: number;
  annualInsurance: string | null;
  annualPropertyTax: string | null;
  annualNoi: string | null;
  annualNetCashFlow: string | null;
  totalScore: number | null;
  scoreBoardStatus: string | null;
  vacancyRate: number | null;
  maintenanceRate: number | null;
  managementRate: number | null;
  capexRate: number | null;
  purchaseLoanAmount: string | null;
  refinanceLoanAmount: string | null;
  loanPointsCost: string | null;
  lenderFees: string | null;
  createdAt: string;
  breakdown: ScoreBreakdown[];
};

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PropertyCalculations = {
  data: {
    data: PropertyCalculation[];
    meta: PaginationMeta;
  };
  statusCode: number;
  timestamp: string;
  path: string;
};

// single property

// ─── Shared ───────────────────────────────────────────────────────────────────
interface BasePropertyResponse {
  name: string | null;
  propertyId: string;
  strategy: StrategyType;
  stateAddress: string;
  userId: string;
  monthlyNetCashFlow: string;
  purchasePrice: string;
  downPayment: string;
  annualInsurance: string;
  annualPropertyTax: string;
  vacancyRate: number;
  maintenanceRate: number;
  managementRate: number;
  capexRate: number | null;
  purchaseLoanAmount: string | null;
  loanPointsCost: string | null;
  lenderFees: string | null;
  createdAt: string;
  breakdown: ScoreBreakdown[];
  hudCap: null;
  mortgage: null;
  annualNoi: null;
  stabilityFactor: null;
}

export interface BrrrPropertyData extends BasePropertyResponse {
  strategy: "BRRRR";
  allInCost: string;
  initialCashInvested: string;
  postRefiCoC: string;
  cashOutAmount: string;
  cashLeftInDeal: string;
  equityCaptured: string;
  cashOnCashReturn: null;
  stabilityFactor: null;
  capRate: number;
  dscr: number;
  onePercentRule: null;
  netOperatingIncome: string;
  monthlyRent: string;
  annualRent: string;
  effectiveIncome: string;
  totalExpenses: string;
  noi: string;
  monthlyMortgage: string;
  annualMortgage: string;
  annualNetCashFlow: string;
  totalScore: number;
  scoreBoardStatus: DealStatus;
  refinanceLoanAmount: string;
  crimeScore: number;
}

export interface BrrrCalculationResponse {
  data: BrrrPropertyData;
  statusCode: number;
  timestamp: string;
  path: string;
}

export interface TurnkeyPropertyData extends BasePropertyResponse {
  strategy: "TURNKEY";
  allInCost: string;
  initialCashInvested: string;
  postRefiCoC: null;
  cashOutAmount: null;
  cashLeftInDeal: null;
  equityCaptured: null;
  cashOnCashReturn: number;
  capRate: number;
  dscr: number;
  onePercentRule: boolean;
  netOperatingIncome: string;
  monthlyRent: null;
  annualRent: null;
  effectiveIncome: null;
  totalExpenses: null;
  noi: string;
  monthlyMortgage: string;
  annualMortgage: string;
  annualNetCashFlow: null;
  totalScore: null;
  scoreBoardStatus: null;
  refinanceLoanAmount: null;
  crimeScore: number;
}

export interface TurnkeyCalculationResponse {
  data: TurnkeyPropertyData;
  statusCode: number;
  timestamp: string;
  path: string;
}

export interface Section8PropertyData extends BasePropertyResponse {
  strategy: "SECTION_8";
  allInCost: null;
  initialCashInvested: null;
  postRefiCoC: null;
  cashOutAmount: null;
  cashLeftInDeal: null;
  equityCaptured: null;
  cashOnCashReturn: null;
  capRate: null;
  dscr: number;
  onePercentRule: null;
  netOperatingIncome: string;
  monthlyRent: null;
  annualRent: null;
  effectiveIncome: null;
  totalExpenses: null;
  noi: null;
  monthlyMortgage: null;
  annualMortgage: null;
  annualNetCashFlow: null;
  totalScore: number;
  scoreBoardStatus: DealStatus;
  refinanceLoanAmount: null;
  crimeScore: number;
  latitude: number;
  longitude: number;
  fmrStudio: number;
  fmrOneBed: number;
  fmrTwoBed: number;
  fmrThreeBed: number;
  fmrFourBed: number;
}

export interface Section8DSCRResponse {
  data: Section8PropertyData;
  statusCode: number;
  timestamp: string;
  path: string;
}

export type PropertyData =
  | BrrrPropertyData
  | TurnkeyPropertyData
  | Section8PropertyData;

export type PropertySingleCalculation =
  | BrrrCalculationResponse
  | TurnkeyCalculationResponse
  | Section8DSCRResponse;
