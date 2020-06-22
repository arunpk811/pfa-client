import { Component, OnInit, ViewChild } from '@angular/core';
import { Loan } from 'src/app/models/loan';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
import { LoanService } from 'src/app/services/loan.service';
import { take } from 'rxjs/operators';
import { AddLoanComponent } from '../add-loan/add-loan.component';
import { DatePipe } from '@angular/common';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-viewloans',
  templateUrl: './viewloans.component.html',
  styleUrls: ['./viewloans.component.css']
})
export class ViewloansComponent implements OnInit {
  public displayedColumns = ['name', 'amount', 'update'];
  public dataSource = new MatTableDataSource<Loan>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  deleteMessage: string;
  constructor(
    private loanService: LoanService,
    private matDialog: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getLoans();
    this.dataSource.paginator = this.paginator
  }

  getTotal(){
    return this.dataSource.data.map(t => t.amount).reduce((acc, value)=> acc + value, 0)
  }

  getLoans() {
    this.loanService.getLoans().subscribe(
      res => {
        this.dataSource.data = res
      }
    )
  }

  addLoan() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.data = {
      id: null,
      title: 'Add Loan',
      loan: {

      } as Loan
    };

    const dialogRef = this.matDialog.open(AddLoanComponent, dialogConfig);

    dialogRef.afterClosed().pipe(take(1)).subscribe(
      result => {
        if (result) {
          this.dataSource.data = [result, ...this.dataSource.data];
        }
      }
    )
  }

  editLoan(_loan: Loan) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.data = {
      id: null,
      title: 'Edit Loan',
      loan: _loan
    };

    const dialogRef = this.matDialog.open(AddLoanComponent, dialogConfig);

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

  deleteLoan(_loan: Loan) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.data = {
      title: 'Are you sure?',
    };

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(take(1)).subscribe(
      result => {
        if (result) {
          this.loanService.deleteLoan(_loan.id).subscribe(
            result => {
              this.deleteMessage = result.data;
              this.getLoans()
            }
          )
        }
      }
    )
  }

}
