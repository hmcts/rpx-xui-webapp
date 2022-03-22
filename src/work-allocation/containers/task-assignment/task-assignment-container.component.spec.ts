import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { ErrorMessageComponent } from '../../../app/components';
import { TaskActionConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { TaskListComponent } from '../../containers';
import {
  NAME_ERROR,
  TaskAssignmentContainerComponent
} from '../../containers/task-assignment/task-assignment-container.component';
import { Assignee } from '../../models/dtos';
import { Task } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { getMockCaseworkers, getMockTasks } from '../../tests/utils.spec';

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
class NothingComponent {}

describe('TaskAssignmentContainerComponent1', () => {
  let component: TaskAssignmentContainerComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  const mockTasks = getMockTasks();
  const mockCaseworkers = getMockCaseworkers();
  const mockWorkAllocationService = {
    assignTask: jasmine.createSpy('assignTask').and.returnValue(Observable.of({}))
  };
  const MESSAGE_SERVICE_METHODS = ['addMessage', 'emitMessages', 'getMessages', 'nextMessage', 'removeAllMessages'];
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', MESSAGE_SERVICE_METHODS);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskAssignmentContainerComponent, WrapperComponent, TaskListComponent, NothingComponent, ErrorMessageComponent,
      ],
      imports: [
        WorkAllocationComponentsModule, CdkTableModule, FormsModule, HttpClientTestingModule, PaginationModule, MatAutocompleteModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'tasks/list', component: NothingComponent }
          ]
        )
      ],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockWorkAllocationService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                taskAndCaseworkers: { task: { task: mockTasks[0] }, caseworkers: [] },
                ...TaskActionConstants.Reassign
              }
            },
            params: Observable.of({ task: mockTasks[0] })
          }
        },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;

    wrapper.tasks = null;
    window.history.pushState({ returnUrl: 'tasks/list' }, '', 'tasks/list');
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should allow changing the caseworker', () => {
    expect(component.caseworker).toBe(undefined);
    component.onCaseworkerChanged(mockCaseworkers[0]);
    fixture.detectChanges();
    expect(component.caseworker).toBe(mockCaseworkers[0]);

    component.onCaseworkerChanged(mockCaseworkers[1]);
    fixture.detectChanges();
    expect(component.caseworker).toBe(mockCaseworkers[1]);

    component.onCaseworkerChanged(null);
    fixture.detectChanges();
    expect(component.caseworker).toBe(null);
  });

  it('should send an error message when a caseworker is not selected and there is an attempt to assign', () => {
    expect(component.caseworker).toBeUndefined();
    expect(component.error).toBeNull();


    component.assign();
    fixture.detectChanges();
    expect(component.error).not.toBeNull();
    expect(component.error.title).toEqual(NAME_ERROR.title);
    expect(component.error.description).toEqual(NAME_ERROR.description);
    expect(component.error.fieldId).toEqual(NAME_ERROR.fieldId);

  });

  it('should assign succesfully', () => {
    const caseworker = mockCaseworkers[0];
    component.caseworker = caseworker;
    fixture.detectChanges();

    component.assign();

    fixture.detectChanges();
    const assignee: Assignee = {
      userId: caseworker.idamId
    };
    expect(mockWorkAllocationService.assignTask).toHaveBeenCalledWith(mockTasks[0].id, assignee);
  });

  it('should show assignee column when relevant', () => {
    const router = TestBed.get(Router);
    spyOnProperty(router, 'url', 'get').and.returnValues(`/example-url/assign`, `/example-url/reassign`);
    expect(component.fields.pop().name).not.toBe('assigneeName');
    expect(component.fields.pop().name).toBe('assigneeName');
  });
});
