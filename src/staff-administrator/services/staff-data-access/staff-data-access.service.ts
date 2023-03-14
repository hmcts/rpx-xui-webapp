import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffFilterOption } from '../../models/staff-filter-option.model';
import { StaffUser } from '../../models/staff-user.model';
import { StaffUsersFilterResult } from '../../models/staff-users-filter-result.model';

@Injectable({
  providedIn: 'root'
})
export class StaffDataAccessService {
  private API_PATH = `/api/staff-ref-data`;
  constructor(private readonly http: HttpClient) {}

  public getFilteredUsers(searchFilters) {
    return this.http.get<StaffUsersFilterResult[]>(`${this.API_PATH}/getFilteredUsers`, { params: searchFilters });
  }

  public getUsersByPartialName(partialName: string) {
    return this.http.get<StaffUsersFilterResult[]>(`${this.API_PATH}/getUsersByPartialName`, { params: {search: partialName} });
  }

  public getUserTypes() {
    return this.http.get<StaffFilterOption[]>(`${this.API_PATH}/getUserTypes`);
  }

  public getJobTitles() {
    return this.http.get<StaffFilterOption[]>(`${this.API_PATH}/getJobTitles`);
  }

  public getSkills() {
    return this.http.get<StaffFilterOption[]>(`${this.API_PATH}/getSkills`);
  }

  public fetchUsersById(userIds: string[]) {
    return this.http.post<StaffUser>(`${this.API_PATH}/fetchUsersById`, { userIds });
  }

  public fetchSingleUserById(userId: string) {
    return this.http.get<StaffUser>(`${this.API_PATH}/fetchSingleUserById`, {
      params: new HttpParams().set('id', userId)
    } );
  }

  public getServices() {
    return this.http.get<StaffFilterOption[]>(`${this.API_PATH}/getServices`);
  }

  public addNewUser(staffUser: StaffUser): Observable<StaffUser> {
    return this.http.post<StaffUser>(`${this.API_PATH}/addNewUser`, staffUser);
  }

  public updateUser(staffUser: StaffUser) {
    return this.http.post<{ case_worker_id: string }>(`${this.API_PATH}/updateUser`, staffUser);
  }
}
