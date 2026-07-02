import { z } from "zod";

const baseSchema = z.object({
  streetAddress: z
    .string()
    .min(1, "Street address is required")
    .min(5, "Please enter a valid street address"),

  city: z
    .string()
    .min(1, "City is required")
    .min(2, "City name must be at least 2 characters"),

  state: z
    .string()
    .min(1, "State is required")
    .regex(/^[A-Za-z]{2}$/, "Please use 2-letter state abbreviation (e.g. CA)"),

  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code (e.g. 12345)"),

  bedrooms: z
    .number({ error: "Bedrooms must be a number" })
    .int("Bedrooms must be a whole number")
    .min(1, "At least 1 bedroom is required")
    .max(200, "Bedrooms cannot exceed 200"),

  purchasePrice: z
    .number({ error: "Purchase price must be a number" })
    .min(1000, "Purchase price must be at least $1,000")
    .max(100_000_000, "Purchase price seems too high — please double-check"),

  downPayment: z
    .number({ error: "Down payment must be a number" })
    .min(0, "Down payment cannot be negative"),

  downPaymentPercent: z
    .number({ error: "Down payment percent must be a number" })
    .min(0, "Down payment percent cannot be negative")
    .max(100, "Down payment percent cannot exceed 100%"),

  monthlyRent: z
    .number({ error: "Monthly rent must be a number" })
    .min(100, "Monthly rent must be at least $100"),

  rehabCost: z
    .number({ error: "Rehab cost must be a number" })
    .min(0, "Rehab cost cannot be negative"),

  rehabDurationMonths: z
    .number({ error: "Rehab duration must be a number" })
    .int("Rehab duration must be a whole number")
    .min(0, "Rehab duration cannot be negative")
    .max(60, "Rehab duration cannot exceed 60 months"),
  propertyTax: z
    .number({ error: "Property tax must be a number" })
    .min(0, "Property tax cannot be negative"),

  insurance: z
    .number({ error: "Insurance must be a number" })
    .min(0, "Insurance cannot be negative"),

  utilities: z
    .number({ error: "Utilities must be a number" })
    .min(0, "Utilities cannot be negative"),

  otherExpenses: z
    .number({ error: "Other expenses must be a number" })
    .min(0, "Other expenses cannot be negative"),

  vacancyRate: z
    .number({ error: "Vacancy rate must be a number" })
    .min(0, "Vacancy rate cannot be negative")
    .max(100, "Vacancy rate cannot exceed 100%"),

  maintenanceRate: z
    .number({ error: "Maintenance rate must be a number" })
    .min(0, "Maintenance rate cannot be negative")
    .max(100, "Maintenance rate cannot exceed 100%"),

  capexRate: z
    .number({ error: "CapEx rate must be a number" })
    .min(0, "CapEx rate cannot be negative")
    .max(100, "CapEx rate cannot exceed 100%"),

  propertyMgmtRate: z
    .number({ error: "Property management rate must be a number" })
    .min(0, "Property management rate cannot be negative")
    .max(100, "Property management rate cannot exceed 100%"),

  interestRate: z
    .number({ error: "Interest rate must be a number" })
    .min(0, "Interest rate cannot be negative")
    .max(100, "Interest rate cannot exceed 100%"),

  loanTerm: z
    .number({ error: "Loan term must be a number" })
    .int("Loan term must be a whole number")
    .min(1, "Loan term must be at least 1 year")
    .max(50, "Loan term cannot exceed 50 years"),

  closingCost: z
    .number({ error: "Closing cost must be a number" })
    .min(0, "Closing cost cannot be negative"),

  holdingCost: z
    .number({ error: "Holding cost must be a number" })
    .min(0, "Holding cost cannot be negative"),

  // ── Only optional field ──────────────────────────────────────────────────
  propertyLink: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+/.test(val),
      "Please enter a valid URL starting with http:// or https://",
    ),
});

const refinanceFields = {
  arv: z
    .number({ error: "ARV must be a number" })
    .min(0, "ARV cannot be negative"),

  refinanceLtv: z
    .number({ error: "Refinance LTV must be a number" })
    .min(0, "Refinance LTV cannot be negative")
    .max(100, "Refinance LTV cannot exceed 100%"),

  refinanceInterestRate: z
    .number({ error: "Refinance interest rate must be a number" })
    .min(0, "Refinance interest rate cannot be negative")
    .max(100, "Refinance interest rate cannot exceed 100%"),

  refinanceLoanTerm: z
    .number({ error: "Refinance loan term must be a number" })
    .int("Loan term must be a whole number")
    .min(1, "Loan term must be at least 1 year")
    .max(50, "Loan term cannot exceed 50 years"),

  refinanceCost: z
    .number({ error: "Refinance cost must be a number" })
    .min(0, "Refinance cost cannot be negative"),
};

