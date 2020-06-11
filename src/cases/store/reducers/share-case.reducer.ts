import { SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';
import * as ShareCasesActions from '../actions/share-case.action';

export interface ShareCasesState {
  shareCases: SearchResultViewItem[];
}

export let initialSharedCasesState: ShareCasesState = { shareCases: [] };

export function shareCasesReducer(state: ShareCasesState = initialSharedCasesState,
                                  action: ShareCasesActions.Actions): ShareCasesState {
  switch (action.type) {
    case ShareCasesActions.ADD_SHARE_CASES:
      if (state.shareCases.length === 0 ) {
        state.shareCases = state.shareCases.concat(action.payload);
      } else {
        action.payload.forEach(x => {
          if (!state.shareCases.some(e => e.case_id === x.case_id)) {
            state.shareCases.push(x);
          }
        });
      }
      return state;
    case ShareCasesActions.DELETE_A_SHARE_CASE:
      for (let i = 0, l = state.shareCases.length; i < l; i++) {
        if (state.shareCases[i].case_id === action.payload) {
          state.shareCases.splice(i, 1);
          break;
        }
      }
      return state;
    default:
      return state;
  }
}

export const getShareCases = (state: ShareCasesState) => state.shareCases;
