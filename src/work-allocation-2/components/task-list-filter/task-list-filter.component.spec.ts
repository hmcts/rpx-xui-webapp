import { CdkTableModule } from '@angular/cdk/table';
import { Component, DebugElement, ViewChild, inject } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { LocationDataService, WorkAllocationTaskService } from '../../services';
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
  let mockRouter: jasmine.SpyObj<Router>;
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

  it('should set booking locations', () => {
    mockRouter = TestBed.get(Router);
    spyOn(mockRouter, 'getCurrentNavigation').and.returnValue({extras: {state: {location: {ids: ['231596', '231596']}}}});
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    expect(component.bookingLocations.length).toEqual(2);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

});
