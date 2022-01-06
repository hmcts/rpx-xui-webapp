/* tslint:disable:object-literal-sort-keys */
import { RequirementType } from '../models/hearings.enum';
import { ServiceHearingValuesModel } from '../models/serviceHearingValues.model';

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
  hearingLocations: ['196538'],
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
      partyName: 'Jane Smith',
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
        partyName: 'Jane Smith',
        flagId: 'PF0015',
        flagDescription: 'Spanish interpreter required',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith',
        flagId: 'RA0042',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'Jane Smith',
        flagId: 'RA0001',
        flagDescription: 'Hearing loop required',
        flagStatus: 'ACTIVE',
      },
      {
        partyName: 'DWP',
        flagId: 'RA0005',
        flagDescription: 'Physical access and facilities',
        flagStatus: 'ACTIVE',
      },
    ],
    flagAmendURL: '/',
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
          resultValue: 'hearing-additional-instructions',
        },
      ],
    },
    {
      screenName: 'hearing-additional-instructions',
      navigation: [
        {
          resultValue: 'hearing-check-answers',
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
