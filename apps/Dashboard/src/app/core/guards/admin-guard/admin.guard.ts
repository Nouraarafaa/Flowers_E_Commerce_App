import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import Cookies from 'js-cookie'; 
import { UiErrorService, ErrorState } from '../../services/ui-error/ui-error.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const uiErrorService = inject(UiErrorService);
  
  if (isPlatformBrowser(platformId)) {
    const token = Cookies.get('flowersEcommerceToken');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        if (decoded.role === 'admin') {
          uiErrorService.clearError();
          return true; 
        }
      } catch (error) {
        console.error('Token Decode Failed:', error);
      }
    }

    uiErrorService.setError(ErrorState.Unauthorized);
    return true; 
  }

  return true;
};