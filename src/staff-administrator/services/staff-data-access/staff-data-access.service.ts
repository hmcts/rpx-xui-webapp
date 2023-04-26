import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupOption } from '../../../../api/staff-ref-data/models/staff-filter-option.model';
import { StaffFilterOption } from '../../models/staff-filter-option.model';
import { StaffSearchFilters } from '../../models/staff-search-filters.model';
import { StaffUserListData } from '../../models/staff-user-list-data.model';
import { StaffUser } from '../../models/staff-user.model';

@Injectable({
  providedIn: 'root'
})
export class StaffDataAccessService {
  private API_PATH = '/api/staff-ref-data';
  constructor(private readonly http: HttpClient) {}

  public getFilteredUsers(searchFilters: StaffSearchFilters) {
    const params = new HttpParams()
      .appendAll({
        ...searchFilters.advancedSearchFilters
      });

    const headers = new HttpHeaders()
      .append('page-number', searchFilters.pageNumber.toString())
      .append('page-size', searchFilters.pageSize.toString());

    return this.http.get<StaffUserListData>(`${this.API_PATH}/getFilteredUsers`,
      { params, headers });
  }

  public getUsersByPartialName(searchFilters: StaffSearchFilters) {
    const params = new HttpParams()
      .append('search', searchFilters.partialName);
    const headers = new HttpHeaders()
      .append('page-number', searchFilters.pageNumber.toString())
      .append('page-size', searchFilters.pageSize.toString());

    return this.http.get<StaffUserListData>(`${this.API_PATH}/getUsersByPartialName`,
      { params, headers }
    );
  }

  public getUserTypes() {
    return this.http.get<StaffFilterOption[]>(`${this.API_PATH}/getUserTypes`);
  }

  public getJobTitles() {
    return this.http.get<StaffFilterOption[]>(`${this.API_PATH}/getJobTitles`);
  }

  public getSkills() {
    return this.http.get<GroupOption[]>(`${this.API_PATH}/getSkills`);
  }

  public fetchUsersById(userIds: string[]) {
    return this.http.post<StaffUser>(`${this.API_PATH}/fetchUsersById`, { userIds });
  }

  public fetchSingleUserById(userId: string) {
    return this.http.get<StaffUser>(`${this.API_PATH}/fetchSingleUserById`, {
      params: new HttpParams().set('id', userId)
    });
  }

  public addNewUser(staffUser: StaffUser): Observable<StaffUser> {
    return this.http.post<StaffUser>(`${this.API_PATH}/addNewUser`, staffUser);
  }

  public updateUser(staffUser: StaffUser) {
    return this.http.post<{ case_worker_id: string }>(`${this.API_PATH}/updateUser`, staffUser);
  }
}
