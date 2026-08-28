import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule) },
        { path: 'change-password', loadComponent: () => import('./core/components/change-password/change-password.component').then(m => m.ChangePasswordComponent) },

    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', redirectTo: '/' },
];
