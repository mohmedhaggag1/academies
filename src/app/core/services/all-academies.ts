import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AllAcademies {
  page = new BehaviorSubject(0);
  limit = new BehaviorSubject(15);
  search = new BehaviorSubject('');
  hasChanged = new BehaviorSubject(false);

  houseUnits$: Observable<any> = this.hasChanged.pipe(
    switchMap((_) =>
      this.getAllacademies().pipe(map((res: any) => res.data))
    )
  );

  constructor(private http: HttpClient) { }

  getAllacademies() {
    let url = new URL(`${environment.apiUrl}academy`);
    // if (this.limit.value !== 0) {
    //   url.searchParams.append('Limit', String(this.limit.value));
    // }

    // if (this.page.value !== 0) {
    //   url.searchParams.append('Page', String(this.page.value));
    // }

    this.search.value && url.searchParams.append('search', this.search.value);
    return this.http.get(`${url}`);
  }


  getAcademyById(houseUnitId: any) {
    let url = new URL(`${environment.apiUrl}`);
    return this.http.get(`${url}HousingUnits/GetById ${houseUnitId}`);
  }

  addHouseUnit(data: any) {
    let url = new URL(`${environment.apiUrl}HousingUnits/Add`);
    return this.http.post(`${url}`, data);
  }

  updateHouseUnit(houseUnitId: any, data: any) {
    let url = new URL(`${environment.apiUrl}HousingUnits/Update`);
    url.searchParams.append('Id', houseUnitId);
    return this.http.put(`${url}`, data);
  }

  deleteHouseUnit(houseUnitId: any) {
    let url = new URL(
      `${environment.apiUrl}HousingUnits/Delete/${houseUnitId}`
    );
    return this.http.delete(`${url}`);
  }
}
