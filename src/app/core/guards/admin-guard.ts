import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuargService } from '../services/authGuard.service';

export const adminGuard: CanActivateFn = () => {

  const authService = inject(AuthGuargService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/auth']);
  }

  if (authService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/user']);
};
