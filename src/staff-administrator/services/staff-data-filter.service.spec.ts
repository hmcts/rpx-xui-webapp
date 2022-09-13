import { TestBed } from '@angular/core/testing';

import { StaffDataAccessService } from './staff-data-access.service';
import { StaffDataFilterService } from './staff-data-filter.service';

describe('StaffDataFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [StaffDataAccessService]
  }));

  it('should be created', () => {
    const service: StaffDataFilterService = TestBed.get(StaffDataFilterService);
    expect(service).toBeTruthy();
  });
});
