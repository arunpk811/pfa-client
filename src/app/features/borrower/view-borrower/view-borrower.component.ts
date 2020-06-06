import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
import { Borrower } from 'src/app/models/borrower';
import { BorrowerService } from 'src/app/services/borrower.service';
import { DatePipe } from '@angular/common';
import { AddBorrowerComponent } from '../add-borrower/add-borrower.component';
import { take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-borrower',
  templateUrl: './view-borrower.component.html',
  styleUrls: ['./view-borrower.component.css']
})
export class ViewBorrowerComponent implements OnInit {
  public displayedColumns = ['name', 'description', 'amount', 'date', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Borrower>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  deleteMessage: string
  constructor(
    private borrowerService: BorrowerService,
    private matDialog: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getBorrowers()
    this.dataSource.paginator = this.paginator
  }
  getBorrowers(){
    this.borrowerService.getBorrowers().subscribe(
      res => {
        this.dataSource.data = res
      }
    )
  }

  addBorrower() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true
    dialogConfig.data = {
        id: null,
        title: 'Add Borrower',
        borrower: new Borrower()
    };

    const dialogRef = this.matDialog.open(AddBorrowerComponent, dialogConfig);

    dialogRef.afterClosed().pipe(take(1)).subscribe(
      result => {
        if(result){
          this.dataSource.data = [result, ...this.dataSource.data];
        }
      }
    )
  }

  editBorrower(_borrower: Borrower) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true
    dialogConfig.data = {
      id: null,
      title: 'Edit Borrower',
      borrower: _borrower
    };

    const dialogRef = this.matDialog.open(AddBorrowerComponent, dialogConfig);

    dialogRef.afterClosed().pipe(take(1)).subscribe(
      result => {
        if (result) {
          this.dataSource.data.push(result)
        }
      }
    )
  }

  deleteBorrower(_borrower: Borrower){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true
    dialogConfig.data = {
      title: 'Are you sure?',
    };

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(take(1)).subscribe(
      result => {
        if (result) {
          this.borrowerService.deleteBorrower(_borrower.id).subscribe(
            result =>{
              this.deleteMessage = result.data;
              this.getBorrowers()
            }
          )
        }
      }
    )
  }

}
