import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { JwtauthenticationService } from '../services/jwtauthentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string ;
  password: string;
  errorMessage = 'Invalid Credentials';
  isInvalidLogin = false;
  // Router should be used to route from one page to another
  constructor(
    private router: Router,
    private navComponent: NavigationComponent,
    private jwtauthenticationService: JwtauthenticationService
    ) { }

  ngOnInit() {
  }

  handleLogin() {
    this.jwtauthenticationService.executeAuthService(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['home']);
        this.navComponent.sidenav.toggle();
        this.isInvalidLogin = false;
      },
      error => {
        this.isInvalidLogin = true;
      }
    );
  }


}
