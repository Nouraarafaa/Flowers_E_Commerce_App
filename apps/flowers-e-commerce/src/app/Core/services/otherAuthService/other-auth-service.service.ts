import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from '@elevate-workspace/auth';
import { jwtDecode } from 'jwt-decode';
import { AuthEndPoint } from 'libs/auth/src/lib/auth/enums/AuthEndPoint';
import { EditProfliePayload, JwtPayload } from 'libs/auth/src/lib/auth/interfaces/payload';
import { LoggedUserDataResponse, MessageResponse } from 'libs/auth/src/lib/auth/interfaces/response';
import { BehaviorSubject, Observable } from 'rxjs';
import { OtherAuthApis } from '../../base/otherAuthApis';

@Injectable({
  providedIn: 'root'
})
export class OtherAuthServiceService implements OtherAuthApis {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASEURL = inject(BASE_URL);
  private readonly _router = inject(Router);

  userData: BehaviorSubject<JwtPayload | null> = new BehaviorSubject<JwtPayload | null>(null);


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
