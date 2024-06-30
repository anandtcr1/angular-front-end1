import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupAreas, LookupCities, LookupNationalities } from 'src/app/core/models/genric.model';
import { appConfig } from 'src/app/app.config';
import { GetUserApiModel, UserProfileSaveAPIModel } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getNationalities()  {
    return this.httpClient.get<LookupNationalities[]>(`${appConfig.endPoints.lookups_GetNationalityList}`).pipe();
  }

  getCities()  {
    return this.httpClient.get<LookupCities[]>(`${appConfig.endPoints.lookups_ClityList}`).pipe();
  }

  getAreas(cityId: number)  {
    return this.httpClient.get<LookupAreas[]>(`${appConfig.endPoints.lookups_AreaList}/${cityId}/`).pipe();
  }

  getProfile() {
    return this.httpClient.get<GetUserApiModel>(`${appConfig.endPoints.accManagement_GetUser}`).pipe();
  }

  saveProfile(userProfileSaveAPIModel: UserProfileSaveAPIModel): Observable<any> {
    const formData = new FormData();
    let headers = new HttpHeaders();

    formData.append("FirstName", userProfileSaveAPIModel.firstName);
    formData.append("LastName", userProfileSaveAPIModel.lastName);
    formData.append("BirthDate", userProfileSaveAPIModel.birthDate);
    formData.append("Address", userProfileSaveAPIModel.address);
    formData.append("Gender", userProfileSaveAPIModel.gender);
    formData.append("AlternativeEmail", userProfileSaveAPIModel.alternateEmail);
    formData.append("AreaId", userProfileSaveAPIModel.area);
    formData.append("NationalityId", userProfileSaveAPIModel.nationalityId);
    formData.append("ProfilePicture", userProfileSaveAPIModel.profilePicture);
    formData.append("ProfileCover", null);

    userProfileSaveAPIModel.attachments.forEach(x => {
      formData.append(`Attachments`, x);
    });
    return this.httpClient.post(`${appConfig.endPoints.accManagement_UpdateProfile}`, formData).pipe();
  }
  
}
