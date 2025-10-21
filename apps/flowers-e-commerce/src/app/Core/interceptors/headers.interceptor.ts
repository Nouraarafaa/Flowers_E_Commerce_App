import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('flowersEcommerceToken') !== null) {
    
      req = req.clone({
        setHeaders: { Authorization: localStorage.getItem('flowersEcommerceToken')! }
      });
    

  }
  return next(req);
};
