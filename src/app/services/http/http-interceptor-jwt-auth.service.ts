import { Injectable } from '@angular/core';
import { JwtauthenticationService } from '../jwtauthentication.service';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorJwtAuthService implements HttpInterceptor {

  constructor(
    private jwtAuthService: JwtauthenticationService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.jwtAuthService.getAuthToken();
    const username = this.jwtAuthService.getAuthUser();
    // console.log('Token : ' + token);
    // console.log('User : ' + username);
    if (token && username) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    return next.handle(request);
  }
}
