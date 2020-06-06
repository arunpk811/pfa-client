import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Borrower } from '../models/borrower';
import { HttpClient } from '@angular/common/http';
import { StringResponse } from '../models/string-response';

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {

  constructor(private httpClient: HttpClient) { }
  
  getBorrowers(){
    return this.httpClient.get<Borrower[]>(`${environment.baseUrl}/api/borrowers`)
  }

  addBorrower(borrower: Borrower){
    return this.httpClient.post<Borrower>(`${environment.baseUrl}/api/borrowers`, borrower)
  }

  updateBorrower(borrower: Borrower){
    return this.httpClient.put<Borrower>(`${environment.baseUrl}/api/borrowers`, borrower)
  }

  deleteBorrower(borrowerId: number){
    return this.httpClient.delete<StringResponse>(`${environment.baseUrl}/api/borrowers/${borrowerId}`)
  }
}
