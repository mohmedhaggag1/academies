import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';

const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: 'academies', loadComponent: () => import('./academies/academies').then(m => m.Academies)  },
      { path: 'bank-account', loadComponent: () => import('./bank-account/bank-account').then(m => m.BankAccount)  },
      {path: 'academies/:id', loadComponent: () => import('./academy-details/academy-details').then(m => m.AcademyDetails) },
      { path: '', redirectTo: 'academies', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
