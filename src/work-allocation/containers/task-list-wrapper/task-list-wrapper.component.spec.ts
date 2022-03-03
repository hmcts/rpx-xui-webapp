import { CdkTableModule } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of, throwError } from 'rxjs';
import { SessionStorageService } from '../../../app/services';
import { WorkAllocationComponentsModule } from '../../../work-allocation/components/work-allocation.components.module';
import { Task } from '../../../work-allocation/models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../../work-allocation/services';
import { getMockTasks, MockRouter } from '../../../work-allocation/tests/utils.spec';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskListWrapperComponent } from './task-list-wrapper.component';

describe('TaskListWrapperComponent', () => {
  let component: TaskListWrapperComponent;
  let fixture: ComponentFixture<TaskListWrapperComponent>;
  const mockRef = jasmine.createSpyObj('mockRef', ['']);
  const mockRouter: MockRouter = new MockRouter();
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['searchTask', 'getTask', 'searchTaskWithPagination']);

  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['isEnabled']);
  let router: Router;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        WorkAllocationComponentsModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        CdkTableModule,
        PaginationModule
      ],
      declarations: [TaskListComponent, TaskListWrapperComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: mockRef },
        { provide: WorkAllocationTaskService, useValue: mockWorkAllocationService },
        { provide: Router, useValue: mockRouter },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TaskListWrapperComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    component.isPaginationEnabled$ = of(false);
    const tasks: Task[] = getMockTasks();
    mockWorkAllocationService.searchTask.and.returnValue(of({ tasks }));
    // mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('onActionHandler()', () => {
    const exampleTask = getMockTasks()[0];
    const firstAction = exampleTask.actions[0];
    const secondAction = exampleTask.actions[1];
    const firstTaskAction = { task: exampleTask, action: firstAction };
    const secondTaskAction = { task: exampleTask, action: secondAction };
    it('should handle an action', () => {
      // need to spy on the router and set up the task action
      spyOnProperty(mockRouter, 'url', 'get').and.returnValue(`/tasks/list`);
      const navigateCallsBefore = mockRouter.navigateCalls.length;

      // need to check that navigate has been called
      component.onActionHandler(firstTaskAction);
      expect(mockRouter.navigateCalls.length).toBeGreaterThan(navigateCallsBefore);

      // need to verify correct properties were called
      const lastNavigateCall = mockRouter.navigateCalls.pop();
      expect(lastNavigateCall.commands).toEqual([`/tasks/${exampleTask.id}/${firstAction.id}/`]);
      const exampleNavigateCall = { state: { returnUrl: '/tasks/list' } };
      expect(lastNavigateCall.extras).toEqual(exampleNavigateCall);
    });

    it('should handle an action returned via the task manager page', () => {
      // need to spy on the router and set up the task action
      spyOnProperty(mockRouter, 'url', 'get').and.returnValue(`/tasks/manager`);
      const navigateCallsBefore = mockRouter.navigateCalls.length;

      // need to check that navigate has been called
      component.onActionHandler(secondTaskAction);
      expect(mockRouter.navigateCalls.length).toBeGreaterThan(navigateCallsBefore);

      // need to verify correct properties were called
      const lastNavigateCall = mockRouter.navigateCalls.pop();
      expect(lastNavigateCall.commands).toEqual([`/tasks/${exampleTask.id}/${secondAction.id}/`]);
      const exampleNavigateCall = { state: { returnUrl: '/tasks/manager' } };
      expect(lastNavigateCall.extras).toEqual(exampleNavigateCall);
    });



    it('should handle an action returned via the task manager page', () => {
      // need to spy on the router and set up the task action
      spyOnProperty(mockRouter, 'url', 'get').and.returnValue(`/tasks/manager`);
      const navigateCallsBefore = mockRouter.navigateCalls.length;

      // need to check that navigate has been called
      component.onActionHandler(secondTaskAction);
      expect(mockRouter.navigateCalls.length).toBeGreaterThan(navigateCallsBefore);

      // need to verify correct properties were called
      const lastNavigateCall = mockRouter.navigateCalls.pop();
      expect(lastNavigateCall.commands).toEqual([`/tasks/${exampleTask.id}/${secondAction.id}/`]);
      const exampleNavigateCall = { state: { returnUrl: '/tasks/manager' } };
      expect(lastNavigateCall.extras).toEqual(exampleNavigateCall);
    });


  });
});



describe('TaskListWrapperComponent searchWithPagination', () => {
  let component: TaskListWrapperComponent;
  let fixture: ComponentFixture<TaskListWrapperComponent>;
  const mockRef = jasmine.createSpyObj('mockRef', ['']);
  const mockRouter: MockRouter = new MockRouter();
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['searchTask', 'getTask', 'searchTaskWithPagination']);

  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('mockFeatureToggleService', ['isEnabled']);
  let router: Router;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        WorkAllocationComponentsModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        CdkTableModule,
        PaginationModule
      ],
      declarations: [TaskListComponent, TaskListWrapperComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: mockRef },
        { provide: WorkAllocationTaskService, useValue: mockWorkAllocationService },
        { provide: Router, useValue: mockRouter },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TaskListWrapperComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    const tasks: Task[] = [];
    for (let i = 0; i < 25; i++) {
      tasks.push(getMockTasks()[0]);
    }
    mockWorkAllocationService.searchTaskWithPagination.and.returnValue(of({ tasks, total_records: 500 }));
    mockFeatureToggleService.isEnabled.and.returnValue(of(true));
    component.pagination = {
      page_number: 1,
      page_size: 25
    };
    component.isPaginationEnabled$ = of(true);

    fixture.detectChanges();
  }));

  describe('onActionHandler()', () => {
    const exampleTask = getMockTasks()[0];
    const firstAction = exampleTask.actions[0];
    const secondAction = exampleTask.actions[1];

    [
      { statusCode: 401, routeUrl: '/not-authorised' },
      { statusCode: 403, routeUrl: '/not-authorised' },
      { statusCode: 500, routeUrl: '/service-down' },
      { statusCode: 400, routeUrl: '/service-down' },
    ].forEach(scr => {
      it(`pagination search error response on load ${scr.statusCode }`, () => {
        mockWorkAllocationService.searchTaskWithPagination.and.returnValue(throwError({ status: scr.statusCode }));
        const navigateSpy = spyOn(router, 'navigate');
        component.onPaginationHandler(1);
        // need to verify correct properties were called
        expect(mockWorkAllocationService.searchTaskWithPagination).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith([scr.routeUrl]);

      });
    });

    [
      { statusCode: 401, routeUrl: '/not-authorised' },
      { statusCode: 403, routeUrl: '/not-authorised' },
      { statusCode: 500, routeUrl: '/service-down' },
      { statusCode: 400, routeUrl: '/service-down' },
    ].forEach(scr => {
      it(`pagination search error response on pagination link click ${scr.statusCode}`, () => {
        const pageLinkElement = fixture.nativeElement.querySelector('pagination-template li a');

        mockWorkAllocationService.searchTaskWithPagination.and.returnValue(throwError({ status: scr.statusCode }));
        const navigateSpy = spyOn(router, 'navigate');
        pageLinkElement.click();
        // component.onPaginationHandler(1);
        // need to verify correct properties were called
        expect(mockWorkAllocationService.searchTaskWithPagination).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith([scr.routeUrl]);

      });
    });

  });
});
