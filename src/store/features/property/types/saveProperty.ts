// type DealStatus = "BAD" | "GOOD" | "AVERAGE";
// type DealRating = "BAD DEAL" | "GOOD DEAL" | "AVERAGE DEAL";

// interface ScoreBreakdownItem {
//   name: string;
//   value: number | boolean;
//   score: number;
//   status: DealStatus;
// }

// interface DealScoreboard {
//   totalScore: number;
//   rating: DealRating;
//   breakdown: ScoreBreakdownItem[];
// }

// interface Income {
//   monthlyRent: number;
//   annualRent: number;
//   effectiveIncome: number;
// }

// interface Expenses {
//   totalExpenses: number;
// }

// interface Mortgage {
//   monthlyMortgage: number;
//   annualMortgage: number;
// }

// interface NetCashFlow {
//   monthly: number;
//   annual: number;
//   totalAnnualExpenses: number;
// }

// interface IncomeExpense {
//   income: Income;
//   expenses: Expenses;
//   noi: number;
//   mortgage: Mortgage;
//   netCashFlow: NetCashFlow;
// }

// interface KeyMetrics {
//   allInCost: number;
//   initialCashInvested: number;
//   monthlyCashFlow: number;
//   postRefiCoC: number;
//   cashOutAmount: number;
//   cashLeftInDeal: number;
//   cashOutPercentage: number;
//   capRate: number;
//   DSCR: number;
//   OnePercentRuleAllIn: boolean;
//   netOperatingIncome: number;
// }

// interface ResponseData {
//   KeyMetrics: KeyMetrics;
//   incomeExpance: IncomeExpense;
//   dealScoreboard: DealScoreboard;
// }

// export interface SaveBRRRRDeal {
//   strategy: "BRRRR" | string;
//   stateAddress: string;
//   purchasePrice: number;
//   downPayment: number;
//   annualInsurance: number;
//   annualPropertyTax: number;
//   vacancyRate: number;
//   maintenanceRate: number;
//   managementRate: number;
//   capexRate: number;
//   responseData: ResponseData;
// }
