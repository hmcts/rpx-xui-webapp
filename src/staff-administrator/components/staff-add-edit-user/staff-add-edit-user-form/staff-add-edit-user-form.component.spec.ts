import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService, GroupOptions } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';

import { StaffFilterOption } from '../../../models//staff-filter-option.model';
import { StaffAddEditUserFormComponent } from './staff-add-edit-user-form.component';
import { StaffUserCheckAnswersComponent } from '../staff-user-check-answers/staff-user-check-answers.component';

@Component({ selector: 'exui-staff-main-container', template: '' })
class StaffMainContainerStubComponent { }

xdescribe('StaffAddEditUserFormComponent', () => {
  let component: StaffAddEditUserFormComponent;
  let fixture: ComponentFixture<StaffAddEditUserFormComponent>;
  let location: Location;
  let router: Router;
  const jobTitles: StaffFilterOption[] = [
    {key: 'senior-legal-caseworker', label: 'Senior Legal Caseworker'},
    {key: 'legal-caseworker', label: 'Legal Caseworker'},
    {key: 'hearing-centre-team-leader', label: 'Hearing Centre Team Leader'},
    {key: 'hearing-centre-administrator', label: 'Hearing Centre Administrator'},
    {key: 'court-clerk', label: 'Court Clerk'}
  ];
  const skills: GroupOptions[] = [
    {
       group: 'adoption',
       options: [
          {
             key: 'adoption-underwriter',
             label: 'Underwriter',
          },
          {
             key: 'adoption-caseworker',
             label: 'Caseworker',
          }
       ]
    },
    {
       group: 'family-public-law',
       options: [
          {
             key: 'family-public-law-underwriter',
             label: 'Underwriter',
          }
       ]
    }
  ];
  const mockFilterService: any = {
    getStream: () => of({
      reset: true,
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
    }),
    get: jasmine.createSpy(),
    persist: jasmine.createSpy(),
    givenErrors: {
      pipe: () => null,
      subscribe: () => of([{ error: 'errorMessage' }]),
      next: () => null,
      unsubscribe: () => null
    },
    clearSessionAndLocalPersistance: jasmine.createSpy()
  };

  beforeEach(async () => {
    class routerClass {
      getCurrentNavigation() {
        return { previousNavigation: { finalUrl: '/staff' } }
      }
    }
    await TestBed.configureTestingModule({
      declarations: [StaffAddEditUserFormComponent, StaffMainContainerStubComponent, StaffUserCheckAnswersComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'staff', component: StaffMainContainerStubComponent },
          { path: 'staff/add-user/check-your-answers', component: StaffUserCheckAnswersComponent }
        ]),
        ReactiveFormsModule,
        HttpClientTestingModule,
        ExuiCommonLibModule,

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
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    spyOn(mockFilterService.givenErrors, 'unsubscribe');
    // spyOn(router, 'getCurrentNavigation').and.returnValues({ previousNavigation: { finalUrl: {root : {children: { primary: { segments: [{path: 'staff', parameters: {}}, {path: 'add-user', parameters: {}}, {path: 'check-your-answer', parameters: {}}]}}}}}});
    spyOn(router, 'getCurrentNavigation').and.returnValues({previousNavigation: { finalUrl: '/staff' }} as any);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(StaffAddEditUserFormComponent);
    component = fixture.componentInstance;
    // component.formGroup = new FormGroup({});
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initForm which sets filterConfig on ngOnInit', () => {
    const spyOnInitForm = spyOn(component, 'initFormConfig');

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

  it('should return the selected options with true value', () => {
    const result = (component as any).getSelected(jobTitles, ['hearing-centre-team-leader', 'hearing-centre-administrator']);
    expect(result).toEqual([false, false, true, true, false]);
  });

  it('should return the selected options with true value for skills', () => {
    const result = (component as any).getSelectedSkills(skills, ['adoption-caseworker', 'family-public-law-underwriter']);
    expect(result).toEqual([ false, true, true]);
  });
});
