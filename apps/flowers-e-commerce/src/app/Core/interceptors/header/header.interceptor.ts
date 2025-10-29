import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
    if (localStorage.getItem('flowersEcommerceToken') !== null) {
    const token = localStorage.getItem('flowersEcommerceToken');
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);

};
