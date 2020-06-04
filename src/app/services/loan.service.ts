import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loan } from '../models/loan';
import { environment } from 'src/environments/environment';

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

  updateLoan(loan: Loan){
    return this.httpClient.put<Loan>(`${environment.baseUrl}/api/loans`, loan)
  }

  deleteLoan(loanId: number){
    return this.httpClient.delete<string>(`${environment.baseUrl}/api/loans/${loanId}`)
  }
}
