import {HearingConditions} from '../../models/hearingConditions';
import * as fromActions from '../actions';

export const initialHearingConditionsState: HearingConditions = {};

export function hearingConditionsReducer(currentState = initialHearingConditionsState,
                                         action: fromActions.HearingConditionsAction): HearingConditions {
  switch (action.type) {
    case fromActions.HEARING_CONDITIONS_RESET: {
      return {
        ...initialHearingConditionsState
      };
    }
    case fromActions.HEARING_CONDITIONS_SAVE: {
      return {
        ...currentState,
        [action.payload.key]: action.payload.toString()
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

export const hearingConditions = (hearingConditionsState) => hearingConditionsState;
