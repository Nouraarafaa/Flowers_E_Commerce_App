import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import Cookies from 'js-cookie'; 
export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {

    const token = Cookies.get('flowersEcommerceToken'); 
    const isGeoapifyUrl = req.url.includes('geoapify');
    const isStatisticsUrl = req.url.includes('statistics');
    if(token && isStatisticsUrl){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjliNWQ2ZTBlMzY0ZWY2MTQwNjMyNTZjIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzM1MjQ3MDR9.Ztgx8_lEgX6DpGq9ZAreBmIWmB9JdD-c4gfa9u_bEmI`,
        },
      });
    }
    if (token && !isGeoapifyUrl && !isStatisticsUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return next(req);
};