import { HearingRequestStateData } from '../../models/hearingRequestStateData.model';
import * as fromHearingRequestCompareActions from '../actions/hearing-request-to-compare.action';
import * as fromHearingRequestReducer from './hearing-request.reducer';

export const initialHearingRequestToCompareState: HearingRequestStateData = {
  ...fromHearingRequestReducer.initialHearingRequestState
};

export function hearingRequestToCompareReducer(currentState = initialHearingRequestToCompareState,
  action: fromHearingRequestCompareActions.HearingRequestToCompareAction): HearingRequestStateData {
  switch (action.type) {
    case fromHearingRequestCompareActions.INITIALIZE_HEARING_REQUEST_TO_COMPARE: {
      return {
        ...currentState,
        hearingRequestMainModel: action.payload
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const hearingRequestToCompareLastError = (hearingRequestState) => hearingRequestState.lastError;
