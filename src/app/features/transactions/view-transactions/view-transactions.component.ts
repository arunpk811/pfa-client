import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { TransactionService } from 'src/app/services/transaction.service';
import { DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Account } from 'src/app/models/accounts';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ViewTransactionsComponent implements OnInit {
  public displayedColumns = ['transactionDate', 'amount'];
  public dataSource = new MatTableDataSource<Transaction>();
  public expandedElement: Transaction | null;
  public btnName: string
  public transaction: Transaction
  form: FormGroup;
  public accounts: Account[]
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
  ) {
    this.btnName = "ADD"
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator
    var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.getActiveAccounts()
    this.transaction = {} as Transaction
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      amount: [0, [Validators.required]],
      type: ['income', [Validators.required]],
      account: [null, [Validators.required]],
      transactionDate: [new Date, [Validators.required]]
    });
    this.getTransactions()

  }

  getActiveAccounts() {
    this.accountService.getActiveAccounts().subscribe(resp => {
      this.accounts = resp
    })
  }

  getTotalIncome() {
    let income = this.dataSource.data.map(t => {
      let _income = 0
      if (t.type == 'income')
        _income += t.amount
      return _income
    })
    return income.reduce((acc, value) => acc + value, 0)
  }
  getTotalExpense() {
    let expense = this.dataSource.data.map(t => {
      let _expense = 0
      if (t.type !== 'income')
        _expense += t.amount
      return _expense
    })
    return expense.reduce((acc, value) => acc + value, 0)
  }

  getBalance() {
    let balance = this.dataSource.data.map(t => {
      let _balance = 0
      if (t.type == 'income')
        _balance += t.amount
      if (t.type !== 'income')
        _balance -= t.amount
      return _balance
    })
    return balance.reduce((acc, value) => acc + value, 0)
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe(
      res => {
        this.dataSource.data = res
      }
    )
  }

  save() {
    this.transaction.name = this.form.get('name').value;
    this.transaction.description = this.form.get('description').value;
    this.transaction.amount = this.form.get('amount').value;
    this.transaction.transactionDate = this.datePipe.transform(this.form.get('transactionDate').value, "yyyy-MM-dd");
    this.transaction.type = this.form.get('type').value;
    this.transaction.account = this.form.get('account').value;

    if (this.transaction.id == null)
      this.transactionService.addTransaction(this.transaction).subscribe(
        result => {
          this.dataSource.data = [result, ...this.dataSource.data]
          this.form.reset()
        }
      )
    else
      this.transactionService.updateTransaction(this.transaction.id, this.transaction).subscribe(
        result => {
          this.dataSource.data.filter((value) => {
            if (value.id == result.id) {
              value = result
              this.openSnackBar(value.name + ' updated successfully')
              this.form.get('amount').enable()
              this.form.reset()
              this.btnName = "ADD"
            }
          })
        }
      )
  }

  editRow(transaction: Transaction) {
    this.btnName = 'UPDATE'
    this.transaction = transaction
    this.form.reset(this.transaction)
    this.form.get('account')
    this.form.get('amount').disable()
  }

  deleteRow(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction.id).subscribe(
      result => {
        this.getTransactions();
        this.openSnackBar("Transaction has been deleted successfully")
        this.btnName = "ADD"
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  // compareObjects(acc1: Account, acc2: Account): boolean {
  //   if(acc2 == null) return false
  //   return acc1.id == acc2.id
  // }
}
