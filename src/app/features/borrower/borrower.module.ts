import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBorrowerComponent } from './view-borrower/view-borrower.component';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { AddBorrowerComponent } from './add-borrower/add-borrower.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { ViewReturnsDialogComponent } from './view-returns-dialog/view-returns-dialog.component';


const borrowerRoutes: Routes=[
  {path:'', component: ViewBorrowerComponent,canActivate:[RouteGuardService]}
]
@NgModule({
  declarations: [ViewBorrowerComponent, AddBorrowerComponent, ViewReturnsDialogComponent ],
  imports: [
    RouterModule.forChild(borrowerRoutes),
    CommonModule,
    CoreModule,
    SharedModule
  ],
  entryComponents:[AddBorrowerComponent, ConfirmDialogComponent, ViewReturnsDialogComponent],
  exports:[
    RouterModule
  ]
})
export class BorrowerModule { }
