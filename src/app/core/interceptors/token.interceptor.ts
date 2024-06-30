import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { LanguageService } from '../services/language.service';
import { USER_DATA } from '../constants/local-storage';
import { SettingsService } from '../services/settings.service';
import { AuthenticateService } from 'src/app/modules/auth/authenticate.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private languageService: LanguageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO : Commented because, with this, unable to post the formData. Values are NULL
    
    // request = this.addHeaders(request)
    if (this.authService.getToken()) {
      request = this.addToken(request, this.authService.getToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.logout();
        return null;
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    let headers = new HttpHeaders();
    headers = request.headers;
    headers = headers.set('Authorization', `Bearer ${token}`);
    return request.clone({ headers });
  }
  private addHeaders(request: HttpRequest<any>) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', `application/json`);
    return request.clone({ headers });
  }
  logout() {
    localStorage.removeItem(USER_DATA)
    this.router.navigateByUrl("/auth/signin")
  }
}
