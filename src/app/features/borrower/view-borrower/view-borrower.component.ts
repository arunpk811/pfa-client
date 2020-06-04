import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { Borrower } from 'src/app/models/borrower';
import { BorrowerService } from 'src/app/services/borrower.service';
import { DatePipe } from '@angular/common';
import { AddBorrowerComponent } from '../add-borrower/add-borrower.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view-borrower',
  templateUrl: './view-borrower.component.html',
  styleUrls: ['./view-borrower.component.css']
})
export class ViewBorrowerComponent implements OnInit {
  public displayedColumns = ['name', 'description', 'amount', 'date'];
  public dataSource = new MatTableDataSource<Borrower>();
  constructor(
    private borrowerService: BorrowerService,
    private addBorrowerDialogue: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.borrowerService.getBorrowers().subscribe(
      res => {
        this.dataSource.data = res
      }
    )
  }

  addBorrower() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        id: null,
        title: 'Add Borrower',
        borrower: new Borrower()
    };

    const dialogRef = this.addBorrowerDialogue.open(AddBorrowerComponent, dialogConfig);

    dialogRef.afterClosed().pipe(take(1)).subscribe(
      result => {
        if(result){
          this.dataSource.data = [result, ...this.dataSource.data];
        }
      }
    )
  }
}
