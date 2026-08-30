import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuargService } from '../services/authGuard.service';

export const guestGuard: CanActivateFn = () => {

  const authService = inject(AuthGuargService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true;
  }

  if (authService.isAdmin()) {
    return router.createUrlTree(['/admin']);
  }

  if (authService.isUser()) {
    return router.createUrlTree(['/user']);
  }

  return router.createUrlTree(['/auth']);
};
