import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffFilterOption } from '../../models/staff-filter-option.model';
import { StaffSearchFilters } from '../../models/staff-search-filters.model';
import { StaffUserListData } from '../../models/staff-user-list-data.model';
import { StaffUser } from '../../models/staff-user.model';

@Injectable({
  providedIn: 'root'
})
export class StaffDataAccessService {
  private API_PATH = `/api/staff-ref-data`;
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
    return this.http.get<StaffFilterOption[]>(`${this.API_PATH}/getSkills`);
  }

  public fetchUsersById(userIds: number[]) {
    return this.http.post<StaffUser>(`${this.API_PATH}/fetchUsersById`, { userIds });
  }

  public getServices() {
    return this.http.get<StaffFilterOption[]>(`${this.API_PATH}/getServices`);
  }

  public addNewUser(staffUser: StaffUser): Observable<StaffUser> {
    return this.http.post<StaffUser>(`${this.API_PATH}/addNewUser`, staffUser.toDto());
  }

  public updateUser(staffUser: StaffUser) {
    return this.http.post<{ case_worker_id: string }>(`${this.API_PATH}/updateUser`, staffUser.toDto());
  }
}
