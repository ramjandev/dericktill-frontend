import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_ROOT_URL } from "@/config/runtime";
import {
  clearStoredAccessToken,
  extractApiErrorMessage,
  extractRefreshTokens,
  getStoredAccessToken,
  storeAccessToken,
} from "@/store/features/auth/auth.helpers";
import { logout, setTokens } from "@/store/features/auth/auth.slice";
import type { Tokens } from "@/store/features/auth/user";
import type { RootState } from "@/store/store";
import { toast } from "react-toastify";

const isAuthEndpoint = (url?: string) =>
  typeof url === "string" &&
  [
    "/auth/whop",
    "/auth/whop/exchange",
    "/auth/me",
    "/auth/logout",
    "/auth/refresh-token",
  ].some((path) => url.includes(path));

type BaseQueryExtraOptions = {
  silent?: boolean;
};

const baseQueryAPI = fetchBaseQuery({
  baseUrl: API_ROOT_URL,
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken ?? getStoredAccessToken();

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const getRequestUrl = (args: string | FetchArgs) =>
  typeof args === "string" ? args : args.url;

const getRequestMethod = (args: string | FetchArgs) =>
  typeof args === "string" ? "GET" : (args.method ?? "GET");

const extractSuccessMessage = (payload: unknown) => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const response = payload as {
    message?: unknown;
    data?: { message?: unknown };
  };

  if (typeof response.data?.message === "string" && response.data.message.trim()) {
    return response.data.message;
  }

  if (typeof response.message === "string" && response.message.trim()) {
    return response.message;
  }

  return null;
};

const redirectTo = (path: string) => {
  if (typeof window === "undefined") {
    return;
  }

  const nextUrl = new URL(path, window.location.origin);
  const currentUrl = `${window.location.pathname}${window.location.search}`;
  const targetUrl = `${nextUrl.pathname}${nextUrl.search}`;

  if (currentUrl !== targetUrl) {
    window.location.replace(targetUrl);
  }
};

const clearAuthentication = (api: BaseQueryApi) => {
  clearStoredAccessToken();
  api.dispatch(logout());
};

let refreshPromise: Promise<Tokens | null> | null = null;

const refreshAuthTokens = async (
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions | undefined,
) => {
  if (!refreshPromise) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    refreshPromise = (async () => {
      const refreshResult = await baseQueryAPI(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: refreshToken ? { refreshToken } : undefined,
        },
        api,
        extraOptions ?? {},
      );

      if (refreshResult.data) {
        const nextTokens = extractRefreshTokens(refreshResult.data);

        if (nextTokens?.accessToken) {
          storeAccessToken(nextTokens.accessToken);
          api.dispatch(setTokens(nextTokens));
          return nextTokens;
        }
      }

      clearAuthentication(api);
      return null;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

const baseQueryWithToasts: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  BaseQueryExtraOptions
> = async (args, api, extraOptions) => {
  const requestUrl = getRequestUrl(args);
  const method = getRequestMethod(args);
  const isAuthenticationRequest = isAuthEndpoint(requestUrl);
  let result = await baseQueryAPI(args, api, extraOptions);

  if (result.error?.status === 401 && !isAuthenticationRequest) {
    const refreshedTokens = await refreshAuthTokens(api, extraOptions);

    if (refreshedTokens?.accessToken) {
      result = await baseQueryAPI(args, api, extraOptions);
    }

    if (result.error?.status === 401) {
      clearAuthentication(api);

      if (!extraOptions?.silent) {
        toast.error("Session expired. Please continue with Whop again.");
      }

      redirectTo("/login");
      return result;
    }
  }

  if (result.error?.status === 403 && !isAuthenticationRequest) {
    if (!extraOptions?.silent) {
      toast.error(
        "You no longer have access. Please renew your Whop subscription.",
      );
    }

    redirectTo("/access-denied?reason=subscription-required");
  }

  if (method !== "GET") {
    if (result.data && !result.error) {
      const message = extractSuccessMessage(result.data);

      if (message && !extraOptions?.silent && !isAuthenticationRequest) {
        if (method === "DELETE") {
          toast.warning(message);
        } else {
          toast.success(message);
        }
      }
    }

    if (
      result.error &&
      result.error.status !== 401 &&
      result.error.status !== 403 &&
      !isAuthenticationRequest &&
      !extraOptions?.silent
    ) {
      toast.error(extractApiErrorMessage(result.error));
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithToasts,
  tagTypes: ["Calculations"],
  endpoints: () => ({}),
});
