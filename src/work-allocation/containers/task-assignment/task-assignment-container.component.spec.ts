import { CdkTableModule } from '@angular/cdk/table';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationModule, SessionStorageService } from '@hmcts/ccd-case-ui-toolkit';
import { PersonRole } from '@hmcts/rpx-xui-common-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RpxTranslationService } from 'rpx-xui-translation';
import { of } from 'rxjs';

import { TaskListComponent } from '..';
import { ErrorMessageComponent } from '../../../app/components';
import { AppTestConstants } from '../../../app/app.test-constants.spec';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { TaskActionConstants, ConfigConstants } from '../../components/constants';
import { TaskActionType } from '../../enums';
import { Task } from '../../models/tasks';
import { WorkAllocationTaskService } from '../../services';
import { getMockTasks } from '../../tests/utils.spec';
import { TaskAssignmentContainerComponent } from './task-assignment-container.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: false,

  template: `
    <exui-task-container-assignment></exui-task-container-assignment>`

})
class WrapperComponent {
  @ViewChild(TaskAssignmentContainerComponent, { static: true }) public appComponentRef: TaskAssignmentContainerComponent;
  @Input() public tasks: Task[];
}

@Component({
  standalone: false,

  template: `
    <div>Nothing</div>`

})
class NothingComponent {
}

