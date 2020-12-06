import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { TransactionService } from 'src/app/services/transaction.service';
import { DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
  public inputTransaction: Transaction
  public transactionType: string
  public message: string
  public expandedElement: Transaction | null;
  public btnName:string
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
  ) { 
    this.btnName = "ADD"
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.transactionType = 'income';
    this.getTransactions()
    this.inputTransaction = {
      name: '',
      description: '',
      amount: null,
      type: this.transactionType,
      transactionDate: new Date
    } as Transaction
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
    this.inputTransaction.type = this.transactionType
    if (this.inputTransaction.id == null || this.dataSource.data.length == 0)
      this.transactionService.addTransaction(this.inputTransaction).subscribe(
        result => {
          this.dataSource.data = [result, ...this.dataSource.data]
        }
      )
    else
      this.transactionService.updateTransaction(this.inputTransaction.id, this.inputTransaction).subscribe(
        result => {
          this.dataSource.data.filter((value) => {
            if (value.id == result.id) {
              value = result
              this.openSnackBar(value.name + ' updated successfully')
              this.btnName="ADD"
            }
          })
        }
      )
    this.inputTransaction = {
      name: '',
      description: '',
      amount: null,
      type: this.transactionType,
      transactionDate: new Date
    } as Transaction
  }

  editRow(transaction: Transaction) {
    this.btnName = 'UPDATE'
    this.transactionType = transaction.type
    this.inputTransaction = transaction as Transaction
  }

  reset(){
    this.inputTransaction = {
      id:null,
      name: '',
      description: '',
      amount: null,
      type: this.transactionType,
      transactionDate: new Date
    } as Transaction
    this.btnName="ADD"
  }

  deleteRow(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction.id).subscribe(
      result => {
        this.getTransactions();
        this.openSnackBar("Transaction has been deleted successfully")
        this.btnName="ADD"
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
}
