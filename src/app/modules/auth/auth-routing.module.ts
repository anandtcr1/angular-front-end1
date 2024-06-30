import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';
import { RoleDetailsComponent } from '../admin/components/role-details/role-details.component';
import { PermissionsListComponent } from './components/roles-management/permissions-list/permissions-list.component';
import { AuthLoggingContainerComponent } from './containers/auth-logging-container/auth-logging-container.component';
import { RolesListComponent } from '../admin/components/roles-list/roles-list.component';

const routes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: '',
        component: AuthLoggingContainerComponent,
        children: [
          {
            path: 'signin',
            component: SigninComponent
          },
          {
            path: 'signup',
            component: SignupComponent
          },
          {
            path: 'forget-password',
            component: ForgetPasswordComponent
          }
        ]
      },
      {
        path: 'roles-list',
        component: RolesListComponent
      },
      {
        path: 'role/:id',
        component: RoleDetailsComponent
      },
      {
        path: 'permissions-list',
        component: PermissionsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
