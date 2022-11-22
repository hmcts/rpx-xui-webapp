import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';
import { ErrorMessage, UserInfo } from 'src/app/models';
import { ErrorMessageComponent } from '../../../app/components';
import { SessionStorageService } from '../../../app/services';
import { ALL_LOCATIONS } from '../../components/constants/locations';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { LocationDataService, WorkAllocationTaskService } from '../../services';
import { InfoMessageContainerComponent } from '../info-message-container/info-message-container.component';
import { TaskHomeComponent } from './task-home.component';
import { State } from '../../../app/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  template: `
    <exui-task-home></exui-task-home>`
})
class WrapperComponent {
  @ViewChild(TaskHomeComponent, {static: false}) public appComponentRef: TaskHomeComponent;
}


const initialMockState: State = {
  routerReducer: null,
  appConfig: {
    config: {},
    termsAndCondition: null,
    loaded: true,
    loading: true,
    termsAndConditions: null,
    isTermsAndConditionsFeatureEnabled: null,
    useIdleSessionTimeout: null,
    userDetails: {
      sessionTimeout: {
        idleModalDisplayTime: 0,
        totalIdleTime: 0
      },
      canShareCases: true,
      userInfo: {
        id: '',
        active: true,
        email: 'juser4@mailinator.com',
        forename: 'XUI test',
        roles: ['caseworker-ia-iacjudge'],
        uid: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
        surname: 'judge'
      },
      roleAssignmentInfo: [
        {
          primaryLocation: '231596',
          jurisdiction: 'IA',
          isCaseAllocator: true
        },
        {
          primaryLocation: '',
          jurisdiction: 'JUDICIAL',
          isCaseAllocator: true,
        },
        {
          primaryLocation: '',
          jurisdiction: 'DIVORCE',
          isCaseAllocator: false,
        }
      ],
    }
  }
};

describe('TaskHomeComponent', () => {
  let component: TaskHomeComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let router: Router;
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask', 'getUsersAssignedTasks']);
  mockTaskService.getUsersAssignedTasks.and.returnValue(of([]));
  const typesOfWork = [
    {
      key: 'hearing_work',
      label: 'Hearing work'
    },
    {
      key: 'upper_tribunal',
      label: 'Upper Tribunal'
    },
    {
      key: 'routine_work',
      label: 'Routine work'
    },
    {
      key: 'decision_making_work',
      label: 'Decision-making work'
    },
    {
      key: 'applications',
      label: 'Applications'
    },
    {
      key: 'priority',
      label: 'Priority'
    },
    {
      key: 'access_requests',
      label: 'Access requests'
    },
    {
      key: 'error_management',
      label: 'Error management'
    }
  ];
  const SELECTED_LOCATIONS = {
    id: 'locations',
    fields: [
      { name: 'locations', value: ['231596', '698118'] },
      {
        name: 'types-of-work',
        value: ['types_of_work_all', ...typesOfWork.map(t => t.key)]
      }
    ]
  };
  const mockFilterService: any = {
    getStream: () => of(SELECTED_LOCATIONS),
    get: () => SELECTED_LOCATIONS,
    persist: (setting, persistence) => null,
    givenErrors: {
      subscribe: () => null,
      next: () => null,
      unsubscribe: () => null
    }
  };
  const sessionStorageService = jasmine.createSpyObj('sessionStorageService', ['getItem']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        HttpClientTestingModule,
        WorkAllocationComponentsModule,
      ],
      declarations: [TaskHomeComponent, WrapperComponent, InfoMessageContainerComponent, ErrorMessageComponent],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        provideMockStore({ initialState: initialMockState }),
        { provide: LocationDataService, useValue: { getLocations: () => of(ALL_LOCATIONS) } },
        {
          provide: FilterService, useValue: mockFilterService
        },
        {
          provide: SessionStorageService, useValue: sessionStorageService
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.inject(Router);
    spyOn(mockFilterService.givenErrors, 'unsubscribe');
    const userDetails: UserInfo = {
      id: '1',
      forename: 'forename',
      surname: 'surname',
      email: 'email@email.com',
      active: true,
      roles: ['test'],
      uid: '1133-3435-34545-3435'
    };
    sessionStorageService.getItem.and.callFake((key) => {
      return JSON.stringify(userDetails);
    });
    fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    component = fixture.componentInstance.appComponentRef;
    expect(component).toBeDefined();
  });

  it('should override locations error message', () => {
    const error: ErrorMessage = {
      description: 'At least one location is required',
      fieldId: 'locations',
      multiple: true,
      title: 'There is a problem',
      errors: [
        {name: 'services', error: 'Select a service'},
        {name: 'locations', error: 'Search for a location by name'},
        {name: 'types-of-work', error: 'Select a type of work'}
      ]
    };
    component = fixture.componentInstance.appComponentRef;
    component.errorChangedHandler(error);
    fixture.whenStable();
    fixture.detectChanges();
    expect(component.error.errors[1].error).toEqual('Enter a location');
  });

  it('should return null if no error message to display', () => {
    const error: ErrorMessage = null;
    component = fixture.componentInstance.appComponentRef;
    component.errorChangedHandler(error);
    expect(component.error).toBeNull();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
