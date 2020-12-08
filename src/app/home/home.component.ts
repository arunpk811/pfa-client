import { Component, OnInit } from '@angular/core';
import { LoanService } from '../services/loan.service';
import { BorrowerService } from '../services/borrower.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalLoanAmount: number
  totalGivenAmount: number
  totalBankBalance: number
  constructor(private loanService: LoanService,
    private borrowerService: BorrowerService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.loanService.getTotalDebt().subscribe(
      response =>{
        this.totalLoanAmount = response;
      }
    )
    this.borrowerService.getTotalAmount().subscribe(
      response =>{
        this.totalGivenAmount = response;
      }
    )
    this.accountService.getAccounts().subscribe(response=>{
      this.totalBankBalance = response.map(res => res.balance).reduce((acc1, acc2) => acc1+acc2, 0)
    })
  }

}
