import { Entity } from '../../../app/store/helpers/entity';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import * as fromCases from '../actions/case-search.action';

// todo this is just a place holder
export interface SearchState {
  metadataFields: Entity;
  jurisdiction: Entity;
  caseType: Entity;
  loading: boolean;
  loaded: boolean;
}

export const initialSearchState: SearchState = {
  metadataFields: null,
  jurisdiction: null,
  caseType: null,
  loading: false,
  loaded: false
};

export function reducer(
  state = initialSearchState,
  action: fromCases.CaseSearchAction
): SearchState {
  switch (action.type) {
    case fromCases.APPLIED: {
      return {
        ...state,
        metadataFields: new Entity(action.payload.metadataFields),
        jurisdiction: new Entity(action.payload.jurisdiction),
        caseType: new Entity(action.payload.caseType),
        loading: false,
        loaded: true
      };
    }

    case fromCases.RESET:
      return initialSearchState;
  }
  return state;
}

