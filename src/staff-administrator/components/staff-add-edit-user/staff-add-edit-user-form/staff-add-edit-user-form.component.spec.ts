import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { staffFilterOptionsTestData } from '../../../test-data/staff-filter-options.test.data';
import { StaffAddEditUserFormComponent } from './staff-add-edit-user-form.component';
import { of } from 'rxjs';

@Component({selector: 'exui-staff-main-container', template: ''})
class StaffMainContainerStubComponent {}


fdescribe('StaffAddEditUserFormComponent', () => {
  let component: StaffAddEditUserFormComponent;
  let fixture: ComponentFixture<StaffAddEditUserFormComponent>;
  let location: Location;
  // let mockFilterService: jasmine.SpyObj<FilterService>;
  const mockFilterService: any = {
    getStream: () => of({
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
        }]}),
    get: jasmine.createSpy(),
    persist: jasmine.createSpy(),
    givenErrors: {
      subscribe: jasmine.createSpy(),
      next: () => null,
      unsubscribe: () => null
    }
  };

  beforeEach(async(() => {
    // mockFilterService = jasmine.createSpyObj<FilterService>('mockFilterService', ['getStream', 'get', 'persist', 'clearSessionAndLocalPersistance', 'givenErrors']);
    class routerClass {
      getCurrentNavigation() {
        return { previousNavigation: {finalUrl: '/staff'}}
      }
    }
    TestBed.configureTestingModule({
      declarations: [StaffAddEditUserFormComponent, StaffMainContainerStubComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'staff', component: StaffMainContainerStubComponent }
        ]),
        ReactiveFormsModule,
        HttpClientTestingModule,
        ExuiCommonLibModule
      ],
      providers: [
        { provide: FilterService, useValue: mockFilterService },
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
              },
            },
          },
        },
        {
          provide: Router,
          useClass: routerClass
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // router = TestBed.get(Router);

    // mockFilterService.getStream.and.returnValue(of({
    //   reset: false,
    //   fields: [
    //   {
    //     value: [
    //       'Adele'
    //     ],
    //     name: 'firstName'
    //   },
    //   {
    //     value: [
    //       'Adkins'
    //     ],
    //     name: 'lastName'
    //   },
    //   {
    //     value: [
    //       'adele.adkins@dfsd.com'
    //     ],
    //     name: 'email'
    //   },
    //   {
    //     value: [
    //       'region-1'
    //     ],
    //     name: 'region'
    //   },
    //   {
    //     value: [
    //       'family-private-law',
    //       'employment-tribunals'
    //     ],
    //     name: 'services'
    //   },
    //   {
    //     value: [
    //       {
    //         court_venue_id: '10453',
    //         epimms_id: '366796',
    //         site_name: 'Newcastle Civil & Family Courts and Tribunals Centre',
    //       }
    //     ],
    //     name: 'primaryLocation'
    //   },
    //   {
    //     value: [
    //       {
    //         court_venue_id: '10253',
    //         epimms_id: '366559',
    //         site_name: 'Glasgow Tribunals Centre',
    //       },
    //       {
    //         court_venue_id: '10453',
    //         epimms_id: '366796',
    //         site_name: 'Newcastle Civil & Family Courts and Tribunals Centre',
    //       }
    //     ],
    //     name: 'additionalLocations'
    //   },
    //   {
    //     value: [
    //       'ctsc'
    //     ],
    //     name: 'userType'
    //   },
    //   {
    //     value: [
    //       'task-supervisor'
    //     ],
    //     name: 'roles'
    //   },
    //   {
    //     value: [
    //       'hearing-centre-team-leader'
    //     ],
    //     name: 'jobTitle'
    //   },
    //   {
    //     value: [
    //       'family-public-law-underwriter'
    //     ],
    //     name: 'skills'
    //   }]}));
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(StaffAddEditUserFormComponent);
    component = fixture.componentInstance;

    // router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initForm which sets filterConfig on ngOnInit', () => {
    const spyOnInitForm = spyOn(component,  'initFormConfig');
    component.ngOnInit();
    expect(spyOnInitForm).toHaveBeenCalled();
    expect(component.filterConfig).toBeDefined();
  });

  it('should navigate to /staff when calling the cancelCallback from the form config', fakeAsync(() => {
    component.initFormConfig();
    component.filterConfig.cancelButtonCallback();
    tick();

    expect(location.path()).toBe('/staff');
    flush();
  }));
});
