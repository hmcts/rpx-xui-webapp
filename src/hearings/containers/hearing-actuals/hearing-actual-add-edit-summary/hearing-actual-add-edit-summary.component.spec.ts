import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { hearingActualsMainModel, hearingStageRefData, initialState } from '../../../hearing.test.data';
import { ACTION, HearingResult } from '../../../models/hearings.enum';
import { PartyChannelDisplayValuePipe } from '../../../pipes/party-channel-display-value.pipe';
import { PartyRoleDisplayValuePipe } from '../../../pipes/party-role-display-value.pipe';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HearingActualAddEditSummaryComponent } from './hearing-actual-add-edit-summary.component';

describe('HearingActualAddEditSummaryComponent', () => {
  let component: HearingActualAddEditSummaryComponent;
  let fixture: ComponentFixture<HearingActualAddEditSummaryComponent>;
  let store: any;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  const hearingActualAdjournReasonsRefData = [
    {
      key: 'postponedDueToExclusions',
      value_en: 'Postponed, due to Exclusions',
      value_cy: '',
      hint_text_en: 'Postponed, due to Exclusions',
      hint_text_cy: '',
      lov_order: 1,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'postponedDueToOtherReasons',
      value_en: 'Postponed, due to Other Reasons',
      value_cy: '',
      hint_text_en: 'Postponed, due to Other Reasons',
      hint_text_cy: '',
      lov_order: 2,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'postponedIncompleteTribunal',
      value_en: 'Postponed, Incomplete Tribunal',
      value_cy: '',
      hint_text_en: 'Postponed, Incomplete Tribunal',
      hint_text_cy: '',
      lov_order: 3,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'postponedNoReasonGiven',
      value_en: 'Postponed, No Reason Given',
      value_cy: '',
      hint_text_en: 'Postponed, No Reason Given',
      hint_text_cy: '',
      lov_order: 4,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'postponedOtherPartyUnableToAttend',
      value_en: 'Postponed, Other Party unable to attend',
      value_cy: '',
      hint_text_en: 'Postponed, Other Party unable to attend',
      hint_text_cy: '',
      lov_order: 5,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedAppellantToAttendOralRequestedDidNotAttendReasonGiven',
      value_en: 'Adjourned, Appellant to attend - oral requested - did not attend - reason given',
      value_cy: '',
      hint_text_en: 'Adjourned, Appellant to attend - oral requested - did not attend - reason given',
      hint_text_cy: '',
      lov_order: 6,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedAppellantToAttendOralRequestedDidNotAttendNoReason',
      value_en: 'Adjourned, Appellant to attend - oral requested - did not attend - no reason',
      value_cy: '',
      hint_text_en: 'Adjourned, Appellant to attend - oral requested - did not attend - no reason',
      hint_text_cy: '',
      lov_order: 7,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedAppellantToAttendPaperRequestedOrNoEnquiryFormReturned',
      value_en: 'Adjourned, Appellant to attend - paper requested or no Enquiry Form returned',
      value_cy: '',
      hint_text_en: 'Adjourned, Appellant to attend - paper requested or no Enquiry Form returned',
      hint_text_cy: '',
      lov_order: 8,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedFurtherMedicalEvidenceEssential',
      value_en: 'Adjourned, Further medical evidence essential',
      value_cy: '',
      hint_text_en: 'Adjourned, Further medical evidence essential',
      hint_text_cy: '',
      lov_order: 9,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedEvidenceOrFurtherResponseFromRespondentRequired',
      value_en: 'Adjourned, Evidence or further Response from Respondent required',
      value_cy: '',
      hint_text_en: 'Adjourned, Evidence or further Response from Respondent required',
      hint_text_cy: '',
      lov_order: 10,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedEvidenceOrSubmissionFromAppellantRequired',
      value_en: 'Adjourned, Evidence or submission from Appellant required',
      value_cy: '',
      hint_text_en: 'Adjourned, Evidence or submission from Appellant required',
      hint_text_cy: '',
      lov_order: 11,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedNoInterpreter',
      value_en: 'Adjourned, No Interpreter',
      value_cy: '',
      hint_text_en: 'Adjourned, No Interpreter',
      hint_text_cy: '',
      lov_order: 12,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedInsufficientTimeToDealWithCase',
      value_en: 'Adjourned, Insufficient time to deal with case',
      value_cy: '',
      hint_text_en: 'Adjourned, Insufficient time to deal with case',
      hint_text_cy: '',
      lov_order: 13,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedDocumentsSuppliedButNotBeforeTheTribunalAtTheHearing',
      value_en: 'Adjourned, Documents supplied but not before the Tribunal at the hearing',
      value_cy: '',
      hint_text_en: 'Adjourned, Documents supplied but not before the Tribunal at the hearing',
      hint_text_cy: '',
      lov_order: 14,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedPresentingOfficerToAttend',
      value_en: 'Adjourned, Presenting Officer to attend',
      value_cy: '',
      hint_text_en: 'Adjourned, Presenting Officer to attend',
      hint_text_cy: '',
      lov_order: 15,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedRespondentFailedToComplyWithDirection',
      value_en: 'Adjourned, Respondent failed to comply with direction',
      value_cy: '',
      hint_text_en: 'Adjourned, Respondent failed to comply with direction',
      hint_text_cy: '',
      lov_order: 16,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedOtherAdministrativeErrors',
      value_en: 'Adjourned, Other administrative errors (specify error)',
      value_cy: '',
      hint_text_en: 'Adjourned, Other administrative errors (specify error)',
      hint_text_cy: '',
      lov_order: 17,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedOtherReasonsForAdjourning',
      value_en: 'Adjourned, Other reasons for adjourning',
      value_cy: '',
      hint_text_en: 'Adjourned, Other reasons for adjourning',
      hint_text_cy: '',
      lov_order: 18,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedElementsOutstanding',
      value_en: 'Adjourned, element(s) outstanding',
      value_cy: '',
      hint_text_en: 'Adjourned, element(s) outstanding',
      hint_text_cy: '',
      lov_order: 19,
      parent_key: null,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedAllElementsAdjourned',
      value_en: 'Adjourned, All Elements Adjourned',
      value_cy: '',
      hint_text_en: 'Adjourned, All Elements Adjourned',
      hint_text_cy: '',
      lov_order: 20,
      category_key: 'AdjournHearingActualReason',
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'adjournedListedPaperCaseNotHeardDueToLackOfTime',
      value_en: 'Adjourned, Listed paper case not heard due to lack of time',
      value_cy: '',
      hint_text_en: 'Adjourned, Listed paper case not heard due to lack of time',
      hint_text_cy: '',
      category_key: 'AdjournHearingActualReason',
      lov_order: 21,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null,
    },
  ];

  const hearingActualCancelReasonsRefData = [
    {
      category_key: 'CancelHearingActualReason',
      key: 'reasonOne',
      value_en: 'Reason 1',
      value_cy: '',
      hint_text_en: 'Reason 1',
      hint_text_cy: '',
      lov_order: 1,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      category_key: 'CancelHearingActualReason',
      key: 'reasonTwo',
      value_en: 'Reason 2',
      value_cy: '',
      hint_text_en: 'Reason 2',
      hint_text_cy: '',
      lov_order: 2,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      category_key: 'CancelHearingActualReason',
      key: 'reasonThree',
      value_en: 'Reason 3',
      value_cy: '',
      hint_text_en: 'Reason 3',
      hint_text_cy: '',
      lov_order: 3,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null,
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualAddEditSummaryComponent, PartyChannelDisplayValuePipe, PartyRoleDisplayValuePipe],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingActualAddEditSummaryComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.sub = new Observable().subscribe();
    spyOn(component.sub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should check back method', () => {
    spyOn(hearingsService, 'navigateAction');
    component.onBack();
    expect(hearingsService.navigateAction).toHaveBeenCalledWith(ACTION.BACK);
  });

  it('should return attending representative', () => {
    component.hearingActualsMainModel = hearingActualsMainModel;
    const attendingRepresentative = component.getRepresentingAttendee('3');
    expect(attendingRepresentative).toEqual('Mary Jones');
  });

  it('should return empty string for hearing result reason type completed', () => {
    const hearingOutcome = hearingActualsMainModel.hearingActuals.hearingOutcome;
    hearingOutcome.hearingResult = HearingResult.COMPLETED;
    hearingOutcome.hearingResultReasonType = '';
    const description = component.getHearingResultReasonTypeDescription(hearingOutcome);
    expect(description).toEqual('');
  });

  it('should return hearing result reason type description for adjourned', () => {
    component.adjournHearingActualReasons = hearingActualAdjournReasonsRefData;
    const hearingOutcome = hearingActualsMainModel.hearingActuals.hearingOutcome;
    hearingOutcome.hearingResult = HearingResult.ADJOURNED;
    hearingOutcome.hearingResultReasonType = 'postponedDueToOtherReasons';
    const description = component.getHearingResultReasonTypeDescription(hearingOutcome);
    expect(description).toEqual('Postponed, due to Other Reasons');
  });

  it('should return hearing result reason type description for cancelled', () => {
    component.cancelHearingActualReasons = hearingActualCancelReasonsRefData;
    const hearingOutcome = hearingActualsMainModel.hearingActuals.hearingOutcome;
    hearingOutcome.hearingResult = HearingResult.CANCELLED;
    hearingOutcome.hearingResultReasonType = 'reasonTwo';
    const description = component.getHearingResultReasonTypeDescription(hearingOutcome);
    expect(description).toEqual('Reason 2');
  });

  it('should return correct hearing type from the hearing types', () => {
    component.hearingTypes = hearingStageRefData;
    const description = component.getHearingTypeDescription('initial');
    expect(description).toEqual('Initial');
  });

  it('should submit hearing details', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.id = '1111222233334444';
    component.hearingResult = HearingResult.COMPLETED;
    component.onSubmitHearingDetails();
    expect(component.submitted).toEqual(true);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.SubmitHearingActuals(component.id));
  });

  it('should fail submitting hearing details if hearing result is not selected', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.hearingResult = '';
    component.onSubmitHearingDetails();
    expect(component.submitted).toEqual(true);
    expect(storeDispatchSpy).toHaveBeenCalledTimes(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});

