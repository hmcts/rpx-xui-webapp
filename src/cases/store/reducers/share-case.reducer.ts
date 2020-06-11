import { SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';
import * as ShareCasesActions from '../actions/share-case.action';

export interface ShareCasesState {
  shareCases: SearchResultViewItem[];
}

export let initialSharedCasesState: ShareCasesState = {
  shareCases: []
};

export function shareCasesReducer(state: ShareCasesState = initialSharedCasesState,
                                  action: ShareCasesActions.Actions): ShareCasesState {
  switch (action.type) {
    case ShareCasesActions.ADD_SHARE_CASES:
      const caseInStore4Add = state.shareCases;
      for (let i = 0, l = action.payload.length; i < l; i++) {
        if (!caseInStore4Add.some(x => x.case_id === action.payload[i].case_id)) {
          caseInStore4Add.push(action.payload[i]);
        }
      }
      return {
        ...state,
        shareCases: caseInStore4Add
      };
    case ShareCasesActions.DELETE_A_SHARE_CASE:
      const caseInStore4Delete = state.shareCases;
      for (let i = 0, l = caseInStore4Delete.length; i < l; i++) {
        if (caseInStore4Delete[i].case_id === action.payload) {
          caseInStore4Delete.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        shareCases: caseInStore4Delete
      };
    default:
      return initialSharedCasesState;
  }
}

export const getShareCases = (state: ShareCasesState) => state.shareCases;
