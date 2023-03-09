import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { take } from 'rxjs/operators';
import { StaffDataAccessService } from '../../../../services/staff-data-access/staff-data-access.service';
import { StaffDataFilterService } from './staff-data-filter.service';

describe('StaffDataFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [StaffDataAccessService]
  }));

  it('should be created', () => {
    const service: StaffDataFilterService = TestBed.inject(StaffDataFilterService);
    expect(service).toBeTruthy();
  });

  it('should set and emit errors', () => {
    const service: StaffDataFilterService = TestBed.inject(StaffDataFilterService);
    const errorsToSet = [{
      error: 'Error 1'
    }];
    service.setErrors(errorsToSet);

    service.errors$.pipe(take(1)).subscribe(errors => {
      expect(errors.errors[0].error === errorsToSet[0].error).toBe(true);
    });
  });

  it('should empty errors on calling filterByPartialName', () => {
    const service: StaffDataFilterService = TestBed.inject(StaffDataFilterService);
    const errorsToSet = [{
      error: 'Error 1'
    }];
    service.setErrors(errorsToSet);

    service.filterByPartialName('Kevin').subscribe();

    service.errors$.pipe(take(1)).subscribe(errors => {
      expect(errors.errors.length).toBe(0);
    });
  });
});
