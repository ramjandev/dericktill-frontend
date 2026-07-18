/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import { toast } from "react-toastify";
import { logout } from "../features/auth/auth.slice";

// Original baseQueryAPI
const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "https://api.feasiblerealestate.com",
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

  const method =
    typeof args === "object" && "method" in args ? args.method : "GET";

  // Handle 401 errors globally
  if (result?.error && result.error.status === 401) {
    Cookies.remove("accessToken");
    api.dispatch(logout());
    toast.error("Session expired. Please login again.");
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
      toast.error(message);
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
