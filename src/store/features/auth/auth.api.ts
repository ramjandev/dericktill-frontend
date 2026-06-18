import { baseAPI } from "@/store/baseApi/baseApi";
import type { LoginResponse, LoginUser, RegisterUser } from "./user";

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
  }),
});

export const { useLoginMutation, useRegisterUserMutation } = userAPI;
