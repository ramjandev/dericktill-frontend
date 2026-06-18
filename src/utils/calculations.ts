// import type { DealInputs, DealResults } from "../types";

// export function calculateDeal(inputs: DealInputs): DealResults {
//   const loanAmount = inputs.purchasePrice - inputs.downPayment;
//   const interestRate = 0.07 / 12;
//   const numPayments = 360;
//   const mortgagePayment =
//     loanAmount > 0
//       ? (loanAmount *
//           (interestRate * Math.pow(1 + interestRate, numPayments))) /
//         (Math.pow(1 + interestRate, numPayments) - 1)
//       : 0;

//   const vacancy = inputs.monthlyRent * (inputs.vacancyRate / 100);
//   const maintenance = inputs.monthlyRent * (inputs.maintenanceRate / 100);
//   const capex = inputs.monthlyRent * (inputs.capexRate / 100);
//   const propertyMgmt = inputs.monthlyRent * (inputs.propertyMgmtRate / 100);
//   const propertyTaxMonthly = inputs.propertyTax / 12;
//   const insuranceMonthly = inputs.insurance / 12;

//   const totalExpenses =
//     mortgagePayment +
//     propertyTaxMonthly +
//     insuranceMonthly +
//     vacancy +
//     maintenance +
//     capex +
//     propertyMgmt +
//     inputs.utilities +
//     inputs.otherExpenses;

//   const monthlyCashFlow = inputs.monthlyRent - totalExpenses;
//   const noi =
//     inputs.monthlyRent -
//     (propertyTaxMonthly +
//       insuranceMonthly +
//       vacancy +
//       maintenance +
//       capex +
//       propertyMgmt +
//       inputs.utilities +
//       inputs.otherExpenses);
//   const annualCashFlow = monthlyCashFlow * 12;
//   const totalInvestment = inputs.downPayment + inputs.rehabCost;
//   const annualROI =
//     totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
//   const cocReturn =
//     totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
//   const capRate =
//     inputs.purchasePrice > 0 ? ((noi * 12) / inputs.purchasePrice) * 100 : 0;
//   const dscr = mortgagePayment > 0 ? noi / mortgagePayment : 0;
//   const onePercentRule =
//     inputs.purchasePrice > 0 &&
//     inputs.monthlyRent / inputs.purchasePrice >= 0.01;

//   let dealRating: DealResults["dealRating"];
//   if (monthlyCashFlow >= 200 && cocReturn >= 8 && dscr >= 1.25) {
//     dealRating = "GOOD DEAL";
//   } else if (monthlyCashFlow >= 0 && cocReturn >= 0) {
//     dealRating = "ALRIGHT DEAL";
//   } else {
//     dealRating = "BAD DEAL";
//   }

//   return {
//     monthlyCashFlow,
//     annualROI,
//     cocReturn,
//     capRate,
//     dscr,
//     onePercentRule,
//     noi,
//     mortgagePayment,
//     vacancy,
//     maintenance,
//     capex,
//     propertyMgmt,
//     totalExpenses,
//     dealRating,
//   };
// }

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyDecimal(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// new date converters
export const formatDateTime = (dateInput: string | Date) => {
  const date = new Date(dateInput);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
export const formatDate = (dateInput: string | Date) => {
  const date = new Date(dateInput);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
