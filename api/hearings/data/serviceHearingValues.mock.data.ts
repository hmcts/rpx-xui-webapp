import {
  CategoryType,
  HearingChannelEnum,
  HMCLocationType,
  MemberType,
  PartyType,
  RequirementType
} from '../models/hearings.enum';
import { ServiceHearingValuesModel } from '../models/serviceHearingValues.model';
import {
  HEARING_ADDITIONAL_INSTRUCTIONS,
  HEARING_ATTENDANCE,
  HEARING_FACILITIES, HEARING_JUDGE, HEARING_LINK, HEARING_PANEL_REQUIRED, HEARING_PANEL_SELECTOR,
  HEARING_REQUIREMENTS,
  HEARING_STAGE, HEARING_TIMING, HEARING_VENUE, HEARING_WELSH,
  replaceResultValue
} from './defaultScreenFlow.data';

export const SERVICE_HEARING_VALUES: ServiceHearingValuesModel = {
  hmctsServiceID: 'BBA3',
  hmctsInternalCaseName: 'Jane and Smith vs DWP',
  publicCaseName: 'Jane and Smith vs DWP',
  autoListFlag: false,
  hearingType: 'BBA3-DIR',
  hearingChannels: [HearingChannelEnum.ONPPR],
  hearingLevelParticipantAttendance: [],
  caseCategories: [
    {
      categoryType: CategoryType.CaseType,
      categoryValue: 'BBA3-002'
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'BBA3-002CP',
      categoryParent: 'BBA3-002'
    }
  ],
  caseDeepLink: 'https://manage-case.demo.platform.hmcts.net/',
  caserestrictedFlag: false,
  externalCaseReference: '',
  caseManagementLocationCode: '372653',
  caseSLAStartDate: '2021-05-05T09:00:00.000Z',
  hearingWindow: {
    dateRangeStart: '2022-11-23T09:00:00.000Z',
    dateRangeEnd: '2022-11-30T09:00:00.000Z',
    firstDateTimeMustBe: ''
  },
  duration: 45,
  hearingPriorityType: 'Standard',
  numberOfPhysicalAttendees: 2,
  hearingInWelshFlag: false,
  hearingLocations: [{
    locationId: '372653',
    locationType: HMCLocationType.COURT
  }],
  caseAdditionalSecurityFlag: false,
  facilitiesRequired: ['AF-VF'],
  listingComments: '',
  hearingRequester: '',
  privateHearingRequiredFlag: false,
  caseInterpreterRequiredFlag: false,
  leadJudgeContractType: '',
  judiciary: {
    roleType: [''],
    authorisationTypes: [''],
    authorisationSubType: [''],
    panelComposition: [{
      memberType: '',
      count: 1
    }],
    judiciaryPreferences: [
      {
        memberID: 'p1000000',
        memberType: MemberType.JUDGE,
        requirementType: RequirementType.EXCLUDE
      }
    ],
    judiciarySpecialisms: ['']
  },
  hearingIsLinkedFlag: false,
  panelRequirements: {
    roleType: [
    ],
    panelPreferences: [],
    panelSpecialisms: [
      'BBA3-DQPM',
      'BBA3-MQPM2-003',
      'BBA3-MQPM2-004',
      'BBA3-FQPM',
      'BBA3-RMM'
    ]
  },
  parties: [
    {
      partyID: 'P1',
      partyType: PartyType.IND,
      partyName: 'Jane and Smith',
      partyRole: 'APP',
      individualDetails: {
        title: 'Miss',
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'INTER'
      },
      unavailabilityRanges: [
      ]
    },
    {
      partyID: 'P2',
      partyType: PartyType.IND,
      partyName: 'DWP',
      partyRole: 'DEF',
      individualDetails: {
        title: '',
        firstName: 'DWP',
        lastName: 'Representative',
        preferredHearingChannel: 'INTER'
      },
      unavailabilityRanges: [
      ]
    }],
  caseFlags: {
    flags: [
    ],
    flagAmendURL: '/flag/amend'
  },
  screenFlow: [
    HEARING_REQUIREMENTS,
    HEARING_FACILITIES,
    HEARING_STAGE,
    HEARING_ATTENDANCE,
    replaceResultValue(HEARING_VENUE, 'hearing-judge', 'hearing-panel-required'),
    replaceResultValue(HEARING_WELSH, 'hearing-judge', 'hearing-panel-required'),
    HEARING_PANEL_REQUIRED,
    replaceResultValue(HEARING_JUDGE, 'hearing-panel', 'hearing-timing'),
    HEARING_PANEL_SELECTOR,
    HEARING_TIMING,
    HEARING_LINK,
    HEARING_ADDITIONAL_INSTRUCTIONS
  ],
  vocabulary: [
    {
      word1: ''
    }
  ]
};
