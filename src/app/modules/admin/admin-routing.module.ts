import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { UsersComponent } from './components/users-management/users/users.component';
import { RolePermissionComponent } from './components/role-permission/role-permission.component';
import { UsersRolesComponent } from './components/users-roles/users-roles.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RoleDetailsComponent } from './components/role-details/role-details.component';
import { DefinitionFilesListComponent } from './components/definition-files/definition-files-list/definition-files-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    children : [
      {
        path : 'users',
        component : UsersComponent,
        data: {
          breadcrumb: 'users'
        }
      },
      {
        path : 'role-permissions/:id',
        component : RolePermissionComponent,
        data: {
          breadcrumb: 'rolePermissions'
        }
      },
      {
        path : 'users-roles',
        component : UsersRolesComponent,
        data: {
          breadcrumb: 'usersRoles'
        }
      },
      {
        path: 'roles-list',
        component: RolesListComponent,
        data: {
          breadcrumb: 'Roles list'
        }
      },
      {
        path: 'role/:id',
        component: RoleDetailsComponent,
        data: {
          breadcrumb: 'Role details'
        }
      },
      {
        path : 'definition-files',
        component : DefinitionFilesListComponent,
        data : {
          breadcrumb: 'definitionFiles'
        }
      },
      {
        path : 'my-profile',
        component : ProfileComponent,
        data : {
          breadcrumb: 'myProfile'
        }
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        data : {
          breadcrumb: 'editProfile'
        }
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          breadcrumb: 'projects'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
