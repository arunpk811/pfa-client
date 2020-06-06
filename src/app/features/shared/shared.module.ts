import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
