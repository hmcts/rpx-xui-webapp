import { HearingRequestStateData } from '../../models/hearingRequestStateData.model';
import { HMCLocationType } from '../../models/hearings.enum';
import * as fromHearingRequestActions from '../actions/hearing-request.action';
import * as fromHearingRequestReducer from './hearing-request.reducer';

describe('Hearing Request Reducer', () => {
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
              timestamp: null,
              versionNumber: 1
            },
            hearingDetails: {
              duration: null,
              hearingType: null,
              hearingChannels: [],
              hearingLocations: [{
                locationId: '196538',
                locationType: HMCLocationType.COURT
              },
              {
                locationId: '219164',
                locationType: HMCLocationType.COURT
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
              hearingInWelshFlag: false,
              facilitiesRequired: [],
              listingComments: null,
              hearingRequester: null,
              leadJudgeContractType: null,
              amendReasonCodes: null,
              listingAutoChangeReasonCode: null
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
              caseSLAStartDate: null
            },
            partyDetails: []
          },
          lastError: null
        };
        const action = new fromHearingRequestActions.InitializeHearingRequest(initialHearingRequestState.hearingRequestMainModel);
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState).toEqual(initialHearingRequestState);
      });
    });

    describe('Update hearing request action', () => {
      const initialHearingRequestState: HearingRequestStateData = {
        hearingRequestMainModel: {
          requestDetails: {
            timestamp: null,
            versionNumber: 1
          },
          hearingDetails: {
            duration: null,
            hearingType: null,
            hearingChannels: [],
            hearingLocations: [{
              locationId: '196538',
              locationType: HMCLocationType.COURT
            },
            {
              locationId: '219164',
              locationType: HMCLocationType.COURT
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
            amendReasonCodes: null,
            listingAutoChangeReasonCode: null
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
            caseSLAStartDate: null
          },
          partyDetails: []
        },
        lastError: null
      };

      it('should update hearing request action and reset hearingInWelshFlag if no Wales location', () => {
        const action = new fromHearingRequestActions.UpdateHearingRequest(initialHearingRequestState.hearingRequestMainModel, {
          isInit: false,
          region: 'North West'
        });
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState.hearingRequestMainModel.hearingDetails.hearingInWelshFlag).toBeFalsy();
      });

      it('should NOT reset hearingInWelshFlag as Wales regionId is present', () => {
        const action = new fromHearingRequestActions.UpdateHearingRequest(initialHearingRequestState.hearingRequestMainModel, {
          isInit: false,
          region: 'North West',
          regionId: '7'
        });
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState.hearingRequestMainModel.hearingDetails.hearingInWelshFlag).toEqual(true);
      });

      it('should update hearing request action with hearingRequestMainModel as hearingCondition mode is view-edit', () => {
        const action = new fromHearingRequestActions.UpdateHearingRequest(initialHearingRequestState.hearingRequestMainModel, {
          isInit: false,
          region: 'North West',
          mode: 'view-edit'
        });
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState.hearingRequestMainModel.hearingDetails.hearingInWelshFlag).toEqual(true);
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
          }
        };
        const action = new fromHearingRequestActions.SubmitHearingRequestFailure(initialHearingRequestState.lastError);
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState).toEqual(initialHearingRequestState);
      });
    });

    describe('reset hearing actuals last error action', () => {
      it('should set correct object', () => {
        const initialHearingRequestState: HearingRequestStateData = {
          hearingRequestMainModel: null,
          lastError: {
            status: 403,
            errors: null,
            message: 'Http failure response: 403 Forbidden'
          }
        };
        const action = new fromHearingRequestActions.ResetHearingRequestLastError();
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState.lastError).toEqual(null);
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
          }
        };
        const action = new fromHearingRequestActions.UpdateHearingRequestFailure(initialHearingRequestState.lastError);
        const hearingsState = fromHearingRequestReducer.hearingRequestReducer(initialHearingRequestState, action);
        expect(hearingsState).toEqual(initialHearingRequestState);
      });
    });
  });
});
