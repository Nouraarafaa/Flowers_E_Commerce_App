export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
export interface LoggedUserDataResponse {
  message: string;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: any[];
  _id: string;
  addresses: any[];
  createdAt: string;
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
