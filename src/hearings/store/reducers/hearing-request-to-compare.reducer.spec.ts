import {HearingRequestStateData} from '../../models/hearingRequestStateData.model';
import * as fromHearingRequestToCompareActions from '../actions/hearing-request-to-compare.action';
import * as fromHearingRequestToCompareReducer from './hearing-request-to-compare.reducer';

describe('Hearing Request To Compare Reducer', () => {

  describe('Actions', () => {

    describe('Initialization action', () => {
      it('should initialize hearing request to compare', () => {
        const initialHearingRequestState: HearingRequestStateData = {
          hearingRequestMainModel: {
            requestDetails: {
              requestTimeStamp: null,
            },
            hearingDetails: {
              duration: null,
              hearingType: null,
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
              hearingIsLinkedFlag: false,
              hearingWindow: null,
              privateHearingRequiredFlag: false,
              panelRequirements: null,
              autolistFlag: false,
              nonStandardHearingDurationReasons: [],
              hearingPriorityType: null,
              numberOfPhysicalAttendees: null,
              hearingInWelshFlag: false,
              facilitiesRequired: [],
              listingComments: null,
              hearingRequester: null,
              leadJudgeContractType: null,
            },
            caseDetails: {
              hmctsServiceCode: 'BBA3',
              caseRef: '111122223333444',
              requestTimeStamp: null,
              hearingID: 'h111111',
              externalCaseReference: null,
              caseDeepLink: null,
              hmctsInternalCaseName: null,
              publicCaseName: null,
              caseAdditionalSecurityFlag: null,
              caseInterpreterRequiredFlag: false,
              caseCategories: [],
              caseManagementLocationCode: null,
              caserestrictedFlag: false,
              caseSLAStartDate: null,
            },
            partyDetails: [],
          },
          lastError: null,
        };
        const action = new fromHearingRequestToCompareActions.InitializeHearingRequestToCompare(initialHearingRequestState.hearingRequestMainModel);
        const hearingsState = fromHearingRequestToCompareReducer.hearingRequestToCompareReducer(initialHearingRequestState, action);
        expect(hearingsState).toEqual(initialHearingRequestState);
      });
    });

  });
});
