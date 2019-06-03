import { Entity } from './../entity';
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

export function reducer( state , action: fromCases.CaseSearchAction): SearchState {
  switch (action.type) {
    case fromCases.APPLIED: {
      const jurisdiction = new Entity(action.payload.jurisdiction);
      const metadataFields = new Entity(action.payload.metadataFields);
      const caseType = new Entity(action.payload.caseType);
      return {
          metadataFields,
          jurisdiction,
          caseType,
          loading: false,
          loaded: true
      };
    }

    case fromCases.RESET:
      return null;
  }
  return state;
}

