import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PASSWORD_PATTERN } from 'src/app/core/constants/validators';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AuthenticateService } from '../../authenticate.service';
import { ForgotPassword, ForgotPasswordConfirmation } from '../../auth.model';
import { environment } from 'src/environments/environment';
import { LanguagePipe } from 'src/app/shared/pipes/language.pipe';
import { MessageService } from 'src/app/core/services/message.service';

enum ForgetPasswordComponentState {
  FORGET_PASSWORD = 'FORGET_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY_CODE = 'VERIFY_CODE'
}

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  sendEmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })
  forgetPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    token: new FormControl(null, [Validators.required]),    
    password: new FormControl(null, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(PASSWORD_PATTERN)])
  })
  submitted: boolean = false
  showPassword: boolean = false
  showPasswordConfirm: boolean = false
  activePageType = ForgetPasswordComponentState.FORGET_PASSWORD
  forgetPasswordComponentState = ForgetPasswordComponentState

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messageService:MessageService,
    private langPipe:LanguagePipe,
    private authenticateService: AuthenticateService) {      
    this.route.queryParams
      .subscribe(params => {
        if (params['type'] === ForgetPasswordComponentState.RESET_PASSWORD && params['email'] && params['token']) {

          let decodedtoken = decodeURIComponent(params['token']).split(" ").join("+");
          
          this.forgetPassForm.controls['email'].setValue(params['email']);
          this.forgetPassForm.controls['token'].setValue(decodedtoken);          
          
          this.activePageType = ForgetPasswordComponentState.RESET_PASSWORD
        } else if (params['type'] === ForgetPasswordComponentState.VERIFY_CODE){
          this.activePageType = ForgetPasswordComponentState.VERIFY_CODE
        }else {
          this.activePageType = ForgetPasswordComponentState.FORGET_PASSWORD;
        }
      }
      );
  }
  submitEmailForm() {
    this.submitted = true;

    if(!this.sendEmailForm.valid) return;

    let forgotPassword:ForgotPassword = new ForgotPassword();

    forgotPassword.resetPasswordUrl = environment.appDomain + "/auth/forget-password?type=" + ForgetPasswordComponentState.RESET_PASSWORD;
    forgotPassword.email = this.sendEmailForm.controls['email'].value;
    this.authenticateService.forgotPassword(forgotPassword).subscribe(_=>{
      this.messageService.success('resetPasswordRequest');
      this.submitted = false;
    });

  }
  submitPassForm() {
    this.submitted = true;

    if(!this.forgetPassForm.valid) return;

    let model = new ForgotPasswordConfirmation();

    model.email = this.forgetPassForm.controls['email'].value;
    model.token = this.forgetPassForm.controls['token'].value;
    model.password = this.forgetPassForm.controls['password'].value;
    model.confirmPassword = this.forgetPassForm.controls['confirmPassword'].value;
    
    this.authenticateService.forgotPasswordConfirmation(model).subscribe(_=>{
      this.messageService.success('resetPasswordRequestConfirm');
      this.router.navigate(['/auth/signin']);
      this.submitted = false;
    });
  }

  //#region verify
  disableSendCode = true
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 4,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };

  handeOtpChange(value: string[]): void {
    this.disableSendCode = true
  }

  handleFillEvent(value: string): void {
    this.disableSendCode = false
  }
  //#endregion verify


}
