import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { Observable, of, throwError } from 'rxjs';
import { PersonRole } from '../../../../api/workAllocation2/interfaces/person';
import { TaskActionConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { InfoMessage, InfoMessageType, TaskActionType } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { getMockTasks } from '../../tests/utils.spec';
import { REDIRECTS } from '../../utils';
import { TaskAssignmentConfirmComponent } from './task-assignment-confirm.component';

@Component({
  template: `<exui-task-assignment-confirm></exui-task-assignment-confirm>`
})
class WrapperComponent {
  @ViewChild(TaskAssignmentConfirmComponent) public appComponentRef: TaskAssignmentConfirmComponent;
}

describe('TaskAssignmentConfirmComponent', () => {
  let component: TaskAssignmentConfirmComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let router: Router;
  const SELECTED_PERSON = {
    id: 'id123',
    name: 'John Smith',
    email: 'john.smith@email.com',
    domain: PersonRole.CASEWORKER
  };
  const mockTasks = getMockTasks();
  // Provide a fake implementation of assignTask(), which returns different responses based on the task ID
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['assignTask']);
  mockTaskService.assignTask.and.callFake((taskId: any) => {
    switch (taskId) {
      // For testing recognised error status 401
      case '401':
        // Doesn't work with just `throwError({ status: 401 })`; need to "return the return"
        return throwError({ status: 401 });
      // For testing recognised error status 500
      case '500':
        return throwError({ status: 500 });
      // For testing unrecognised error status
      case '999':
        return throwError({ status: 999 });
      // For testing success case
      default:
        return of(null);
    }
  });
  let mockInfoMessageCommService: jasmine.SpyObj<InfoMessageCommService>;

  beforeEach(() => {
    mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['nextMessage']);
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule,
        ExuiCommonLibModule
      ],
      declarations: [TaskAssignmentConfirmComponent, WrapperComponent],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
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
        { provide: Router, useValue: { url: 'localhost/test', navigate: (_1: any, _2: any) => {} } },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.verb = TaskActionType.Reassign;
    router = TestBed.get(Router);
    window.history.pushState({ selectedPerson: SELECTED_PERSON}, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    component.selectedPerson = {
      id: 'id123',
      name: 'John Smith',
      email: 'john.smith@email.com',
      domain: '2'
    };
    expect(component).toBeDefined();
    const titleElement = fixture.debugElement.nativeElement.querySelector('.govuk-heading-l');
    expect(titleElement.textContent).toContain('Check your answers');
  });

  it('should display the correct verb', () => {
    component.verb = TaskActionType.Reassign;
    component.selectedPerson = {
      id: 'id123',
      name: 'John Smith',
      email: 'john.smith@email.com',
      domain: '2'
    };
    fixture.detectChanges();

    const titleElement = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(titleElement.textContent).toContain(TaskActionType.Reassign);
    const hintElement = fixture.debugElement.nativeElement.querySelector('.govuk-hint');
    expect(hintElement.textContent).toContain(TaskActionType.Reassign.toLowerCase());
    const buttonElement = fixture.debugElement.nativeElement.querySelector('.govuk-button');
    expect(buttonElement.textContent).toContain(TaskActionType.Reassign);
  });

  it('should go back to the "Find the person" page on clicking "Change", displaying the correct verb', () => {
    component.verb = TaskActionType.Assign;
    fixture.detectChanges();
    const navigateSpy = spyOn(router, 'navigate');
    component.onChange();
    expect(navigateSpy).toHaveBeenCalled();
    // Check the third part of the URL passed to router.navigate() is "assign"
    expect(navigateSpy.calls.argsFor(0)[0][2]).toEqual(TaskActionType.Assign.toLowerCase());
  });

  it('should redirect to the "All work" page on cancelling task assignment', () => {
    window.history.pushState({ returnUrl: 'all-work/tasks', showAssigneeColumn: false }, '', 'all-work/tasks');
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['all-work/tasks']);
  });

  it('should redirect to the fallback URL (\'\') on cancelling task assignment, if the return URL is not in the history', () => {
    window.history.pushState({}, '');
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should return to the "All work" page on successful task assignment', () => {
    window.history.pushState({ returnUrl: 'all-work/tasks', showAssigneeColumn: false }, '', 'all-work/tasks');
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit();
    expect(mockTaskService.assignTask).toHaveBeenCalledWith('task1111111', { userId: undefined });
    expect(navigateSpy).toHaveBeenCalledWith(['all-work/tasks'], {
      state: {
        badRequest: false,
        retainMessages: true
      }
    });
  });

  it('should set the correct confirmation message on successful task assignment', () => {
    component.verb = TaskActionType.Assign;
    fixture.detectChanges();
    const message = {
      type: InfoMessageType.SUCCESS,
      message: InfoMessage.ASSIGNED_TASK
    } as InformationMessage;
    component.onSubmit();
    expect(mockInfoMessageCommService.nextMessage).toHaveBeenCalledWith(message);
  });

  it('should return to the "My work" page on successful task reassignment', () => {
    window.history.pushState({ returnUrl: 'my-work/list', showAssigneeColumn: false }, '', 'my-work/list');
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit();
    expect(mockTaskService.assignTask).toHaveBeenCalledWith('task1111111', { userId: undefined });
    expect(navigateSpy).toHaveBeenCalledWith(['my-work/list'], {
      state: {
        badRequest: false,
        retainMessages: true
      }
    });
  });

  it('should set the correct confirmation message on successful task reassignment', () => {
    component.verb = TaskActionType.Reassign;
    fixture.detectChanges();
    const message = {
      type: InfoMessageType.SUCCESS,
      message: InfoMessage.REASSIGNED_TASK
    } as InformationMessage;
    component.onSubmit();
    expect(mockInfoMessageCommService.nextMessage).toHaveBeenCalledWith(message);
  });

  it('should handle an HTTP 401 error on submission', () => {
    // Set dummy task ID to trigger an error response from the fake assignTask() method
    component.taskId = '401';
    fixture.detectChanges();
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit();
    expect(mockInfoMessageCommService.nextMessage).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);
  });

  it('should handle an HTTP 500 error on submission', () => {
    // Set dummy task ID to trigger an error response from the fake assignTask() method
    component.taskId = '500';
    fixture.detectChanges();
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit();
    expect(mockInfoMessageCommService.nextMessage).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith([REDIRECTS.ServiceDown]);
  });

  it('should handle an unknown error on submission', () => {
    // Set dummy task ID to trigger an error response from the fake assignTask() method
    component.taskId = '999';
    fixture.detectChanges();
    const message = {
      type: InfoMessageType.WARNING,
      message: InfoMessage.TASK_NO_LONGER_AVAILABLE
    } as InformationMessage;
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit();
    expect(mockInfoMessageCommService.nextMessage).toHaveBeenCalledWith(message);
    expect(navigateSpy).toHaveBeenCalledWith([''], {
      state: {
        badRequest: true,
        retainMessages: true
      }
    });
  });
});
