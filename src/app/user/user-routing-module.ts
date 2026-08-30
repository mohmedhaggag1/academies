import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { User } from './user/user';

const routes: Routes = [
  {
    path: '',
    component: User,
    children: [
      { path: '', loadComponent: () => import('./user/user').then(m => m.User)  },
      // { path: '', redirectTo: '', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserRoutingModule {}
