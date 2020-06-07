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
  public displayedColumns = ['type', 'name', 'description', 'amount', 'transactionDate', 'update'];
  public dataSource = new MatTableDataSource<Transaction>();
  public inputTransaction: Transaction
  deleteMessage: string
  transactionType: string 

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private transactionService: TransactionService,
    private datePipe: DatePipe,
  ) { }
  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.transactionType='income';
    this.getTransactions()
    this.inputTransaction = {
      name: '',
      description: '',
      amount: '',
      type: this.transactionType,
      transactionDate: new Date
    } as Transaction
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
          this.dataSource.data.push(result)
        }
      )
    this.inputTransaction = {
      name: '',
      description: '',
      amount: '',
      type: this.transactionType,
      transactionDate: new Date
    } as Transaction
  }

  editRow(transaction: Transaction) {
    console.log(this.transactionType)
    this.transactionType = transaction.type
    console.log(this.transactionType)
    this.inputTransaction = transaction as Transaction
  }

  deleteRow(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction.id).subscribe(
      result => {
        this.getTransactions();
        this.deleteMessage = result.data;
      }
    )
  }
}
