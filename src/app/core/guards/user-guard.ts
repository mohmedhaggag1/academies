import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthGuargService } from '../services/authGuard.service';

export const userGuard: CanActivateFn = () => {

  const authService = inject(AuthGuargService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/auth']);
  }

  if (authService.isUser()) {
    return true;
  }

  return router.createUrlTree(['/admin']);
};
