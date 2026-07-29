const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

const readPublicEnv = (...keys: string[]) => {
  for (const key of keys) {
    const value = import.meta.env[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

export const API_BASE_URL = normalizeBaseUrl(
  readPublicEnv("NEXT_PUBLIC_API_URL", "VITE_API_BASE_URL") ||
    "http://localhost:3000",
);

export const API_PREFIX = "/api/v1";

export const API_ROOT_URL = `${API_BASE_URL}${API_PREFIX}`;

export const WHOP_CHECKOUT_URLS = {
  individualMonthly: readPublicEnv(
    "NEXT_PUBLIC_WHOP_INDIVIDUAL_MONTHLY_URL",
    "VITE_WHOP_INDIVIDUAL_MONTHLY_URL",
  ),
  individualYearly: readPublicEnv(
    "NEXT_PUBLIC_WHOP_INDIVIDUAL_YEARLY_URL",
    "VITE_WHOP_INDIVIDUAL_YEARLY_URL",
  ),
  business5: readPublicEnv(
    "NEXT_PUBLIC_WHOP_BUSINESS_5_URL",
    "VITE_WHOP_BUSINESS_5_URL",
    "VITE_WHOP_BUSINESS_5_SEATS_URL",
  ),
  business10: readPublicEnv(
    "NEXT_PUBLIC_WHOP_BUSINESS_10_URL",
    "VITE_WHOP_BUSINESS_10_URL",
    "VITE_WHOP_BUSINESS_10_SEATS_URL",
  ),
} as const;

export const DEFAULT_WHOP_CHECKOUT_URL =
  Object.values(WHOP_CHECKOUT_URLS).find((value) => Boolean(value)) ?? "";
