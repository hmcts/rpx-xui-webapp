import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { filterConfig } from '@stryker-mutator/mocha-runner/src/utils';
import { BehaviorSubject, of } from 'rxjs';
import { StaffDataAccessService } from '../../../services/staff-data-access/staff-data-access.service';
import { staffFilterOptionsTestData } from '../../../test-data/staff-filter-options.test.data';
import { StaffDataFilterService } from '../services/staff-data-filter/staff-data-filter.service';
import { StaffAdvFilterComponent } from './staff-adv-filter.component';

fdescribe('StaffAdvFilterComponent', () => {
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
  };
  let mockFilterStreamSubject: BehaviorSubject<any>;
  let mockFilterErrorsSubject: BehaviorSubject<any>;

  beforeEach(() => {
    mockFilterStreamSubject = new BehaviorSubject(mockFilterServiceResponse);
    mockFilterErrorsSubject = new BehaviorSubject(null);

    const mockFilterService = {
      getStream: () => mockFilterStreamSubject,
      get: jasmine.createSpy(),
      persist: jasmine.createSpy(),
      givenErrors: mockFilterErrorsSubject,
      clearSessionAndLocalPersistance: jasmine.createSpy()
    };

    mockStaffDataFilterService = jasmine.createSpyObj<StaffDataFilterService>('mockStaffDataFilterService',
      ['search', 'changePage', 'setErrors']);
    mockStaffDataFilterService.search.and.callThrough();

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
        StaffDataAccessService,
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

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAdvFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and set filterConfig', () => {
    expect(component).toBeTruthy();
    expect(filterConfig).toBeTruthy();
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

  fit('should call search on when filterService emits and it contains values', () => {
    const filterSetting = {
      id: 'staff-advanced-filters',
      fields: [
        {
          value: [
            { key: 'AAA7', label: 'Service A' },
            { key: 'BFA1', label: 'Service B' },
            { key: 'CDA3', label: 'Service C' },
          ],
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
    };
    mockFilterStreamSubject.next(filterSetting);

    // @ts-expect-error - private property
    expect(component.staffDataFilterService.search).toHaveBeenCalledWith(
      { advancedSearchFilters: { serviceCode: [ 'AAA7', 'BFA1', 'CDA3' ] }, pageNumber: 1, pageSize: 15 }
    );
  });

  describe('filterSub' , () => {
    it('should unsubscribe from filterService on destroy', () => {
      // @ts-expect-error -- private property
      spyOn(component.filterSub, 'unsubscribe');
      component.ngOnDestroy();
      // @ts-expect-error -- private property
      expect(component.filterSub.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('filterErrorsSub', () => {
    // it('should ')
    it('should unsubscribe from filterService givenErrors on destroy', () => {
      // @ts-expect-error -- private property
      spyOn(component.filterErrorsSub, 'unsubscribe');
      component.ngOnDestroy();
      // @ts-expect-error -- private property
      expect(component.filterErrorsSub.unsubscribe).toHaveBeenCalled();
    });
  });
});
