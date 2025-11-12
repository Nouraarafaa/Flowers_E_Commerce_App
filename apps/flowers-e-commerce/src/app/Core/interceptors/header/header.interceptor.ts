import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (localStorage.getItem('flowersEcommerceToken') !== null) {
    const token = localStorage.getItem('flowersEcommerceToken');
    const isGeoapifyUrl = req.url.includes('geoapify');
    if (!isGeoapifyUrl) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

  }

  return next(req);

};
