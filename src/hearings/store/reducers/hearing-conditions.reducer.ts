import {HearingConditions} from '../../models/hearingConditions';
import * as fromActions from '../actions';

export const initialHearingConditionsState: HearingConditions = {};

export const hearingConditionsReducer = (currentState = initialHearingConditionsState,
                                         action: fromActions.HearingConditionsAction): HearingConditions => {
  switch (action.type) {
    case fromActions.RESET_HEARING_CONDITIONS: {
      return {
        ...initialHearingConditionsState
      };
    }
    case fromActions.SAVE_HEARING_CONDITIONS: {
      return {...currentState, ...action.payload};
    }
    default: {
      return {
        ...currentState
      };
    }
  }
};
