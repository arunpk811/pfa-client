import { Component, OnInit } from '@angular/core';
import { LoanService } from '../services/loan.service';
import { BorrowerService } from '../services/borrower.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalLoanAmount: number
  totalGivenAmount: number
  constructor(private loanService: LoanService,
    private borrowerService: BorrowerService) { }

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
  }

}
