export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
export interface LoggedUserDataResponse {
  message: string;
  user: User;
}

export interface Address {
  _id: string;
  street: string;
  city: string;
  phone: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: any[];
  addresses: any[];
  createdAt: string;
  passwordResetCode: string;
  passwordResetExpires: string;
  resetCodeVerified: boolean;
  passwordChangedAt: string;
}

export interface ForgotPasswordResponse {
  message: string;
  info: string;
}

export interface VerifyCodeResponse {
  status: string;
}

export interface ResetOrChangePasswordResponse {
  message: string;
  token: string;
}

export interface MessageResponse {
  message: string;
}
