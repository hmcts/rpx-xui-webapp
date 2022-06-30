import { HearingLinksStateData } from '../../models/hearingLinksStateData.model';
import * as fromActions from '../actions';

export const initialHearingLinksState: HearingLinksStateData = {
  serviceLinkedCases: [],
  linkedHearingGroup: null,
  lastError: null
};

export function hearingLinksReducer(currentState = initialHearingLinksState,
                                    action: fromActions.HearingLinksAction): HearingLinksStateData {
  switch (action.type) {
    case fromActions.RESET_HEARING_LINKS: {
      return {
        ...initialHearingLinksState
      };
    }
    case fromActions.LOAD_SERVICE_LINKED_CASES_SUCCESS: {
      return {
        ...currentState,
        serviceLinkedCases: action.payload
      };
    }
    case fromActions.LOAD_SERVICE_LINKED_CASES_FAILURE: {
      return {
        ...currentState,
        lastError: action.payload
      };
    }
    case fromActions.LOAD_SERVICE_LINKED_CASES_GROUP_DETAILS: {
      return {
        ...currentState,
        linkedHearingGroup: action.payload
      };
    }
    case fromActions.LOAD_LINKED_HEARING_GROUP_SUCCESS: {
      return {
        ...currentState,
        linkedHearingGroup: action.payload
      };
    }
    case fromActions.LOAD_LINKED_HEARING_GROUP_FAILURE:
    case fromActions.SUBMIT_LINKED_HEARING_GROUP_FAILURE:
    case fromActions.MANAGE_LINKED_HEARING_GROUP_FAILURE: {
      return {
        ...currentState,
        lastError: action.payload
      };
    }
    case fromActions.RESET_LINKED_HEARING_LAST_ERROR: {
      return {
        ...currentState,
        lastError: null
      };
    }
    default: {
      return {
        ...currentState
      };
    }
  }
}
