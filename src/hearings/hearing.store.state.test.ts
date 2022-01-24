import {PartyType} from './models/hearings.enum';
import {ServiceHearingValuesModel} from './models/serviceHearingValues.model';

export const serviceHearingValuesModel: ServiceHearingValuesModel = {
  caseName: 'Jane vs DWP',
  autoListFlag: false,
  hearingType: 'Final',
  caseType: 'Personal Independence Payment',
  caseSubTypes: [
    'Conditions of Entitlement',
    'Good cause',
    'Rate of Assessment / Payability Issues - complex'
  ],
  hearingWindow: {
    hearingWindowDateRange: {
      hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
      hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
    },
    hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
  },
  duration: 45,
  hearingPriorityType: 'Standard',
  numberOfPhysicalAttendees: 2,
  hearingInWelshFlag: false,
  hearingLocations: [{
      locationId: '196538',
      locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
      locationType: 'hearing',
      region: 'North West',
    },
    {
      locationId: '219164',
      locationName: 'ABERDEEN TRIBUNAL HEARING CENTRE',
      locationType: 'hearing',
      region: 'Scotland',
    },
  ],
  caseAdditionalSecurityFlag: false,
  facilitiesRequired: [],
  listingComments: '',
  hearingRequester: '',
  privateHearingRequiredFlag: false,
  leadJudgeContractType: '',
  judiciary: {
    roleType: [
      ''
    ],
    authorisationTypes: [
      ''
    ],
    authorisationSubType: [
      ''
    ],
    panelComposition: [
      {
        memberType: '',
        count: 1
      }
    ],
    judiciaryPreferences: [
      {
        memberID: '',
        memberType: '',
        requirementType: 'EXCLUDE'
      }
    ],
    judiciarySpecialisms: [
      ''
    ]
  },
  hearingIsLinkedFlag: false,
  parties: [
    {
      partyID: 'P1',
      partyType: PartyType.IND,
      partyName: 'Jane Smith',
      partyChannel: 'inPerson',
      unavailabilityRanges: [
        {
          unavailableFromDate: '2021-12-10T09:00:00.000+0000',
          unavailableToDate: '2021-12-31T09:00:00.000+0000',
        },
      ],
    },
    {
      partyID: 'P2',
      partyType: PartyType.ORG,
      partyName: 'DWP',
      partyChannel: 'inPerson',
      unavailabilityRanges: [
        {
          unavailableFromDate: '2021-12-20T09:00:00.000+0000',
          unavailableToDate: '2021-12-31T09:00:00.000+0000',
        },
      ],
    }],
  caseFlags: {
    flags: [
      {
        partyName: 'Jane and Smith',
        flagId: 'Language Interpreter',
        flagDescription: 'Spanish interpreter required',
        flagStatus: 'ACTIVE'
      },
      {
        partyName: 'Jane and Smith',
        flagId: 'Sign language interpreter',
        flagDescription: 'Sign language interpreter required',
        flagStatus: 'ACTIVE'
      },
      {
        partyName: 'Jane and Smith',
        flagId: 'Reasonable adjustment',
        flagDescription: 'Hearing loop required',
        flagStatus: 'ACTIVE'
      },
      {
        partyName: 'DWP',
        flagId: 'case flag 1',
        flagDescription: 'case flag 1 description',
        flagStatus: 'ACTIVE'
      }
    ],
    flagAmendURL: '/'
  },
} as ServiceHearingValuesModel;

export const initialState = {
  hearings: {
    hearingList: {
      hearingListMainModel:
      {
        caseRef: '54354545453',
        hmctsServiceID: 'SSCS',
        caseHearings: []
      }
    },
    hearingValues: {
      serviceHearingValuesModel,
      lastError: null
    },
    hearingRequest: {
      hearingRequestMainModel: {
        requestDetails: {
          requestTimeStamp: null
        },
        hearingDetails: {
          duration: null,
          hearingType: 'Final',
          hearingLocations: [
            {
              locationType: 'region',
              locationId: '123',
              locationName: 'test location',
              region: 'Wales',
            }
          ],
          hearingIsLinkedFlag: false,
          hearingWindow: null,
          privateHearingRequiredFlag: false,
          panelRequirements: null,
          autolistFlag: false,
          nonStandardHearingDurationReasons: [],
          hearingPriorityType: null,
          numberOfPhysicalAttendees: null,
          hearingInWelshFlag: true,
          facilitiesRequired: [],
          listingComments: null,
          hearingRequester: null,
          leadJudgeContractType: null,
          totalParticipantAttendingHearing: 3
        },
        caseDetails: {
          hmctsServiceCode: null,
          caseRef: null,
          requestTimeStamp: null,
          hearingID: null,
          externalCaseReference: null,
          caseDeepLink: null,
          hmctsInternalCaseName: null,
          publicCaseName: null,
          caseAdditionalSecurityFlag: false,
          caseInterpreterRequiredFlag: false,
          caseCategories: [],
          caseManagementLocationCode: null,
          caserestrictedFlag: false,
          caseSLAStartDate: null
        },
        partyDetails: [
          {
            partyName: 'Jane and Smith',
            partyChannel: 'inperson'
          },
          {
            partyName: 'DWP',
            partyChannel: 'bymobile'
          }
        ]
      },
      lastError: null
    },
    hearingConditions: {
      mode: 'create',
      isInit: true
    },
  }
};
