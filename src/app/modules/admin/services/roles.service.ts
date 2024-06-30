import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetRoleList, Role } from '../models/role.model';
import { Observable } from 'rxjs';
import { ResponseList } from 'src/app/core/models/genric.model';
import { appConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private httpClient: HttpClient) { }

  getRoles(filter: GetRoleList): Observable<ResponseList<Role>> {
    return this.httpClient.post<ResponseList<Role>>(appConfig.endPoints.role_GetList, filter).pipe();
  }

  getRole(id: string): Observable<Role> {
    return this.httpClient.get<Role>(`${appConfig.endPoints.role_GetItem}/${id}`).pipe();
  }

  createRole(payload: Role): Observable<Role> {
    return this.httpClient.post<Role>(appConfig.endPoints.role_Create, payload).pipe();
  }

  updateRole(payload: Role): Observable<Role> {
    return this.httpClient.post<Role>(appConfig.endPoints.role_Update, payload).pipe();
  }

}
