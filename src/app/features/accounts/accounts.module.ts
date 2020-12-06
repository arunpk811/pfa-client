import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ViewAccountsComponent } from './view-accounts/view-accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';


const accountRoutes: Routes=[
  {path:'', component: ViewAccountsComponent,canActivate:[RouteGuardService]}
]
@NgModule({
  declarations: [ViewAccountsComponent, AddAccountComponent],
  imports: [
    RouterModule.forChild(accountRoutes),
    CommonModule,
    CoreModule,
    SharedModule
  ],
  entryComponents:[ViewAccountsComponent],
  exports:[
    RouterModule
  ]
})
export class AccountsModule { }
