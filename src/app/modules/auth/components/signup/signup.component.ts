import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../authenticate.service';
import { SignUp } from '../../auth.model';
import { Router } from '@angular/router';
import { PASSWORD_PATTERN } from 'src/app/core/constants/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
    displayName: new FormControl(null, [Validators.required])
  })
  submitted: boolean = false;
  showPassword: boolean = false;


  constructor(private authenticateService: AuthenticateService,
    private router: Router) { }

  submitForm() {
    this.submitted = true;

    if (!this.signupForm.valid) return;

    let signUpModel: SignUp = new SignUp();
    signUpModel.displayName = this.signupForm.controls['displayName'].value;
    signUpModel.phoneNumber = this.signupForm.controls['phoneNumber'].value;
    signUpModel.password = this.signupForm.controls['password'].value;
    signUpModel.email = this.signupForm.controls['email'].value;

    this.authenticateService.signUp(signUpModel).subscribe(_ => {

      this.router.navigate(['/auth/signin']);
    })

  }
}
