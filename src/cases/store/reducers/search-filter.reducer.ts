import { Entity } from '../helpers/entity';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import * as fromCases from '../actions/case-search.action';
import {SUCCESS} from '../actions/case-search.action';

// todo this is just a place holder
export interface SearchState {
  metadataFields: Entity;
  jurisdiction: Entity;
  searchResult: any;
  caseType: Entity;
  loading: boolean;
  loaded: boolean;
}

export function reducer( state , action: fromCases.CaseSearchAction): SearchState {
  switch (action.type) {
    case fromCases.APPLIED: {
      const jurisdiction = new Entity(action.payload.jurisdiction);
      const metadataFields = new Entity(action.payload.metadataFields);
      const caseType = new Entity(action.payload.caseType);
      const searchResult = null;
      return {
          metadataFields,
          jurisdiction,
          caseType,
          searchResult,
          loading: false,
          loaded: true
      };
    }


    case fromCases.SUCCESS: {
      return {
        ...state,
        searchResult: action.payload
      };
    }

    case fromCases.RESET:
      return null;
  }
  return state;
}

