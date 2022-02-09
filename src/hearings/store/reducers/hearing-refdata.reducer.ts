import {HearingReferenceStateData} from 'src/hearings/models/hearingReferenceStateData.model';
import * as fromActions from '../actions';

export const initialHearingRefDataState: HearingReferenceStateData = {
  hearingFacilities: [],
};

export function hearingRefDataReducer(currentState = initialHearingRefDataState,
                                   action: fromActions.HearingRefDataAction): HearingReferenceStateData {
  switch (action.type) {
    case fromActions.LOAD_HEARINGS_FACILITIES_DATA_SUCCESS: {
      return {
        ...currentState,
        hearingFacilities: action.payload
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}
