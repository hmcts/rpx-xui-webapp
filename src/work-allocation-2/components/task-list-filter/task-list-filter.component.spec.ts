import { CdkTableModule } from '@angular/cdk/table';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';

import { LocationDataService, WorkAllocationTaskService } from '../../services';
import { TaskDataService } from '../../services/task-data.service';
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
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  const SELECTED_LOCATIONS = {id: 'locations', fields: [{name: 'locations', value: ['231596', '698118']}]};
  const filterSettings = {
    id: 'locations',
    fields: [{
      name: 'locations',
      value: ['364992', '512401', '231596', '366796', '698118', '227101', '198444', '562808', '386417', '765324']
    }]
  };
  const mockFilterService: any = {
    getStream: () => of(SELECTED_LOCATIONS),
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
        StoreModule,
      ],
      declarations: [TaskListFilterComponent, WrapperComponent],
      providers: [
        {provide: WorkAllocationTaskService, useValue: mockTaskService},
        {provide: LocationDataService, useValue: {getLocations: () => of(ALL_LOCATIONS)}},
        {provide: TaskDataService, useValue: {getTypesOfWork: () => of(typesOfWork)}},
        {
          provide: FilterService, useValue: mockFilterService
        },
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

  it('should select two locations', fakeAsync(() => {
    const button: DebugElement = fixture.debugElement.query(By.css('.govuk-button.hmcts-button--secondary'));
    button.nativeElement.click();

    fixture.detectChanges();
    const checkBoxes: DebugElement = fixture.debugElement.query(By.css('.govuk-checkboxes'));
    const firstLocation = checkBoxes.nativeElement.children[0];
    const secondLocation = checkBoxes.nativeElement.children[1];

    firstLocation.click();
    secondLocation.click();

    fixture.detectChanges();
    const applyButton: DebugElement = fixture.debugElement.query(By.css('#applyFilter'));
    applyButton.nativeElement.click();
    expect(component.selectedLocations.length).toEqual(2);

  }));

  it('should set the filter without local storage', () => {
    expect(mockFilterService.persist).toHaveBeenCalledWith(filterSettings, 'local');
  });

  it('should set the persistence to be local storage if the  user is a judicial user', () => {
    expect(component.fieldsConfig.persistence).toBe('local');
  });

  it('should show types of work filter with all types of work filters selected', () => {
    expect(component.fieldsSettings.fields.length).toBe(2);
    const typesOfWorkSelectedFields = component.fieldsSettings.fields[1];
    expect(typesOfWorkSelectedFields.value.length).toBe(typesOfWork.length + 1);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

});
