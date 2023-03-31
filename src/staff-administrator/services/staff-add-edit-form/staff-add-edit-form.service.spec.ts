import { TestBed } from '@angular/core/testing';

import { StaffAddEditFormService } from './staff-add-edit-form.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { staffFilterOptionsTestData } from '../../test-data/staff-filter-options.test.data';

fdescribe('StaffAddEditFormService', () => {
  let service: StaffAddEditFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        StaffAddEditFormService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                userTypes: staffFilterOptionsTestData.userTypes,
                jobTitles: staffFilterOptionsTestData.jobTitles,
                skills: staffFilterOptionsTestData.skills,
                services: staffFilterOptionsTestData.services
              },
            },
          },
        },
      ]
    });
    service = TestBed.inject(StaffAddEditFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
