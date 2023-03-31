import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { of, throwError } from 'rxjs';
import { InfoMessageCommService } from '../../../../app/shared/services/info-message-comms.service';
import { StaffUser } from '../../../models/staff-user.model';
import { StaffAddEditFormService } from '../../../services/staff-add-edit-form/staff-add-edit-form.service';
import { StaffDataAccessService } from '../../../services/staff-data-access/staff-data-access.service';
import { StaffUserCheckAnswersComponent } from './staff-user-check-answers.component';

describe('StaffUserCheckAnswersComponent', () => {
  let component: StaffUserCheckAnswersComponent;
  let fixture: ComponentFixture<StaffUserCheckAnswersComponent>;
  let mockFilterService: jasmine.SpyObj<FilterService>;
  let mockStaffDataAccessService: jasmine.SpyObj<StaffDataAccessService>;
  let mockInfoMessageCommService: jasmine.SpyObj<InfoMessageCommService>;
  let mockStaffAddEditFormService: Partial<StaffAddEditFormService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let testStaffUser: StaffUser;
  let location: Location;

  beforeEach(waitForAsync(() => {
    mockFilterService = jasmine.createSpyObj<FilterService>('mockFilterService', ['getStream', 'get', 'persist', 'clearSessionAndLocalPersistance', 'givenErrors']);
    mockStaffDataAccessService = jasmine.createSpyObj<StaffDataAccessService>('mockStaffDataAccessService', ['addNewUser', 'updateUser']);
    mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['nextMessage']);
    testStaffUser = StaffUser.from({
      email_id: 'email@test.hmcts',
      first_name: 'Kevin',
      last_name: 'Silver',
      suspended: 'false',
      user_type: 'userType',
      task_supervisor: 'Y',
      case_allocator: 'Y',
      staff_admin: 'N',
      userCategory: 'userCategory',
      role: [
        {
          role_id: 1,
          role: 'Role',
          is_primary: true,
        }
      ],
      skills: [
        {
          skill_id: 1,
          description: 'SKILLDESCRIPTION',
          skill_code: 'SKILLCODE',
        }
      ],
      work_area: [
        {
          area_of_work: 'service',
          service_code: 'SERVICE_CODE'
        }
      ],
      base_location: [
        {
          location_id: 333,
          location: 'Location',
          is_primary: true
        }
      ],
      region: 'West Midlands',
      region_id: 12,
    });

    mockStaffAddEditFormService = {
      valuesAsStaffUser: testStaffUser
    };

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [StaffUserCheckAnswersComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StaffDataAccessService, useValue: mockStaffDataAccessService },
        { provide: Router, useValue: mockRouter},
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                userTypes: [
                  {
                    key: 'userType',
                    label: 'User Types'
                  },
                  {
                    key: 'ctsc',
                    label: 'CTSC'
                  }
                ],
                  jobTitles: [
                    {
                      key: 'senior-legal-caseworker',
                      label: 'Senior Legal Caseworker'
                    },
                    {
                      key: 'legal-caseworker',
                      label: 'Legal Caseworker'
                    },
                    {
                      key: 'hearing-centre-team-leader',
                      label: 'Hearing Centre Team Leader'
                    },
                    {
                      key: 'hearing-centre-administrator',
                      label: 'Hearing Centre Administrator'
                    },
                    {
                      key: 'court-clerk',
                      label: 'Court Clerk'
                    }
                  ],
                  skills: [
                    {
                      group: 'adoption',
                      options: [
                        {
                          key: 'adoption-underwriter',
                          label: 'Underwriter',
                          service: 'adoption',
                          id: '1'
                        },
                        {
                          key: 'adoption-caseworker',
                          label: 'Caseworker',
                          service: 'adoption',
                          id: '2'
                        }
                      ]
                    },
                    {
                      group: 'family-private-law',
                      options: [
                        {
                          key: 'family-private-law-caseworker',
                          label: 'Caseworker',
                          service: 'family-private-law',
                          id: '3'
                        },
                        {
                          key: 'family-private-law-casemanager',
                          label: 'Casemanager',
                          service: 'family-private-law',
                          id: '4'
                        }
                      ]
                    },
                    {
                      group: 'family-public-law',
                      options: [
                        {
                          key: 'family-public-law-underwriter',
                          label: 'Underwriter',
                          service: 'family-public-law',
                          id: '5'
                        }
                      ]
                    }
                  ],
                  services: [
                    {
                      key: 'family-public-law',
                      label: 'Family Public Law'
                    },
                    {
                      key: 'family-private-law',
                      label: 'Family Private Law'
                    },
                    {
                      key: 'adoption',
                      label: 'Adoption'
                    },
                    {
                      key: 'employment-tribunals',
                      label: 'Employment Tribunals'
                    },
                    {
                      key: 'financial-remedy',
                      label: 'Financial Remedy'
                    }
                  ]
              }
            }
          }
        },
        { provide: StaffAddEditFormService, useValue: mockStaffAddEditFormService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(StaffUserCheckAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set is updateMode', () => {
  //   component.ngOnInit();
  //   expect(component.isUpdateMode).toBe(false);
  //
  //   component.ngOnInit();
  //   expect(component.isUpdateMode).toBe(true);
  // });

  it('should call the right method based on isEditMode on calling the onSubmit method', () => {
    component.isUpdateMode = false;
    spyOn(component, 'onSubmitAddUser').and.callFake(() => {});
    component.onSubmit();
    expect(component.onSubmitAddUser).toHaveBeenCalled();

    component.isUpdateMode = true;
    spyOn(component, 'onSubmitUpdateUser').and.callFake(() => {});
    component.onSubmit();
    expect(component.onSubmitUpdateUser).toHaveBeenCalled();
  });

  it('should call onSubmit method on clicking the submit button', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const checkAnswersSubmitButton = fixture.debugElement.query(By.css('#user-staff-check-answers-submit'));
    checkAnswersSubmitButton.triggerEventHandler('click', null);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call addNewUser and on being succesful it should redirect to "/staff"', (done) => {
    mockStaffDataAccessService.addNewUser.and.returnValue(of(testStaffUser));
    component.onSubmitAddUser();
    done();
    expect(mockStaffDataAccessService.addNewUser).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/staff');
  });

  it('should display a banner once an user has been added successfully', (done) => {
    mockStaffDataAccessService.addNewUser.and.returnValue(of(testStaffUser));
    component.onSubmitAddUser();
    done();
    expect(mockInfoMessageCommService.nextMessage).toHaveBeenCalled();
  });

  it('should call addNewUser and throw error', (done) => {
    mockStaffDataAccessService.addNewUser.and.returnValue(throwError({status: 500}));
    component.onSubmitAddUser();
    done();
    expect(mockStaffDataAccessService.addNewUser).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/service-down');
  });

  it('should call updateUser and then redirect to staff on successful call when calling onSubmitEditMode', fakeAsync(() => {
    const caseworkerId = '123';
    mockStaffDataAccessService.updateUser.and.returnValue(of({ case_worker_id: caseworkerId }));
    component.onSubmitUpdateUser();
    tick();
    expect(mockStaffDataAccessService.updateUser).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/staff/user-details/${caseworkerId}`);
    flush();
  }));

  it('should call updateUser and then redirect to service down on error call when calling onSubmitEditMode', fakeAsync(() => {
    mockStaffDataAccessService.updateUser.and.returnValue(throwError('error'));
    spyOn(window, 'scrollTo').and.callFake(() => {});
    component.onSubmitUpdateUser();
    tick();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/service-down');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(mockStaffDataAccessService.updateUser).toHaveBeenCalled();
    flush();
  }));
});
