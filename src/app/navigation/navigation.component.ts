import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { JwtauthenticationService } from '../services/jwtauthentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('drawer', { static: false }) sidenav: MatSidenav
  username: string;
  constructor(
    private jwtAuth: JwtauthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  checkIfUserLoggedIn() {
    this.getUsername()
    return this.jwtAuth.isUserLoggedIn()
  }

  getUsername(){
    this.username= this.jwtAuth.getAuthUser()
  }

  logout() {
    this.jwtAuth.logOut()
    this.sidenav.close()
    this.username = null
    this.router.navigate([''])
  }
}
