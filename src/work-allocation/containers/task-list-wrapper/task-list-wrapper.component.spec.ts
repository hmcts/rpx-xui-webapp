import { CdkTableModule } from '@angular/cdk/table';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { Observable, of } from 'rxjs';
import { SessionStorageService } from 'src/app/services';
import { WorkAllocationComponentsModule } from 'src/work-allocation/components/work-allocation.components.module';
import { Task } from 'src/work-allocation/models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from 'src/work-allocation/services';
import { getMockTasks } from 'src/work-allocation/tests/utils.spec';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskListWrapperComponent } from './task-list-wrapper.component';

fdescribe('TaskListWrapperComponent', () => {
  let component: TaskListWrapperComponent;
  let fixture: ComponentFixture<TaskListWrapperComponent>;
  const mockRef = jasmine.createSpyObj('mockRef', ['']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['searchTask', 'getTask']);
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['']);
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
        { provide: AlertService, useValue: mockAlertService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TaskListWrapperComponent);
    component = fixture.componentInstance;
    const tasks: Task[] = getMockTasks();
    mockWorkAllocationService.searchTask.and.returnValue(of({ tasks }));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  /* it('should handle an action', () => {
    const exampleTask = getMockTasks()[0];
    const exampleAction = exampleTask.actions[0];
    const exampleTaskAction = { task: exampleTask, action: exampleAction };
    component.onActionHandler(exampleTaskAction);
  }); */
});
