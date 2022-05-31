import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UtilsModule } from '../../../../noc/containers/noc-field/utils/utils.module';
import * as fromFeature from '../../../store';
import * as fromContainers from '../../add-exclusion';
import { SpecificAccessHomeComponent } from './specific-access-home.component';
import { CaseRole, RoleCategory, SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { AccessReason, DurationType } from '../../../models/enums';
import { SpecificAccessReviewComponent } from '../specific-access-review/specific-access-review.component';
import { SpecificAccessDurationComponent } from '../specific-access-duration/specific-access-duration.component';
import { DurationHelperService } from '../../../services';
import { PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { getMockTasks } from 'src/work-allocation-2/tests/utils.spec';

describe('SpecificAccessHomeComponent', () => {
  let component: SpecificAccessHomeComponent;
  let fixture: ComponentFixture<SpecificAccessHomeComponent>;
  let durationHelperService: DurationHelperService;

  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl'
  ]);
  const mockAllocateRoleService = jasmine.createSpyObj('AllocateRoleService', ['getCaseRolesUserDetails']);
  const mockCaseworkerDataService = jasmine.createSpyObj('CaseworkerDataService', ['getCaseworkersForServices']);
  let mockStore: MockStore<fromFeature.State>;
  let mockFormBuilder: FormBuilder;
  let storeDispatchMock: any;
  const specificAccessStateData = {
    caseId: '111111',
    state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW
  };
  const caseRole: CaseRole = {
    id: '123456789',
    name: 'name',
    roleCategory: RoleCategory.LEGAL_OPERATIONS,
    location: null,
    start: '01-01-2000',
    end: '01-01-2005',
    actorId: 'person',
    actions: null,
    email: 'N/A'
  }

  beforeEach(() => {
    durationHelperService = new DurationHelperService();
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        UtilsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        PipesModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        SpecificAccessHomeComponent,
        SpecificAccessReviewComponent,
        ...fromContainers.containers
      ],
      providers: [
        provideMockStore(),
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                taskAndRole: {
                  task: {
                    task: getMockTasks()[0]
                  },
                  role: [caseRole]
                }
              }
            }
          }
        },
      ]
    })
      .compileComponents();
    mockStore = TestBed.get(Store);
    mockFormBuilder = TestBed.get(FormBuilder);
    storeDispatchMock = spyOn(mockStore, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(SpecificAccessHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('navigation', () => {
    const backNavEvent = SpecificAccessNavigationEvent.BACK;
    const continueNavEvent = SpecificAccessNavigationEvent.CONTINUE;
    const returnToMyTasksNavEvent = SpecificAccessNavigationEvent.RETURNTOMYTASKS;
    const returnTasksTab = SpecificAccessNavigationEvent.RETURNTOTASKSTAB;

    it('should correctly navigate to the specific access review page on navigating back', () => {
      component.navigationCurrentState = SpecificAccessState.SPECIFIC_ACCESS_DURATION;
      component.navigationHandler(backNavEvent);
      expect(mockStore.dispatch).toHaveBeenCalledWith(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_REVIEW));
    });

    it('should correctly navigate to the specific access duration page on pressing continue on the specific access review page', () => {
      component.specificAccessReviewComponent = new SpecificAccessReviewComponent(mockFormBuilder, mockStore, mockAllocateRoleService, mockCaseworkerDataService);
      component.navigationCurrentState = SpecificAccessState.SPECIFIC_ACCESS_REVIEW;
      component.specificAccessReviewComponent.reviewOptionControl = new FormControl('', [Validators.required]);
      component.specificAccessReviewComponent.reviewOptionControl.setValue(AccessReason.APPROVE_REQUEST);
      component.navigationHandler(continueNavEvent);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        new fromFeature.DecideSpecificAccessAndGo({accessReason: AccessReason.APPROVE_REQUEST, specificAccessState: SpecificAccessState.SPECIFIC_ACCESS_DURATION}));
    });

    it('should correctly navigate to the specific access approved page on pressing continue on the specific access duration page', () => {
      component.specificAccessDurationComponent = new SpecificAccessDurationComponent(durationHelperService, new FormBuilder(), mockStore);
      component.navigationCurrentState = SpecificAccessState.SPECIFIC_ACCESS_DURATION;
      component.specificAccessDurationComponent.selectedDuration = DurationType.SEVEN_DAYS;
      spyOn(component.specificAccessDurationComponent, 'getRawData').and.returnValue({day: 11});

      component.navigationHandler(continueNavEvent);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });

    it('should correctly redirect to the work list if the return to tasks event is triggered', () => {
      component.navigationHandler(returnToMyTasksNavEvent);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith(`/work/my-work/list`);
    });

    it('should correctly redirect to the tasks tab on the case details page if the return to my tasks event is triggered', () => {
      const caseId = '111111';
      component.caseId = caseId;
      component.navigationHandler(returnTasksTab);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith(`/cases/case-details/${caseId}/tasks`);
    });

  });
});
