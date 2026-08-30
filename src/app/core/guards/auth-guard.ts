import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuargService } from '../services/authGuard.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthGuargService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/auth']);
};