@Pipe({
  standalone: false,
  name: 'rpxTranslate'
})
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('TaskAssignmentContainerComponent2', () => {
  let component: TaskAssignmentContainerComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const SELECTED_PERSON = {
    id: 'id123',
    name: 'John Smith',
    email: 'john.smith@email.com',
    domain: PersonRole.LEGAL_OPERATIONS
  };
  const locationStub: any = {
    back: jasmine.createSpy('back')
  };
  const mockTasks = getMockTasks();
  const mockRouter = jasmine.createSpyObj('router', ['navigate']);
  const mockWorkAllocationService = {
    assignTask: jasmine.createSpy('assignTask').and.returnValue(of({}))
  };
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);

  const MESSAGE_SERVICE_METHODS = ['addMessage', 'emitMessages', 'getMessages', 'nextMessage', 'removeAllMessages'];
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', MESSAGE_SERVICE_METHODS);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const rpxTranslationServiceStub = () => ({ language: 'en', translate: () => {}, getTranslation: (phrase: string) => phrase });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskAssignmentContainerComponent,
        WrapperComponent,
        TaskListComponent,
        ErrorMessageComponent,
        NothingComponent,
        RpxTranslateMockPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule,
        CdkTableModule,
        FormsModule,
        MatAutocompleteModule,
        EffectsModule.forRoot([]),
        PaginationModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([
          { path: 'my-work/list', component: NothingComponent }
        ])],
      providers: [
        { provide: Location, useValue: locationStub },
        { provide: WorkAllocationTaskService, useValue: mockWorkAllocationService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
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
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: Router, useValue: mockRouter },
        { provide: RpxTranslationService, useFactory: rpxTranslationServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    wrapper.tasks = null;
    window.history.pushState({ returnUrl: 'my-work/list', showAssigneeColumn: false }, '', 'my-work/list');

    // Deliberately defer fixture.detectChanges() call to each test, to allow overriding the ActivatedRoute snapshot
    // data with a different verb ("Assign")
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should re-direct to assign task confirmation page', () => {
    const findPersonControl = new FormControl('test');
    component.formGroup.addControl('findPersonControl', findPersonControl);
    component.verb = TaskActionType.Reassign;

    component.assign();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not re-direct to assign task confirmation page and throw form group error', () => {
    const findPersonControl = new FormControl('');
    component.formGroup.addControl('findPersonControl', findPersonControl);
    component.verb = TaskActionType.Reassign;
    component.assign();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should redirect to the "All work" page on cancelling task assignment', () => {
    window.history.pushState({ returnUrl: 'all-work/tasks#manage_0d22d838', showAssigneeColumn: false }, '',
      'all-work/tasks#manage_0d22d838');
    const findPersonControl = new FormControl('test');
    component.formGroup.addControl('findPersonControl', findPersonControl);
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['all-work/tasks']);
  });

  it('should redirect to the fallback URL (\'\') on cancelling task assignment, if the return URL is not in the history', () => {
    window.history.pushState({}, '');
    const findPersonControl = new FormControl('test');
    component.formGroup.addControl('findPersonControl', findPersonControl);
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('should return true if current user is judicial', () => {
    const userDetails = {
      id: 'id123',
      forename: 'John',
      surname: 'Smith',
      email: 'john.smith@email.com',
      roles: [AppTestConstants.IA_JUDGE_ROLE],
      roleCategory: 'JUDICIAL'
    };
    mockSessionStorageService.getItem.and.returnValue(JSON.stringify(userDetails));
    component.isCurrentUserJudicial();
    expect(component.isCurrentUserJudicial()).toEqual(true);
  });

  it('should return false if current user is not judicial', () => {
    const userDetails = {
      id: 'id123',
      forename: 'John',
      surname: 'Smith',
      email: 'john.smith@email.com',
      roles: ['caseworker-allocator']
    };
    mockSessionStorageService.getItem.and.returnValue(JSON.stringify(userDetails));
    component.isCurrentUserJudicial();
    expect(component.isCurrentUserJudicial()).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('should initialize component with task data from route resolver', () => {
      const mockActivatedRoute = TestBed.inject(ActivatedRoute) as any;
      mockActivatedRoute.snapshot = {
        data: {
          taskAndCaseworkers: {
            task: { task: mockTasks[0] },
            caseworkers: []
          },
          verb: TaskActionType.Reassign
        },
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('task1111111')
        },
        queryParamMap: {
          get: jasmine.createSpy('get').and.returnValues('LEGAL_OPERATIONS', 'IAC')
        }
      };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify({
        roleCategory: 'LEGAL_OPERATIONS'
      }));
      mockRouter.url = '/work/task1111111/reassign';

      component.ngOnInit();

      expect(component.tasks).toEqual([mockTasks[0]]);
      expect(component.assignedUser).toBe(mockTasks[0].assignee);
      expect(component.verb).toBe(TaskActionType.Reassign);
      expect(component.taskId).toBe('task1111111');
      expect(component.role).toBe('LEGAL_OPERATIONS');
      expect(component.service).toBe('IAC');
      expect(component.domain).toBe(PersonRole.LEGAL_OPERATIONS);
      expect(component.rootPath).toBe('work');
      expect(component.isJudicial).toBe(false);
    });

    it('should set isJudicial to true when current user is judicial', () => {
      const mockActivatedRoute = TestBed.inject(ActivatedRoute) as any;
      mockActivatedRoute.snapshot = {
        data: {
          taskAndCaseworkers: {
            task: { task: mockTasks[0] },
            caseworkers: []
          },
          verb: TaskActionType.Reassign
        },
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('task1111111')
        },
        queryParamMap: {
          get: jasmine.createSpy('get').and.returnValues('LEGAL_OPERATIONS', 'IAC')
        }
      };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify({
        roleCategory: 'JUDICIAL'
      }));
      mockRouter.url = '/work/task1111111/reassign';

      component.ngOnInit();

      expect(component.isJudicial).toBe(true);
    });

    it('should handle when role query param is JUDICIAL', () => {
      const mockActivatedRoute = TestBed.inject(ActivatedRoute) as any;
      mockActivatedRoute.snapshot = {
        data: {
          taskAndCaseworkers: {
            task: { task: mockTasks[0] },
            caseworkers: []
          },
          verb: TaskActionType.Reassign
        },
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('task1111111')
        },
        queryParamMap: {
          get: jasmine.createSpy('get').and.returnValues('JUDICIAL', 'IAC')
        }
      };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify({
        roleCategory: 'LEGAL_OPERATIONS'
      }));
      mockRouter.url = '/work/task1111111/reassign';

      component.ngOnInit();

      expect(component.domain).toBe(PersonRole.JUDICIAL);
    });

    it('should handle when role query param is ADMIN', () => {
      const mockActivatedRoute = TestBed.inject(ActivatedRoute) as any;
      mockActivatedRoute.snapshot = {
        data: {
          taskAndCaseworkers: {
            task: { task: mockTasks[0] },
            caseworkers: []
          },
          verb: TaskActionType.Reassign
        },
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('task1111111')
        },
        queryParamMap: {
          get: jasmine.createSpy('get').and.returnValues('ADMIN', 'IAC')
        }
      };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify({
        roleCategory: 'LEGAL_OPERATIONS'
      }));
      mockRouter.url = '/work/task1111111/reassign';

      component.ngOnInit();

      expect(component.domain).toBe(PersonRole.ADMIN);
    });

    it('should handle when role query param is null', () => {
      const mockActivatedRoute = TestBed.inject(ActivatedRoute) as any;
      mockActivatedRoute.snapshot = {
        data: {
          taskAndCaseworkers: {
            task: { task: mockTasks[0] },
            caseworkers: []
          },
          verb: TaskActionType.Reassign
        },
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('task1111111')
        },
        queryParamMap: {
          get: jasmine.createSpy('get').and.returnValues(null, 'IAC')
        }
      };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify({
        roleCategory: 'LEGAL_OPERATIONS'
      }));
      mockRouter.url = '/work/task1111111/reassign';

      component.ngOnInit();

      expect(component.domain).toBe(PersonRole.ALL);
    });
  });

  describe('fields getter', () => {
    it('should return TaskActionsWithAssigneeForJudicial when showAssigneeColumn is true and user is judicial', () => {
      window.history.pushState({ showAssigneeColumn: true }, '', '');
      component.isJudicial = true;

      const fields = component.fields;

      expect(fields).toBe(ConfigConstants.TaskActionsWithAssigneeForJudicial);
    });

    it('should return TaskActionsWithAssigneeForLegalOps when showAssigneeColumn is true and user is not judicial', () => {
      window.history.pushState({ showAssigneeColumn: true }, '', '');
      component.isJudicial = false;

      const fields = component.fields;

      expect(fields).toBe(ConfigConstants.TaskActionsWithAssigneeForLegalOps);
    });

    it('should return AllWorkTasksForLegalOps when showAssigneeColumn is false', () => {
      window.history.pushState({ showAssigneeColumn: false }, '', '');

      const fields = component.fields;

      expect(fields).toEqual(ConfigConstants.AllWorkTasksForLegalOps);
    });

    it('should handle when window.history.state is null', () => {
      window.history.pushState(null, '', '');

      const fields = component.fields;

      expect(fields).toEqual(ConfigConstants.AllWorkTasksForLegalOps);
    });
  });

  describe('returnUrl getter', () => {
    it('should return the returnUrl from window.history.state', () => {
      window.history.pushState({ returnUrl: '/my-work/list' }, '', '');

      const returnUrl = (component as any).returnUrl;

      expect(returnUrl).toBe('/my-work/list');
    });

    it('should truncate URL at # character', () => {
      window.history.pushState({ returnUrl: '/all-work/tasks#manage_123' }, '', '');

      const returnUrl = (component as any).returnUrl;

      expect(returnUrl).toBe('/all-work/tasks');
    });

    it('should return empty string when window.history.state is null', () => {
      window.history.pushState(null, '', '');

      const returnUrl = (component as any).returnUrl;

      expect(returnUrl).toBe('');
    });

    it('should return empty string when returnUrl is undefined', () => {
      window.history.pushState({}, '', '');

      const returnUrl = (component as any).returnUrl;

      expect(returnUrl).toBe('');
    });
  });

  describe('showAssigneeColumn getter', () => {
    it('should return true when showAssigneeColumn is true in history state', () => {
      window.history.pushState({ showAssigneeColumn: true }, '', '');

      const showAssigneeColumn = (component as any).showAssigneeColumn;

      expect(showAssigneeColumn).toBe(true);
    });

    it('should return false when showAssigneeColumn is false in history state', () => {
      window.history.pushState({ showAssigneeColumn: false }, '', '');

      const showAssigneeColumn = (component as any).showAssigneeColumn;

      expect(showAssigneeColumn).toBe(false);
    });

    it('should return false when showAssigneeColumn is not in history state', () => {
      window.history.pushState({}, '', '');

      const showAssigneeColumn = (component as any).showAssigneeColumn;

      expect(showAssigneeColumn).toBe(false);
    });

    it('should return false when window.history.state is null', () => {
      window.history.pushState(null, '', '');

      const showAssigneeColumn = (component as any).showAssigneeColumn;

      expect(showAssigneeColumn).toBe(false);
    });
  });

  describe('selectedPerson', () => {
    it('should set the person property', () => {
      const person = {
        id: '123',
        name: 'Test Person',
        email: 'test@example.com',
        domain: PersonRole.JUDICIAL
      };

      component.selectedPerson(person);

      expect(component.person).toBe(person);
    });

    it('should handle undefined person', () => {
      component.person = SELECTED_PERSON;

      component.selectedPerson(undefined);

      expect(component.person).toBeUndefined();
    });
  });

  describe('assign', () => {
    it('should set form errors when findPersonControl has no email', () => {
      mockRouter.navigate.calls.reset();
      const findPersonControl = new FormControl({ name: 'test' });
      component.formGroup.addControl('findPersonControl', findPersonControl);

      component.assign();

      expect(component.formGroup.errors).toEqual({ invalid: true });
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should set form errors when findPersonControl value is null', () => {
      const findPersonControl = new FormControl(null);
      component.formGroup.addControl('findPersonControl', findPersonControl);

      component.assign();

      expect(component.formGroup.errors).toEqual({ invalid: true });
    });

    it('should set form errors when formGroup has no controls', () => {
      component.assign();

      expect(component.formGroup.errors).toEqual({ invalid: true });
    });

    it('should handle assign action type', () => {
      const findPersonControl = new FormControl({ email: 'test@example.com' });
      component.formGroup.addControl('findPersonControl', findPersonControl);
      component.verb = TaskActionType.Assign;
      component.taskId = 'task456';
      component.rootPath = 'tasks';

      component.assign();

      expect(mockRouter.navigate).toHaveBeenCalledWith(
        ['tasks', 'task456', 'assign', 'confirm'],
        jasmine.any(Object)
      );
    });
  });

  describe('onCaseworkerChanged', () => {
    it('should update caseworker property', () => {
      const caseworker = {
        idamId: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        location: { id: 'loc1', locationName: 'Location 1' }
      } as any;

      component.onCaseworkerChanged(caseworker);

      expect(component.caseworker).toBe(caseworker);
    });

    it('should handle null caseworker', () => {
      component.caseworker = {} as any;

      component.onCaseworkerChanged(null);

      expect(component.caseworker).toBeNull();
    });
  });

  describe('setFocusOn', () => {
    it('should focus on element with given id', () => {
      const mockElement = jasmine.createSpyObj('HTMLElement', ['focus']);
      spyOn(document, 'getElementById').and.returnValue(mockElement);

      component.setFocusOn('test-element');

      expect(document.getElementById).toHaveBeenCalledWith('test-element');
      expect(mockElement.focus).toHaveBeenCalled();
    });
  });

  describe('setDomain', () => {
    it('should return JUDICIAL role for JUDICIAL category', () => {
      const result = (component as any).setDomain('JUDICIAL' as any);

      expect(result).toBe(PersonRole.JUDICIAL);
    });

    it('should return LEGAL_OPERATIONS role for LEGAL_OPERATIONS category', () => {
      const result = (component as any).setDomain('LEGAL_OPERATIONS' as any);

      expect(result).toBe(PersonRole.LEGAL_OPERATIONS);
    });

    it('should return ADMIN role for ADMIN category', () => {
      const result = (component as any).setDomain('ADMIN' as any);

      expect(result).toBe(PersonRole.ADMIN);
    });

    it('should return ALL role for unknown category', () => {
      const result = (component as any).setDomain('UNKNOWN' as any);

      expect(result).toBe(PersonRole.ALL);
    });

    it('should return ALL role for null category', () => {
      const result = (component as any).setDomain(null);

      expect(result).toBe(PersonRole.ALL);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from assignTask subscription if it exists', () => {
      const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
      (component as any).assignTask = mockSubscription;

      component.ngOnDestroy();

      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should not throw error when assignTask is null', () => {
      (component as any).assignTask = null;

      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('should not throw error when assignTask is undefined', () => {
      (component as any).assignTask = undefined;

      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('isCurrentUserJudicial with edge cases', () => {
    it('should return false when sessionStorage returns null', () => {
      mockSessionStorageService.getItem.and.returnValue(null);

      const result = component.isCurrentUserJudicial();

      expect(result).toBe(false);
    });

    it('should return false when user has no roleCategory property', () => {
      const userDetails = {
        id: 'id123',
        forename: 'John',
        surname: 'Smith',
        email: 'john.smith@email.com'
      };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify(userDetails));

      const result = component.isCurrentUserJudicial();

      expect(result).toBe(false);
    });

    it('should return false when roleCategory is not JUDICIAL', () => {
      const userDetails = {
        roleCategory: 'LEGAL_OPERATIONS'
      };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify(userDetails));

      const result = component.isCurrentUserJudicial();

      expect(result).toBe(false);
    });

    it('should handle invalid JSON in sessionStorage', () => {
      mockSessionStorageService.getItem.and.returnValue('invalid json');

      expect(() => component.isCurrentUserJudicial()).toThrow();
    });
  });

  describe('taskServiceConfig', () => {
    it('should have correct default configuration', () => {
      expect(component.taskServiceConfig.service).toBe('IAC');
      expect(component.taskServiceConfig.defaultSortDirection).toBe('asc');
      expect(component.taskServiceConfig.defaultSortFieldName).toBe('dueDate');
    });
  });

  describe('error handling', () => {
    it('should initialize with null error', () => {
      expect(component.error).toBeNull();
    });

    it('should handle error property being set', () => {
      const errorMessage = {
        title: 'Error',
        description: 'An error occurred',
        fieldId: 'field1'
      };

      component.error = errorMessage;

      expect(component.error).toEqual(errorMessage);
    });
  });

  describe('property initialization', () => {
    it('should have correct initial values for all properties', () => {
      const newComponent = new TaskAssignmentContainerComponent(
        TestBed.inject(ActivatedRoute),
        mockRouter,
        mockSessionStorageService
      );

      expect(newComponent.error).toBeNull();
      expect(newComponent.showManage).toBe(false);
      expect(newComponent.domain).toBe(PersonRole.ALL);
      expect(newComponent.formGroup).toBeDefined();
      expect(newComponent.formGroup.controls).toEqual({});
      expect((newComponent as any).userDetailsKey).toBe('userDetails');
    });
  });
});
