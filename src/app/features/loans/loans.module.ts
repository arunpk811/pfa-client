import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewloansgivenComponent } from './viewloansgiven/viewloansgiven.component';
import { ViewloansComponent } from './viewloans/viewloans.component';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';


const todoRoutes: Routes=[
  {path:'', component: ViewloansComponent,canActivate:[RouteGuardService]},
  {path:'given', component: ViewloansgivenComponent,canActivate:[RouteGuardService]}
]
@NgModule({
  declarations: [ViewloansgivenComponent, ViewloansComponent],
  imports: [
    RouterModule.forChild(todoRoutes),
    CommonModule,
    CoreModule
  ],
  exports:[
    RouterModule
  ]
})
export class LoansModule { }
