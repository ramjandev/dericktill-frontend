import { baseAPI } from "@/store/baseApi/baseApi";
import type {
  LoginResponse,
  LoginUser,
  RegisterUser,
  VerifyOtpResponse,
} from "./user";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginUser>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    whopExchange: build.mutation<unknown, { code: string }>({
      query: ({ code }) => ({
        url: "/auth/whop/exchange",
        method: "POST",
        body: { code },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    currentUser: build.query<unknown, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
    logoutSession: build.mutation<unknown, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    registerUser: build.mutation<void, RegisterUser>({
      query: (data) => ({
        url: "/auth/user-singup",
        method: "POST",
        body: data,
      }),
    }),
    //password
    forgotPassword: build.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: build.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: build.mutation<
      VerifyOtpResponse,
      { email: string; otp: string }
    >({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation<void, { token: string; newPassword: string }>(
      {
        query: (data) => ({
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        }),
      },
    ),
    changePassword: build.mutation<
      void,
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useWhopExchangeMutation,
  useCurrentUserQuery,
  useLazyCurrentUserQuery,
  useLogoutSessionMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = userAPI;
