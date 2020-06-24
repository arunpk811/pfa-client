import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loan } from '../models/loan';
import { environment } from 'src/environments/environment';
import { StringResponse } from '../models/string-response';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private httpClient: HttpClient) { }
  
  getLoans(){
    return this.httpClient.get<Loan[]>(`${environment.baseUrl}/api/loans`)
  }

  addLoan(loan: Loan){
    return this.httpClient.post<Loan>(`${environment.baseUrl}/api/loans`, loan)
  }

  updateLoan(loanId: number, loan: Loan){
    return this.httpClient.patch<Loan>(`${environment.baseUrl}/api/loans/${loanId}`, loan)
  }

  deleteLoan(loanId: number){
    return this.httpClient.delete<StringResponse>(`${environment.baseUrl}/api/loans/${loanId}`)
  }

  getTotalDebt(){
    return this.httpClient.get<number>(`${environment.baseUrl}/api/loans/total`)
  }
}
