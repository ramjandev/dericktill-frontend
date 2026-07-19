export interface RegisterUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export type LoginUser = {
  email: string;
  password: string;
};

// login user
interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

export type SubscriptionInfo = Record<string, unknown> | string;

export interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN" | string;
  profile: string | null;
  isNotification: boolean;
  isAgree: boolean;
  verifidStatus: "REQUEST" | "VERIFIED" | "REJECTED" | string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string | null;
  user: User;
  role?: string | null;
  subscription?: SubscriptionInfo | null;
}

interface AuthResult {
  message?: string;
  tokens?: Tokens;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  role?: string;
  subscription?: SubscriptionInfo;
}

export interface LoginResponse {
  data?: {
    success?: boolean;
    message?: string;
    result?: AuthResult;
    tokens?: Tokens;
    user?: User;
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    subscription?: SubscriptionInfo;
  };
  statusCode?: number;
  timestamp?: string;
  path?: string;
  message?: string;
}
export interface VerifyOtpResponse {
  data: {
    success: boolean;
    message: string;
    token: string;
  };
  statusCode: number;
  timestamp: string;
  path: string;
}
