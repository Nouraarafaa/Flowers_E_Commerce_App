import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // if (error.status === 401 || error.status === 403) {
      //   // Authentication or Authorization error
      //   router.navigate(['/not-auth']);
      // } else if (error.status === 500 || error.status === 503 || error.status === 504 || error.status === 0) {
      if (error.status === 500 || error.status === 503 || error.status === 504 || error.status === 0) {
        // Server errors or server down (status 0)
        router.navigate(['/server-down']);
      }
      
      return throwError(() => error);
    })
  );
};
