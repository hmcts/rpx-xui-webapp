/* tslint:disable:object-literal-sort-keys */
import {RequirementType} from '../models/hearings.enum';
import {ServiceHearingValuesModel} from '../models/serviceHearingValues.model';

export const SERVICE_HEARING_VALUES: ServiceHearingValuesModel = {
  autoListFlag: false,
  hearingType: 'Final',
  caseType: 'Personal Independence Payment',
  caseSubTypes: ['Conditions of Entitlement', 'Good cause', 'Rate of Assessment / Payability Issues - complex'],
  hearingWindow: {
    range: {
      start: '2021-11-23T09:00:00.000+0000',
      end: '2021-11-30T09:00:00.000+0000',
    },
    firstDateTimeMustBe: '',
  },
  duration: 45,
  hearingPriorityType: 'Standard',
  numberOfPhysicalAttendees: 2,
  hearingInWelshFlag: false,
  hearingLocations: [],
  facilitiesRequired: [],
  listingComments: '',
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
        memberID: '',
        memberType: '',
        requirementType: RequirementType.EXCLUDE,
      },
    ],
    judiciarySpecialisms: [''],
  },
  hearingIsLinkedFlag: false,
  parties: [
    {
      partyName: 'Jane and Smith',
      partyChannel: '',
      unavailability: [
        {
          start: '2021-12-10T09:00:00.000+0000',
          end: '2021-12-31T09:00:00.000+0000',
        },
      ],
    },
    {
      partyName: 'DWP',
      partyChannel: '',
      unavailability: [
        {
          start: '2021-12-20T09:00:00.000+0000',
          end: '2021-12-31T09:00:00.000+0000',
        },
      ],
    }],
  caseFlags: {
    flags: [
      {
        partyName: 'Jane and Smith',
        flagId: 'Language Interpreter',
        flagDescription: 'Spanish interpreter required',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane and Smith',
        flagId: 'Sign language interpreter',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane and Smith',
        flagId: 'Reasonable adjustment',
        flagDescription: 'Hearing loop required',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'DWP',
        flagId: 'case flag 1',
        flagDescription: 'case flag 1 description',
        flagStatus: 'ACTIVE',
      },
    ],
    flagAmendURL: '/',
  },
  screenFlow: [
    {
      screenName: 'hearing-requirement',
      navigation: [
        {
          resultValue: 'additional-facilities',
        },
      ],
    },
    {
      screenName: 'additional-facilities',
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
          resultValue: 'how-party-attend',
        },
      ],
    },
    {
      screenName: 'how-party-attend',
      navigation: [
        {
          resultValue: 'location-search',
        },
      ],
    },
    {
      screenName: 'location-search',
      conditionKey: 'region',
      navigation: [
        {
          conditionOperator: 'EQUAL',
          conditionValue: 'Wales',
          resultValue: 'welsh-hearing',
        },
        {
          conditionOperator: 'NOT EQUAL',
          conditionValue: 'Wales',
          resultValue: 'specify-judge',
        },
      ],
    },
    {
      screenName: 'welsh-hearing',
      navigation: [
        {
          resultValue: 'specify-judge',
        },
      ],
    },
    {
      screenName: 'specify-judge',
      navigation: [
        {
          resultValue: 'require-panel-or-not',
        },
      ],
    },
    {
      screenName: 'require-panel-or-not',
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
          resultValue: 'additional-instruction',
        },
      ],
    },
    {
      screenName: 'additional-instruction',
      navigation: [
        {
          resultValue: 'check-answers',
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
