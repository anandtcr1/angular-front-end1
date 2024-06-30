import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthenticateService } from 'src/app/modules/auth/authenticate.service';
import { USER_DATA } from '../constants/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenticateService: AuthenticateService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = localStorage.getItem(USER_DATA);
    if (isAuth) {
      return true;
    }
    
    return this.router.createUrlTree(['/auth/signin']);
  }

}
