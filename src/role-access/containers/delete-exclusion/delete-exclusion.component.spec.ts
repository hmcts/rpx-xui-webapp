import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { of, throwError } from 'rxjs';
import { Caseworker } from '../../../work-allocation/models/dtos';
import { CaseworkerDataService } from '../../../work-allocation/services';
import { AnswersComponent } from '../../components/answers/answers.component';
import { ExclusionNavigationEvent } from '../../models';
import { AnswerHeaderText, AnswerLabelText, ExclusionMessageText } from '../../models/enums';
import { AllocateRoleService, RoleExclusionsService } from '../../services';
import { DeleteExclusionComponent } from './delete-exclusion.component';

@Component({
  standalone: false,
  template: ` <exui-delete-exclusion></exui-delete-exclusion>`,
})
class WrapperComponent {
  @ViewChild(DeleteExclusionComponent, { static: true }) public appComponentRef: DeleteExclusionComponent;
}

const mockCaseworker: Caseworker = {
  idamId: '999999999',
  firstName: 'test',
  lastName: 'testing',
  email: 'test@test.com',
  location: null,
  roleCategory: RoleCategory.LEGAL_OPERATIONS,
};

describe('DeleteExclusionComponent', () => {
  let component: DeleteExclusionComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const mockCaseworkerDataService = jasmine.createSpyObj('caseworkerDataService', ['getAll']);
  const mockRoleExclusionService = jasmine.createSpyObj('roleExclusionService', [
    'getCurrentUserRoleExclusions',
    'deleteExclusion',
  ]);
  const exampleCaseId = '1234';
  const exclusionId = '2';
  const jurisdiction = 'Jurisdiction';
  const caseType = 'caseType';
  const goToCaseUrl = `cases/case-details/${jurisdiction}/${caseType}/${exampleCaseId}/roles-and-access`;
  const exclusion = {
    caseId: exampleCaseId,
    exclusionId,
    jurisdiction,
    caseType,
    name: 'Sample Name',
    type: 'test',
    userType: 'LEGAL_OPERATIONS',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AnswersComponent, DeleteExclusionComponent, WrapperComponent],
      imports: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                roleExclusions: [
                  {
                    added: Date.UTC(2021, 6, 1),
                    id: exclusionId,
                    name: 'Judge Rinder',
                    notes: 'Test exclusion',
                    actorId: '999999999',
                  },
                ],
              },
            },
            queryParamMap: of(convertToParamMap(exclusion)),
          },
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: RoleExclusionsService,
          useValue: mockRoleExclusionService,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockCaseworkerDataService.getAll.and.returnValue(of([mockCaseworker]));
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    const captionElement = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(captionElement.textContent).toContain(AnswerHeaderText.DeleteExclusion);
    const headingElement = fixture.debugElement.nativeElement.querySelector('.govuk-heading-l');
    expect(headingElement.textContent).toContain(AnswerHeaderText.CheckAnswers);
    const hintElement = fixture.debugElement.nativeElement.querySelector('.govuk-hint');
    expect(hintElement.textContent).toContain(AnswerHeaderText.CheckInformation);
  });

  it('should navigate correctly on click', () => {
    component.onNavEvent(ExclusionNavigationEvent.CANCEL);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(goToCaseUrl);
    mockRoleExclusionService.deleteExclusion.and.returnValue(of(200));
    component.onNavEvent(ExclusionNavigationEvent.DELETE_EXCLUSION);
    const additionalState = { state: { showMessage: true, messageText: ExclusionMessageText.Delete } };
    expect(routerMock.navigate).toHaveBeenCalledWith([goToCaseUrl], additionalState);
  });

  describe('showSpinner', () => {
    it('should default to false', () => {
      expect(component.showSpinner).toBeFalsy();
    });

    it('should be true when exclusion is confirmed', () => {
      mockRoleExclusionService.deleteExclusion.and.returnValue(of(200));
      component.onNavEvent(ExclusionNavigationEvent.DELETE_EXCLUSION);
      fixture.detectChanges();
      expect(component.showSpinner).toBeTruthy();
    });

    it('should be false when exclusion navigation is not handled', () => {
      expect(() => component.onNavEvent(ExclusionNavigationEvent.BACK)).toThrow();
      fixture.detectChanges();
      expect(component.showSpinner).toBeFalsy();
    });
  });

  it('populateAnswers', () => {
    const someExclusion = {
      actorId: null,
      id: '',
      type: '',
      name: 'some name',
      userType: null,
      notes: 'notes',
      added: new Date(2021, 12, 31),
      email: '',
    };
    component.populateAnswers(someExclusion);
    component.answers[0].label = AnswerLabelText.Person;
    component.answers[0].value = exclusion.name;
    component.answers[1].label = AnswerLabelText.DescribeExclusion;
    component.answers[1].value = someExclusion.notes;
    component.answers[2].label = AnswerLabelText.DateAdded;
    component.answers[2].value = new Date(someExclusion.added).toLocaleDateString('en-GB');
  });
});

