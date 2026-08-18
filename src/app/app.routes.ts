import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./admin/admin').then(m => m.Admin) },
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', redirectTo: '/' },
];
