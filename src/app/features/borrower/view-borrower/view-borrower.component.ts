import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
import { Borrower } from 'src/app/models/borrower';
import { BorrowerService } from 'src/app/services/borrower.service';
import { DatePipe } from '@angular/common';
import { AddBorrowerComponent } from '../add-borrower/add-borrower.component';
import { take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-view-borrower',
  templateUrl: './view-borrower.component.html',
  styleUrls: ['./view-borrower.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ViewBorrowerComponent implements OnInit {
  public displayedColumns = ['name',  'update'];
  public dataSource = new MatTableDataSource<Borrower>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  deleteMessage: string
  expandedElement: Borrower|null;
  constructor(
    private borrowerService: BorrowerService,
    private matDialog: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getBorrowers()
    this.dataSource.paginator = this.paginator
  }

  getTotal(){
    return this.dataSource.data.map(t => t.amount).reduce((acc, value)=> acc + value, 0)
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
        borrower: {
          
        } as Borrower
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
          this.dataSource.data.filter((value) => {
            if (value.id == result.id) {
              value = result
            }
          })
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

  showTransactions(_borrower: Borrower){
    console.log(_borrower)
  }

}
