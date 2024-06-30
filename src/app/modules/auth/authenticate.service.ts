import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPassword, ForgotPasswordConfirmation, SignIn, SignInResponse, SignUp, SignUpResponse, User } from './auth.model';
import { appConfig } from 'src/app/app.config';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { USER_DATA } from 'src/app/core/constants/local-storage';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {

  user$ = new BehaviorSubject<User | null>(null);

  private autoLogoutTimerId: any = null;

  constructor(private http: HttpClient,
    private router: Router) { }

  signUp(signUpModel: SignUp) {

    const endPoint = `${appConfig.endPoints.authenticate}/register`;

    return this.http.post<SignUpResponse>(endPoint, signUpModel)
      .pipe(map(result => result));
  }

  signIn(signInModel: SignIn) {
    const endPoint = `${appConfig.endPoints.authenticate}/login`;
    return this.http.post<SignInResponse>(endPoint, signInModel)
      .pipe(tap(response => this.handleAuthUser(signInModel.email, response.token)));
  }

  forgotPassword(forgotPassword:ForgotPassword) {
    const endPoint = `${appConfig.endPoints.authenticate}/ForgotPassword`;

    return this.http.post<any>(endPoint,forgotPassword).pipe(map(result => result));
  }


  forgotPasswordConfirmation(forgotPasswordConfirmation: ForgotPasswordConfirmation) {
    const endPoint = `${appConfig.endPoints.authenticate}/ForgotPasswordConfirmation`;

    return this.http.post<any>(endPoint, forgotPasswordConfirmation).pipe(map(result => result));
  }


  autoLogout(expirationDuration: number) {
    console.log("expirationDuration", expirationDuration);

    this.autoLogoutTimerId = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user$.next(null);
    this.router.navigate(['/auth/signin']);
    localStorage.removeItem('userData');

    if (this.autoLogoutTimerId) {
      clearTimeout(this.autoLogoutTimerId);

      this.autoLogoutTimerId = null;
    }
  }

  autoSignIn() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }

    const parsedUserData = JSON.parse(userData);
    const tokenExpirationDate = new Date(parsedUserData._tokenExpirationDate);
    const user = new User(
      parsedUserData.username,
      parsedUserData._token,
      tokenExpirationDate
    );

    if (user.token) {
      this.user$.next(user);
      const expirationDuration = tokenExpirationDate.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  getToken() {
    let userData = localStorage.getItem(USER_DATA);
    if (userData) {
      let user: User = JSON.parse(userData)
      return user['_token'];
    }
    return null;
  }
  private handleAuthUser(username: string, token: string) {
    const expiration = appConfig.authExpiration;
    const expirationDate = new Date(new Date().getTime() + expiration * 1000);

    const user = new User(username, token, expirationDate);
    this.user$.next(user);
    this.autoLogout(expiration * 1000);
    localStorage.setItem(USER_DATA, JSON.stringify(user));
    this.autoSignIn();
  }
}
