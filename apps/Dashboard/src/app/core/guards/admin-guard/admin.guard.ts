import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import Cookies from 'js-cookie'; 

export const adminGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const _router = inject(Router);
  
  if (isPlatformBrowser(platformId)) {
   const token = Cookies.get('flowersEcommerceToken');

  if (token) {
    try {
      const decoded: any = jwtDecode(token);

      if (decoded.role === 'admin') {
        return true; 
      } else {
        alert('User is not admin or token expired');
      }
    } catch (error) {
      console.error('Token Decode Failed:', error);
    }
  }
  }


  if (isPlatformBrowser(platformId)) {
    _router.navigate(['/not-auth']);
  }
  return false;
};