import * as fromActions from '../actions';
import { HearingDetailsModel } from './../../../../src/hearings/models/hearingDetails.model';

export const initialState: HearingDetailsModel = {
  hearingInWelshFlag: null,
  duration: 0,
  hearingType: '',
  hearingLocations: [],
  hearingWindow: undefined,
  panelRequirements: undefined,
  autolistFlag: false,
  hearingPriorityType: ''
};

export function hearingsDetailsReducer(currentState = initialState, action: fromActions.HearingsAction): HearingDetailsModel {
  switch (action.type) {
    case fromActions.RESET: {
      return {
        ...currentState,
        ...initialState
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}

