import { CdkTableModule } from '@angular/cdk/table';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { of, throwError } from 'rxjs';
import { PersonRole } from '../../../../api/workAllocation/interfaces/person';
import { InfoMessage } from '../../../app/shared/enums/info-message';
import { InfoMessageType } from '../../../app/shared/enums/info-message-type';
import { InformationMessage } from '../../../app/shared/models';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { TaskActionConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { TaskActionType } from '../../enums';
import { WorkAllocationTaskService } from '../../services';
import { getMockTasks } from '../../tests/utils.spec';
import { REDIRECTS } from '../../utils';
import { TaskAssignmentConfirmComponent } from './task-assignment-confirm.component';

@Component({
  template: `
    <exui-task-assignment-confirm></exui-task-assignment-confirm>`
})
class WrapperComponent {
  @ViewChild(TaskAssignmentConfirmComponent, { static: true }) public appComponentRef: TaskAssignmentConfirmComponent;
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
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
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
  let mockRouter: any;

  beforeEach(() => {
    mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['nextMessage']);
    mockRouter = jasmine.createSpyObj('mockRouter', ['getCurrentNavigation', 'navigate']);
    const navigation = {
      extras: {
        state: {
          selectedPerson: SELECTED_PERSON
        }
      }
    };
    mockRouter.getCurrentNavigation.and.returnValue(navigation);
    mockRouter.url = 'localhost/test';
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
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
                taskAndCaseworkers: {
                  task: { task: mockTasks[0] }, caseworkers: []
                },
                ...TaskActionConstants.Reassign
              },
              params: {
                taskId: 'task1111111'
              }
            },
            params: of({ task: mockTasks[0] }),
            paramMap: of({ selectedPerson: SELECTED_PERSON })
          }
        },
        {
          provide: Router, useValue: mockRouter
        },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: SessionStorageService, useValue: mockSessionStorageService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.verb = TaskActionType.Reassign;
    router = TestBed.inject(Router);
    window.history.pushState({ selectedPerson: SELECTED_PERSON }, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
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
    window.history.pushState({ returnUrl: 'all-work/tasks', showAssigneeColumn: false }, '', 'all-work/tasks');
    component.verb = TaskActionType.Assign;
    fixture.detectChanges();
    component.onChange();
    expect(router.navigate).toHaveBeenCalledWith(['test', 'task1111111', 'assign'], {
      state: {
        returnUrl: 'all-work/tasks',
        person: SELECTED_PERSON
      },
      queryParams: {
        roleCategory: undefined,
        service: 'IA'
      }
    });
  });

  it('should redirect to the "All work" page on cancelling task assignment', () => {
    window.history.pushState({ returnUrl: 'all-work/tasks', showAssigneeColumn: false }, '', 'all-work/tasks');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['all-work/tasks']);
  });

  it('should redirect to the fallback URL (\'\') on cancelling task assignment, if the return URL is not in the history', () => {
    window.history.pushState({}, '');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should return to the "All work" page on successful task assignment', () => {
    window.history.pushState({ returnUrl: 'all-work/tasks', showAssigneeColumn: false }, '', 'all-work/tasks');
    component.onSubmit();
    expect(mockTaskService.assignTask).toHaveBeenCalledWith('task1111111', { userId: 'id123' });
    expect(router.navigate).toHaveBeenCalledWith(['all-work/tasks'], {
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

  it('should return the correct message/state for case', () => {
    window.history.pushState({ returnUrl: 'case/case-details', showAssigneeColumn: false }, '', 'case/case-details');
    const message = {
      type: InfoMessageType.SUCCESS,
      message: InfoMessage.REASSIGNED_TASK
    } as InformationMessage;
    component.onSubmit();
    expect(mockInfoMessageCommService.nextMessage).not.toHaveBeenCalledWith(message);
    expect(router.navigate).toHaveBeenCalledWith(['case/case-details'], {
      state: {
        showMessage: true,
        messageText: InfoMessage.REASSIGNED_TASK,
        retainMessages: true
      }
    });
  });

  it('should return to the "My work" page on successful task reassignment', () => {
    window.history.pushState({ returnUrl: 'my-work/list', showAssigneeColumn: false }, '', 'my-work/list');
    component.onSubmit();
    expect(mockTaskService.assignTask).toHaveBeenCalledWith('task1111111', { userId: 'id123' });
    expect(router.navigate).toHaveBeenCalledWith(['my-work/list'], {
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
    component.onSubmit();
    expect(mockInfoMessageCommService.nextMessage).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);
  });

  it('should handle an HTTP 500 error on submission', () => {
    // Set dummy task ID to trigger an error response from the fake assignTask() method
    component.taskId = '500';
    fixture.detectChanges();
    component.onSubmit();
    expect(mockInfoMessageCommService.nextMessage).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([REDIRECTS.ServiceDown]);
  });

  it('should handle an unknown error on submission', () => {
    // Set dummy task ID to trigger an error response from the fake assignTask() method
    component.taskId = '999';
    fixture.detectChanges();
    const message = {
      type: InfoMessageType.WARNING,
      message: InfoMessage.TASK_NO_LONGER_AVAILABLE
    } as InformationMessage;
    component.onSubmit();
    expect(mockInfoMessageCommService.nextMessage).toHaveBeenCalledWith(message);
    expect(router.navigate).toHaveBeenCalledWith([''], {
      state: {
        badRequest: true,
        retainMessages: true
      }
    });
  });
});

['caseworker-ia-iacjudge', 'caseworker-ia-caseofficer'].forEach((role) => {
  describe(`TaskAssignmentConfirmComponent by userType role ${role}`, () => {
    let component: TaskAssignmentConfirmComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const mockRouter = jasmine.createSpyObj('mockRouter', ['getCurrentNavigation', 'navigate']);

    const mockSessionStorageService = {
      getItem: jasmine.createSpy('getItem').and.returnValue(JSON.stringify({
        roles: [role]
      }))
    };

    const navigation = {
      extras: {
        state: {
          selectedPerson: SELECTED_PERSON
        }
      }
    };
    mockRouter.getCurrentNavigation.and.returnValue(navigation);

    let mockInfoMessageCommService: jasmine.SpyObj<InfoMessageCommService>;

    beforeEach(() => {
      mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['nextMessage']);
      TestBed.configureTestingModule({
        imports: [
          CdkTableModule,
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
                  taskAndCaseworkers: { task: { task: mockTasks[0] }, caseworkers: [] },
                  ...TaskActionConstants.Reassign
                },
                params: {
                  taskId: 'task1111111'
                }
              },
              params: of({ task: mockTasks[0] }),
              paramMap: of({ selectedPerson: SELECTED_PERSON })
            }
          },
          {
            provide: Router, useValue: mockRouter
          },
          { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
          { provide: SessionStorageService, useValue: mockSessionStorageService }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      component.verb = TaskActionType.Reassign;
      router = TestBed.inject(Router);
      window.history.pushState({ selectedPerson: SELECTED_PERSON }, '', '');
      fixture.detectChanges();
    });

    it('configured fields for judicial', () => {
      const headers = fixture.debugElement.queryAll(By.css('th'));
      fixture.detectChanges();
      const fieldLabels = headers.map((header) => header.nativeElement.textContent);
      if (role === 'caseworker-ia-iacjudge') {
        expect(fieldLabels).toContain('Task created');
        expect(fieldLabels).not.toContain('Due date');
        expect(fieldLabels).not.toContain('Priority');
      } else {
        expect(fieldLabels).not.toContain('Task created');
        expect(fieldLabels).toContain('Due date');
        expect(fieldLabels).toContain('Priority');
      }
    });
  });
});
