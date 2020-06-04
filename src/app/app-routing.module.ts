import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './services/route-guard.service';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { HttpInterceptorJwtAuthService } from './services/http/http-interceptor-jwt-auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate : [RouteGuardService] },
  {
    path: 'transactions',
    loadChildren: () => import('./features/transactions/transactions.module').then(m => m.TransactionsModule),
    canActivate: [RouteGuardService]
  },
  {
    path: 'loans',
    loadChildren: () => import('./features/loans/loans.module').then(m => m.LoansModule),
    canActivate: [RouteGuardService]
  },
  {
    path: 'borrowers',
    loadChildren: () => import('./features/borrower/borrower.module').then(m => m.BorrowerModule),
    canActivate: [RouteGuardService]
  },
  {path : '**' , component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorJwtAuthService, multi: true }
],
})
export class AppRoutingModule { }
