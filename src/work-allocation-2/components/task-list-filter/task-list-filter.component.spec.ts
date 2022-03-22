import { CdkTableModule } from '@angular/cdk/table';
import { Location as AngularLocation } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';

import { LocationDataService, WASupportedJurisdictionsService, WorkAllocationTaskService } from '../../services';
import { TaskTypesService } from '../../services/task-types.service';
import { ALL_LOCATIONS } from '../constants/locations';
import { TaskListFilterComponent } from './task-list-filter.component';

@Component({
  template: `
    <exui-task-list-filter></exui-task-list-filter>`
})
class WrapperComponent {
  @ViewChild(TaskListFilterComponent) public appComponentRef: TaskListFilterComponent;
}

describe('TaskListFilterComponent', () => {
  let component: TaskListFilterComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const typesOfWork = [
    {
      key: 'hearing_work',
      label: 'Hearing work'
    },
    {
      key: 'upper_tribunal',
      label: 'Upper Tribunal'
    },
    {
      key: 'routine_work',
      label: 'Routine work'
    },
    {
      key: 'decision_making_work',
      label: 'Decision-making work'
    },
    {
      key: 'applications',
      label: 'Applications'
    },
    {
      key: 'priority',
      label: 'Priority'
    },
    {
      key: 'access_requests',
      label: 'Access requests'
    },
    {
      key: 'error_management',
      label: 'Error management'
    }
  ];
  const LOCATION = {
    court_venue_id: '100',
    epimms_id: '219164',
    is_hearing_location: 'Y',
    is_case_management_location: 'Y',
    site_name: 'Aberdeen Tribunal Hearing Centre',
    court_name: 'ABERDEEN TRIBUNAL HEARING CENTRE',
    court_status: 'Open',
    region_id: '9',
    region: 'Scotland',
    court_type_id: '17',
    court_type: 'Employment Tribunal',
    open_for_public: 'Yes',
    court_address: 'AB1, 48 HUNTLY STREET, ABERDEEN test1',
    postcode: 'AB11 6LT'
  };
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask', 'getUsersAssignedTasks', 'currentTasks$']);
  const locationService = jasmine.createSpyObj('locationService', ['path']);
  const mockWASupportedJurisdictionService = jasmine.createSpyObj('mockWASupportedJurisdictionService', ['getWASupportedJurisdictions']);
  mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(of(['IA']));
  mockTaskService.getUsersAssignedTasks.and.returnValue(of([]));
  mockTaskService.currentTasks$.and.returnValue(of([null]));
  const filterSettings = {
    id: 'locations',
    fields: [
      {
        id: 'services',
        value: ['services_all', 'IA']
      },
      {
        name: 'locations',
        value: [LOCATION]
      },
      {
        name: 'types-of-work',
        value: ['types_of_work_all', ...typesOfWork.map(t => t.key)]
      }
    ]
  };
  const mockFilterService: any = {
    getStream: () => of(filterSettings),
    get: jasmine.createSpy(),
    persist: jasmine.createSpy(),
    givenErrors: {
      subscribe: jasmine.createSpy(),
      next: () => null,
      unsubscribe: () => null
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        ExuiCommonLibModule,
        HttpClientTestingModule,
        StoreModule,
      ],
      declarations: [TaskListFilterComponent, WrapperComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                location: LOCATION
              }
            }
          }
        },
        { provide: AngularLocation, useValue: locationService },
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        { provide: LocationDataService, useValue: { getLocations: () => of(ALL_LOCATIONS) } },
        { provide: TaskTypesService, useValue: { getTypesOfWork: () => of(typesOfWork) } },
        { provide: FilterService, useValue: mockFilterService },
        { provide: WASupportedJurisdictionsService, useValue: mockWASupportedJurisdictionService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.persistence = 'local';
    spyOn(mockFilterService.givenErrors, 'unsubscribe');
    mockFilterService.get.and.returnValue(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show the toggle filter button', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('.govuk-button.hmcts-button--secondary'));
    expect(button.nativeElement.innerText).toContain('Show work filter');
  });

  it('should hide the toggle filter button', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('.govuk-button.hmcts-button--secondary'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(button.nativeElement.innerText).toContain('Hide work filter');
  });

  it('should set the persistence to be local storage if the  user is a judicial user', () => {
    expect(component.fieldsConfig.persistence).toBe('local');
  });

  it('should show types of work filter with all types of work filters selected', () => {

    expect(component.fieldsSettings.fields.length).toBe(3);
    const typesOfWorkSelectedFields = component.fieldsSettings.fields[2];
    expect(typesOfWorkSelectedFields.value.length).toBe(typesOfWork.length + 1);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

});
