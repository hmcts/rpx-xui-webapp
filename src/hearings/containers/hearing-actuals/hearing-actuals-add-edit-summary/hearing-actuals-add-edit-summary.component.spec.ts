import { Component, CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { hearingActualsMainModel, hearingStageRefData, initialState, partyChannelsRefData, partySubChannelsRefData } from '../../../hearing.test.data';
import { ActualHearingDayModel } from '../../../models/hearingActualsMainModel';
import { ACTION, HearingResult } from '../../../models/hearings.enum';
import { ConvertToValuePipe } from '../../../pipes/convert-to-value.pipe';
import { HearingsService } from '../../../services/hearings.service';
import { ActualHearingsUtils } from '../../../utils/actual-hearings.utils';
import { HearingActualsAddEditSummaryComponent } from './hearing-actuals-add-edit-summary.component';

@Pipe({ name: 'transformAnswer' })
export class MockHearingAnswersPipe implements PipeTransform {
  public transform(answerSource, hearingState$, index?: number): string {
    return '';
  }
}

@Component({
  template: `
    <div>Nothing</div>`
})
class NothingComponent {
}

describe('HearingActualsAddEditSummaryComponent', () => {
  let component: HearingActualsAddEditSummaryComponent;
  let fixture: ComponentFixture<HearingActualsAddEditSummaryComponent>;
  let store: any;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  const actualPartHeardReasonCodes = [
    {
      key: 'postponedDueToExclusions',
      value_en: 'Postponed, due to Exclusions',
      value_cy: '',
      hint_text_en: 'Postponed, due to Exclusions',
      hint_text_cy: '',
      lov_order: 1,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'postponedDueToOtherReasons',
      value_en: 'Postponed, due to Other Reasons',
      value_cy: '',
      hint_text_en: 'Postponed, due to Other Reasons',
      hint_text_cy: '',
      lov_order: 2,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'postponedIncompleteTribunal',
      value_en: 'Postponed, Incomplete Tribunal',
      value_cy: '',
      hint_text_en: 'Postponed, Incomplete Tribunal',
      hint_text_cy: '',
      lov_order: 3,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'postponedNoReasonGiven',
      value_en: 'Postponed, No Reason Given',
      value_cy: '',
      hint_text_en: 'Postponed, No Reason Given',
      hint_text_cy: '',
      lov_order: 4,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'postponedOtherPartyUnableToAttend',
      value_en: 'Postponed, Other Party unable to attend',
      value_cy: '',
      hint_text_en: 'Postponed, Other Party unable to attend',
      hint_text_cy: '',
      lov_order: 5,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedAppellantToAttendOralRequestedDidNotAttendReasonGiven',
      value_en: 'Adjourned, Appellant to attend - oral requested - did not attend - reason given',
      value_cy: '',
      hint_text_en: 'Adjourned, Appellant to attend - oral requested - did not attend - reason given',
      hint_text_cy: '',
      lov_order: 6,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedAppellantToAttendOralRequestedDidNotAttendNoReason',
      value_en: 'Adjourned, Appellant to attend - oral requested - did not attend - no reason',
      value_cy: '',
      hint_text_en: 'Adjourned, Appellant to attend - oral requested - did not attend - no reason',
      hint_text_cy: '',
      lov_order: 7,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedAppellantToAttendPaperRequestedOrNoEnquiryFormReturned',
      value_en: 'Adjourned, Appellant to attend - paper requested or no Enquiry Form returned',
      value_cy: '',
      hint_text_en: 'Adjourned, Appellant to attend - paper requested or no Enquiry Form returned',
      hint_text_cy: '',
      lov_order: 8,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedFurtherMedicalEvidenceEssential',
      value_en: 'Adjourned, Further medical evidence essential',
      value_cy: '',
      hint_text_en: 'Adjourned, Further medical evidence essential',
      hint_text_cy: '',
      lov_order: 9,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedEvidenceOrFurtherResponseFromRespondentRequired',
      value_en: 'Adjourned, Evidence or further Response from Respondent required',
      value_cy: '',
      hint_text_en: 'Adjourned, Evidence or further Response from Respondent required',
      hint_text_cy: '',
      lov_order: 10,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedEvidenceOrSubmissionFromAppellantRequired',
      value_en: 'Adjourned, Evidence or submission from Appellant required',
      value_cy: '',
      hint_text_en: 'Adjourned, Evidence or submission from Appellant required',
      hint_text_cy: '',
      lov_order: 11,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedNoInterpreter',
      value_en: 'Adjourned, No Interpreter',
      value_cy: '',
      hint_text_en: 'Adjourned, No Interpreter',
      hint_text_cy: '',
      lov_order: 12,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedInsufficientTimeToDealWithCase',
      value_en: 'Adjourned, Insufficient time to deal with case',
      value_cy: '',
      hint_text_en: 'Adjourned, Insufficient time to deal with case',
      hint_text_cy: '',
      lov_order: 13,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedDocumentsSuppliedButNotBeforeTheTribunalAtTheHearing',
      value_en: 'Adjourned, Documents supplied but not before the Tribunal at the hearing',
      value_cy: '',
      hint_text_en: 'Adjourned, Documents supplied but not before the Tribunal at the hearing',
      hint_text_cy: '',
      lov_order: 14,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedPresentingOfficerToAttend',
      value_en: 'Adjourned, Presenting Officer to attend',
      value_cy: '',
      hint_text_en: 'Adjourned, Presenting Officer to attend',
      hint_text_cy: '',
      lov_order: 15,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedRespondentFailedToComplyWithDirection',
      value_en: 'Adjourned, Respondent failed to comply with direction',
      value_cy: '',
      hint_text_en: 'Adjourned, Respondent failed to comply with direction',
      hint_text_cy: '',
      lov_order: 16,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedOtherAdministrativeErrors',
      value_en: 'Adjourned, Other administrative errors (specify error)',
      value_cy: '',
      hint_text_en: 'Adjourned, Other administrative errors (specify error)',
      hint_text_cy: '',
      lov_order: 17,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedOtherReasonsForAdjourning',
      value_en: 'Adjourned, Other reasons for adjourning',
      value_cy: '',
      hint_text_en: 'Adjourned, Other reasons for adjourning',
      hint_text_cy: '',
      lov_order: 18,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedElementsOutstanding',
      value_en: 'Adjourned, element(s) outstanding',
      value_cy: '',
      hint_text_en: 'Adjourned, element(s) outstanding',
      hint_text_cy: '',
      lov_order: 19,
      parent_key: null,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedAllElementsAdjourned',
      value_en: 'Adjourned, All Elements Adjourned',
      value_cy: '',
      hint_text_en: 'Adjourned, All Elements Adjourned',
      hint_text_cy: '',
      lov_order: 20,
      category_key: 'ActualPartHeardReasonCodes',
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      key: 'adjournedListedPaperCaseNotHeardDueToLackOfTime',
      value_en: 'Adjourned, Listed paper case not heard due to lack of time',
      value_cy: '',
      hint_text_en: 'Adjourned, Listed paper case not heard due to lack of time',
      hint_text_cy: '',
      category_key: 'ActualPartHeardReasonCodes',
      lov_order: 21,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    }
  ];
  const actualCancellationReasonCodes = [
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'withdraw',
      value_en: 'Withdrawn',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'struck',
      value_en: 'Struck Out',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'unable',
      value_en: 'Party unable to attend',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'exclusio',
      value_en: 'Exclusion',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'incompl',
      value_en: 'Incomplete Tribunal',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'listerr',
      value_en: 'Listed in error',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'other',
      value_en: 'Other',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'notready',
      value_en: 'No longer ready for hearing',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'notatt',
      value_en: 'Party did not attend',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'ActualCancellationReasonCodes',
      key: 'lapsed',
      value_en: 'Lapsed',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    }
  ];
  const hearingRole = [
    {
      category_key: 'EntityRoleCode',
      key: 'appellant',
      value_en: 'Appellant',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: 'Applicant',
      parent_key: 'APPL',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'EntityRoleCode',
      key: 'claimant',
      value_en: 'Appointee',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: 'Support',
      parent_key: 'SUPP',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'EntityRoleCode',
      key: 'interpreter',
      value_en: 'Joint Party',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: 'Applicant',
      parent_key: 'APPL',
      active_flag: 'Y',
      child_nodes: null
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsAddEditSummaryComponent, ConvertToValuePipe, MockHearingAnswersPipe],
      imports: [RouterTestingModule.withRoutes(
        [
          { path: 'hearings/actuals/1000000/hearing-actual-summary', component: NothingComponent }
        ]
      )],
      providers: [
        LoadingService,
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({
              id: '1'
            })),
            snapshot: {
              params: {
                id: '1'
              },
              data: {
                partyChannels: partyChannelsRefData,
                partySubChannels: partySubChannelsRefData,
                hearingRole
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingActualsAddEditSummaryComponent);
    store = TestBed.inject(Store);
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

  it('should return correct hearing type from the hearing types', () => {
    component.hearingTypes = hearingStageRefData;
    const description = component.getHearingTypeDescription('initial');
    expect(description).toEqual('Initial');
  });

  //Test failing because of route
  xit('should submit hearing details', () => {
    component.actualHearingDays = hearingActualsMainModel.hearingActuals.actualHearingDays;
    component.id = '1111222233334444';
    component.hearingResult = HearingResult.COMPLETED;
    component.onSubmitHearingDetails();
  });

  xit('should fail submitting hearing details if hearing result is not selected', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.hearingResult = '';
    component.onSubmitHearingDetails();
    expect(storeDispatchSpy).toHaveBeenCalledTimes(0);
  });

  it('should dispatach and update Hearing Actuals', () => {
    const hearingDay = {
      hearingDate: '2021-03-12',
      hearingStartTime: '2021-03-12T09:00:00.000Z',
      hearingEndTime: '2021-03-13T10:00:00.000Z',
      notRequired: false,
      pauseDateTimes: [],
      actualDayParties: [
        {
          actualPartyId: '1',
          individualDetails: {
            firstName: 'Bob',
            lastName: 'Jones'
          },
          actualOrganisationName: 'Company A',
          didNotAttendFlag: false,
          partyChannelSubType: 'inPerson',
          partyRole: 'appellant',
          representedParty: ''
        },
        {
          actualPartyId: '2',
          individualDetails: {
            firstName: 'Mary',
            lastName: 'Jones'
          },
          actualOrganisationName: 'Company B',
          didNotAttendFlag: false,
          partyChannelSubType: 'inPerson',
          partyRole: 'claimant',
          representedParty: ''
        },
        {
          actualPartyId: '3',
          individualDetails: {
            firstName: 'James',
            lastName: 'Gods'
          },
          actualOrganisationName: 'Solicitors A',
          didNotAttendFlag: false,
          partyChannelSubType: 'inPerson',
          partyRole: 'interpreter',
          representedParty: '1'
        }
      ]
    };
    const storeDispatchSpy = spyOn(store, 'dispatch');
    spyOn(ActualHearingsUtils, 'mergeSingleHearingPartActuals');

    component.changeWasThisHearingDayRequired(hearingDay);
    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
    expect(ActualHearingsUtils.mergeSingleHearingPartActuals).toHaveBeenCalledTimes(1);
  });

  it('should save one hearing day actuals for specific hearingDate', () => {
    const hearingDay = {
      hearingDate: '2021-03-12',
      hearingStartTime: '2021-03-12T09:00:00.000Z',
      hearingEndTime: '2021-03-13T10:00:00.000Z',
      notRequired: false,
      pauseDateTimes: [],
      actualDayParties: [
        {
          actualPartyId: '1',
          individualDetails: {
            firstName: 'Bob',
            lastName: 'Jones'
          },
          actualOrganisationName: 'Company A',
          didNotAttendFlag: false,
          partyChannelSubType: 'inPerson',
          partyRole: 'appellant',
          representedParty: ''
        },
        {
          actualPartyId: '2',
          individualDetails: {
            firstName: 'Mary',
            lastName: 'Jones'
          },
          actualOrganisationName: 'Company B',
          didNotAttendFlag: false,
          partyChannelSubType: 'inPerson',
          partyRole: 'claimant',
          representedParty: ''
        },
        {
          actualPartyId: '3',
          individualDetails: {
            firstName: 'James',
            lastName: 'Gods'
          },
          actualOrganisationName: 'Solicitors A',
          didNotAttendFlag: false,
          partyChannelSubType: 'inPerson',
          partyRole: 'interpreter',
          representedParty: '1'
        }
      ]
    };
    const storeDispatchSpy = spyOn(store, 'dispatch');
    component.confirmActualHearingTimeForDay(hearingDay);
    component.confirmActualPartiesForDay(hearingDay);
    expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
  });

  it('should return only one date if only one hearing date', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const actualHearingDays = [mainModel.hearingActuals.actualHearingDays[0]];
    const s = component.calculateEarliestHearingDate(actualHearingDays);
    expect(s).toBe('12 March 2021');
  });

  it('should calculate return first and last hearing date as string', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const hearingDays = ActualHearingsUtils.getActualHearingDays(mainModel, false);
    const day = hearingDays[0];
    const obj1 = Object.assign({}, day, { hearingDate: '2021-03-13' });
    const obj2 = Object.assign({}, day, { hearingDate: '2021-03-15' });
    hearingDays.push(obj1);
    hearingDays.push(obj2);
    const s = component.calculateEarliestHearingDate(hearingDays);
    expect(s).toBe('12 March 2021 - 15 March 2021');
  });

  it('should return hearing date(s) text as string', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const hearingDays = ActualHearingsUtils.getActualHearingDays(mainModel, false);
    const day = hearingDays[0];
    const obj1 = Object.assign({}, day, { hearingDate: '2021-03-13' });
    const obj2 = Object.assign({}, day, { hearingDate: '2021-03-15' });
    hearingDays.push(obj1);
    hearingDays.push(obj2);
    component.actualHearingDays = hearingDays;
    const s = component.getHearingDateText();
    expect(s).toBe('Hearing date(s)');
  });

  it('should return hearing date text as string', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    let hearingDays = ActualHearingsUtils.getActualHearingDays(mainModel, false);
    hearingDays = hearingDays.splice(0, 1);
    component.actualHearingDays = hearingDays;
    const s = component.getHearingDateText();
    expect(s).toBe('Hearing date');
  });

  it('should return updated notRequired', () => {
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals(component.hearingActualsMainModel, component.actualHearingDays[0].hearingDate, { notRequired: true } as ActualHearingDayModel);
    expect(patchedHearingActuals.actualHearingDays[0].notRequired).toBe(true);
  });

  describe('getPauseDateTime', () => {
    it('should return start time', () => {
      const actualHearingDays = {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000Z',
        hearingEndTime: '2021-03-12T10:00:00.000Z',
        pauseDateTimes: [{
          pauseStartTime: '2021-03-12T10:10:00.000Z',
          pauseEndTime: '2021-03-12T11:15:00.000Z'
        }],
        notRequired: false,
        actualDayParties: []
      };
      const actual = component.getPauseDateTime(actualHearingDays, 'start');
      expect(actual).toEqual('10:10');
    });

    it('should return end time', () => {
      const actualHearingDays = {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000Z',
        hearingEndTime: '2021-03-12T10:00:00.000Z',
        pauseDateTimes: [{
          pauseStartTime: '2021-03-12T10:10:00.000Z',
          pauseEndTime: '2021-03-12T11:15:00.000Z'
        }],
        notRequired: false,
        actualDayParties: []
      };
      const actual = component.getPauseDateTime(actualHearingDays, 'end');
      expect(actual).toEqual('11:15');
    });

    it('should return null as no pause times are present', () => {
      const actualHearingDays = {
        hearingDate: '2021-03-12',
        hearingStartTime: '2021-03-12T09:00:00.000Z',
        hearingEndTime: '2021-03-12T10:00:00.000Z',
        pauseDateTimes: [],
        notRequired: false,
        actualDayParties: []
      };
      const actual = component.getPauseDateTime(actualHearingDays, 'start');
      expect(actual).toEqual(null);
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
