import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  page = new BehaviorSubject(0);
  limit = new BehaviorSubject(15);
  search = new BehaviorSubject('');
  isActive = new BehaviorSubject<boolean | null>(null);
  hasChanged = new BehaviorSubject(false);

  accounts$: Observable<any> = this.hasChanged.pipe(
    switchMap((_) =>
      this.getAllAccounts().pipe(map((res: any) => res.data))
    )
  );

  constructor(private http: HttpClient) { }

  getAllAccounts() {
    let url = new URL(`${environment.apiUrl}bank-accounts`);
    // if (this.limit.value !== 0) {
    //   url.searchParams.append('Limit', String(this.limit.value));
    // }

    // if (this.page.value !== 0) {
    //   url.searchParams.append('Page', String(this.page.value));
    // }

    if (this.search.value) {
      url.searchParams.append('search', this.search.value);
    }


    if (this.isActive.value !== null) {
      url.searchParams.append(
        'isActive',
        String(this.isActive.value)
      );
    }

    this.search.value && url.searchParams.append('search', this.search.value);
    return this.http.get(`${url}`);
  }


  getBankAccountById(BankAccountId: any) {
    let url = new URL(`${environment.apiUrl}`);
    return this.http.get(`${url}bank-accounts/${BankAccountId}`);
  }

  addBankAccount(data: any) {
    let url = new URL(`${environment.apiUrl}bank-accounts`);
    return this.http.post(`${url}`, data);
  }

  updateBankAccount(BankAccountId: any, data: any) {
    let url = new URL(`${environment.apiUrl}bank-accounts/${BankAccountId}`);
    return this.http.patch(`${url}`, data);
  }

  disabledBankAccount(BankAccountId: any) {
    let url = new URL(`${environment.apiUrl}bank-accounts/${BankAccountId}/disable`);
    return this.http.patch(`${url}`, null);
  }

  activateBankAccount(BankAccountId: any) {
    let url = new URL(`${environment.apiUrl}bank-accounts/${BankAccountId}/activate`);
    return this.http.patch(`${url}`, null);
  }

  deleteBankAccount(BankAccountId: any) {
    let url = new URL(
      `${environment.apiUrl}acadeny/${BankAccountId}`
    );
    return this.http.delete(`${url}`);
  }

}
