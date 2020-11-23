import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatInput, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Borrower, LoanReturns } from 'src/app/models/borrower';
import { BorrowerService } from 'src/app/services/borrower.service';

@Component({
  selector: 'app-view-returns-dialog',
  templateUrl: './view-returns-dialog.component.html',
  styleUrls: ['./view-returns-dialog.component.css']
})
export class ViewReturnsDialogComponent implements OnInit {
  @ViewChild(MatInput,{static: true}) amount: MatInput;
  title: string;
  borrower: Borrower;
  form: FormGroup;
  public displayedColumns = ['amount', 'date',"delete"];
  public dataSource = new MatTableDataSource<LoanReturns>();
  constructor(
    private fb: FormBuilder,
    private borrowerService: BorrowerService,
    private dialogRef: MatDialogRef<ViewReturnsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private datePipe: DatePipe
  ) {
    this.title = data.title;
    this.borrower = data.borrower;
    this.dataSource.data = data.borrower.listOfReturns;
  }

  ngOnInit() {
    var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.form = this.fb.group({
      amount: [, [Validators.required]],
      date: [new Date, [Validators.required]]
    });
  }

  getAmount(){
    return this.form.get('amount');
  }
  getDate(){
    return this.form.get('date');
  }

  addAReturn() {
    if(this.getAmount().value <0){
      this.getAmount().setValue("");
      return
    }
    let loanReturns: LoanReturns = { amount: this.getAmount().value, date: this.getDate().value } as LoanReturns;
    this.dataSource.data = [loanReturns, ...this.dataSource.data];
    this.getAmount().setValue("");
    this.amount.focus();
  }

  save() {
    this.borrower.listOfReturns = this.dataSource.data;
    this.borrowerService.updateBorrower(this.borrower.id, this.borrower).subscribe(result =>{
      this.dialogRef.close(result)
    });
  }

  deletePayment(data: LoanReturns){
    const toBeRemoved = this.dataSource.data.indexOf(data)
    this.dataSource.data.splice(toBeRemoved,1)
    this.dataSource.data = [...this.dataSource.data]
  }

}
