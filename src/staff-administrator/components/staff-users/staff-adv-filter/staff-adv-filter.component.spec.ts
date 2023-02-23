import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
// import { StaffDataAccessService } from '../../../../staff-administrator/services/staff-data-access/staff-data-access.service';
import { staffFilterOptionsTestData } from '../../../test-data/staff-filter-options.test.data';
import { StaffDataFilterService } from '../services/staff-data-filter/staff-data-filter.service';
import { StaffAdvFilterComponent } from './staff-adv-filter.component';

xdescribe('StaffAdvFilterComponent', () => {
  let component: StaffAdvFilterComponent;
  let fixture: ComponentFixture<StaffAdvFilterComponent>;

  let mockStaffDataFilterService: jasmine.SpyObj<StaffDataFilterService>;

  const mockFilterServiceResponse = {
    id: 'staff-advanced-filters',
    fields: [
      {
        value: ['AAA7'],
        name: 'user-services'
      },
      {
        value: [],
        name: 'user-location'
      },
      {
        value: ['All'],
        name: 'user-type'
      },
      {
        value: ['All'],
        name: 'user-job-title'
      },
      {
        value: ['All'],
        name: 'user-skills'
      },
      {
        value: [],
        name: 'user-role'
      }
    ],
    reset: false
  }

  const mockFilterService = {
    getStream: () => of(mockFilterServiceResponse),
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

  beforeEach(() => {
    mockStaffDataFilterService = jasmine.createSpyObj<StaffDataFilterService>('mockStaffDataFilterService', ['filterByAdvancedSearch', 'resetSearch', 'setErrors']);
    TestBed.configureTestingModule({
      declarations: [ StaffAdvFilterComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ExuiCommonLibModule,
      ],
      providers: [
        { provide: StaffDataFilterService, useValue: mockStaffDataFilterService },
        { provide: FilterService, useValue: mockFilterService },
        // StaffDataAccessService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                userTypes: staffFilterOptionsTestData.userTypes,
                jobTitles: staffFilterOptionsTestData.jobTitles,
                skills: staffFilterOptionsTestData.skills,
                services: staffFilterOptionsTestData.services
              }
            },
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    mockStaffDataFilterService.filterByAdvancedSearch.and.returnValue(of([{
      id: '2',
      firstName: 'Victoria',
      lastName: 'Patton',
      userCategory: '',
      userType: 'Officer2',
      jobTitle: 'Solicitor',
      locations: [
        'Locatin Y',
      ],
      region: 'London',
      services: [
        'Mock Service 2',
      ],
      suspended: true,
      email: 'victoria@hmcts.com',
      primaryLocation: 'London',
      roles: 'Case allocator',
      skills: ['SCSS'],
    }]));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAdvFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have All by default in job title', () => {
    const field = component.filterConfig.fields.find(f => f.name === 'user-job-title');
    expect(field.defaultOption.key).toBe('All');
    const element = fixture.debugElement.nativeElement;
    const userJobTitle = element.querySelector('#select_user-job-title');
    expect(userJobTitle.value).toBe('All');
  });

  it('should have All by default in user type', () => {
    const field = component.filterConfig.fields.find(f => f.name === 'user-type');
    expect(field.defaultOption.key).toBe('All');
    const element = fixture.debugElement.nativeElement;
    const userJobTitle = element.querySelector('#select_user-type');
    expect(userJobTitle.value).toBe('All');
  });

  it('should not make a call to advanced search', () => {
    expect(mockStaffDataFilterService.filterByAdvancedSearch).toHaveBeenCalled();
  });
})
})
