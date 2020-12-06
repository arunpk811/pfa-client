import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { JwtauthenticationService } from '../services/jwtauthentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // Router should be used to route from one page to another
  constructor(
    private router: Router,
    private navComponent: NavigationComponent,
    private jwtauthenticationService: JwtauthenticationService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(loginForm) {
    this.formSubmitted = true;

    if (this.form.valid) {
      let username = this.form.controls['username'].value;
      let password = this.form.controls['password'].value;

      let user$ = this.jwtauthenticationService.executeAuthService(username, password);

      user$.subscribe(
        (data) => {
          this.router.navigate(['home']);
          this.navComponent.sidenav.toggle();
        },
        err =>{
          this.openSnackBar("Invalid credentials, please try again!")
          this.formSubmitted = false;
        }
      );
    } else {
      console.log("The form is NOT valid");
      this.formSubmitted = false;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
}
