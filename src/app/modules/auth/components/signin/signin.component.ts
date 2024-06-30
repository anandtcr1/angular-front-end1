import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PASSWORD_PATTERN } from 'src/app/core/constants/validators';
import { SignIn } from '../../auth.model';
import { AuthenticateService } from '../../authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  
  loginForm : FormGroup = new FormGroup ({
    email : new FormControl (null,[Validators.required, Validators.email]),
    password : new FormControl (null,[Validators.required,Validators.pattern(PASSWORD_PATTERN)])
  })
  submitted : boolean = false
  showPassword : boolean = false
  loading : boolean = false

  constructor(private authenticateService: AuthenticateService,
    private router: Router){}

  submitForm(){
    this.submitted = true
    if(!this.loginForm.valid) return;
    let signIn = new SignIn();
    signIn.email = this.loginForm.controls['email'].value;
    signIn.password = this.loginForm.controls['password'].value;
    this.loading = true
    this.authenticateService.signIn(signIn).subscribe(res=>{    
      this.router.navigate(['/admin/users']);
      this.submitted = false;
      this.loading = false
    },err=>{
      this.submitted = false;
      this.loading = false
    });

  }
}
