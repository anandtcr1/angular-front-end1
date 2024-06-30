import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'adminPages'
    },
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path:'**',
    redirectTo: '/admin/users'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
