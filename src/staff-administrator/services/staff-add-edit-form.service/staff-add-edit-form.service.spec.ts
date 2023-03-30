import { TestBed } from '@angular/core/testing';

import { StaffAddEditFormService } from './staff-add-edit-form.service';

describe('StaffAddEditFormService', () => {
  let service: StaffAddEditFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffAddEditFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
