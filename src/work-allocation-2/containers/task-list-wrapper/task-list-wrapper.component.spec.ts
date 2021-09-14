import { CdkTableModule } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService, FilterService} from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { CaseworkerDataService } from '../../services';

import { TaskListComponent } from '..';
import { SessionStorageService } from '../../../app/services';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Task } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationFeatureService, WorkAllocationTaskService } from '../../services';
import { getMockTasks, MockRouter } from '../../tests/utils.spec';
import { TaskListWrapperComponent } from './task-list-wrapper.component';

describe('TaskListWrapperComponent', () => {
  let component: TaskListWrapperComponent;
  let fixture: ComponentFixture<TaskListWrapperComponent>;
  const SELECTED_LOCATIONS = { id: 'locations', fields: [ { name: 'locations', value: ['231596', '698118'] }] };
  const mockRef = jasmine.createSpyObj('mockRef', ['']);
  const mockRouter: MockRouter = new MockRouter();
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['searchTaskWithPagination', 'getTask']);
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('mockLoadingService', ['isEnabled']);
  const mockCaseworkerDataService = jasmine.createSpyObj('mockCaseworkerDataService', ['getAll']);
  const mockFilterService: any = {
    getStream: () => of(null),
    get: () => SELECTED_LOCATIONS,
    persist: (setting, persistence) => null,
    givenErrors: {
      subscribe: () => null,
      next: () => null,
      unsubscribe: () => null
    }
  };
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
        { provide: WorkAllocationFeatureService, useValue: mockFeatureService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService },
        { provide: FilterService, useValue: mockFilterService },
        { provide: CaseworkerDataService, useValue: mockCaseworkerDataService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TaskListWrapperComponent);
    component = fixture.componentInstance;
    const tasks: Task[] = getMockTasks();
    mockWorkAllocationService.searchTaskWithPagination.and.returnValue(of({ tasks }));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    mockCaseworkerDataService.getAll.and.returnValue(of([]));
    fixture.detectChanges();
  }));

  afterEach((() => {
    component.ngOnDestroy();
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
      spyOnProperty(mockRouter, 'url', 'get').and.returnValue(`/mywork/list`);
      const navigateCallsBefore = mockRouter.navigateCalls.length;

      // need to check that navigate has been called
      component.onActionHandler(firstTaskAction);
      expect(mockRouter.navigateCalls.length).toBeGreaterThan(navigateCallsBefore);

      // need to verify correct properties were called
      const lastNavigateCall = mockRouter.navigateCalls.pop();
      expect(lastNavigateCall.commands).toEqual([`/work/${exampleTask.id}/${firstAction.id}/`]);
      const exampleNavigateCall = { state: { returnUrl: '/mywork/list', showAssigneeColumn: true } };
      expect(lastNavigateCall.extras).toEqual(exampleNavigateCall);
    });

    it('should handle an action returned via the task manager page', () => {
      // need to spy on the router and set up the task action
      spyOnProperty(mockRouter, 'url', 'get').and.returnValue(`/mywork/manager`);
      const navigateCallsBefore = mockRouter.navigateCalls.length;

      // need to check that navigate has been called
      component.onActionHandler(secondTaskAction);
      expect(mockRouter.navigateCalls.length).toBeGreaterThan(navigateCallsBefore);

      // need to verify correct properties were called
      const lastNavigateCall = mockRouter.navigateCalls.pop();
      expect(lastNavigateCall.commands).toEqual([`/work/${exampleTask.id}/${secondAction.id}/`]);
      const exampleNavigateCall = { state: { returnUrl: '/mywork/manager', showAssigneeColumn: true } };
      expect(lastNavigateCall.extras).toEqual(exampleNavigateCall);
    });
    it('User should be Judicial', () => {
      mockSessionStorageService.getItem.and.returnValue('{\"sub\":\"juser8@mailinator.com\",\"uid\":\"44d5d2c2-7112-4bef-8d05-baaa610bf463\",\"roles\":[\"caseworker\",\"caseworker-ia\",\"caseworker-ia-iacjudge\"],\"name\":\"XUI test Judge\",\"given_name\":\"XUI test\",\"family_name\":\"Judge\",\"token\":\"\"}');
      const isJudicial = component.isCurrentUserJudicial();
      expect(isJudicial).toBeTruthy();
    });
    it('User should not be Judicial', () => {
      mockSessionStorageService.getItem.and.returnValue('{\"sub\":\"juser8@mailinator.com\",\"uid\":\"44d5d2c2-7112-4bef-8d05-baaa610bf463\",\"roles\":[\"caseworker\",\"caseworker-ia\"],\"name\":\"XUI test Judge\",\"given_name\":\"XUI test\",\"family_name\":\"Judge\",\"token\":\"\"}');
      const isJudicial = component.isCurrentUserJudicial();
      expect(isJudicial).toBeFalsy();
    });
  });

  describe('onPaginationHandler()', () => {
    it('should handle pagination', () => {
      component.pagination = {page_number: 1, page_size: 25};
      fixture.detectChanges();
      // need to check that pagination has been performed
      component.onPaginationHandler(2);
      expect(component.pagination.page_number).toBe(2);
      expect(mockSessionStorageService.getItem).toHaveBeenCalledWith('pageSessionKey');
    });
  });
});
