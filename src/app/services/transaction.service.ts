import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { environment } from 'src/environments/environment';
import { StringResponse } from '../models/string-response';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }
  
  getTransactions(){
    return this.httpClient.get<Transaction[]>(`${environment.baseUrl}/api/transactions`)
  }

  addTransaction(transaction: Transaction){
    return this.httpClient.post<Transaction>(`${environment.baseUrl}/api/transactions`, transaction)
  }

  updateTransaction(transaction: Transaction){
    return this.httpClient.put<Transaction>(`${environment.baseUrl}/api/transactions`, transaction)
  }

  deleteTransaction(transactionId: number){
    return this.httpClient.delete<StringResponse>(`${environment.baseUrl}/api/transactions/${transactionId}`)
  }

}
