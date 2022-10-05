import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaffFilterOption } from '../../models/staff-filter-option.model';
import { StaffSearchFilters } from '../../models/staff-search-filters.model';
import { StaffUser } from '../../models/staff-user.model';

@Injectable()
export class StaffDataAccessService {
  private API_PATH = `/api/staff-ref-data`;
  constructor(private readonly http: HttpClient) {}

  public getFilteredUsers(searchFilters: StaffSearchFilters) {
    return this.http.post<StaffUser[]>(`${this.API_PATH}/getFilteredUsers`, searchFilters);
  }

  public getUsersByPartialName(partialName: string) {
    return this.http.get<{results: StaffUser[]}>(`${this.API_PATH}/getUsersByPartialName`, { params: {search: partialName} });
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

  public getStaffRefUserDetails(id: number) {
    return this.http.get<StaffUser>(`${this.API_PATH}/getStaffRefUserDetails/${id}`);
  }
}