describe('DeleteExclusionComponent with no name', () => {
  let component: DeleteExclusionComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const mockCaseworkerDataService = jasmine.createSpyObj('caseworkerDataService', ['getAll']);
  const mockRoleExclusionService = jasmine.createSpyObj('roleExclusionService', [
    'getCurrentUserRoleExclusions',
    'deleteExclusion',
  ]);
  const mockAllocateRoleService = jasmine.createSpyObj('allocateService', ['getCaseRolesUserDetails']);
  const exampleCaseId = '1234';
  const exclusionId = '2';
  const jurisdiction = 'Jurisdiction';
  const caseType = 'caseType';
  const goToCaseUrl = `cases/case-details/${jurisdiction}/${caseType}/${exampleCaseId}/roles-and-access`;
  const exclusion = {
    id: exclusionId,
    notes: null,
    added: new Date('21-01-2022'),
    caseId: exampleCaseId,
    jurisdiction,
    caseType,
    name: 'Sample Name',
    type: 'test',
    userType: 'LEGAL_OPERATIONS',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AnswersComponent, DeleteExclusionComponent, WrapperComponent],
      imports: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                roleExclusions: [
                  {
                    added: Date.UTC(2021, 6, 1),
                    id: exclusionId,
                    name: null,
                    notes: 'Test exclusion',
                    actorId: '999999999',
                  },
                ],
              },
            },
            queryParamMap: of(convertToParamMap(exclusion)),
          },
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: RoleExclusionsService,
          useValue: mockRoleExclusionService,
        },
        {
          provide: mockAllocateRoleService,
          useValue: mockAllocateRoleService,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockCaseworkerDataService.getAll.and.returnValue(of([mockCaseworker]));
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    const captionElement = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(captionElement.textContent).toContain(AnswerHeaderText.DeleteExclusion);
    const headingElement = fixture.debugElement.nativeElement.querySelector('.govuk-heading-l');
    expect(headingElement.textContent).toContain(AnswerHeaderText.CheckAnswers);
    const hintElement = fixture.debugElement.nativeElement.querySelector('.govuk-hint');
    expect(hintElement.textContent).toContain(AnswerHeaderText.CheckInformation);
  });

  it('should find and set exclusions', () => {
    const userDetails = {
      id: '1234',
      forename: 'foreName',
      surname: 'surName',
      email: 'email@email.com',
      active: true,
      roles: ['pui-case-manager'],
    };
    component.exclusionId = exclusionId;
    mockAllocateRoleService.getCaseRolesUserDetails.and.returnValue(userDetails);
    component.findAndSetExclusion([exclusion]);
    expect(component.roleExclusion.name).toBe('Sample Name');
  });

  it('should navigate correctly on click', () => {
    component.onNavEvent(ExclusionNavigationEvent.CANCEL);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(goToCaseUrl);
    mockRoleExclusionService.deleteExclusion.and.returnValue(of(200));
    component.onNavEvent(ExclusionNavigationEvent.DELETE_EXCLUSION);
    const additionalState = { state: { showMessage: true, messageText: ExclusionMessageText.Delete } };
    expect(routerMock.navigate).toHaveBeenCalledWith([goToCaseUrl], additionalState);
  });

  it('populateAnswers', () => {
    const someExclusion = {
      actorId: null,
      id: '',
      type: '',
      name: null,
      userType: null,
      notes: 'notes',
      added: new Date(2021, 11, 31),
      email: '',
    };
    component.populateAnswers(someExclusion);
    expect(component.answers[0].value).toBe('Awaiting person details');
    expect(component.answers[1].value).toBe(someExclusion.notes);
    expect(component.answers[2].value).toBe('31 December 2021');
  });
});

