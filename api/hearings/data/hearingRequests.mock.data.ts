import { PartyType } from '../../hearings/models/hearings.enum';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { CategoryType, LaCaseStatus, ListingStatus } from '../models/hearings.enum';

export const HEARING_REQUEST_RESULTS: HearingRequestMainModel[] = [
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 45,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100001',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyChannel: 'inPerson',
        partyRole: 'appellant',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
          ],
          interpreterLanguage: 'PF0015',
        },
        organisationDetails: {},
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyChannel: 'byVideo',
        partyRole: 'claimant',
        individualDetails: {
          reasonableAdjustments: [
            'RA0005',
          ],
          interpreterLanguage: null,
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000',
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.AWAITING_LISTING,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: '123456543',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyRole: 'appellant',
            partyChannel: 'inPerson',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            partyChannel: 'byVideo',
            individualDetails: {
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 50,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100002',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyRole: 'appellant',
        partyChannel: 'inPerson',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
          ],
          interpreterLanguage: 'PF0015',
        },
        organisationDetails: {},
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyRole: 'claimant',
        partyChannel: 'byVideo',
        individualDetails: {
          reasonableAdjustments: [
            'RA0005',
          ],
          interpreterLanguage: null,
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000',
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.AWAITING_LISTING,
      listingStatus: ListingStatus.DRAFT,
      hearingCancellationReason: '123456543',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyRole: 'appellant',
            partyChannel: 'inPerson',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            partyChannel: 'byVideo',
            individualDetails: {
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 55,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100003',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyChannel: 'inPerson',
        partyRole: 'appellant',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
          ],
          interpreterLanguage: 'PF0015',
        },
        organisationDetails: {},
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyChannel: 'byVideo',
        partyRole: 'claimant',
        individualDetails: {
          reasonableAdjustments: [
            'RA0005',
          ],
          interpreterLanguage: null,
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000',
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.LISTED,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: '123456543',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T11:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyRole: 'appellant',
            partyChannel: 'inPerson',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            partyChannel: 'byVideo',
            individualDetails: {
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 60,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100004',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyChannel: 'inPerson',
        partyRole: 'appellant',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
          ],
          interpreterLanguage: 'PF0015',
        },
        organisationDetails: {},
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyChannel: 'byVideo',
        partyRole: 'claimant',
        individualDetails: {
          reasonableAdjustments: [
            'RA0005',
          ],
          interpreterLanguage: null,
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000',
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.PENDING_RELISTING,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: '123456543',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyRole: 'appellant',
            partyChannel: 'inPerson',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            partyChannel: 'byVideo',
            individualDetails: {
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 65,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100005',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyChannel: 'inPerson',
        partyRole: 'appellant',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
          ],
          interpreterLanguage: 'PF0015',
        },
        organisationDetails: {},
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyChannel: 'byVideo',
        partyRole: 'claimant',
        individualDetails: {
          reasonableAdjustments: [
            'RA0005',
          ],
          interpreterLanguage: null,
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000',
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.AWAITING_LISTING,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: '123456543',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyRole: 'appellant',
            partyChannel: 'inPerson',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            partyChannel: 'byVideo',
            individualDetails: {
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 70,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100006',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyChannel: 'inPerson',
        partyRole: 'appellant',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
          ],
          interpreterLanguage: 'PF0015',
        },
        organisationDetails: {},
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyChannel: 'byVideo',
        partyRole: 'claimant',
        individualDetails: {
          reasonableAdjustments: [
            'RA0005',
          ],
          interpreterLanguage: null,
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000',
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      errorTimestamp: '2022-03-27T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.EXCEPTION,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: '123456543',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyRole: 'appellant',
            partyChannel: 'inPerson',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            partyChannel: 'byVideo',
            individualDetails: {
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 70,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100007',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyRole: 'appellant',
        partyChannel: 'inPerson',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
          ],
          interpreterLanguage: 'PF0015',
        },
        organisationDetails: {},
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyRole: 'claimant',
        partyChannel: 'byVideo',
        individualDetails: {
          reasonableAdjustments: [
            'RA0005',
          ],
          interpreterLanguage: null,
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000',
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.LISTED,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: '123456543',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyRole: 'appellant',
            partyChannel: 'inPerson',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            partyChannel: 'byVideo',
            individualDetails: {
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 70,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100012',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyRole: 'appellant',
        partyChannel: 'inPerson',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
          ],
          interpreterLanguage: 'PF0015',
        },
        organisationDetails: {},
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyRole: 'claimant',
        partyChannel: 'byVideo',
        individualDetails: {
          reasonableAdjustments: [
            'RA0005',
          ],
          interpreterLanguage: null,
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000',
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.CASE_CLOSED,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: 'cancelled',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyChannel: 'inPerson',
            partyRole: 'appellant',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            partyChannel: 'byVideo',
            individualDetails: {
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 70,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100008',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyChannel: 'inPerson',
        partyRole: 'appellant',
        individualDetails: {
          title: 'Miss',
          firstName: 'Jane',
          lastName: 'Smith',
          reasonableAdjustments: [
            'RA0042',
            'RA0053',
            'RA0013',
            'RA0016',
            'RA0042',
          ],
          interpreterLanguage: 'PF0015',
        },
        organisationDetails: {},
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-10T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyRole: 'claimant',
        partyChannel: 'byVideo',
        individualDetails: {
          reasonableAdjustments: [
            'RA0005',
          ],
          interpreterLanguage: null,
        },
        organisationDetails: {
          name: 'DWP',
          organisationType: 'GOV',
          cftOrganisationID: 'O100000',
        },
        unavailabilityDOW: null,
        unavailabilityRanges: [
          {
            unavailableFromDate: '2021-12-20T09:00:00.000+0000',
            unavailableToDate: '2021-12-31T09:00:00.000+0000',
          },
        ],
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.CANCELLED,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: 'cancelled',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyChannel: 'inPerson',
            partyRole: 'appellant',
            individualDetails: {
              title: 'Miss',
              firstName: 'Jane',
              lastName: 'Smith',
              reasonableAdjustments: [
                'RA0042',
                'RA0053',
                'RA0013',
                'RA0016',
                'RA0042',
              ],
              interpreterLanguage: 'PF0015',
            },
            organisationDetails: {},
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyRole: 'claimant',
            partyChannel: 'byVideo',
            individualDetails: {
              reasonableAdjustments: [
                'RA0005',
              ],
              interpreterLanguage: null,
            },
            organisationDetails: {
              name: 'DWP',
              organisationType: 'GOV',
              cftOrganisationID: 'O100000',
            },
            unavailabilityDOW: null,
            unavailabilityRanges: [
              {
                unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                unavailableToDate: '2021-12-31T09:00:00.000+0000',
              },
            ],
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 70,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100010',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyChannel: 'inPerson',
        partyRole: 'Judge',
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyChannel: 'byVideo',
        partyRole: 'Judge',
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.LISTED,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: 'cancelled',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyChannel: 'inPerson',
            partyRole: 'Judge',
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyChannel: 'byVideo',
            partyRole: 'Judge',
          },
        ],
      },
    },
  },
  {
    requestDetails: {
      requestTimeStamp: '2022-02-23T09:00:00.000+0000',
      versionNumber: 1,
    },
    hearingDetails: {
      duration: 70,
      hearingType: 'final',
      hearingLocations: [
        {
          locationType: 'hearing',
          locationId: '196538',
          locationName: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
          region: 'North West',
        },
      ],
      hearingIsLinkedFlag: false,
      hearingWindow: {
        hearingWindowDateRange: {
          hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
          hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
        },
        hearingWindowFirstDate: '2021-12-01T09:00:00.000+0000',
      },
      privateHearingRequiredFlag: false,
      panelRequirements: null,
      autolistFlag: false,
      hearingPriorityType: 'standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      facilitiesRequired: [
        'immigrationDetentionCentre',
        'inCameraCourt',
        'sameSexCourtroom',
      ],
      listingComments: 'Interpreter required',
      hearingRequester: '',
      leadJudgeContractType: '',
    },
    caseDetails: {
      hmctsServiceCode: 'SSCS',
      caseRef: '1584618195804035',
      requestTimeStamp: null,
      hearingID: 'h100011',
      externalCaseReference: null,
      caseDeepLink: null,
      hmctsInternalCaseName: 'Jane Smith vs DWP',
      publicCaseName: 'Jane Smith vs DWP',
      caseAdditionalSecurityFlag: false,
      caseInterpreterRequiredFlag: false,
      caseCategories: [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'Personal Independence Payment',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Conditions of Entitlement',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Good cause',
        },
        {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'Rate of Assessment / Payability Issues - complex',
        }],
      caseManagementLocationCode: null,
      caserestrictedFlag: false,
      caseSLAStartDate: '2021-11-23T09:00:00.000+0000',
    },
    partyDetails: [
      {
        partyID: 'P1',
        partyName: 'Jane and Smith',
        partyType: PartyType.IND,
        partyChannel: 'inPerson',
        partyRole: 'Judge',
      },
      {
        partyID: 'P2',
        partyName: 'DWP',
        partyType: PartyType.ORG,
        partyChannel: 'byVideo',
        partyRole: 'Judge',
      },
    ],
    hearingResponse: {
      listAssistTransactionID: '123456789',
      receivedDateTime: '2021-11-30T09:00:00.000+0000',
      responseVersion: 0,
      laCaseStatus: LaCaseStatus.LISTED,
      listingStatus: ListingStatus.FIXED,
      hearingCancellationReason: 'cancelled',
      hearingDaySchedule: {
        hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
        hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
        listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
        hearingVenueId: '815833',
        hearingRoomId: 'room 4',
        hearingJudgeId: 'p1000002',
        panelMemberIds: ['p1000001'],
        attendees: [
          {
            partyID: 'P1',
            partyName: 'Jane and Smith',
            partyType: PartyType.IND,
            partyChannel: 'inPerson',
            partyRole: 'Judge',
          },
          {
            partyID: 'P2',
            partyName: 'DWP',
            partyType: PartyType.ORG,
            partyChannel: 'byVideo',
            partyRole: 'Judge',
          },
        ],
      },
    },
  },
];
