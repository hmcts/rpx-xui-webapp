import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { UserDetails } from '../../../../app/models';
import { InfoMessageCommService } from '../../../../app/shared/services/info-message-comms.service';
import { StaffUser } from '../../../models/staff-user.model';
import { StaffDataAccessService } from '../../../services/staff-data-access/staff-data-access.service';
import { StaffUserCheckAnswersComponent } from './staff-user-check-answers.component';

describe('StaffUserCheckAnswersComponent', () => {
  let component: StaffUserCheckAnswersComponent;
  let fixture: ComponentFixture<StaffUserCheckAnswersComponent>;
  let mockFilterService: jasmine.SpyObj<FilterService>;
  let mockStaffDataAccessService: jasmine.SpyObj<StaffDataAccessService>;
  let mockInfoMessageCommService: jasmine.SpyObj<InfoMessageCommService>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let testStaffUser: StaffUser;
  let storeMock: jasmine.SpyObj<Store<UserDetails>>;

  beforeEach(waitForAsync(() => {
    mockFilterService = jasmine.createSpyObj<FilterService>('mockFilterService', ['getStream', 'get', 'persist', 'clearSessionAndLocalPersistance', 'givenErrors']);
    mockStaffDataAccessService = jasmine.createSpyObj<StaffDataAccessService>('mockStaffDataAccessService', ['addNewUser']);
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

    storeMock = jasmine.createSpyObj('Store', [
      'dispatch', 'pipe'
    ]);
    const userDetails = {
      sessionTimeout: {
        idleModalDisplayTime: 10,
        totalIdleTime: 1,
      },
      canShareCases: true,
      userInfo: {
        id: 'someId',
        forename: 'foreName',
        surname: 'surName',
        email: 'email@email.com',
        active: true,
        roles: ['pui-case-manager']
      }
    };
    storeMock.pipe.and.returnValue(of(userDetails));

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [StaffUserCheckAnswersComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StaffDataAccessService, useValue: mockStaffDataAccessService },
        { provide: FilterService, useValue: mockFilterService },
        { provide: Router, useValue: mockRouter},
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        {
          provide: Store,
          useValue: storeMock
        },
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
      ],
    }).compileComponents();

    mockFilterService.getStream.and.returnValue(of({
      id: '123',
      fields: [
      {
        value: [
          'Adele'
        ],
        name: 'firstName'
      },
      {
        value: [
          'Adkins'
        ],
        name: 'lastName'
      },
      {
        value: [
          'adele.adkins@dfsd.com'
        ],
        name: 'email'
      },
      {
        value: [
          'region-1'
        ],
        name: 'region'
      },
      {
        value: [
          'family-private-law',
          'employment-tribunals'
        ],
        name: 'services'
      },
      {
        value: [
          {
            court_venue_id: '10453',
            epimms_id: '366796',
            site_name: 'Newcastle Civil & Family Courts and Tribunals Centre',
          }
        ],
        name: 'primaryLocation'
      },
      {
        value: [
          {
            court_venue_id: '10253',
            epimms_id: '366559',
            site_name: 'Glasgow Tribunals Centre',
          },
          {
            court_venue_id: '10453',
            epimms_id: '366796',
            site_name: 'Newcastle Civil & Family Courts and Tribunals Centre',
          }
        ],
        name: 'additionalLocations'
      },
      {
        value: [
          'ctsc'
        ],
        name: 'userType'
      },
      {
        value: [
          'task-supervisor',
          'case-allocator',
          'staff-administrator'
        ],
        name: 'roles'
      },
      {
        value: [
          'hearing-centre-team-leader'
        ],
        name: 'jobTitle'
      },
      {
        value: [
          'family-public-law-underwriter'
        ],
        name: 'skills'
      }]}));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserCheckAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addNewUser and on being succesful it should redirect to "/staff"', (done) => {
    mockStaffDataAccessService.addNewUser.and.returnValue(of(testStaffUser));
    component.onSubmit();
    done();
    expect(mockStaffDataAccessService.addNewUser).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/staff');
  });

  it('should display a banner once an user has been added successfully', (done) => {
    mockStaffDataAccessService.addNewUser.and.returnValue(of(testStaffUser));
    component.onSubmit();
    done();
    expect(mockInfoMessageCommService.nextMessage).toHaveBeenCalled();
  });

  it('should call addNewUser and throw error', (done) => {
    mockStaffDataAccessService.addNewUser.and.returnValue(throwError({status: 500}));
    component.onSubmit();
    done();
    expect(mockStaffDataAccessService.addNewUser).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/service-down');
  });
});
