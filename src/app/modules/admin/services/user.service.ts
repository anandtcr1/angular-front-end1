import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { appConfig } from 'src/app/app.config';
import { CreateUserRequest, DefinitionFile, EditUserRequest, GetDefinitionFiles, GetRoleList, GetUserList, Permission, PermissionResponse, PersonalInfo, RolePagesPut, User } from '../models/user.model';
import { ResponseList } from 'src/app/core/models/genric.model';
import { DefinitionFilesTypesEnum } from 'src/app/core/enums/genric.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(filter: GetUserList): Observable<ResponseList<User>> {
    return this.httpClient.post<ResponseList<User>>(appConfig.endPoints.user_GetList, filter).pipe();
  }

  editUser(user: EditUserRequest): Observable<User> {
    return this.httpClient.post<User>(appConfig.endPoints.user_UpdateUser, user).pipe();
  }

  createUser(user: CreateUserRequest): Observable<User> {
    return this.httpClient.post<User>(appConfig.endPoints.user_CreateUser, user).pipe();
  }

  getAllPermissions(filter: GetRoleList): Observable<ResponseList<Permission>> {
    return this.httpClient.post<ResponseList<Permission>>(appConfig.endPoints.page_GetPages, filter).pipe();
  }

  getRoles(filter: GetRoleList): Observable<ResponseList<Permission>> {
    return this.httpClient.post<ResponseList<Permission>>(appConfig.endPoints.role_GetRoleList, filter).pipe();
  }

  getRoleDetails(id): Observable<PermissionResponse> {
    return this.httpClient.get<PermissionResponse>(appConfig.endPoints.role_GetRole + id).pipe();
  }

  saveRolePages(body: RolePagesPut) {
    return this.httpClient.post<any>(appConfig.endPoints.role_PutRolePages, body).pipe();
  }

  getDefinitionsFiles(filter: GetDefinitionFiles, defFileType: DefinitionFilesTypesEnum): Observable<ResponseList<DefinitionFile>> {
    if (defFileType == DefinitionFilesTypesEnum.IncomeType)
      return this.httpClient.post<ResponseList<DefinitionFile>>(appConfig.endPoints.defFiles_IncomeCorrespondenceTypes_GetList, filter).pipe();
    else if (defFileType == DefinitionFilesTypesEnum.OutgoingType)
      return this.httpClient.post<ResponseList<DefinitionFile>>(appConfig.endPoints.defFiles_OutGoingCorrespondenceTypes_GetList, filter).pipe();
    else if (defFileType == DefinitionFilesTypesEnum.ContractType)
      return this.httpClient.post<ResponseList<DefinitionFile>>(appConfig.endPoints.defFiles_ContractTypess_GetList, filter).pipe();
    else return null
  }

  createDefinitionsFile(body: DefinitionFile, defFileType: DefinitionFilesTypesEnum): Observable<any> {
    if (defFileType == DefinitionFilesTypesEnum.IncomeType)
      return this.httpClient.post<any>(appConfig.endPoints.defFiles_IncomeCorrespondenceTypes_Create, body).pipe();
    else if (defFileType == DefinitionFilesTypesEnum.OutgoingType)
      return this.httpClient.post<any>(appConfig.endPoints.defFiles_OutGoingCorrespondenceTypes_Create, body).pipe();
    else if (defFileType == DefinitionFilesTypesEnum.ContractType)
      return this.httpClient.post<any>(appConfig.endPoints.defFiles_ContractTypes_Create, body).pipe();
    else return null
  }

  editDefinitionsFile(body: DefinitionFile, defFileType: DefinitionFilesTypesEnum): Observable<any> {
    if (defFileType == DefinitionFilesTypesEnum.IncomeType)
      return this.httpClient.post<any>(appConfig.endPoints.defFiles_IncomeCorrespondenceTypes_Update, body).pipe();
    else if (defFileType == DefinitionFilesTypesEnum.OutgoingType)
      return this.httpClient.post<any>(appConfig.endPoints.defFiles_OutGoingCorrespondenceTypes_Update, body).pipe();
    else if (defFileType == DefinitionFilesTypesEnum.ContractType)
      return this.httpClient.post<any>(appConfig.endPoints.defFiles_ContractTypes_Update, body).pipe();
    else return null
  }

  getMyInfo(){
    return this.httpClient.get<PersonalInfo>(appConfig.endPoints.accountManagement_GetUser).pipe();
  }
}
