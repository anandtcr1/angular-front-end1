import { Injectable } from '@angular/core';
import { Gender, Link, LookupCitiesFilter, LookupCity, LookupRole, LookupRolesFilter } from '../models/genric.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenderList, MainList } from '../constants/menu';
import { HttpClient, HttpParams } from '@angular/common/http';
import { appConfig } from 'src/app/app.config';
import { GenderEnum } from '../enums/genric.enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  menuSubject$: BehaviorSubject<Link[]> = new BehaviorSubject<Link[]>([])
  constructor(private httpClient:HttpClient) {
    //this.menuSubject$.next(MainList)
    this.getMenuItems()
  }

  lookupRolesList(lookupRolefilter:LookupRolesFilter): Observable<LookupRole[]> {
    let params: HttpParams = new HttpParams();
    params.append('search', lookupRolefilter.name);
    return this.httpClient.get<LookupRole[]>(appConfig.endPoints.lookups_GetRoleist,{params: params}).pipe();
  }

  lookupCitiesList(lookupRolefilter:LookupCitiesFilter): Observable<LookupCity[]> {
    let params: HttpParams = new HttpParams();
    params.append('search', lookupRolefilter.name);
    return this.httpClient.get<LookupRole[]>(appConfig.endPoints.lookups_GetCities,{params: params}).pipe();
  }

  getMenuItems(){
    return this.httpClient.get<any>(appConfig.endPoints.accountManagement_GetMenuItems).pipe(); 
  }

  getGender(gender:GenderEnum) : Gender | undefined {
    return GenderList.find(a => a.id == gender);
  }
}
