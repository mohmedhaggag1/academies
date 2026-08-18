import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Auth } from './auth';

const routes: Routes = [
  {path: '', component: Auth, children: [
    {path: '', loadComponent: () => import('./login/login').then(m => m.Login)},  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
