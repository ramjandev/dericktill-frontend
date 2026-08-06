import Cookies from "js-cookie";

import type {
  AuthSession,
  SubscriptionInfo,
  Tokens,
  User,
} from "./user";

type JsonObject = Record<string, unknown>;

const ACCESS_TOKEN_COOKIE_KEY = "accessToken";

const isObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeUser = (value: unknown): User | null => {
  if (!isObject(value)) {
    return null;
  }

  if (typeof value.email !== "string" && typeof value.name !== "string") {
    return null;
  }

  return value as unknown as User;
};

const normalizeSubscription = (value: unknown): SubscriptionInfo | null => {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (isObject(value)) {
    return value;
  }

  return null;
};

const getDataChain = (payload: unknown) => {
  const chain: JsonObject[] = [];
  let current = payload;

  while (isObject(current)) {
    chain.push(current);

    if (isObject(current.data)) {
      current = current.data;
    } else if (isObject(current.result)) {
      current = current.result;
    } else {
      break;
    }
  }

  return chain;
};

const readTokens = (value: unknown): Tokens | null => {
  if (!isObject(value) || !isObject(value.tokens)) {
    return null;
  }

  const accessToken = value.tokens.accessToken;
  const refreshToken = value.tokens.refreshToken;

  if (typeof accessToken !== "string" || !accessToken.trim()) {
    return null;
  }

  return {
    accessToken,
    refreshToken:
      typeof refreshToken === "string" && refreshToken.trim()
        ? refreshToken
        : undefined,
  };
};

const readAccessToken = (value: unknown): string | null => {
  if (!isObject(value) || typeof value.accessToken !== "string") {
    return null;
  }

  return value.accessToken.trim() ? value.accessToken : null;
};

const readRefreshToken = (value: unknown): string | null => {
  if (!isObject(value) || typeof value.refreshToken !== "string") {
    return null;
  }

  return value.refreshToken.trim() ? value.refreshToken : null;
};

const readUser = (value: unknown): User | null => {
  if (!isObject(value)) {
    return null;
  }

  return normalizeUser(value.user);
};

const readSubscription = (value: unknown): SubscriptionInfo | null => {
  if (!isObject(value)) {
    return null;
  }

  return normalizeSubscription(value.subscription);
};

const buildSession = (
  user: User | null,
  tokens: Partial<Tokens>,
  subscription?: SubscriptionInfo | null,
): AuthSession | null => {
  const accessToken = tokens.accessToken ?? null;

  if (!user || !accessToken) {
    return null;
  }

  return {
    accessToken,
    refreshToken: tokens.refreshToken ?? null,
    user,
    role: user.role ?? null,
    subscription: subscription ?? null,
  };
};

export const extractExchangeSession = (payload: unknown) => {
  const exchangePayload = getDataChain(payload).find(
    (candidate) => Boolean(readTokens(candidate) && readUser(candidate)),
  );

  if (!exchangePayload) {
    return null;
  }

  return buildSession(
    readUser(exchangePayload),
    readTokens(exchangePayload) ?? {},
    readSubscription(exchangePayload),
  );
};

export const extractCurrentUserSession = (
  payload: unknown,
  fallbackTokens: Tokens,
) => {
  const currentUserPayload =
    getDataChain(payload).find((candidate) => Boolean(readUser(candidate))) ??
    null;

  return buildSession(
    readUser(currentUserPayload),
    fallbackTokens,
    readSubscription(currentUserPayload),
  );
};

export const extractRefreshTokens = (payload: unknown): Tokens | null => {
  for (const candidate of getDataChain(payload)) {
    const nestedTokens = readTokens(candidate);

    if (nestedTokens) {
      return nestedTokens;
    }

    const accessToken = readAccessToken(candidate);

    if (accessToken) {
      return {
        accessToken,
        refreshToken: readRefreshToken(candidate) ?? undefined,
      };
    }
  }

  return null;
};

export const getStoredAccessToken = () =>
  Cookies.get(ACCESS_TOKEN_COOKIE_KEY)?.trim() || null;

export const storeAccessToken = (accessToken: string) => {
  Cookies.set(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
    sameSite: "lax",
    secure: window.location.protocol === "https:",
  });
};

export const clearStoredAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN_COOKIE_KEY);
};

export const getSubscriptionSummary = (subscription: SubscriptionInfo | null) =>
  isObject(subscription) ? subscription : null;

export const extractApiErrorMessage = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return "Something went wrong. Please try again.";
  }

  const response = error as Record<string, unknown>;
  const data = response.data;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (isObject(data)) {
    const message = data.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }

    const errorMessage = data.error;
    if (typeof errorMessage === "string" && errorMessage.trim()) {
      return errorMessage;
    }
  }

  if (typeof response.message === "string" && response.message.trim()) {
    return response.message;
  }

  return "Something went wrong. Please try again.";
};

export const getAuthStatus = (error: unknown) => {
  const response = error as { status?: number } | null;
  const status = response?.status;
  const message = extractApiErrorMessage(error).toLowerCase();

  if (status === 403 || message.includes("membership")) {
    return "access-denied" as const;
  }

  if (status === 409 || message.includes("already used") || message.includes("conflict")) {
    return "conflict" as const;
  }

  if (status === 401 || message.includes("expired") || message.includes("unauthorized")) {
    return "unauthorized" as const;
  }

  if (
    status === 0 ||
    message.includes("failed to fetch") ||
    message.includes("network") ||
    message.includes("unavailable")
  ) {
    return "backend-unavailable" as const;
  }

  return "unknown" as const;
};
