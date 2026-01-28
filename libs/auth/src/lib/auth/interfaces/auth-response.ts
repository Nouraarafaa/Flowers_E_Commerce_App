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
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: string[];
  _id: string;
  addresses: Address[];
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