export const brrrSchema = baseSchema
  .extend({
    ...refinanceFields,
    loanPoints: z
      .number({ error: "Loan points must be a number" })
      .min(0, "Loan points cannot be negative")
      .max(10, "Loan points cannot exceed 10"),
  })
  .refine((data) => data.downPayment <= data.purchasePrice, {
    message: "Down payment cannot exceed the purchase price",
    path: ["downPayment"],
  });

// ─── Turnkey ─────────────────────────────────────────────────────────────────
export const turnkeySchema = baseSchema
  .extend({
    arv: z
      .number({ error: "ARV must be a number" })
      .min(0, "ARV cannot be negative"),
    loanPoints: z
      .number({ error: "Loan points must be a number" })
      .min(0, "Loan points cannot be negative")
      .max(10, "Loan points cannot exceed 10"),
    lenderFees: z
      .number({ error: "Lender fees must be a number" })
      .min(0, "Lender fees cannot be negative"),
    marketRent: z
      .number({ error: "Market rent must be a number" })
      .min(0, "Market rent cannot be negative"),
    section8Rent: z
      .number({ error: "Section 8 rent must be a number" })
      .min(0, "Section 8 rent cannot be negative"),
    crimeScore: z
      .number({ error: "Crime score must be a number" })
      .min(0, "Crime score cannot be negative")
      .max(100, "Crime score cannot exceed 100"),
  })
  .refine((data) => data.downPayment <= data.purchasePrice, {
    message: "Down payment cannot exceed the purchase price",
    path: ["downPayment"],
  });

// ─── Section 8 ───────────────────────────────────────────────────────────────
export const section8Schema = baseSchema
  .extend({
    ...refinanceFields,
  })
  .refine((data) => data.downPayment <= data.purchasePrice, {
    message: "Down payment cannot exceed the purchase price",
    path: ["downPayment"],
  });

// ─── Shared form schema — all fields required, only propertyLink optional ────
export const dealInputSchema = baseSchema
  .extend({
    arv: z
      .number({ error: "ARV must be a number" })
      .min(0, "ARV cannot be negative"),
    loanPoints: z
      .number({ error: "Loan points must be a number" })
      .min(0, "Loan points cannot be negative")
      .max(10, "Loan points cannot exceed 10"),
    refinanceLtv: z
      .number({ error: "Refinance LTV must be a number" })
      .min(0, "Refinance LTV cannot be negative")
      .max(100, "Refinance LTV cannot exceed 100%"),
    refinanceInterestRate: z
      .number({ error: "Refinance interest rate must be a number" })
      .min(0, "Refinance interest rate cannot be negative")
      .max(100, "Refinance interest rate cannot exceed 100%"),
    refinanceLoanTerm: z
      .number({ error: "Refinance loan term must be a number" })
      .int("Loan term must be a whole number")
      .min(0, "Loan term cannot be negative")
      .max(50, "Loan term cannot exceed 50 years"),
    refinanceCost: z
      .number({ error: "Refinance cost must be a number" })
      .min(0, "Refinance cost cannot be negative"),
    lenderFees: z
      .number({ error: "Lender fees must be a number" })
      .min(0, "Lender fees cannot be negative"),

    section8Rent: z
      .number({ error: "Section 8 rent must be a number" })
      .min(0, "Section 8 rent cannot be negative"),
    crimeScore: z
      .number({ error: "Crime score must be a number" })
      .min(0, "Crime score cannot be negative")
      .max(100, "Crime score cannot exceed 100"),
  })
  .refine((data) => data.downPayment <= data.purchasePrice, {
    message: "Down payment cannot exceed the purchase price",
    path: ["downPayment"],
  });

export type DealInputsSchema = z.infer<typeof dealInputSchema>;
export type BrrrSchema = z.infer<typeof brrrSchema>;
export type TurnkeySchema = z.infer<typeof turnkeySchema>;
export type Section8Schema = z.infer<typeof section8Schema>;
