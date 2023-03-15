import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorMessage, MultipleErrorMessage } from '../../../../../app/models';
import { StaffSearchFilters } from '../../../../models/staff-search-filters.model';
import { StaffUsersFilterResult } from '../../../../models/staff-users-filter-result.model';
import { StaffDataAccessService } from '../../../../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffDataFilterService {
  private tableData = new BehaviorSubject<{ results: StaffUsersFilterResult[]; }>({ results: [] });
  private readonly errors = new BehaviorSubject<ErrorMessage>({
    title: 'There is a problem',
    description: '',
    multiple: true,
    errors: []
  });

  public tableData$ = this.tableData.asObservable();
  public errors$ = this.errors.asObservable();

  constructor(private staffDataAccessService: StaffDataAccessService) {}

  public filterByPartialName(partialName: string) {
    this.setErrors([]);
    return this.staffDataAccessService.getUsersByPartialName(partialName).pipe(
      tap((tableData) => this.tableData.next({
        results: tableData
      }))
    );
  }

  public filterByAdvancedSearch(searchFilters: StaffSearchFilters) {
    this.setErrors([]);
    return this.staffDataAccessService.getFilteredUsers(searchFilters).pipe(
      tap((tableData) => this.tableData.next({
        results: tableData
      }))
    );
  }

  public resetSearch() {
    return this.tableData.next({
      results: null
    });
  }

  public setErrors(errors: MultipleErrorMessage[]) {
    this.errors.next({
      ...this.errors.getValue(),
      errors
    });
  }
}
