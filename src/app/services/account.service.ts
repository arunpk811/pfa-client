import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../models/accounts';
import { Bank } from '../models/bank';
import { StringResponse } from '../models/string-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient) { }

  getAccounts() {
    return this.httpClient.get<Account[]>(`${environment.baseUrl}/api/accounts`)
  }
  getActiveAccounts() {
    return this.httpClient.get<Account[]>(`${environment.baseUrl}/api/accounts/active`)
  }
  addAccount(account: Account) {
    return this.httpClient.post<Account>(`${environment.baseUrl}/api/accounts`, account)
  }
  updateAccount(accountId: number, account: Account) {
    return this.httpClient.patch<Account>(`${environment.baseUrl}/api/accounts/${accountId}`, account)
  }
  deleteAccount(accountId: number) {
    return this.httpClient.delete<StringResponse>(`${environment.baseUrl}/api/accounts/${accountId}`)
  }
  getBanks(){
    return this.httpClient.get<Bank[]>(`${environment.baseUrl}/api/accounts/banks`)
  }
  getAccountTypes(){
    return this.httpClient.get<string[]>(`${environment.baseUrl}/api/accounts/types`)
  }
}
