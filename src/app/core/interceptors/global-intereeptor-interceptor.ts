import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const alertService = inject(AlertService);

  const token = localStorage.getItem('token');

  // Requests that should not be treated as authenticated requests
  const isLoginRequest = req.url.includes('/login');
  const isTranslationRequest = req.url.includes('/assets/i18n/');

  // ============================================
  // Add Authorization token
  // ============================================

  if (
    token &&
    !isLoginRequest &&
    !isTranslationRequest
  ) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ============================================
  // Handle HTTP response
  // ============================================

  return next(req).pipe(

    catchError((error) => {

      // ========================================
      // 401 Unauthorized
      // ========================================

      if (
        error.status === 401 &&
        !isLoginRequest &&
        !isTranslationRequest
      ) {
        authService.logout();

        return throwError(() => error);
      }

      // ========================================
      // Other API errors
      // 400
      // 403
      // 404
      // 409
      // 422
      // 500
      // ========================================

      if (!isTranslationRequest) {

        const message =
          error?.error?.message ||
          error?.error?.title ||
          error?.message ||
          'Something went wrong';

        alertService.showAlert(
          message,
          'bg-danger'
        );
      }

      return throwError(() => error);
    })

  );
};
