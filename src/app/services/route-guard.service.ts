import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtauthenticationService } from './jwtauthentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private jwtAuthService: JwtauthenticationService,
    private router: Router
  ) { }
  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtAuthService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
