const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

export const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000",
);

export const API_PREFIX = "/api/v1";

export const API_ROOT_URL = `${API_BASE_URL}${API_PREFIX}`;

export const WHOP_CHECKOUT_URL =
  typeof import.meta.env.VITE_WHOP_CHECKOUT_URL === "string"
    ? import.meta.env.VITE_WHOP_CHECKOUT_URL.trim()
    : "";
