import {HearingRequestStateData} from '../../models/hearingRequestStateData.model';
import * as fromActions from '../actions';

export const initialHearingRequestState: HearingRequestStateData = {
  hearingRequestMainModel: null,
  lastError: null,
};

export function hearingRequestReducer(currentState = initialHearingRequestState,
                                      action: fromActions.HearingRequestAction): HearingRequestStateData {
  switch (action.type) {
    case fromActions.HEARING_REQUEST_RESET: {
      return {
        ...initialHearingRequestState
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const hearingRequestLastError = (hearingRequestState) => hearingRequestState.lastError;
