import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { ACTION, HearingLinkedSelectionEnum, HMCStatus } from '../../../models/hearings.enum';
import { ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsPipesModule } from '../../../pipes/hearings.pipes.module';
import { HearingsService } from '../../../services/hearings.service';
import { LinkedHearingsWithCaseComponent } from './linked-hearings-with-case.component';

describe('LinkedHearingsWithCaseComponent', () => {
  let component: LinkedHearingsWithCaseComponent;
  let fixture: ComponentFixture<LinkedHearingsWithCaseComponent>;
  let store: any;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let mockHearingService: any;

  const source: ServiceLinkedCasesModel[] = [
    {
      caseReference: '4652724902696213',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Linked for a hearing'
      ],
      hearings: [
        {
          hearingId: 'h10001',
          hearingStage: 'Final',
          isSelected: true,
          hearingStatus: 'Awaiting',
          hearingIsInLinkedGroup: false
        }
      ]
    },
    {
      caseReference: '5283819672542864',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Linked for a hearing',
        'Progressed as part of lead case'
      ],
      hearings: [
        {
          hearingId: 'h10001',
          hearingStage: 'Final',
          isSelected: true,
          hearingStatus: 'Awaiting',
          hearingIsInLinkedGroup: false
        }
      ]
    },
    {
      caseReference: '8254902572336147',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Familial',
        'Guardian',
        'Linked for a hearing'
      ],
      hearings: [{
        hearingId: 'h100010',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: false,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsInLinkedGroup: false
      }, {
        hearingId: 'h100012',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: false,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsInLinkedGroup: false
      }]
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkedHearingsWithCaseComponent],
      imports: [ReactiveFormsModule, RouterTestingModule,
        HearingsPipesModule,
        RouterModule,
        RouterTestingModule.withRoutes([])],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(),
            snapshot: {
              data: {
                linkedCase: { serviceLinkedCases: source }
              },
              params: {caseId: '4652724902696211', hearingId: 'h000001'},
            },
            fragment: of('point-to-me'),
          }
        },
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedHearingsWithCaseComponent);
    mockHearingService = TestBed.get(HearingsService);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    component.linkedCases = source;
    spyOn(mockHearingService, 'getAllCaseInformation').and.returnValue(of(source));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check on init', () => {
    component.isManageLink = false;
    component.isHearingsPreSelected = false;
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockHearingService.getAllCaseInformation).toHaveBeenCalled();
  });

  it('should check on submit error', () => {
    component.linkedCases = [];
    component.initForm();
    component.getHearingsAvailable();
    component.onSubmit();
    fixture.detectChanges();
    expect(component.linkHearingForm.valid).toBeFalsy();
    expect(component.linkedHearingSelectionError).toBe(HearingLinkedSelectionEnum.ValidSelectionError);
  });

  it('should check on submit success', () => {
    component.onSubmit();
    expect(component.linkHearingForm.valid).toBe(true);
  });

  it('should navigate to previous page', () => {
    component.caseId = '8254902572336147';
    component.hearingId = 'h100010';
    component.hearingGroupRequestId = 'g000101';
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'cases', 'case-details', '8254902572336147', 'hearings']);

    component.isManageLink = true;
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'manage-links', '8254902572336147', 'g000101', 'h100010']);
  });

  it('should check on submit for manage link', () => {
    component.isManageLink = true;
    component.onSubmit();
    expect(component.linkHearingForm.valid).toBe(true);
  });

  it('should navigate to case hearing page', () => {
    component.navigateToCaseHearing('8254902572336147');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'cases', 'case-details', '8254902572336147', 'hearings']);
  });

  it('should check update linked cases', () => {
    component.updateLinkedCase(0, 0);
    expect(component.getHearingsFormValue(0).controls[0].get('isSelected').value).toBe(true);
  });

  it('should check navigate', () => {
    component.caseId = '8254902572336147';
    component.hearingGroupRequestId = 'g00101';
    component.hearingId = 'h100010';
    component.mode = component.pageMode.MANAGE_HEARINGS;
    component.navigate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'manage-links', '8254902572336147', 'g00101', 'h100010', 'group-selection']);

    component.linkedCases = [];
    component.initForm();
    component.getHearingsAvailable();
    component.mode = component.pageMode.MANAGE_HEARINGS;
    fixture.detectChanges();
    component.navigate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'manage-links', '8254902572336147', 'g00101', 'h100010', 'check-your-answers']);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