describe('HearingActualAddEditSummaryComponent display actual participants', () => {
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);
  const hearingRole = [
    {
      key: 'appellant',
      value_en: 'Appellant',
      value_cy: '',
      hintText_EN: 'Appellant',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    },
    {
      key: 'claimant',
      value_en: 'Claimant',
      value_cy: '',
      hintText_EN: 'Claimant',
      hintTextCY: '',
      order: 2,
      parentKey: null,
    },
    {
      key: 'interpreter',
      value_en: 'Interpreter',
      value_cy: '',
      hintText_EN: 'Interpreter',
      hintTextCY: '',
      order: 3,
      parentKey: null,
    },
    {
      key: 'solicitor',
      value_en: 'Solicitor',
      value_cy: '',
      hintText_EN: 'Solicitor',
      hintTextCY: '',
      order: 4,
      parentKey: null,
    },
    {
      key: 'barrister',
      value_en: 'Barrister',
      value_cy: '',
      hintText_EN: 'Barrister',
      hintTextCY: '',
      order: 5,
      parentKey: null,
    },
  ];
  const partyChannel = [
    {
      key: 'inPerson',
      value_en: 'In person',
      value_cy: '',
      hintText_EN: 'in person',
      hintTextCY: 'Wyneb yn wyneb',
      order: 1,
      parentKey: null,
    },
    {
      key: 'byPhone',
      value_en: 'By phone',
      value_cy: '',
      hintText_EN: 'By Phone',
      hintTextCY: 'Ffôn',
      order: 2,
      parentKey: null,
      child_nodes: [
        {
          key: 'telephone-btMeetMe',
          value_en: 'Telephone - BTMeetme',
          value_cy: '',
          hintText_EN: 'By Phone bTMeetme',
          hintTextCY: '',
          order: 1,
          parentKey: null,
        },
        {
          key: 'telephone-CVP',
          value_en: 'Telephone - CVP',
          value_cy: '',
          hintText_EN: 'By Phone CVP',
          hintTextCY: '',
          order: 2,
          parentKey: null,
        },
        {
          key: 'telephone-other',
          value_en: 'Telephone - Other',
          value_cy: '',
          hintText_EN: 'By Phone Other',
          hintTextCY: '',
          order: 3,
          parentKey: null,
        },
        {
          key: 'telephone-skype',
          value_en: 'Telephone - Skype',
          value_cy: '',
          hintText_EN: 'By Phone Skype',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
      ],
    },
    {
      key: 'byVideo',
      value_en: 'By video',
      value_cy: 'Fideo',
      hintText_EN: 'By video',
      hintTextCY: '',
      order: 4,
      parentKey: null,
      child_nodes: [
        {
          key: 'video-conference',
          value_en: 'Video Conference',
          value_cy: '',
          hintText_EN: 'By video conference',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
        {
          key: 'video-other',
          value_en: 'Video - Other',
          value_cy: '',
          hintText_EN: 'By video other',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
        {
          key: 'video-skype',
          value_en: 'Video - Skype',
          value_cy: '',
          hintText_EN: 'By video skype',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
        {
          key: 'video-teams',
          value_en: 'Video - Teams',
          value_cy: '',
          hintText_EN: 'By video teams',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
      ],
    },
    {
      key: 'notAttending',
      value_en: 'Not attending',
      value_cy: '',
      hintText_EN: 'not attending',
      hintTextCY: '',
      order: 5,
      parentKey: null,
    },
  ];
  let component: HearingActualAddEditSummaryComponent;
  let fixture: ComponentFixture<HearingActualAddEditSummaryComponent>;
  const newState: any = JSON.parse(JSON.stringify(initialState));
  newState.hearings.hearingActuals.hearingActualsMainModel.hearingActuals.actualHearingDays[0].actualDayParties = [
    {
      actualPartyId: '1',
      partyRole: 'claimant',
      partyChannelSubType: 'by-video-teams',
      representedParty: null,
      actualIndividualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
      },
      actualOrganisationDetails: {
        name: null,
      },
      didNotAttendFlag: false,
    },
    {
      actualPartyId: '2',
      partyRole: 'appellant',
      partyChannelSubType: 'by-video-teams',
      representedParty: null,
      actualIndividualDetails: {
        firstName: 'DWP',
        lastName: '',
      },
      actualOrganisationDetails: {
        name: null,
      },
      didNotAttendFlag: false,
    },
    {
      actualPartyId: null,
      partyRole: 'interpreter',
      partyChannelSubType: 'by-video-teams',
      representedParty: '1',
      actualIndividualDetails: {
        firstName: 'Thomas',
        lastName: 'Wayne',
      },
      actualOrganisationDetails: {
        name: null,
      },
      didNotAttendFlag: false,
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualAddEditSummaryComponent, PartyChannelDisplayValuePipe, PartyRoleDisplayValuePipe],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: HearingsService, useValue: hearingsService },
        provideMockStore({ initialState: newState }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({
              id: '1',
            })),
            snapshot: {
              params: {
                id: '1',
              },
              data: {
                partyChannel,
                hearingRole,
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingActualAddEditSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display form with actual parties involved', () => {

    expect(component.parties.length).toBe(2);
    expect(component.participants.length).toBe(1);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
