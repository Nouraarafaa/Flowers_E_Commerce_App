export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
    gender: string;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export interface ChangePasswordPayload {
  password: string;
  newPassword: string;
}
export interface ForgotPasswordPayload {
    email: string;
}
export interface VerifyCodePayload {
  resetCode: string;
}
export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}
export interface EditProfliePayload {
  lastName: string;
}

export interface JwtPayload {
    id: string
    role: string
    iat: number
}
