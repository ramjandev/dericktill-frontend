import type { RootState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession, SubscriptionInfo, User } from "./user";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  subscription: SubscriptionInfo | null;
  resetToken: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  role: null,
  subscription: null,
  resetToken: null,
};

type SetUserPayload = AuthSession;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      const { user, accessToken, refreshToken, role, subscription } =
        action.payload;

      if (!user || !accessToken) {
        return;
      }

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken ?? null;
      state.role = role ?? user.role ?? null;
      state.subscription = subscription ?? null;
    },
    setResetToken: (state, action: PayloadAction<string>) => {
      state.resetToken = action.payload;
    },
    clearResetToken: (state) => {
      state.resetToken = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.subscription = null;
      state.resetToken = null;
    },
  },
});

export const { setUser, logout, setResetToken, clearResetToken } =
  authSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectRole = (state: RootState) => state.auth.role;
export const selectSubscription = (state: RootState) => state.auth.subscription;

export default authSlice.reducer;
