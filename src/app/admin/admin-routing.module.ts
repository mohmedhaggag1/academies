import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { Academies } from './academies/academies';

const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: 'academies', component: Academies },
      { path: '', redirectTo: 'academies', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
