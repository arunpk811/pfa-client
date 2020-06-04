import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { MatTableDataSource } from '@angular/material';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {
  public displayedColumns = ['name', 'description', 'amount', 'type'];
  public dataSource = new MatTableDataSource<Transaction>();
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(
      res => {
        this.dataSource.data = res
      }
    )
  }

}
