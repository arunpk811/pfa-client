import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/models/accounts';
import { Bank } from 'src/app/models/bank';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  form: FormGroup;
  id: number;
  account: Account
  banks: Bank[]
  accountTypes: string[]
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAccountComponent>,
    private accountService: AccountService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.id = data.id;
    this.account = data.account;
  }

  ngOnInit(): void {
    this.getBanks()
    this.getAccountTypes()
    this.form = this.fb.group({
      accNumber: [(this.account.accountNumber != null ? this.account.accountNumber : ''), [Validators.required]],
      bank: [(this.account.bank != null ? this.account.bank : ''), [Validators.required]],
      balance: [(this.account.balance != null ? this.account.balance : 0), [Validators.required]],
      type: [(this.account.type != null ? this.account.type : ''), [Validators.required]],
      isActive: [(this.account.isActive != null ? this.account.isActive==1?"true":"false" : "false"), [Validators.required]],
    });
  }
  save() {
    this.account.accountNumber = this.form.get('accNumber').value;
    this.account.bank = this.form.get('bank').value;
    this.account.balance = this.form.get('balance').value;
    this.account.type = this.form.get('type').value;
    this.account.isActive = this.form.get('isActive').value;
    if (this.account.id == null)
      this.accountService.addAccount(this.account).subscribe(
        response => {
          this.dialogRef.close(response);
        }
      );
    else
      this.accountService.updateAccount(this.id, this.account).subscribe(
        response => {
          this.dialogRef.close(response)
        }
      )
  }
  getBanks() {
    this.accountService.getBanks().subscribe(res => {
      this.banks = res;
    })
  }
  getAccountTypes() {
    this.accountService.getAccountTypes().subscribe(res => { this.accountTypes = res })
  }
}
