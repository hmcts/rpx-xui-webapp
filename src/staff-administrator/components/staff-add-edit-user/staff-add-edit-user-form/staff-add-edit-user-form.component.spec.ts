import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { BehaviorSubject, of } from 'rxjs';
import { StaffDataAccessService } from '../../../services/staff-data-access/staff-data-access.service';
import { StaffAddEditUserFormComponent } from './staff-add-edit-user-form.component';

@Component({ selector: 'exui-stub-component', template: '' })
class StubComponent { }

describe('StaffAddEditUserFormComponent', () => {
  let component: StaffAddEditUserFormComponent;
  let fixture: ComponentFixture<StaffAddEditUserFormComponent>;
  let location: Location;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const streamTestData = {
    id: 'staff-add-edit-form-mock-data',
    reset: false,
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
          'task-supervisor'
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
      }]
  };
  const streamSubject = new BehaviorSubject(streamTestData);
  const mockFilterService = {
    getStream: () => streamSubject,
    get: jasmine.createSpy(),
    persist: jasmine.createSpy(),
    givenErrors: {
      pipe: () => null,
      subscribe: () => of([{ error: 'errorMessage' }]),
      next: () => null,
      unsubscribe: () => null
    },
    clearSessionAndLocalPersistance: jasmine.createSpy(),
    submitted: false
  };
  let mockStaffDataAccessService: jasmine.SpyObj<StaffDataAccessService>;

  beforeEach(async () => {
    mockStaffDataAccessService = jasmine.createSpyObj<StaffDataAccessService>(
      'mockStaffDataAccessService', ['updateUser']
    );
    await TestBed.configureTestingModule({
      declarations: [StaffAddEditUserFormComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'staff', component: StubComponent },
        ]),
        ReactiveFormsModule,
        HttpClientTestingModule,
        ExuiCommonLibModule,
      ],
      providers: [
        { provide: StaffDataAccessService, useValue: mockStaffDataAccessService },
        { provide: FilterService, useValue: mockFilterService },
        {
          provide: ActivatedRoute,
          useValue: {
            fragment: of('user-skills'),
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
              },
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    spyOn(mockFilterService.givenErrors, 'unsubscribe');
    spyOn(router, 'getCurrentNavigation').and.returnValues({previousNavigation: { finalUrl: '/staff' }} as any);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(StaffAddEditUserFormComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to relative route' +
    '/check-your-answers regardless of editMode = false or editMode = true and form is marked as submitted', fakeAsync(() => {
    component.editMode = true;
    tick();

    spyOn(router, 'navigate');
    mockStaffDataAccessService.updateUser.and.returnValue(of({ case_worker_id: '123' }));
    streamSubject.next(streamTestData);
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['check-your-answers'], { relativeTo: activatedRoute });
    flush();
  }));

  it('should unsubscribe from filterStreamSubscription onDestroy', () => {
    // @ts-expect-error - filterStreamSubscription is a private property
    spyOn(component.filterStreamSubscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    // @ts-expect-error - filterStreamSubscription is a private property
    expect(component.filterStreamSubscription.unsubscribe).toHaveBeenCalled();
  });
});
