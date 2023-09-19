import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { hearingActualsMainModel, serviceHearingValuesModel } from '../hearing.test.data';
import { CategoryType, EXUIDisplayStatusEnum, EXUISectionStatusEnum, GroupLinkType, HearingListingStatusEnum, HMCLocationType, HMCStatus, LaCaseStatus, ListingStatus, PartyType, UnavailabilityType } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { AdditionalSecurityAmendedConverter } from './additional-security.amended.converter';

describe('AdditionalSecurityAmendedConverter', () => {
  const initialState = {
    hearings: {
      hearingList: {
        hearingListMainModel: {
          caseRef: '1111222233334444',
          hmctsServiceID: 'BBA3',
          caseHearings: [{
            hearingID: 'h00001',
            hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
            hearingType: 'Case management hearing',
            hmcStatus: HMCStatus.HEARING_REQUESTED,
            lastResponseReceivedDateTime: '',
            responseVersion: 'rv1',
            hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
            listAssistCaseStatus: '',
            hearingIsLinkedFlag: true,
            hearingGroupRequestId: null,
            hearingDaySchedule: null
          }]
        }
      },
      hearingActuals: {
        hearingActualsMainModel,
        lastError: null
      },
      hearingValues: {
        serviceHearingValuesModel,
        lastError: null
      },
      hearingRequestToCompare: {
        hearingRequestMainModel: {
          requestDetails: {
            timestamp: null,
            versionNumber: 1
          },
          hearingDetails: {
            duration: 60,
            hearingType: 'final',
            hearingChannels: [],
            hearingLocations: [
              {
                locationId: '196538',
                locationType: HMCLocationType.COURT
              },
              {
                locationId: '234850',
                locationType: HMCLocationType.COURT
              }
            ],
            hearingIsLinkedFlag: false,
            hearingWindow: {
              dateRangeStart: '2022-12-12T09:00:00.000Z',
              dateRangeEnd: '2022-12-12T09:00:00.000Z',
              firstDateTimeMustBe: ''
            },
            privateHearingRequiredFlag: false,
            panelRequirements: null,
            autolistFlag: false,
            nonStandardHearingDurationReasons: [],
            hearingPriorityType: 'standard',
            numberOfPhysicalAttendees: 3,
            hearingInWelshFlag: true,
            facilitiesRequired: [
              'immigrationDetentionCentre',
              'inCameraCourt'
            ],
            listingComments: 'blah blah blah',
            hearingRequester: null,
            leadJudgeContractType: null,
            amendReasonCodes: null,
            listingAutoChangeReasonCode: null
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
            caseCategories: [
              {
                categoryType: CategoryType.CaseType,
                categoryValue: 'BBA3-002'
              }, {
                categoryType: CategoryType.CaseSubType,
                categoryValue: 'BBA3-002CC',
                categoryParent: 'BBA3-002'
              }, {
                categoryType: CategoryType.CaseSubType,
                categoryValue: 'BBA3-002GC',
                categoryParent: 'BBA3-002'
              }, {
                categoryType: CategoryType.CaseSubType,
                categoryValue: 'BBA3-002RC',
                categoryParent: 'BBA3-002'
              }],
            caseManagementLocationCode: null,
            caserestrictedFlag: false,
            caseSLAStartDate: null
          },
          partyDetails: [
            {
              partyID: 'P1',
              partyName: 'Jane and Smith',
              partyType: PartyType.IND,
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
                  'RA0009'
                ],
                interpreterLanguage: 'PF0015',
                preferredHearingChannel: 'byVideo'
              },
              organisationDetails: {},
              unavailabilityDOW: null,
              unavailabilityRanges: [
                {
                  unavailableFromDate: '2021-12-10T09:00:00.000Z',
                  unavailableToDate: '2021-12-31T09:00:00.000Z',
                  unavailabilityType: UnavailabilityType.ALL_DAY
                }
              ]
            },
            {
              partyID: 'P2',
              partyName: 'DWP',
              partyType: PartyType.ORG,
              partyRole: 'claimant',
              individualDetails: {
                firstName: 'DWP',
                lastName: null,
                preferredHearingChannel: 'byVideo',
                reasonableAdjustments: [
                  'RA0005'
                ],
                interpreterLanguage: null
              },
              organisationDetails: {
                name: 'DWP',
                organisationType: 'GOV',
                cftOrganisationID: 'O100000'
              },
              unavailabilityDOW: null,
              unavailabilityRanges: [
                {
                  unavailableFromDate: '2021-12-20T09:00:00.000Z',
                  unavailableToDate: '2021-12-31T09:00:00.000Z',
                  unavailabilityType: UnavailabilityType.ALL_DAY
                }
              ]
            }
          ]
        },
        lastError: null
      },
      hearingRequest: {
        hearingRequestMainModel: {
          requestDetails: {
            hearingRequestID: '1000000',
            status: 'LISTED',
            timestamp: '2021-11-30T09:00:00.000Z',
            versionNumber: 1,
            cancellationReasonCodes: ['withdraw', 'struck']
          },
          hearingResponse: {
            listAssistTransactionID: '',
            responseVersion: 1,
            receivedDateTime: '2021-11-30T09:00:00.000Z',
            laCaseStatus: LaCaseStatus.PENDING_RELISTING,
            listingStatus: ListingStatus.FIXED,
            hearingCancellationReason: '',
            hearingDaySchedule: [{
              hearingStartDateTime: '2022-12-12T09:00:00.000Z',
              hearingEndDateTime: '2022-12-12T16:00:00.000Z',
              listAssistSessionID: '',
              hearingVenueId: '',
              hearingRoomId: 'room 3',
              hearingJudgeId: 'p1000002',
              panelMemberIds: ['p1000001'],
              attendees: [
                {
                  partyID: 'P1',
                  hearingSubChannel: 'inPerson',
                  partyName: 'Jane and Smith',
                  partyType: PartyType.IND,
                  partyRole: 'appellant',
                  individualDetails: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    preferredHearingChannel: 'inPerson'
                  }
                },
                {
                  partyID: 'P2',
                  hearingSubChannel: 'byVideo',
                  partyName: 'DWP',
                  partyType: PartyType.ORG,
                  partyRole: 'claimant',
                  individualDetails: {
                    firstName: 'DWP',
                    lastName: null,
                    preferredHearingChannel: 'byVideo'
                  }
                }
              ]
            }]
          },
          hearingDetails: {
            duration: 60,
            hearingType: 'final',
            hearingChannels: [],
            hearingLocations: [
              {
                locationId: '196538',
                locationType: HMCLocationType.COURT
              },
              {
                locationId: '234850',
                locationType: HMCLocationType.COURT
              }
            ],
            hearingIsLinkedFlag: false,
            hearingWindow: {
              dateRangeStart: '2022-12-12T09:00:00.000Z',
              dateRangeEnd: '2022-12-12T09:00:00.000Z',
              firstDateTimeMustBe: ''
            },
            privateHearingRequiredFlag: false,
            panelRequirements: null,
            autolistFlag: false,
            nonStandardHearingDurationReasons: [],
            hearingPriorityType: 'standard',
            numberOfPhysicalAttendees: 3,
            hearingInWelshFlag: true,
            facilitiesRequired: [
              'immigrationDetentionCentre',
              'inCameraCourt'
            ],
            listingComments: 'blah blah blah',
            hearingRequester: null,
            leadJudgeContractType: null,
            amendReasonCodes: null,
            listingAutoChangeReasonCode: null
          },
          caseDetails: {
            hmctsServiceCode: null,
            caseRef: null,
            requestTimeStamp: null,
            hearingID: null,
            externalCaseReference: null,
            caseDeepLink: null,
            hmctsInternalCaseName: 'Jane vs DWP',
            publicCaseName: 'Jane vs DWP',
            caseAdditionalSecurityFlag: false,
            caseInterpreterRequiredFlag: false,
            caseCategories: [
              {
                categoryType: CategoryType.CaseType,
                categoryValue: 'BBA3-002'
              }, {
                categoryType: CategoryType.CaseSubType,
                categoryValue: 'BBA3-002CC',
                categoryParent: 'BBA3-002'
              }, {
                categoryType: CategoryType.CaseSubType,
                categoryValue: 'BBA3-002GC',
                categoryParent: 'BBA3-002'
              }, {
                categoryType: CategoryType.CaseSubType,
                categoryValue: 'BBA3-002RC',
                categoryParent: 'BBA3-002'
              }],
            caseManagementLocationCode: null,
            caserestrictedFlag: false,
            caseSLAStartDate: null
          },
          partyDetails: [
            {
              partyID: 'P1',
              partyName: 'Jane and Smith',
              partyType: PartyType.IND,
              partyRole: 'appellant',
              individualDetails: {
                title: 'Miss',
                firstName: 'Jane',
                lastName: 'Smith',
                preferredHearingChannel: 'inPerson',
                reasonableAdjustments: [
                  'RA0042',
                  'RA0053',
                  'RA0013',
                  'RA0016',
                  'RA0042'
                ],
                interpreterLanguage: 'PF0015'
              },
              organisationDetails: {},
              unavailabilityDOW: null,
              unavailabilityRanges: [
                {
                  unavailableFromDate: '2021-12-10T09:00:00.000Z',
                  unavailableToDate: '2021-12-31T09:00:00.000Z',
                  unavailabilityType: UnavailabilityType.ALL_DAY
                }
              ]
            },
            {
              partyID: 'P2',
              partyName: 'DWP',
              partyType: PartyType.ORG,
              partyRole: 'claimant',
              individualDetails: {
                preferredHearingChannel: 'byVideo',
                reasonableAdjustments: [
                  'RA0005'
                ],
                interpreterLanguage: null
              },
              organisationDetails: {
                name: 'DWP',
                organisationType: 'GOV',
                cftOrganisationID: 'O100000'
              },
              unavailabilityDOW: null,
              unavailabilityRanges: [
                {
                  unavailableFromDate: '2021-12-20T09:00:00.000Z',
                  unavailableToDate: '2021-12-31T09:00:00.000Z',
                  unavailabilityType: UnavailabilityType.ALL_DAY
                }
              ]
            }
          ]
        },
        lastError: null
      },
      hearingConditions: {
        caseId: '1111222233334444',
        mode: 'create',
        isInit: true,
        fragmentId: 'venue'
      },
      hearingLinks: {
        serviceLinkedCases: [
          {
            caseReference: '4652724902696213',
            caseName: 'Smith vs Peterson',
            reasonsForLink: [
              'Linked for a hearing'
            ]
          },
          {
            caseReference: '5283819672542864',
            caseName: 'Smith vs Peterson',
            reasonsForLink: [
              'Linked for a hearing',
              'Progressed as part of lead case'
            ]
          },
          {
            caseReference: '8254902572336147',
            caseName: 'Smith vs Peterson',
            reasonsForLink: [
              'Familial',
              'Guardian',
              'Linked for a hearing'
            ]
          }
        ],
        serviceLinkedCasesWithHearings: [
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
              isSelected: true
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
              isSelected: true
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
              isSelected: true
            }]
          }
        ],
        linkedHearingGroup: {
          groupDetails: {
            groupName: 'Group A',
            groupReason: 'Reason 1',
            groupLinkType: GroupLinkType.ORDERED,
            groupComments: 'Comment 1'
          },
          hearingsInGroup: [
            {
              hearingId: 'h1000001',
              hearingOrder: 1
            },
            {
              hearingId: 'h1000003',
              hearingOrder: 2
            },
            {
              hearingId: 'h1000005',
              hearingOrder: 3
            }]
        },
        lastError: null
      }
    }
  };

  let additionalSecurityAmendedConverter: AdditionalSecurityAmendedConverter;

  beforeEach(() => {
    additionalSecurityAmendedConverter = new AdditionalSecurityAmendedConverter();
  });

  it('should transform is amended for additional security required', () => {
    const STATE: State = initialState.hearings;
    const result$ = additionalSecurityAmendedConverter.transformIsAmended(of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });
});
