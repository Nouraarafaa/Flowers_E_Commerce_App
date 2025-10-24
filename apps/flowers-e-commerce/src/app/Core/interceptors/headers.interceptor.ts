import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('flowersEcommerceToken') !== null) {
    let token = localStorage.getItem('flowersEcommerceToken');
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}`}
      });
    

  }
  return next(req);
};
