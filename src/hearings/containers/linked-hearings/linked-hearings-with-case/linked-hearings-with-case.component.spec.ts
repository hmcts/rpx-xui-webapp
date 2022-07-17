import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import {
  ACTION,
  EXUIDisplayStatusEnum,
  EXUISectionStatusEnum,
  HearingLinkedSelectionEnum, HearingListingStatusEnum,
  HMCStatus, Mode
} from '../../../models/hearings.enum';
import { ServiceLinkedCasesWithHearingsModel } from '../../../models/linkHearings.model';
import { HearingsPipesModule } from '../../../pipes/hearings.pipes.module';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { LinkedHearingsWithCaseComponent } from './linked-hearings-with-case.component';

fdescribe('LinkedHearingsWithCaseComponent', () => {
  let component: LinkedHearingsWithCaseComponent;
  let fixture: ComponentFixture<LinkedHearingsWithCaseComponent>;
  let store: any;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let mockHearingService: any;
  const caseId = '1111-2222-3333-4444';
  const hearingId = 'h100002';
  const hearingGroupRequestId = 'g1000000';

  const serviceLinkedCasesWithNoSelectedHearings: ServiceLinkedCasesWithHearingsModel[] = [
    {
      caseRef: '4652724902696213',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Linked for a hearing'
      ],
      caseHearings: [{
        hearingID: 'h100001',
        hearingType: 'Substantive',
        hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
        lastResponseReceivedDateTime: '',
        exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
        exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING,
        hmcStatus: HMCStatus.HEARING_REQUESTED,
        responseVersion: 'rv1',
        hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
        listAssistCaseStatus: '',
        hearingIsLinkedFlag: true,
        hearingGroupRequestId: null,
        hearingDaySchedule: [],
        isSelected: false,
      }]
    },
    {
      caseRef: '5283819672542864',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Linked for a hearing',
        'Progressed as part of lead case'
      ],
      caseHearings: []
    },
    {
      caseRef: '8254902572336147',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Familial',
        'Guardian',
        'Linked for a hearing'
      ],
      caseHearings: [{
        hearingID: 'h100010',
        hearingType: 'Direction Hearings',
        hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
        lastResponseReceivedDateTime: '',
        exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
        exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING,
        hmcStatus: HMCStatus.AWAITING_LISTING,
        responseVersion: 'rv1',
        hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
        listAssistCaseStatus: '',
        hearingIsLinkedFlag: true,
        hearingGroupRequestId: null,
        hearingDaySchedule: [],
        isSelected: false,
      }, {
        hearingID: 'h100012',
        hearingType: 'Chambers Outcome',
        hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
        lastResponseReceivedDateTime: '',
        exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
        exuiDisplayStatus: EXUIDisplayStatusEnum.AWAITING_LISTING,
        hmcStatus: HMCStatus.AWAITING_LISTING,
        responseVersion: 'rv1',
        hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
        listAssistCaseStatus: '',
        hearingIsLinkedFlag: true,
        hearingGroupRequestId: null,
        hearingDaySchedule: [],
        isSelected: false,
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
                mode: Mode.LINK_HEARINGS
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
    component.linkedCases = serviceLinkedCasesWithNoSelectedHearings;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check on submit error', () => {
    component.linkedCases = serviceLinkedCasesWithNoSelectedHearings;
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
    component.hearingId = 'h1000002';
    component.hearingGroupRequestId = 'g000101';
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'cases', 'case-details', '8254902572336147', 'hearings']);

    component.isManageLink = true;
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'manage-links', '8254902572336147', 'g000101', 'h1000002']);
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
    component.hearingId = 'h1000002';
    component.mode = component.pageMode.MANAGE_HEARINGS;
    component.navigate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'manage-links', '8254902572336147', 'g00101', 'h1000002', 'group-selection']);

    component.linkedCases = serviceLinkedCasesWithNoSelectedHearings;
    component.initForm();
    component.getHearingsAvailable();
    component.mode = component.pageMode.MANAGE_HEARINGS;
    fixture.detectChanges();
    component.navigate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'hearings', 'manage-links', '8254902572336147', 'g00101', 'h1000002', 'check-your-answers']);
  });

  it('should dispatch to store on unlink hearings', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.caseId = caseId;
    component.hearingId = hearingId;
    component.hearingGroupRequestId = hearingGroupRequestId;
    component.onUnlinkHearings();
    expect(storeDispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining(new fromHearingStore.ManageLinkedHearingGroup({
      linkedHearingGroup: null, hearingGroupRequestId, caseId, hearingId
    })));
  });

  afterEach(() => {
    fixture.destroy();
  });
});
