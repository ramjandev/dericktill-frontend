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
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = userAPI;
