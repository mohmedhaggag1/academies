import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from './../services/alert.service';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Inject Injector instead of AlertService directly
  const injector = inject(Injector);
  const token = localStorage.getItem('token');

  const clonedRequest = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // 2. Fetch AlertService inside catchError when error actually happens
      const alert = injector.get(AlertService);

      if (error.error) {
        const errorMessage = error.error.message || 'حدث خطأ ما';
        alert.showAlert(errorMessage, 'bg-danger');
      } else {
        console.error('HTTP Error Status:', error.status, error.message);
        alert.showAlert(error.message, 'bg-danger');
      }

      return throwError(() => error);
    })
  );
};
