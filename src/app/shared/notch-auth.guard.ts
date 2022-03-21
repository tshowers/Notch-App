import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { NotchAuthService } from './notch-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotchAuthGuard implements CanActivate, CanLoad {

  production: boolean;

  constructor(private _authService: NotchAuthService, public router: Router) {
    this.production = environment.production;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this._authService.getFirestoreUser();

    const ok: boolean = (user) ? true : false;

    if (!ok) {
      this.router.navigate(['verify'])
      return false
    }

    return ok;
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    url = (url) ? url : 'verify';

    // return this.checkLogin(url);
    const user = this._authService.getFirestoreUser();
    const ok: boolean = (user) ? true : false;

    if (!ok) {
      this.router.navigate(['verify'])
      return false;
    } 


    return ok;
  }

  checkLogin(url: string): true | UrlTree {
    if (this._authService.getFirestoreUser()) { return true; }

    // Store the attempted URL for redirecting
    this._authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/verify');
  }

}
