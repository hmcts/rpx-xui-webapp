import {HearingValuesStateData} from '../../models/hearingValuesStateData';
import * as fromActions from '../actions';

export const initialHearingValuesState: HearingValuesStateData = {
  serviceHearingValuesModel: null,
  lastError: null,
};

export function hearingValuesReducer(currentState = initialHearingValuesState,
                                     action: fromActions.HearingValuesAction): HearingValuesStateData {
  switch (action.type) {
    case fromActions.RESET_HEARING_VALUES: {
      return {
        ...initialHearingValuesState
      };
    }
    case fromActions.LOAD_HEARING_VALUES_SUCCESS: {
      return {
        ...currentState,
        serviceHearingValuesModel: action.payload
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const hearingValuesModel = (hearingValuesState) => hearingValuesState.serviceHearingValuesModel;
