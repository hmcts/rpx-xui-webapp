import { SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';
import * as ShareCasesActions from '../actions/share-case.action';

export interface ShareCasesState {
  shareCases: SearchResultViewItem[];
}

export const initialSharedCasesState: ShareCasesState = { shareCases: [] };

export function shareCasesReducer(state: ShareCasesState = initialSharedCasesState,
                                  action: ShareCasesActions.Actions): ShareCasesState {
  switch (action.type) {
    case ShareCasesActions.ADD_SHARE_CASES:
      state.shareCases = state.shareCases.concat(action.payload);
      return state;
    case ShareCasesActions.DELETE_A_SHARE_CASE:
      for (let i = 0, l = state.shareCases.length; i < l; i++ ) {
        if ( state.shareCases[i].case_id === action.payload) { state.shareCases.splice(i, 1); }
      }
      return state;
    default:
      return state;
  }
}

export const getShareCases = (state: ShareCasesState) => state.shareCases;
