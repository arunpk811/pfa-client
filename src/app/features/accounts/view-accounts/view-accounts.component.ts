import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { Account } from 'src/app/models/accounts';
import { AccountService } from 'src/app/services/account.service';
import { AddBorrowerComponent } from '../../borrower/add-borrower/add-borrower.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AddAccountComponent } from '../add-account/add-account.component';

@Component({
  selector: 'app-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ViewAccountsComponent implements OnInit {
  public displayedColumns = ['bank', 'balance'];
  public dataSource = new MatTableDataSource<Account>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedElement: Account | null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private accountService: AccountService,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAccounts()
    this.dataSource.paginator = this.paginator
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe(response => {
      this.dataSource.data = response
    })
  }
  getTotal() {
    return this.dataSource.data.map(t => t.balance).reduce((balance1, balance2) => balance1 + balance2, 0)
  }
  addAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.data = {
      id: null,
      account: {

      } as Account
    };

    const dialogRef = this.matDialog.open(AddAccountComponent, dialogConfig);

    dialogRef.afterClosed().pipe(take(1)).subscribe(
      result => {
        if (result) {
          this.dataSource.data = [result, ...this.dataSource.data]
        }
      }
    )
  }
  editAccount(_account: Account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.data = {
      id: _account.id,
      account: _account
    };

    const dialogRef = this.matDialog.open(AddAccountComponent, dialogConfig);

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
  deleteAccount(account: Account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.data = {
      title: 'Are you sure?',
    };

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(take(1)).subscribe(
      result => {
        if (result) {
          this.accountService.deleteAccount(account.id).subscribe(
            result => {
              this.openSnackBar(result.data)
              this.getAccounts()
            }
          )
        }
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
}
