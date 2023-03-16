import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ErrorMessage, MultipleErrorMessage } from '../../../../../app/models';
import { StaffSearchFilters } from '../../../../models/staff-search-filters.model';
import { StaffUserListData } from '../../../../models/staff-user-list-data.model';
import { StaffDataAccessService } from '../../../../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffDataFilterService {
  private readonly searchFilters = new BehaviorSubject<StaffSearchFilters>(null);
  private readonly errors = new BehaviorSubject<MultipleErrorMessage[]>([]);

  public readonly tableData$: Observable<StaffUserListData> = this.searchFilters.asObservable().pipe(
    filter((searchFilters) => !!searchFilters),
    tap(() => this.setErrors([])),
    switchMap((searchFilters) => iif(
      () => !!searchFilters.advancedSearchFilters,
      this.staffDataAccessService.getFilteredUsers(searchFilters),
      this.staffDataAccessService.getUsersByPartialName(searchFilters),
    )),
    shareReplay(1),
    tap((data) => { console.log(data); })
  );

  public readonly errors$: Observable<ErrorMessage> = this.errors.asObservable().pipe(
    map((errors) => ({
      title: 'There is a problem',
      description: '',
      multiple: true,
      errors: [...errors]
    })
  ));

  constructor(private staffDataAccessService: StaffDataAccessService) {}

  public search(searchFilters: StaffSearchFilters) {
    this.searchFilters.next({
      ...searchFilters,
      pageNumber: 1,
      pageSize: 15,
    });
  }

  public changePage(pageNumber: number) {
    this.searchFilters.next({
      ...this.searchFilters.value,
      pageNumber,
    });
  }

  public setErrors(errors: MultipleErrorMessage[]) {
    this.errors.next(errors);
  }
}
