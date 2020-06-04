import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loan';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { LoanService } from 'src/app/services/loan.service';
import { take } from 'rxjs/operators';
import { AddLoanComponent } from '../add-loan/add-loan.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewloans',
  templateUrl: './viewloans.component.html',
  styleUrls: ['./viewloans.component.css']
})
export class ViewloansComponent implements OnInit {
  public displayedColumns = ['name', 'description', 'amount', 'date'];
  public dataSource = new MatTableDataSource<Loan>();
  constructor(
    private loanService: LoanService,
    private addLoanDialogue: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.loanService.getLoans().subscribe(
      res => {
        this.dataSource.data = res
      }
    )
  }

  addBorrower() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        id: null,
        title: 'Add Loan',
        loan: new Loan()
    };

    const dialogRef = this.addLoanDialogue.open(AddLoanComponent, dialogConfig);

    dialogRef.afterClosed().pipe(take(1)).subscribe(
      result => {
        if(result){
          this.dataSource.data = [result, ...this.dataSource.data];
        }
      }
    )
  }

}
