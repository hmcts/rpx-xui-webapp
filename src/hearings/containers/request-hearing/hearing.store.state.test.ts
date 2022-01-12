import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';

export const serviceHearingValuesModel: ServiceHearingValuesModel = {
  autoListFlag: false,
  hearingType: 'Final',
  caseType: 'Personal Independence Payment',
  caseSubTypes: [
    'Conditions of Entitlement',
    'Good cause',
    'Rate of Assessment / Payability Issues - complex'
  ],
  hearingWindow: {
    range: {
      start: '2021-11-23T09:00:00.000+0000',
      end: '2021-11-30T09:00:00.000+0000'
    },
    firstDateTimeMustBe: ''
  },
  duration: 45,
  hearingPriorityType: 'Standard',
  numberOfPhysicalAttendees: 2,
  hearingInWelshFlag: false,
  hearingLocations: [
    '196538'
  ],
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
      partyName: 'Jane and Smith',
      partyChannel: '',
      unavailability: [
        {
          start: '2021-12-10T09:00:00.000+0000',
          end: '2021-12-31T09:00:00.000+0000'
        }
      ]
    },
    {
      partyName: 'DWP',
      partyChannel: '',
      unavailability: [
        {
          start: '2021-12-20T09:00:00.000+0000',
          end: '2021-12-31T09:00:00.000+0000'
        }
      ]
    }
  ],
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
      hearingListMainModel: [
        {
          hmctsServiceID: 'SSCS'
        }
      ]
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
    hearingConditions: null,
  }
};
