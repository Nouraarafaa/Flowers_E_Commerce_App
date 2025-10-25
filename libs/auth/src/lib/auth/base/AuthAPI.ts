import { Observable } from "rxjs";
import { ChangePasswordPayload, EditProfliePayload, ForgotPasswordPayload, LoginPayload, RegisterPayload, ResetPasswordPayload, VerifyCodePayload } from "../interfaces/payload";
import { AuthModel } from "../interfaces/auth-model";
import { ForgotPasswordResponse, LoggedUserDataResponse, MessageResponse, ResetOrChangePasswordResponse, VerifyCodeResponse } from "../interfaces/response";

export abstract class AuthAPI {

    abstract register(data: RegisterPayload): Observable<AuthModel>;
    abstract login(data: LoginPayload): Observable<AuthModel>;
    abstract changePassword(data: ChangePasswordPayload): Observable<ResetOrChangePasswordResponse>;
    abstract uploadProfilePhoto(file: File): Observable<MessageResponse>
    abstract getLoggedUserData(): Observable<LoggedUserDataResponse>
    abstract logout(): Observable<MessageResponse>;
    abstract forgotPassword(data: ForgotPasswordPayload): Observable<ForgotPasswordResponse>;
    abstract verifyCode(data: VerifyCodePayload): Observable<VerifyCodeResponse>;
    abstract resetPassword(data: ResetPasswordPayload): Observable<ResetOrChangePasswordResponse>
    abstract deleteMyAccount(): Observable<MessageResponse>
    abstract editProflie(data: EditProfliePayload): Observable<LoggedUserDataResponse>

}