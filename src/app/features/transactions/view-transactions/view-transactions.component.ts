import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {
  public displayedColumns = ['name', 'description', 'amount', 'type'];
  public dataSource = new MatTableDataSource<Transaction>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.transactionService.getTransactions().subscribe(
      res => {
        this.dataSource.data = res
      }
    )
  }

}
