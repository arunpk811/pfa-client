import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BorrowerService } from 'src/app/services/borrower.service';
import { DatePipe } from '@angular/common';
import { Borrower } from 'src/app/models/borrower';

@Component({
  selector: 'app-add-borrower',
  templateUrl: './add-borrower.component.html',
  styleUrls: ['./add-borrower.component.css']
})
export class AddBorrowerComponent implements OnInit {
  form: FormGroup;
  title: string;
  borrower: Borrower;
  id: any;
  name: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBorrowerComponent>,
    private borrowerService: BorrowerService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.id = data.id;
    this.borrower = data.borrower;
  }

  ngOnInit() {
    var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.form = this.fb.group({
      name: [(this.borrower.name != null ? this.borrower.name : ''), [Validators.required]],
      description: [(this.borrower.description != null ? this.borrower.description : '')],
      amount: [(this.borrower.amount != null ? this.borrower.amount : 0), [Validators.required]],
      date: [(this.borrower.date != null ? this.datePipe.transform(this.borrower.date, "yyyy-MM-dd") : new Date), [Validators.required]]
    });
  }

  save() {
    this.borrower.id = this.id
    this.borrower.name = this.form.get('name').value;
    this.borrower.description = this.form.get('description').value;
    this.borrower.amount = this.form.get('amount').value;
    this.borrower.date = this.datePipe.transform(this.form.get('date').value, "yyyy-MM-dd");
    this.borrowerService.addBorrower(this.borrower).subscribe(
      response => {
        this.dialogRef.close(response);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
