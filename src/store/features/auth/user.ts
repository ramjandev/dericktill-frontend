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
  refreshToken: string;
}

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

interface AuthResult {
  message: string;
  tokens: Tokens;
  user: User;
}

export interface LoginResponse {
  data: {
    success: boolean;
    result: AuthResult;
  };
  statusCode: number;
  timestamp: string;
  path: string;
}
