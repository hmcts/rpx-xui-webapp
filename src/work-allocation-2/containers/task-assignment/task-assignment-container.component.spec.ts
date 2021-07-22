import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { FindPersonModule } from '../../../work-allocation-2/find-person.module';
import { TaskListComponent } from '..';
import { PersonDomain } from '../../../../api/workAllocation2/interfaces/person';
import { ErrorMessageComponent } from '../../../app/components';
import { TaskFieldConfig } from '../../../work-allocation/models/tasks';
import { TaskActionConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Task } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { FindAPersonService } from '../../services/find-person.service';
import { getMockCaseworkers, getMockTasks } from '../../tests/utils.spec';
import {
  TaskAssignmentContainerComponent,
} from './task-assignment-container.component';

@Component({
  template: `<exui-task-container-assignment></exui-task-container-assignment>`
})
class WrapperComponent {
  @ViewChild(TaskAssignmentContainerComponent) public appComponentRef: TaskAssignmentContainerComponent;
  @Input() public tasks: Task[];
}

@Component({
  template: `<div>Nothing</div>`
})
class NothingComponent { }

@Component({
  selector: 'exui-task-field',
  template: '<div class="xui-task-field">{{task.taskName}}</div>'
})
class TaskFieldComponent {
  @Input() public config: TaskFieldConfig;
  @Input() public task: Task;
}

describe('TaskAssignmentContainerComponent', () => {
  let component: TaskAssignmentContainerComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const SELECTED_PERSON = {
    id: 'id123',
    name: 'John Smith',
    email: 'john.smith@email.com',
    domain: PersonDomain.CASEWORKER
  };
  const mockTasks = getMockTasks();
  const mockCaseworkers = getMockCaseworkers();
  const mockWorkAllocationService = {
    assignTask: jasmine.createSpy('assignTask').and.returnValue(Observable.of({}))
  };
  const mockFindPersonService = {
    findPersonService: jasmine.createSpy('find').and.returnValue(Observable.of({}))
  };
  const MESSAGE_SERVICE_METHODS = ['addMessage', 'emitMessages', 'getMessages', 'nextMessage', 'removeAllMessages'];
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', MESSAGE_SERVICE_METHODS);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskAssignmentContainerComponent, WrapperComponent, TaskListComponent,
        ErrorMessageComponent, NothingComponent, TaskFieldComponent
      ],
      imports: [
        WorkAllocationComponentsModule, CdkTableModule, FormsModule, HttpClientModule, ExuiCommonLibModule, PaginationModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'mywork/list', component: NothingComponent }
          ]
        ),
        FindPersonModule
      ],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockWorkAllocationService },
        { provide: FindAPersonService, useValue: mockFindPersonService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                taskAndCaseworkers: { data: mockTasks[0], caseworkers: [] },
                ...TaskActionConstants.Reassign
              },
              params: {
                taskId: 'task1111111'
              }
            },
            params: Observable.of({ task: mockTasks[0] }),
            paramMap: Observable.of({ selectedPerson: SELECTED_PERSON})
          }
        },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: Router, useValue: { url: 'localhost/test' } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;

    wrapper.tasks = null;
    window.history.pushState({ returnUrl: 'mywork/list', showAssigneeColumn: false }, '', 'mywork/list');
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should re-direct to assign task confirmation page', () => {
    const mockRouter = jasmine.createSpyObj('router', ['navigate']);
    const compo = new TaskAssignmentContainerComponent(null, null, mockRouter, null);
    const findPersonControl = new FormControl('test');
    compo.formGroup.addControl('findPersonControl', findPersonControl);
    compo.assign();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should not re-direct to assign task confirmation page and throw form group error', () => {
    const mockRouter = jasmine.createSpyObj('router', ['navigate']);
    const compo = new TaskAssignmentContainerComponent(null, null, mockRouter, null);
    const findPersonControl = new FormControl('');
    compo.formGroup.addControl('findPersonControl', findPersonControl);
    compo.assign();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(compo.formGroup.valid).toBeFalsy();
  });
});
