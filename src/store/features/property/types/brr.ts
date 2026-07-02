export interface PropertyBrrr {
  stateAddress: string;
  city: string;
  state: string;
  zipCode: string;
  bedRooms: number;
  purchasePrice: number;
  downPaymentPercent: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  rehabCost: number;
  rehabDurationMonths: number;
  arvAfterRepairValue: number;
  monthlyRent: number;
  annualPropertyTax: number;
  annualInsurance: number;
  annualUtilities: number;
  annualOtherExpense: number;
  vacancyRate: number;
  maintenanceRate: number;
  managementRate: number;
  capexRate: number;
  refinanceLtv: number;
  refinanceInterestRate: number;
  refinanceLoanTerm: number;
  closingCost: number;
  refinanceCost: number;
  holdingCost: number;
  loanPoints: number;
  crimeScore: number;
}

export interface PropertyTurnkey {
  stateAddress: string;
  city: string;
  state: string;
  zipCode: string;
  bedRooms: number;
  purchasePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  arvAfterRepairValue: number;
  monthlyRent: number;
  rehabCost: number;
  annualPropertyTax: number;
  annualInsurance: number;
  annualUtilities: number;
  annualOtherExpense: number;
  vacancyRate: number;
  maintenanceRate: number;
  managementRate: number;
  capexRate: number;
  interestRate: number;
  loanTerm: number;
  loanPoints: number;
  lenderFees: number;
  closingCost: number;
  holdingCost: number;
  section8Rent: number;
  crimeScore: number;
}

export interface PropertySection8 {
  stateAddress: string;
  city: string;
  state: string;
  zipCode: string;
  bedRooms: number;
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  rehabCost: number;
  arvAfterRepairValue: number;
  monthlyRent: number;
  annualPropertyTax: number;
  annualInsurance: number;
  annualUtilities: number;
  annualOtherExpense: number;
  vacancyRate: number;
  maintenanceRate: number;
  managementRate: number;
  capexRate: number;
  refinanceLtv: number;
  refinanceInterestRate: number;
  refinanceLoanTerm: number;
  closingCost: number;
  refinanceCost: number;
  holdingCost: number;
  crimeScore: number;
}

export type GetParams = {
  page?: string;
  limit?: string;
};
