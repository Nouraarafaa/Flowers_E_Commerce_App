import { afterNextRender, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adapter';
import { BASE_URL } from './base-url';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ChangePasswordPayload, EditProfliePayload, ForgotPasswordPayload, JwtPayload, LoginPayload, RegisterPayload, ResetPasswordPayload, VerifyCodePayload } from './interfaces/payload';
import { AuthAPI } from './base/AuthAPI';
import { AuthModel } from './interfaces/auth-model';
import { AuthResponse, ForgotPasswordResponse, LoggedUserDataResponse, MessageResponse, ResetOrChangePasswordResponse, VerifyCodeResponse } from './interfaces/response';
import { AuthEndPoint } from './enums/AuthEndPoint';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthAPI {

  private readonly _httpClient = inject(HttpClient);
  private readonly _authAPIAdaptorService = inject(AuthAPIAdaptorService);
  private readonly _BASEURL = inject(BASE_URL);
  private readonly _router = inject(Router);

  userData: BehaviorSubject<JwtPayload | null> = new BehaviorSubject<JwtPayload | null>(null);

  constructor() {
    afterNextRender(() => {
      this.isLoggedInUser();
    })
  }

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

  deleteMyAccount(): Observable<MessageResponse> {
    return this._httpClient.delete<MessageResponse>(this._BASEURL + AuthEndPoint.DeleteAccount);

  }

  editProflie(data: EditProfliePayload): Observable<LoggedUserDataResponse> {
    return this._httpClient.put<LoggedUserDataResponse>(this._BASEURL + AuthEndPoint.EditProfile, data);

  }

  // Decode The Token
  saveUserData(): void {
    if (localStorage.getItem("flowersEcommerceToken")) {
      this.userData.next(jwtDecode<JwtPayload>(localStorage.getItem("flowersEcommerceToken")!));
    }
  }

  // Verify user login
  isLoggedInUser(): boolean {
    if (localStorage.getItem("flowersEcommerceToken")) {
      this.userData.next(jwtDecode<JwtPayload>(localStorage.getItem("flowersEcommerceToken")!));
      return true;
    } else {
      return false;
    }
  }




  // Clear local data + navigate
  clearSession(): void {
    localStorage.removeItem("flowersEcommerceToken");
    this.userData.next(null);
    this._router.navigate(['/login'])
  }


}

