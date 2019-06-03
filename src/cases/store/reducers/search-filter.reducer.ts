import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import * as fromCases from '../actions/case-search.action';

// todo this is just a place holder
export interface SearchState {
  metadataFields: Array<any>;
  jurisdiction: any;
  caseType: any;
  loading: boolean;
  loaded: boolean;
}

export const initialStateSearch: SearchState = {
  metadataFields: [],
  jurisdiction: '',
  caseType: null,
  loaded: false,
  loading: false,
};

export function reducer( state = initialStateSearch, action: fromCases.CaseSearchAction): SearchState {
  switch (action.type) {
    case fromCases.APPLIED: {
<<<<<<< HEAD
      const searchFilterCriteria = action.payload.jurisdiction;
=======
      const {metadataFields, jurisdiction, caseType} = action.payload;
>>>>>>> casefilter state management with styling
      return {
          ...state,
          metadataFields,
          jurisdiction,
          caseType,
          loaded: true
      };
    }
  }
  return state;
}

