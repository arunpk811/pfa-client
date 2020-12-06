import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanService } from 'src/app/services/loan.service';
import { DatePipe } from '@angular/common';
import { Loan } from 'src/app/models/loan';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.css']
})
export class AddLoanComponent implements OnInit {
  form: FormGroup;
  title: string;
  loan: Loan;
  id: any;
  name: string;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddLoanComponent>,
    private loanService: LoanService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.id = data.id;
    this.loan = data.loan;
  }

  ngOnInit() {
    var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.form = this.fb.group({
      name: [(this.loan.name != null ? this.loan.name : ''), [Validators.required]],
      description: [(this.loan.description != null ? this.loan.description : '')],
      amount: [(this.loan.amount != null ? this.loan.amount : 0), [Validators.required]],
      date: [(this.loan.date != null ? this.datePipe.transform(this.loan.date, "yyyy-MM-dd") : new Date), [Validators.required]]
    });
  }

  save() {
    this.loan.name = this.form.get('name').value;
    this.loan.description = this.form.get('description').value;
    this.loan.amount = this.form.get('amount').value;
    this.loan.date = this.datePipe.transform(this.form.get('date').value, "yyyy-MM-dd");
    this.loanService.addLoan(this.loan).subscribe(
      response => {
        this.dialogRef.close(response);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
