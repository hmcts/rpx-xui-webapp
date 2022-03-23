import {HearingRequestStateData} from '../../models/hearingRequestStateData.model';
import * as fromHearingRequestActions from '../actions/hearing-request.action';
import * as fromHearingRequestReducer from './hearing-request.reducer';

fdescribe('Hearing Request Reducer', () => {

  describe('Actions', () => {

    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingRequestReducer.initialHearingRequestState;
        const action = new fromHearingRequestActions.ResetHearingRequest();
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });

    describe('Initialization action', () => {
      it('should initialize hearing request', () => {
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
              hmctsServiceCode: 'SSCS',
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
        const action = new fromHearingRequestActions.InitializeHearingRequest(initialHearingRequestState.hearingRequestMainModel);
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState).toEqual(initialHearingRequestState);
      });
    });

    describe('Update hearing request action', () => {
      it('should update hearing request action and reset hearingInWelshFlag if no Wales location', () => {
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
              hearingInWelshFlag: true,
              facilitiesRequired: [],
              listingComments: null,
              hearingRequester: null,
              leadJudgeContractType: null,
            },
            caseDetails: {
              hmctsServiceCode: 'SSCS',
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
        const action = new fromHearingRequestActions.UpdateHearingRequest(initialHearingRequestState.hearingRequestMainModel);
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState.hearingRequestMainModel.hearingDetails.hearingInWelshFlag).toBeFalsy();
      });
    });

    describe('Submit hearing request failure action', () => {
      it('should call error response action', () => {
        const initialHearingRequestState: HearingRequestStateData = {
          hearingRequestMainModel: null,
          lastError: {
            status: 403,
            errors: null,
            message: 'Http failure response: 403 Forbidden'
          },
        };
        const action = new fromHearingRequestActions.SubmitHearingRequestFailure(initialHearingRequestState.lastError);
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState).toEqual(initialHearingRequestState);
      });
    });

    describe('Update hearing request failure', () => {
      it('should call error response action', () => {
        const initialHearingRequestState: HearingRequestStateData = {
          hearingRequestMainModel: null,
          lastError: {
            status: 500,
            errors: null,
            message: 'Internal server error'
          },
        };
        const action = new fromHearingRequestActions.UpdateHearingRequestFailure(initialHearingRequestState.lastError);
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState).toEqual(initialHearingRequestState);
      });
    });
  });
});
