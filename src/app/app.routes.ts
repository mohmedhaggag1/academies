import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { userGuard } from './core/guards/user-guard';
import { guestGuard } from './core/guards/gust-guard';
import { adminGuard } from './core/guards/admin-guard';



export const routes: Routes = [

  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./admin/admin.module')
        .then(m => m.AdminModule)
  },

  {
    path: 'user',
    canActivate: [userGuard],
    loadChildren: () =>
      import('./user/user-module')
        .then(m => m.UserModule)
  },

  {
    path: 'auth',
    // canActivate: [guestGuard],
    loadChildren: () =>
      import('./auth/auth-module')
        .then(m => m.AuthModule)
  },

  {
    path: 'change-password',
    canActivate: [],
    loadComponent: () =>
      import('./core/components/change-password/change-password.component')
        .then(m => m.ChangePasswordComponent)
  },

  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'admin'
  }
];
