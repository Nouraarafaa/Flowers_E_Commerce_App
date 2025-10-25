import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import {  JwtPayload } from 'libs/auth/src/lib/auth/interfaces/payload';
import { BehaviorSubject} from 'rxjs';
import { OtherAuthApis } from '../../base/otherAuthApis';

@Injectable({
  providedIn: 'root'
})
export class OtherAuthServiceService implements OtherAuthApis {
  private readonly _router = inject(Router);

  userData: BehaviorSubject<JwtPayload | null> = new BehaviorSubject<JwtPayload | null>(null);




  

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
