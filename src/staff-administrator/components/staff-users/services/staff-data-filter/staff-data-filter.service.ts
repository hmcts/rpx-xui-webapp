import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { ErrorMessage, MultipleErrorMessage } from '../../../../../app/models';
import { StaffSearchFilters } from '../../../../models/staff-search-filters.model';
import { StaffUserListData } from '../../../../models/staff-user-list-data.model';
import { StaffDataAccessService } from '../../../../services/staff-data-access/staff-data-access.service';

@Injectable({
  providedIn: 'root'
})
export class StaffDataFilterService {
  public static PAGE_SIZE = 15;
  private readonly searchFilters: BehaviorSubject<StaffSearchFilters>;
  public readonly tableData$: Observable<StaffUserListData>;
  private readonly errors: BehaviorSubject<MultipleErrorMessage[]>;
  public readonly errors$: Observable<ErrorMessage>;

  constructor(private staffDataAccessService: StaffDataAccessService) {
    this.searchFilters = new BehaviorSubject(null);

    this.tableData$ = this.searchFilters.asObservable().pipe(
      filter((searchFilters) => !!searchFilters),
      switchMap((searchFilters) => iif(
        () => !!searchFilters.advancedSearchFilters,
        this.staffDataAccessService.getFilteredUsers(searchFilters),
        this.staffDataAccessService.getUsersByPartialName(searchFilters),
      )),
      shareReplay(1),
    );

    this.errors = new BehaviorSubject([]);
    this.errors$ = this.errors.asObservable().pipe(
      map((errors) => ({
          title: 'There is a problem',
          description: '',
          multiple: true,
          errors: [...errors]
        })
      ));
  }



  public search(searchFilters: StaffSearchFilters) {
    this.setErrors([]);
    this.searchFilters.next({
      ...searchFilters,
      pageNumber: 1,
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
