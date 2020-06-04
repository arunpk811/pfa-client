import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }
  
  getTransactions(){
    return this.httpClient.get<Transaction>(`${environment.baseUrl}/api/transactions`)
  }

  // addTransaction(){
  //   return this.httpClient.post<Transaction>(`${environment.baseUrl}/transactions`)
  // }

  // updateTransaction(){
  //   return this.httpClient.get<Transaction>(`${environment.baseUrl}/transactions`)
  // }

  // deleteTransaction(){
  //   return this.httpClient.get<Transaction>(`${environment.baseUrl}/transactions`)
  // }

}
