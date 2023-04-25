import { TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';
import { StaffUser } from '../../models/staff-user.model';
import { staffFilterOptionsTestData } from '../../test-data/staff-filter-options.test.data';
import { StaffAddEditFormService } from './staff-add-edit-form.service';

describe('StaffAddEditFormService', () => {
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
                jobTitles: staffFilterOptionsTestData.jobTitles,
                skills: staffFilterOptionsTestData.skills,
                services: staffFilterOptionsTestData.services,
                regions: staffFilterOptionsTestData.regions
              }
            }
          }
        }
      ]
    });
    service = TestBed.inject(StaffAddEditFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set staffFilterOptions', () => {
    expect(service.staffFilterOptions.jobTitles).toEqual(staffFilterOptionsTestData.jobTitles);
    expect(service.staffFilterOptions.skills).toEqual(staffFilterOptionsTestData.skills);
    expect(service.staffFilterOptions.services).toEqual(staffFilterOptionsTestData.services);
    expect(service.staffFilterOptions.regions).toEqual(staffFilterOptionsTestData.regions);
  });

  it('should create formGroup with keys of StaffUser', () => {
    const staffUserKeys = Object.keys(new StaffUser());
    const formGroupKeys = Object.keys(service.formGroup.controls);
    expect(formGroupKeys).toEqual(jasmine.arrayContaining(staffUserKeys));
  });

  describe('selectedServiceCodes$', (() => {
    it('should emit an array of service codes from selected services', () => {
      service.selectedServiceCodes$
        .pipe(take(1))
        .subscribe((serviceCodes) => {
          expect(serviceCodes).toEqual([]);
        });

      const firstServiceCodeOption = service.staffFilterOptions.services[0];
      const selectedServices = service.formGroup.get('services')?.value;
      selectedServices[0] = true;
      service.formGroup.get('services').setValue(selectedServices);
      service.selectedServiceCodes$.subscribe((serviceCodes) => {
        expect(serviceCodes).toEqual([firstServiceCodeOption.key]);
      });
    });
  }));

  describe('patchFormValues', (() => {
    it('should call patchValue on formGroup with the passed value', () => {
      spyOn(service.formGroup, 'patchValue').and.callThrough();
      const staffUserData = {
        email_id: 'Email',
        first_name: 'First',
        last_name: 'Last',
        suspended: false,
        user_type: 'User Type',
        task_supervisor: false,
        case_allocator: false,
        staff_admin: false
      };
      const newStaffUser = StaffUser.from(staffUserData);
      service.patchFormValues(newStaffUser);
      expect(service.formGroup.patchValue).toHaveBeenCalledTimes(1);
      Object.keys(staffUserData).forEach((key) => {
        expect(service.formGroup.value[key]).toBe(staffUserData[key]);
      });
    });
  }));
});
