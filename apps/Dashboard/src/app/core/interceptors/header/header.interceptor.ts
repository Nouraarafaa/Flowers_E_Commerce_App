import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import Cookies from 'js-cookie'; 
export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {

    const token = Cookies.get('flowersEcommerceToken'); 
    const isGeoapifyUrl = req.url.includes('geoapify');

    if (token && !isGeoapifyUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return next(req);
};