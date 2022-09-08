import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaffSearchFilters } from '../models/staff-search-filters.model';
import { StaffUser } from '../models/staff-user.model';

@Injectable()
export class StaffDataAccessService {
  private API_PATH = `/api/staff-ref-data`;
  constructor(private readonly http: HttpClient) {}

  public getFilteredUsers(searchFilters: StaffSearchFilters) {
    return this.http.post<StaffUser[]>(`${this.API_PATH}/getFilteredUsers`, searchFilters);
  }
}
