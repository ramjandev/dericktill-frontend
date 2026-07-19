import type { AuthSession, SubscriptionInfo, User } from "./user";

type JsonObject = Record<string, unknown>;

const isObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const findStringByKey = (value: unknown, key: string): string | null => {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findStringByKey(item, key);
      if (match) return match;
    }
    return null;
  }

  if (!isObject(value)) {
    return null;
  }

  const current = value[key];
  if (typeof current === "string" && current.trim()) {
    return current;
  }

  for (const child of Object.values(value)) {
    const match = findStringByKey(child, key);
    if (match) return match;
  }

  return null;
};

const findValueByKeys = (value: unknown, keys: string[]): unknown => {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findValueByKeys(item, keys);
      if (match !== undefined) return match;
    }
    return undefined;
  }

  if (!isObject(value)) {
    return undefined;
  }

  for (const key of keys) {
    if (key in value) {
      const current = value[key];
      if (current !== undefined && current !== null) {
        return current;
      }
    }
  }

  for (const child of Object.values(value)) {
    const match = findValueByKeys(child, keys);
    if (match !== undefined) return match;
  }

  return undefined;
};

const findObjectByKeys = (value: unknown, keys: string[]): JsonObject | null => {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findObjectByKeys(item, keys);
      if (match) return match;
    }
    return null;
  }

  if (!isObject(value)) {
    return null;
  }

  for (const key of keys) {
    const current = value[key];
    if (isObject(current)) {
      return current;
    }
  }

  for (const child of Object.values(value)) {
    const match = findObjectByKeys(child, keys);
    if (match) return match;
  }

  return null;
};

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

export const extractAuthSession = (payload: unknown): AuthSession | null => {
  const tokenContainer = findObjectByKeys(payload, ["tokens", "token"]);
  const userContainer =
    normalizeUser(findObjectByKeys(payload, ["user"])) ??
    normalizeUser(findValueByKeys(payload, ["user"]));

  const accessToken =
    findStringByKey(payload, "accessToken") ??
    (tokenContainer && typeof tokenContainer.accessToken === "string"
      ? tokenContainer.accessToken
      : null);

  if (!accessToken || !userContainer) {
    return null;
  }

  const refreshTokenCandidate =
    findStringByKey(payload, "refreshToken") ??
    (tokenContainer && typeof tokenContainer.refreshToken === "string"
      ? tokenContainer.refreshToken
      : null);

  const role =
    findStringByKey(payload, "role") ??
    (typeof userContainer.role === "string" ? userContainer.role : null);

  const subscription = normalizeSubscription(
    findValueByKeys(payload, ["subscription", "membership", "plan"]),
  );

  return {
    accessToken,
    refreshToken: refreshTokenCandidate,
    user: userContainer,
    role,
    subscription,
  };
};

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
