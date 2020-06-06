import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewloansComponent } from './viewloans/viewloans.component';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { AddLoanComponent } from './add-loan/add-loan.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';


const todoRoutes: Routes=[
  {path:'', component: ViewloansComponent,canActivate:[RouteGuardService]}
]
@NgModule({
  declarations: [ ViewloansComponent, AddLoanComponent],
  imports: [
    RouterModule.forChild(todoRoutes),
    CommonModule,
    CoreModule,
    SharedModule
  ],
  entryComponents:[
    AddLoanComponent,
    ConfirmDialogComponent
  ],
  exports:[
    RouterModule
  ]
})
export class LoansModule { }