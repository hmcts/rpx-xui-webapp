import {HearingConditions} from '../../models/hearingConditions';
import * as fromActions from '../actions';

export const initialHearingConditionsState: HearingConditions = {
  region: 'Wales'
};

export function hearingConditionsReducer(currentState = initialHearingConditionsState,
                                         action: fromActions.HearingConditionsAction): HearingConditions {
  switch (action.type) {
    case fromActions.RESET_HEARING_CONDITIONS: {
      return {
        ...initialHearingConditionsState
      };
    }
    case fromActions.SAVE_HEARING_CONDITIONS: {
      return {
        ...currentState,
        [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}
