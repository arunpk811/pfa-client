import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string
  inputs: any

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.inputs = data
  }

  ngOnInit() {
    this.title = this.inputs.title
  }

  confirm() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
