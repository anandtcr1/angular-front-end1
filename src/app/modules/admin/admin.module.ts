import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LanguagePipe } from 'src/app/shared/pipes/language.pipe';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './components/users-management/users/users.component';
import { RolePermissionComponent } from './components/role-permission/role-permission.component';
import { UsersRolesComponent } from './components/users-roles/users-roles.component';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RoleDetailsComponent } from './components/role-details/role-details.component';
import { RolesService } from './services/roles.service';
import { EditUserComponent } from './components/users-management/edit-user/edit-user.component';
import { CreateUserComponent } from './components/users-management/create-user/create-user.component';
import { DefinitionFilesListComponent } from './components/definition-files/definition-files-list/definition-files-list.component';
import { DefinitionFileComponent } from './components/definition-files/definition-file/definition-file.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsComponent } from './components/projects/projects.component';


@NgModule({
  declarations: [
    AdminContainerComponent,
    UsersComponent,
    RolePermissionComponent,
    UsersRolesComponent,
    AdminContainerComponent,
    RolesListComponent,
    RoleDetailsComponent,
    EditUserComponent,
    CreateUserComponent,
    DefinitionFilesListComponent,
    DefinitionFileComponent,
    ProfileComponent,
    DefinitionFileComponent,
    EditProfileComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers:[
    UserService,
    RolesService
  ]
})
export class AdminModule {
}
