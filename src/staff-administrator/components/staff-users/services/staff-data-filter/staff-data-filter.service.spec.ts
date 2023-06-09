import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { StaffUsersFilterResult } from '../../../../models/staff-users-filter-result.model';
import { StaffDataAccessService } from '../../../../services/staff-data-access/staff-data-access.service';
import { StaffDataFilterService } from './staff-data-filter.service';

describe('StaffDataFilterService', () => {
  let service: StaffDataFilterService;
  let mockStaffDataAccessService: jasmine.SpyObj<StaffDataAccessService>;

  beforeEach(() => {
    mockStaffDataAccessService = jasmine.createSpyObj<StaffDataAccessService>(
      'mockStaffDataAccessService', ['getFilteredUsers', 'getUsersByPartialName']
    );
    mockStaffDataAccessService.getFilteredUsers.and.returnValue(of({
      items: [] as StaffUsersFilterResult[],
      pageNumber: 1,
      pageSize: 1,
      totalItems: 0
    }));
    mockStaffDataAccessService.getUsersByPartialName.and.returnValue(of({
      items: [] as StaffUsersFilterResult[],
      pageNumber: 1,
      pageSize: 1,
      totalItems: 0
    }));

    TestBed.configureTestingModule({
      providers: [
        { provide: StaffDataAccessService, useValue: mockStaffDataAccessService }
      ]
    });
    service = TestBed.inject(StaffDataFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and emit errors', () => {
    const errorsToSet = [{
      error: 'Error 1'
    }];
    service.setErrors(errorsToSet);

    service.errors$.pipe(take(1)).subscribe((errors) => {
      expect(errors.errors[0].error === errorsToSet[0].error).toBe(true);
    });
  });

  it('should empty errors on calling filterByPartialName', () => {
    const errorsToSet = [{
      error: 'Error 1'
    }];
    service.setErrors(errorsToSet);

    service.search({
      partialName: 'Kevin',
      pageNumber: 1,
      pageSize: StaffDataFilterService.PAGE_SIZE
    });

    service.errors$.pipe(take(1)).subscribe((errors) => {
      expect(errors.errors.length).toBe(0);
    });
  });

  it('should set errors to an empty array when called', () => {
    spyOn(service, 'setErrors');
    service.search({ partialName: 'Fred', pageNumber: 1, pageSize: 15 });

    expect(service.setErrors).toHaveBeenCalledWith([]);
  });

  describe('tableData$', () => {
    beforeEach(() => {
      service.tableData$.pipe(take(1)).subscribe();
    });

    it('should call getFilteredUsers if advanced search filters are defined', () => {
      const filters = {
        advancedSearchFilters: {
          serviceCode: [],
          location: [],
          userType: '',
          jobTitle: '',
          skill: [],
          role: []
        },
        pageSize: 1,
        pageNumber: 1
      };
      service.search(filters);

      expect(mockStaffDataAccessService.getFilteredUsers).toHaveBeenCalledWith(filters);
    });

    it('should call getUsersByPartialName if advanced search filters are not defined', () => {
      const filters = { partialName: 'John', pageSize: 1, pageNumber: 1 };
      service.search(filters);

      expect(mockStaffDataAccessService.getUsersByPartialName).toHaveBeenCalledWith(filters);
    });

    it('should not emit if searchFilters is null', () => {
      // @ts-expect-error - we are testing a private property
      spyOn(service.searchFilters, 'asObservable').and.returnValue(of(null));
      service.tableData$.subscribe(() => {
        fail('should not emit');
      });
    });

    it('should catch error and set errors when searching for a user by partial name and ' +
      'getUsersByPartialName is returning 400', () => {
      mockStaffDataAccessService.getUsersByPartialName.and.returnValue(throwError({ status: 400 }));
      spyOn(service, 'setErrors').and.callThrough();

      service.search({ partialName: '123$', pageSize: 10, pageNumber: 1 });
      expect(service.setErrors).toHaveBeenCalled();
    });
  });
});
