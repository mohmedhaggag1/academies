import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  console.log('TOKEN FROM LOCAL STORAGE:', token);
  console.log('REQUEST URL:', req.url);

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(
      'AUTH HEADER:',
      clonedRequest.headers.get('Authorization')
    );

    return next(clonedRequest);
  }

  return next(req);
};
