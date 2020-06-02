import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { JwtauthenticationService } from '../services/jwtauthentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('drawer', { static: false }) sidenav: MatSidenav
  constructor(
    private jwtAuth: JwtauthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  checkIfUserLoggedIn() {
    return this.jwtAuth.isUserLoggedIn();
  }

  logout() {
    this.jwtAuth.logOut();
    this.sidenav.close();
    this.router.navigate(['']);
  }
}
