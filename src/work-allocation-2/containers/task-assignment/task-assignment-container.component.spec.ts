import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';

import { ErrorMessageComponent } from '../../../app/components';
import { TaskActionConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { TaskListComponent } from '../../containers';
import {
  NAME_ERROR,
  TaskAssignmentContainerComponent,
} from '../../containers/task-assignment/task-assignment-container.component';
import { Task } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { getMockTasks } from '../../tests/utils.spec';

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

  const mockTasks = getMockTasks();
  const mockWorkAllocationService = {
    assignTask: jasmine.createSpy('assignTask').and.returnValue(Observable.of({}))
  };

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl').and.returnValue(Observable.of(true))
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
        WorkAllocationComponentsModule, CdkTableModule, FormsModule, HttpClientModule, ExuiCommonLibModule,
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
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;

    wrapper.tasks = null;
    window.history.pushState({ returnUrl: 'tasks/list', showAssigneeColumn: false }, '', 'tasks/list');
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should navigate to the work list page when cancel is clicked', () => {
    const cancelLink = fixture.debugElement.nativeElement.querySelector('#cancel__link');
    cancelLink.click();

    fixture.whenStable().then(() => {
      expect(component.cancel).toHaveBeenCalled();
      expect(mockRouter.navigateByUrl).toHaveBeenCalled();
    });
  });

  it('should show banner error when continue clicked and form is invalid', () => {
    component.formGroup.get('caseworkerName').setValue('');
    component.formGroup.get('caseworkerName').updateValueAndValidity();

    const continueButtonElement = fixture.debugElement.nativeElement.querySelector('#continue__button');
    continueButtonElement.click();

    fixture.whenStable().then(() => {
      const errorSummary: HTMLElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary').nativeElement;

      expect(errorSummary).toBeTruthy();
    });
  });
});
