import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { CoreModule } from 'src/app/core/core.module';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


const todoRoutes: Routes=[
  {path:'', component: ViewTransactionsComponent,canActivate:[RouteGuardService]}
]
@NgModule({
  declarations: [ViewTransactionsComponent, AddTransactionComponent],
  imports: [
    RouterModule.forChild(todoRoutes),
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    RouterModule,
    CommonModule
  ]
  // entryComponents: [AddTodoDialogComponent]
})
export class TransactionsModule { }
