import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AuthContainerComponent } from './containers/auth-container/auth-container.component';
import { PermissionsListComponent } from './components/roles-management/permissions-list/permissions-list.component';
import { AuthLoggingContainerComponent } from './containers/auth-logging-container/auth-logging-container.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { AuthenticateService } from './authenticate.service';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ForgetPasswordComponent,
    AuthContainerComponent,
    PermissionsListComponent,
    AuthLoggingContainerComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxOtpInputModule
  ],
  providers: [
    AuthenticateService
  ]
})
export class AuthModule {
}
