import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TransactionService } from 'src/app/services/transaction.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {
  public displayedColumns = ['name', 'amount', 'update'];
  public dataSource = new MatTableDataSource<Transaction>();
  public inputTransaction: Transaction
  transactionType: string
  message: string

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private transactionService: TransactionService,
    private datePipe: DatePipe,
  ) { }
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
      let _income =0 
      if(t.type=='income')
        _income += t.amount
      return _income
    })
    return income.reduce((acc, value) => acc + value, 0)
  }
  getTotalExpense(){
    let expense = this.dataSource.data.map(t => {
      let _expense =0 
      if(t.type !=='income')
        _expense += t.amount
      return _expense
    })
    return expense.reduce((acc, value) => acc + value, 0)
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
      this.transactionService.updateTransaction(this.inputTransaction).subscribe(
        result => {
          this.dataSource.data.filter((value) => {
            if (value.id == result.id) {
              value = result
              this.message = value.name + ' updated successfully';
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
    this.transactionType = transaction.type
    this.inputTransaction = transaction as Transaction
  }

  deleteRow(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction.id).subscribe(
      result => {
        this.getTransactions();
        this.message = transaction.name + ' deleted successfully';
      }
    )
  }
}
