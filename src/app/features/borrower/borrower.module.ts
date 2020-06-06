import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBorrowerComponent } from './view-borrower/view-borrower.component';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { AddBorrowerComponent } from './add-borrower/add-borrower.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';


const todoRoutes: Routes=[
  {path:'', component: ViewBorrowerComponent,canActivate:[RouteGuardService]}
]
@NgModule({
  declarations: [ViewBorrowerComponent, AddBorrowerComponent],
  imports: [
    RouterModule.forChild(todoRoutes),
    CommonModule,
    CoreModule,
    SharedModule
  ],
  entryComponents:[AddBorrowerComponent, ConfirmDialogComponent],
  exports:[
    RouterModule
  ]
})
export class BorrowerModule { }
