import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBorrowerComponent } from './view-borrower/view-borrower.component';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { AddBorrowerComponent } from './add-borrower/add-borrower.component';


const todoRoutes: Routes=[
  {path:'', component: ViewBorrowerComponent,canActivate:[RouteGuardService]}
]
@NgModule({
  declarations: [ViewBorrowerComponent, AddBorrowerComponent],
  imports: [
    RouterModule.forChild(todoRoutes),
    CommonModule,
    CoreModule
  ],
  entryComponents:[AddBorrowerComponent],
  exports:[
    RouterModule
  ]
})
export class BorrowerModule { }
