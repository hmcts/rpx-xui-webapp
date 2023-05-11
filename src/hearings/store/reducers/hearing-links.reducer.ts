import { HearingLinksStateData } from '../../models/hearingLinksStateData.model';
import * as fromActions from '../actions';

export const initialHearingLinksState: HearingLinksStateData = {
  serviceLinkedCases: null,
  serviceLinkedCasesWithHearings: null,
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
    case fromActions.LOAD_SERVICE_LINKED_CASES_WITH_HEARINGS_SUCCESS: {
      return {
        ...currentState,
        serviceLinkedCasesWithHearings: action.payload
      };
    }
    case fromActions.LOAD_SERVICE_LINKED_CASES_FAILURE:
    case fromActions.LOAD_SERVICE_LINKED_CASES_WITH_HEARINGS_FAILURE: {
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
    case fromActions.MANAGE_LINKED_HEARING_GROUP: {
      return {
        ...currentState,
        linkedHearingGroup: action.payload.linkedHearingGroup
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

export const serviceLinkedCases = (hearingLinksStateData) => hearingLinksStateData.serviceLinkedCases;
export const serviceLinkedCasesWithHearings = (hearingLinksStateData) => hearingLinksStateData.serviceLinkedCasesWithHearings;
export const linkedHearingGroup = (hearingLinksStateData) => hearingLinksStateData.linkedHearingGroup;