describe('DeleteExclusionComponent names and answers', () => {
  let component: DeleteExclusionComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const mockRoleExclusionService = jasmine.createSpyObj('RoleExclusionsService', [
    'getCurrentUserRoleExclusions',
    'deleteExclusion'
  ]);
  const mockAllocateRoleService = jasmine.createSpyObj('AllocateRoleService', ['getCaseRolesUserDetails']);
  const mockCaseworkerDataService = jasmine.createSpyObj('CaseworkerDataService', ['getUserByIdamId']);

  const exclusionId = '777';
  const caseId = 'CASE123';
  const jurisdiction = 'TESTJ';
  const caseType = 'TESTTYPE';

  const baseExclusion = {
    id: exclusionId,
    actorId: 'IDAM999',
    added: new Date(2023, 5, 1),
    notes: 'Some notes',
    caseId,
    jurisdiction,
    caseType,
    type: 'test',
    userType: 'LEGAL_OPERATIONS',
    name: 'Initial Name'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AnswersComponent, DeleteExclusionComponent, WrapperComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                roleExclusions: [{ ...baseExclusion }]
              }
            },
            queryParamMap: of(convertToParamMap({
              exclusionId,
              caseId,
              jurisdiction,
              caseType
            }))
          }
        },
        { provide: Router, useValue: routerMock },
        { provide: RoleExclusionsService, useValue: mockRoleExclusionService },
        { provide: AllocateRoleService, useValue: mockAllocateRoleService },
        { provide: CaseworkerDataService, useValue: mockCaseworkerDataService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Default mock return for exclusions
    mockRoleExclusionService.getCurrentUserRoleExclusions.and.returnValue(of([{ ...baseExclusion }]));
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance.appComponentRef;
    fixture.detectChanges();
  });

  it('getExclusionFromQuery should set core properties and return exclusions', (done) => {
    const paramMap = convertToParamMap({
      exclusionId,
      caseId,
      jurisdiction,
      caseType
    });
    mockRoleExclusionService.getCurrentUserRoleExclusions.calls.reset();
    mockRoleExclusionService.getCurrentUserRoleExclusions.and.returnValue(of([{ ...baseExclusion }]));
    component.getExclusionFromQuery(paramMap).subscribe((excls) => {
      expect(component.exclusionId).toBe(exclusionId);
      expect(component.caseId).toBe(caseId);
      expect(component.jurisdiction).toBe(jurisdiction);
      expect(component.caseType).toBe(caseType);
      expect(excls.length).toBe(1);
      done();
    });
  });

  it('getNamesIfNeeded populates missing name for non-judicial exclusion', () => {
    const noNameExclusion = { ...baseExclusion, name: undefined };
    component.roleExclusion = noNameExclusion;
    component.answers = [];
    mockCaseworkerDataService.getUserByIdamId.and.returnValue(of({
      firstName: 'Case',
      lastName: 'Worker'
    }));
    // invoke private via bracket access
    (component as any).getNamesIfNeeded();
    expect(mockCaseworkerDataService.getUserByIdamId).toHaveBeenCalledWith(noNameExclusion.actorId);
    expect(component.roleExclusion.name).toBe('Case Worker');
    expect(component.answers.length).toBe(3);
    expect(component.answers[0].value).toBe('Case Worker');
  });

  it('getNamesIfNeeded does nothing when name already present', () => {
    component.roleExclusion = { ...baseExclusion };
    mockCaseworkerDataService.getUserByIdamId.calls.reset();
    (component as any).getNamesIfNeeded();
    expect(mockCaseworkerDataService.getUserByIdamId).not.toHaveBeenCalled();
  });

  it('populateAnswers formats date with moment (D MMMM YYYY)', () => {
    component.answers = [];
    const customDate = new Date(2024, 0, 15); // 15 Jan 2024
    const excl = { ...baseExclusion, added: customDate };
    component.populateAnswers(excl as any);
    expect(component.answers[2].value).toBe('15 January 2024');
  });

  it('answers are rebuilt after late name resolution', () => {
    const noNameExclusion = { ...baseExclusion, name: undefined };
    component.roleExclusion = noNameExclusion as any;
    component.populateAnswers(noNameExclusion as any);
    const initialAnswersRef = component.answers;
    mockCaseworkerDataService.getUserByIdamId.and.returnValue(of({
      firstName: 'Late',
      lastName: 'Name'
    }));
    (component as any).getNamesIfNeeded();
    expect(component.answers).not.toBe(initialAnswersRef); // replaced
    expect(component.answers[0].value).toBe('Late Name');
  });
});
