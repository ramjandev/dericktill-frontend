/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import { API_ROOT_URL } from "@/config/runtime";
import { toast } from "react-toastify";
import { logout } from "../features/auth/auth.slice";

const isAuthEndpoint = (url?: string) =>
  typeof url === "string" &&
  ["/auth/whop", "/auth/whop/exchange", "/auth/me", "/auth/logout"].some(
    (path) => url.includes(path),
  );

// Original baseQueryAPI
const baseQueryAPI = fetchBaseQuery({
  baseUrl: API_ROOT_URL,
  credentials: "include",
  prepareHeaders(headers) {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithToasts: typeof baseQueryAPI = async (
  args,
  api,
  extraOptions: any,
) => {
  const result = await baseQueryAPI(args, api, extraOptions);
  const requestUrl =
    typeof args === "string" ? args : typeof args === "object" ? args.url : "";

  const method =
    typeof args === "object" && "method" in args ? args.method : "GET";

  // Handle 401 errors globally
  if (result?.error && result.error.status === 401) {
    Cookies.remove("accessToken");
    api.dispatch(logout());
    if (!isAuthEndpoint(requestUrl)) {
      toast.error("Session expired. Please login again.");
    }
  }

  if (method !== "GET") {
    if (
      result?.data &&
      typeof result.data === "object" &&
      "message" in result.data
    ) {
      const message = (result.data as { message?: string }).message;
      if (message && !extraOptions?.silent) {
        if (method === "DELETE") {
          toast.warning(message);
        } else {
          toast.success(message);
        }
      }
    }

    // Error toast for non-GET methods (excluding 401 which is handled above)
    if (result?.error && result.error.status !== 401) {
      const message =
        (result.error.data as { message?: string })?.message ||
        "Something went wrong. Please try again.";
      if (!isAuthEndpoint(requestUrl)) {
        toast.error(message);
      }
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
