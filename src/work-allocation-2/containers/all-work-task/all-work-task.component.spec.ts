import { CdkTableModule } from '@angular/cdk/table';
import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { TaskListComponent } from '..';
import { SessionStorageService } from '../../../app/services';
import { reducers } from '../../../app/store';
import { TaskFieldConfig } from '../../../work-allocation/models/tasks';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Task } from '../../models/tasks';
import {
  CaseworkerDataService,
  LocationDataService,
  WASupportedJurisdictionsService,
  WorkAllocationFeatureService,
  WorkAllocationTaskService
} from '../../services';
import { getMockTasks } from '../../tests/utils.spec';
import { AllWorkTaskComponent } from './all-work-task.component';

@Component({
  template: `
    <exui-all-work-tasks></exui-all-work-tasks>`
})
class WrapperComponent {
  @ViewChild(AllWorkTaskComponent) public appComponentRef: AllWorkTaskComponent;
}

@Component({
  template: `
    <div>Nothing</div>`
})
class NothingComponent {
}

@Component({
  selector: 'exui-task-field',
  template: '<div class="xui-task-field">{{task.taskName}}</div>'
})
class TaskFieldComponent {
  @Input() public config: TaskFieldConfig;
  @Input() public task: Task;
}

describe('AllWorkTaskComponent', () => {
  let component: AllWorkTaskComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  let router: Router;
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('mockLoadingService', ['isEnabled']);
  const mockLocationService = jasmine.createSpyObj('mockLocationService', ['getLocations']);
  const mockWASupportedJurisdictionService = jasmine.createSpyObj('mockWASupportedJurisdictionService', ['getWASupportedJurisdictions']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule,
        PaginationModule,
        StoreModule.forRoot({...reducers}),
      ],
      declarations: [AllWorkTaskComponent, WrapperComponent, TaskListComponent],
      providers: [
        {provide: WorkAllocationTaskService, useValue: mockTaskService},
        {provide: AlertService, useValue: mockAlertService},
        {provide: SessionStorageService, useValue: mockSessionStorageService},
        {provide: CaseworkerDataService, useValue: mockCaseworkerService},
        {provide: WorkAllocationFeatureService, useValue: mockFeatureService},
        {provide: LoadingService, useValue: mockLoadingService},
        {provide: FeatureToggleService, useValue: mockFeatureToggleService},
        {provide: LocationDataService, useValue: mockLocationService},
        {provide: WASupportedJurisdictionsService, useValue: mockWASupportedJurisdictionService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.get(Router);
    const tasks: Task[] = getMockTasks();
    mockTaskService.searchTask.and.returnValue(of({tasks}));
    mockCaseworkerService.getAll.and.returnValue(of([]));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    component.locations = [{id: 'loc123', locationName: 'Test', services: []}];
    mockLocationService.getLocations.and.returnValue(of([{id: 'loc123', locationName: 'Test', services: []}]));
    mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(of(['IA']));
    fixture.detectChanges();
  });

  it('getSearchTaskRequestPagination caseworker', () => {
    mockSessionStorageService.getItem.and.returnValue(JSON.stringify({
      id: 'someId',
      forename: 'fore',
      surname: 'surName',
      email: 'email',
      active: true,
      roles: ['caseworker-ia-caseofficer'],
      uid: '1233434'
    }));
    const searchRequest = component.getSearchTaskRequestPagination();
    expect(searchRequest.search_by).toEqual('caseworker');
    expect(searchRequest.pagination_parameters).toEqual({page_number: 1, page_size: 25});
  });

  it('getSearchTaskRequestPagination judge', () => {
    mockSessionStorageService.getItem.and.returnValue(JSON.stringify({
      id: 'someId',
      forename: 'fore',
      surname: 'surName',
      email: 'email',
      active: true,
      roles: ['caseworker-ia-iacjudge'],
      uid: '1233434'
    }));
    const searchRequest = component.getSearchTaskRequestPagination();
    expect(searchRequest.search_by).toEqual('judge');
    expect(searchRequest.pagination_parameters).toEqual({page_number: 1, page_size: 25});
  });

  it('should make a call to load tasks using the default search request', () => {
    const searchRequest = component.getSearchTaskRequestPagination();
    const payload = {searchRequest, view: component.view};
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);
    expect(component.tasks).toBeDefined();
    expect(component.tasks.length).toEqual(2);
  });

  it('should correctly get filter selections', () => {
    mockSessionStorageService.getItem.and.returnValue(JSON.stringify({
      id: 'someId',
      forename: 'fore',
      surname: 'surName',
      email: 'email',
      active: true,
      roles: ['caseworker-ia-caseofficer'],
      uid: '1233434'
    }));
    const selection = {
      location: 'exampleLocation',
      service: 'IA',
      selectPerson: 'All',
      person: null,
      taskType: 'Judicial',
      priority: 'High'
    };
    component.onSelectionChanged(selection);
    const searchRequest = component.getSearchTaskRequestPagination();
    expect(searchRequest.search_parameters).toContain(
      {key: 'jurisdiction', operator: 'IN', values: ['IA']},
      {key: 'location', operator: 'IN', values: ['exampleLocation']}
    );
    expect(searchRequest.search_parameters).toContain({key: 'location', operator: 'IN', values: ['exampleLocation']});
    expect(searchRequest.search_parameters).toContain(
      {key: 'taskCategory', operator: 'EQUAL', values: ['All']},
      {key: 'location', operator: 'IN', values: ['exampleLocation']}
    );
    expect(searchRequest.search_parameters).toContain(
      {key: 'person', operator: 'IN', values: []},
      {key: 'location', operator: 'IN', values: ['exampleLocation']}
    );
    expect(searchRequest.search_parameters).toContain(
      {key: 'taskType', operator: 'EQUAL', values: ['Judicial']},
      {key: 'location', operator: 'IN', values: ['exampleLocation']}
    );
    expect(searchRequest.search_parameters).toContain(
      {key: 'priority', operator: 'EQUAL', values: ['High']},
      {key: 'location', operator: 'IN', values: ['exampleLocation']}
    );
  });

  afterEach(() => {
    fixture.destroy();
  });

});

