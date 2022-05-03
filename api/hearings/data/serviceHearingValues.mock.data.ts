/* tslint:disable:object-literal-sort-keys */
import {
  CategoryType,
  HMCLocationType,
  MemberType,
  PartyType,
  RequirementType,
  UnavailabilityType
} from '../models/hearings.enum';
import {ServiceHearingValuesModel} from '../models/serviceHearingValues.model';

export const SERVICE_HEARING_VALUES: ServiceHearingValuesModel = {
  hmctsServiceID: 'BBA3',
  caseName: 'Jane and Smith vs DWP',
  autoListFlag: false,
  hearingType: 'BBA3-directionHearings',
  caseCategories: [
    {
      categoryType: CategoryType.CaseType,
      categoryValue: 'Personal Independence Payment',
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'Conditions of Entitlement',
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'Good cause',
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'Rate of Assessment / Payability Issues - complex',
    },
  ],
  caseDeepLink: 'https://manage-case.demo.platform.hmcts.net/',
  caserestrictedFlag: false,
  caseManagementLocationCode: '196538',
  caseSLAStartDate: '2021-05-05T09:00:00.000Z',
  hearingWindow: {
    dateRangeStart: '2022-11-23T09:00:00.000Z',
    dateRangeEnd: '2022-11-30T09:00:00.000Z',
    firstDateTimeMustBe: '2022-12-01T09:00:00.000Z',
  },
  duration: 45,
  hearingPriorityType: 'normal',
  numberOfPhysicalAttendees: 2,
  hearingInWelshFlag: false,
  hearingLocations: [{
    locationId: '196538',
    locationType: HMCLocationType.COURT,
  }],
  caseAdditionalSecurityFlag: false,
  facilitiesRequired: ['AF-VF'],
  listingComments: 'Additional instructions for the hearing',
  hearingRequester: '',
  privateHearingRequiredFlag: false,
  leadJudgeContractType: '',
  judiciary: {
    roleType: [''],
    authorisationTypes: [''],
    authorisationSubType: [''],
    panelComposition: [{
      memberType: '',
      count: 1,
    }],
    judiciaryPreferences: [
      {
        memberID: 'p1000000',
        memberType: MemberType.JUDGE,
        requirementType: RequirementType.EXCLUDE,
      },
    ],
    judiciarySpecialisms: [''],
  },
  hearingIsLinkedFlag: false,
  panelRequirements: {
    roleType: [
      'tribunalJudge',
      'deputyTribunalJudge',
      'regionalTribunalJudge',
    ],
    panelPreferences: [],
    panelSpecialisms: [
      'BBA3-DQPM',
      'BBA3-MQPM2-003',
      'BBA3-MQPM2-004',
      'BBA3-FQPM',
      'BBA3-RMM',
    ],
  },
  parties: [
    {
      partyID: 'P1',
      partyType: PartyType.IND,
      partyName: 'Jane and Smith',
      partyRole: 'appeal',
      individualDetails: {
        title: 'Miss',
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'faceToFace',
      },
      unavailabilityRanges: [
        {
          unavailableFromDate: '2021-12-10T09:00:00.000Z',
          unavailableToDate: '2021-12-31T09:00:00.000Z',
          unavailabilityType: UnavailabilityType.ALL_DAY,
        },
      ],
    },
    {
      partyID: 'P2',
      partyType: PartyType.IND,
      partyName: 'DWP',
      partyRole: 'claim',
      individualDetails: {
        title: '',
        firstName: 'DWP',
        lastName: '',
        preferredHearingChannel: 'faceToFace',
      },
      unavailabilityRanges: [
        {
          unavailableFromDate: '2021-12-20T09:00:00.000Z',
          unavailableToDate: '2021-12-31T09:00:00.000Z',
          unavailabilityType: UnavailabilityType.ALL_DAY,
        },
      ],
    }],
  caseFlags: {
    flags: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        flagParentId: 'RA0008',
        flagId: 'RA0042',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        flagParentId: 'RA0032',
        flagId: 'RA0053',
        flagDescription: 'Hearing loop required',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        flagParentId: 'RA0002',
        flagId: 'RA0013',
        flagDescription: 'Larger font size',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        flagParentId: 'RA0003',
        flagId: 'RA0016',
        flagDescription: 'Reading documents for customer',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        flagParentId: 'RA0008',
        flagId: 'RA0042',
        flagDescription: 'Sign Language Interpreter',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        flagParentId: 'PF0001',
        flagId: 'PF0015',
        flagDescription: 'Language Interpreter',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        flagParentId: 'PF0001',
        flagId: 'PF0002',
        flagDescription: 'Vulnerable user',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        flagParentId: 'RA0001',
        flagId: 'RA0005',
        flagDescription: 'Physical access and facilities',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        flagParentId: 'PF0001',
        flagId: 'PF0011',
        flagDescription: 'Banning order',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        flagParentId: 'CF0001',
        flagId: 'CF0002',
        flagDescription: 'Complex Case',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        flagParentId: 'CF0001',
        flagId: 'CF0006',
        flagDescription: 'Potential fraud',
        flagStatus: 'ACTIVE',
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        flagParentId: 'CF0001',
        flagId: 'CF0007',
        flagDescription: 'Urgent flag',
        flagStatus: 'ACTIVE',
      },
    ],
    flagAmendURL: '/flag/amend',
  },
  screenFlow: [
    {
      screenName: 'hearing-requirements',
      navigation: [
        {
          resultValue: 'hearing-facilities',
        },
      ],
    },
    {
      screenName: 'hearing-facilities',
      navigation: [
        {
          resultValue: 'hearing-stage',
        },
      ],
    },
    {
      screenName: 'hearing-stage',
      navigation: [
        {
          resultValue: 'hearing-attendance',
        },
      ],
    },
    {
      screenName: 'hearing-attendance',
      navigation: [
        {
          resultValue: 'hearing-venue',
        },
      ],
    },
    {
      screenName: 'hearing-venue',
      conditionKey: 'region',
      navigation: [
        {
          conditionOperator: 'INCLUDE',
          conditionValue: 'Wales',
          resultValue: 'hearing-welsh',
        },
        {
          conditionOperator: 'NOT INCLUDE',
          conditionValue: 'Wales',
          resultValue: 'hearing-judge',
        },
      ],
    },
    {
      screenName: 'hearing-welsh',
      navigation: [
        {
          resultValue: 'hearing-judge',
        },
      ],
    },
    {
      screenName: 'hearing-judge',
      navigation: [
        {
          resultValue: 'hearing-panel',
        },
      ],
    },
    {
      screenName: 'hearing-panel',
      navigation: [
        {
          resultValue: 'hearing-timing',
        },
      ],
    },
    {
      screenName: 'hearing-timing',
      navigation: [
        {
          resultValue: 'hearing-link',
        },
      ],
    },
    {
      screenName: 'hearing-link',
      navigation: [
        {
          resultValue: 'hearing-additional-instructions',
        },
      ],
    },
    {
      screenName: 'hearing-additional-instructions',
      navigation: [
        {
          resultValue: 'hearing-create-edit-summary',
        },
      ],
    },
  ],
  vocabulary: [
    {
      word1: '',
    },
  ],
};
