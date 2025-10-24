import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adapter';
import { BASE_URL } from './base-url';
import { map, Observable } from 'rxjs';
import { ChangePasswordPayload, ForgotPasswordPayload, LoginPayload, RegisterPayload, ResetPasswordPayload, VerifyCodePayload } from './interfaces/payload';
import { AuthAPI } from './base/AuthAPI';
import { AuthModel } from './interfaces/auth-model';
import { AuthResponse, ForgotPasswordResponse, LoggedUserDataResponse, MessageResponse, ResetOrChangePasswordResponse, VerifyCodeResponse } from './interfaces/response';
import { AuthEndPoint } from './enums/AuthEndPoint';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthAPI {

  private readonly _httpClient = inject(HttpClient);
  private readonly _authAPIAdaptorService = inject(AuthAPIAdaptorService);
  private readonly _BASEURL = inject(BASE_URL);




  register(data: RegisterPayload): Observable<AuthModel> {
    return this._httpClient.post<AuthResponse>(this._BASEURL + AuthEndPoint.SignUp, data)
      .pipe(map((res) => this._authAPIAdaptorService.adapt(res)));
  }

  login(data: LoginPayload): Observable<AuthModel> {
    return this._httpClient.post<AuthResponse>(this._BASEURL + AuthEndPoint.SignIn, data)
      .pipe(map((res) => this._authAPIAdaptorService.adapt(res)));
  }

  changePassword(data: ChangePasswordPayload): Observable<ResetOrChangePasswordResponse> {
    return this._httpClient.patch<ResetOrChangePasswordResponse>(this._BASEURL + AuthEndPoint.ChangePassword, data);
  }

  uploadProfilePhoto(file: File): Observable<MessageResponse> {
    const formData = new FormData();
    formData.append('photo', file);
    return this._httpClient.put<MessageResponse>(this._BASEURL + AuthEndPoint.UploadProfilePhoto, formData);
  }

  getLoggedUserData(): Observable<LoggedUserDataResponse> {
    return this._httpClient.get<LoggedUserDataResponse>(this._BASEURL + AuthEndPoint.GetInfo);
  }

  logout(): Observable<MessageResponse> {
    return this._httpClient.get<MessageResponse>(this._BASEURL + AuthEndPoint.Logout);
  }
  // Forgot Password
  forgotPassword(data: ForgotPasswordPayload): Observable<ForgotPasswordResponse> {
    return this._httpClient.post<ForgotPasswordResponse>(this._BASEURL + AuthEndPoint.forgotPassword, data)

  }

  verifyCode(data: VerifyCodePayload): Observable<VerifyCodeResponse> {
    return this._httpClient.post<VerifyCodeResponse>(this._BASEURL + AuthEndPoint.Verify, data)

  }

  resetPassword(data: ResetPasswordPayload): Observable<ResetOrChangePasswordResponse> {
    return this._httpClient.put<ResetOrChangePasswordResponse>(this._BASEURL + AuthEndPoint.ResetPassword, data)

  }
  // Forgot Password end




}