[
  {statusCode: 403, routeUrl: '/not-authorised'},
  {statusCode: 401, routeUrl: '/not-authorised'},
  {statusCode: 500, routeUrl: '/service-down'},
  {statusCode: 400, routeUrl: '/service-down'},
].forEach(scr => {
  describe('AllWorkTaskComponent negative cases', () => {
    let component: AllWorkTaskComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    let router: Router;
    const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
    const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);
    const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
    const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
    const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
    const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
    const mockFeatureToggleService = jasmine.createSpyObj('mockLoadingService', ['isEnabled']);
    const mockLocationService = jasmine.createSpyObj('mockLocationService', ['getLocations']);
    const mockWASupportedJurisdictionService = jasmine.createSpyObj('mockWASupportedJurisdictionService', ['getWASupportedJurisdictions']);

    beforeEach(async(() => {
      mockLocationService.getLocations.and.returnValue(of([{id: 'loc123', locationName: 'Test', services: []}]));
      mockTaskService.searchTask.and.returnValue(throwError({status: scr.statusCode}));
      const tasks: Task[] = getMockTasks();
      // mockTaskService.searchTaskWithPagination.and.returnValue(of(throwError({ status: 500 })));
      mockCaseworkerService.getAll.and.returnValue(of([]));
      mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
      mockFeatureToggleService.isEnabled.and.returnValue(of(false));
      mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(of(['IA']));
      TestBed.configureTestingModule({
        imports: [
          CdkTableModule,
          ExuiCommonLibModule,
          RouterTestingModule,
          WorkAllocationComponentsModule,
          PaginationModule,
          StoreModule.forRoot({...reducers}),
          RouterTestingModule.withRoutes(
            [
              {path: 'service-down', component: NothingComponent},
              {path: 'not-authorised', component: NothingComponent}
            ]
          )
        ],
        declarations: [AllWorkTaskComponent, WrapperComponent, TaskListComponent, NothingComponent],
        providers: [
          {provide: WorkAllocationTaskService, useValue: mockTaskService},
          {provide: AlertService, useValue: mockAlertService},
          {provide: SessionStorageService, useValue: mockSessionStorageService},
          {provide: CaseworkerDataService, useValue: mockCaseworkerService},
          {provide: WorkAllocationFeatureService, useValue: mockFeatureService},
          {provide: LoadingService, useValue: mockLoadingService},
          {provide: FeatureToggleService, useValue: mockFeatureToggleService},
          {provide: LocationDataService, useValue: mockLocationService},
          {provide: WASupportedJurisdictionsService, useValue: mockWASupportedJurisdictionService}
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;

      component.locations = [{id: 'loc123', locationName: 'Test', services: []}];
      router = TestBed.get(Router);
      fixture.detectChanges();

    }));

    it(`onPaginationEvent with error response code ${scr.statusCode}`, () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.getSearchTaskRequestPagination();
      const searchRequest = component.onPaginationEvent(1);
      const payload = {searchRequest, view: component.view};
      expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);

      expect(navigateSpy).toHaveBeenCalledWith([scr.routeUrl]);

    });

    afterEach(() => {
      fixture.destroy();
    });

  });

});
