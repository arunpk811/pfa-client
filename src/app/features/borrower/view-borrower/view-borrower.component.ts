import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Borrower } from 'src/app/models/borrower';
import { BorrowerService } from 'src/app/services/borrower.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-borrower',
  templateUrl: './view-borrower.component.html',
  styleUrls: ['./view-borrower.component.css']
})
export class ViewBorrowerComponent implements OnInit {
  public displayedColumns = ['name', 'description', 'amount', 'date'];
  public dataSource = new MatTableDataSource<Borrower>();
  constructor(private borrowerService: BorrowerService) { }

  ngOnInit() {
    this.borrowerService.getBorrowers().subscribe(
      res => {
        this.dataSource.data = res
      }
    )
  }
}
