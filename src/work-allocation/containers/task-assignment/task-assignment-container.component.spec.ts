import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationModule, SessionStorageService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, PersonRole } from '@hmcts/rpx-xui-common-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { CheckReleaseVersionService } from 'src/work-allocation/services/check-release-version.service';

import { TaskListComponent } from '..';
import { ErrorMessageComponent } from '../../../app/components';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { TaskActionConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { TaskActionType } from '../../enums';
import { Task } from '../../models/tasks';
import { WorkAllocationTaskService } from '../../services';
import { getMockTasks } from '../../tests/utils.spec';
import { TaskAssignmentContainerComponent } from './task-assignment-container.component';

@Component({
  template: `
    <exui-task-container-assignment></exui-task-container-assignment>`
})
class WrapperComponent {
  @ViewChild(TaskAssignmentContainerComponent, {static: true}) public appComponentRef: TaskAssignmentContainerComponent;
  @Input() public tasks: Task[];
}

@Component({
  template: `
    <div>Nothing</div>`
})
class NothingComponent {
}

describe('TaskAssignmentContainerComponent2', () => {
  let component: TaskAssignmentContainerComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const SELECTED_PERSON = {
    id: 'id123',
    name: 'John Smith',
    email: 'john.smith@email.com',
    domain: PersonRole.CASEWORKER
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
  const mockCheckReleaseVersionService = {
    isRelease4: () => {
      return {
        subscribe: () => true
      };
    }
  };
  const MESSAGE_SERVICE_METHODS = ['addMessage', 'emitMessages', 'getMessages', 'nextMessage', 'removeAllMessages'];
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', MESSAGE_SERVICE_METHODS);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TaskAssignmentContainerComponent,
        WrapperComponent,
        TaskListComponent,
        ErrorMessageComponent,
        NothingComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        WorkAllocationComponentsModule,
        ReactiveFormsModule,
        CdkTableModule,
        FormsModule,
        MatAutocompleteModule,
        HttpClientTestingModule,
        EffectsModule.forRoot([]),
        ExuiCommonLibModule,
        PaginationModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes(
          [
            {path: 'my-work/list', component: NothingComponent}
          ]
        ),
      ],
      providers: [
        {provide: Location, useValue: locationStub},
        {provide: WorkAllocationTaskService, useValue: mockWorkAllocationService},
        {provide: SessionStorageService, useValue: mockSessionStorageService},
        {provide: CheckReleaseVersionService, useValue: mockCheckReleaseVersionService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                taskAndCaseworkers: {
                  task: {task: mockTasks[0]}, caseworkers: []
                },
                ...TaskActionConstants.Reassign
              },
              params: {
                taskId: 'task1111111'
              }
            },
            params: of({task: mockTasks[0]}),
            paramMap: of({selectedPerson: SELECTED_PERSON})
          }
        },
        {provide: InfoMessageCommService, useValue: mockInfoMessageCommService},
        {provide: Router, useValue: mockRouter},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    wrapper.tasks = null;
    window.history.pushState({returnUrl: 'my-work/list', showAssigneeColumn: false}, '', 'my-work/list');

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
    window.history.pushState({returnUrl: 'all-work/tasks#manage_0d22d838', showAssigneeColumn: false}, '',
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
      roles: ['caseworker-ia-iacjudge']
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
});
