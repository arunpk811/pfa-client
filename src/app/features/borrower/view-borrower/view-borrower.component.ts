import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Borrower } from 'src/app/models/borrower';
import { BorrowerService } from 'src/app/services/borrower.service';
import { DatePipe } from '@angular/common';
import { AddBorrowerComponent } from '../add-borrower/add-borrower.component';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewReturnsDialogComponent } from '../view-returns-dialog/view-returns-dialog.component';

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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private borrowerService: BorrowerService,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getBorrowers()
    this.dataSource.paginator = this.paginator
  }

  getTotal(){
    return this.dataSource.data.map(t => t.amount).reduce((acc, value)=> acc + value, 0)
  }

  getBalance(data: Borrower){
    if(data.listOfReturns.length >0)
    data.balance= data.amount-  data.listOfReturns.map(x=>x.amount).reduce((a1,a2)=>a1+a2)
    return data;
  }
  getBorrowers(){
    this.borrowerService.getBorrowers().subscribe(
      res => {
        res.forEach(x=> this.getBalance(x))
        this.dataSource.data = res
      }
    )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
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
          result = this.getBalance(result)
          this.dataSource.data = [result, ...this.dataSource.data]
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
              result = this.getBalance(result)
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
              this.openSnackBar(result.data)
              this.getBorrowers()
            }
          )
        }
      }
    )
  }

  showTransactions(_borrower: Borrower){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.data = {
        borrower: _borrower,
        title: 'Payment Details'
    };
    const dialogRef = this.matDialog.open(ViewReturnsDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(take(1)).subscribe(x=> {
      _borrower.balance = this.getBalance(x).balance
    })
  }

}
