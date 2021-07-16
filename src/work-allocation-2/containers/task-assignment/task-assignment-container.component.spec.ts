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
import { TaskListComponent } from '..';
import { PersonDomain } from '../../../../api/workAllocation2/interfaces/person';
import { ErrorMessageComponent } from '../../../app/components';
import { TaskActionConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { TaskActionType } from '../../enums';
import { Task } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { FindAPersonService } from '../../services/find-person.service';
import { getMockTasks } from '../../tests/utils.spec';
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
        ErrorMessageComponent, NothingComponent
      ],
      imports: [
        WorkAllocationComponentsModule, CdkTableModule, FormsModule, HttpClientModule, ExuiCommonLibModule, PaginationModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'my-work/list', component: NothingComponent }
          ]
        )
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
            paramMap: Observable.of({ selectedPerson: SELECTED_PERSON })
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
    window.history.pushState({ returnUrl: 'my-work/list', showAssigneeColumn: false }, '', 'my-work/list');

    // Deliberately defer fixture.detectChanges() call to each test, to allow overriding the ActivatedRoute snapshot
    // data with a different verb ("Assign")
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should re-direct to assign task confirmation page', () => {
    const mockRouter = jasmine.createSpyObj('router', ['navigate']);
    const compo = new TaskAssignmentContainerComponent(null, mockRouter);
    const findPersonControl = new FormControl('test');
    compo.formGroup.addControl('findPersonControl', findPersonControl);
    compo.verb = TaskActionType.Reassign;
    compo.assign();
    expect(mockRouter.navigate).toHaveBeenCalled();
    // Check the third part of the URL passed to router.navigate() is "reassign"
    expect(mockRouter.navigate.calls.argsFor(0)[0][2]).toEqual(TaskActionType.Reassign.toLowerCase());
    // Check the fourth part of the URL passed to router.navigate() is "confirm"
    expect(mockRouter.navigate.calls.argsFor(0)[0][3]).toEqual('confirm');
  });

  it('should not re-direct to assign task confirmation page and throw form group error', () => {
    const mockRouter = jasmine.createSpyObj('router', ['navigate']);
    const compo = new TaskAssignmentContainerComponent(null, mockRouter);
    const findPersonControl = new FormControl('');
    compo.formGroup.addControl('findPersonControl', findPersonControl);
    compo.verb = TaskActionType.Reassign;
    compo.assign();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(compo.formGroup.valid).toBeFalsy();
  });

  it('should redirect to the "All work" page on cancelling task assignment', () => {
    window.history.pushState({ returnUrl: 'all-work/tasks#manage_0d22d838', showAssigneeColumn: false }, '',
      'all-work/tasks#manage_0d22d838');
    const mockRouter = jasmine.createSpyObj('router', ['navigate']);
    const tacComponent = new TaskAssignmentContainerComponent(null, mockRouter);
    const findPersonControl = new FormControl('test');
    tacComponent.formGroup.addControl('findPersonControl', findPersonControl);
    tacComponent.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['all-work/tasks']);
  });

  it('should redirect to the fallback URL on cancelling task assignment, if the return URL is not in the history', () => {
    window.history.pushState({}, '');
    const mockRouter = jasmine.createSpyObj('router', ['navigate']);
    const tacComponent = new TaskAssignmentContainerComponent(null, mockRouter);
    const findPersonControl = new FormControl('test');
    tacComponent.formGroup.addControl('findPersonControl', findPersonControl);
    tacComponent.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/work/my-work/list']);
  });

  it('should display the correct verb on screen', () => {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.snapshot.data = {
      taskAndCaseworkers: { data: mockTasks[0], caseworkers: [] },
      ...TaskActionConstants.Assign
    };
    fixture.detectChanges();
    const mockRouter = jasmine.createSpyObj('router', ['navigate']);
    const tacComponent = new TaskAssignmentContainerComponent(null, mockRouter);
    const findPersonControl = new FormControl('test');
    tacComponent.formGroup.addControl('findPersonControl', findPersonControl);
    const titleElement = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(titleElement.textContent).toContain(TaskActionType.Assign);
  });
});
