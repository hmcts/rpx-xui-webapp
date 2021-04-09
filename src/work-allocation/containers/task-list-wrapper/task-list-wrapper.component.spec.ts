import { CdkTableModule } from '@angular/cdk/table';
import { ChangeDetectorRef} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { SessionStorageService } from 'src/app/services';
import { WorkAllocationComponentsModule } from 'src/work-allocation/components/work-allocation.components.module';
import { Task } from 'src/work-allocation/models/tasks';
import { InfoMessageCommService, WorkAllocationFeatureService, WorkAllocationTaskService } from 'src/work-allocation/services';
import { getMockTasks, MockRouter } from 'src/work-allocation/tests/utils.spec';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskListWrapperComponent } from './task-list-wrapper.component';

describe('TaskListWrapperComponent', () => {
  let component: TaskListWrapperComponent;
  let fixture: ComponentFixture<TaskListWrapperComponent>;
  const mockRef = jasmine.createSpyObj('mockRef', ['']);
  const mockRouter: MockRouter = new MockRouter();
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['searchTask', 'getTask']);
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        WorkAllocationComponentsModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        CdkTableModule
      ],
      declarations: [TaskListComponent, TaskListWrapperComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: mockRef },
        { provide: WorkAllocationTaskService, useValue: mockWorkAllocationService },
        { provide: Router, useValue: mockRouter },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: WorkAllocationFeatureService, useValue: mockFeatureService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TaskListWrapperComponent);
    component = fixture.componentInstance;
    const tasks: Task[] = getMockTasks();
    mockWorkAllocationService.searchTask.and.returnValue(of({ tasks }));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease1'));
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
      const exampleNavigateCall = { state: { returnUrl: '/tasks/list', showAssigneeColumn: true } };
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
      const exampleNavigateCall = { state: { returnUrl: '/tasks/manager', showAssigneeColumn: true } };
      expect(lastNavigateCall.extras).toEqual(exampleNavigateCall);
    });
  });
});
