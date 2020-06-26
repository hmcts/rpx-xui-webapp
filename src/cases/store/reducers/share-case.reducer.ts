import * as ShareCasesActions from '../actions/share-case.action';
import { SharedCase } from '../../models/case-share/case-share.module';

export interface ShareCasesState {
  shareCases: SharedCase[];
}

export let initialSharedCasesState: ShareCasesState = {
  shareCases: []
};

export function shareCasesReducer(state: ShareCasesState = initialSharedCasesState,
                                  action: ShareCasesActions.Actions): ShareCasesState {
  switch (action.type) {
    case ShareCasesActions.ADD_SHARE_CASES:
      const caseInStore4Add = state.shareCases.slice();
      for (let i = 0, l = action.payload.length; i < l; i++) {
        if (!caseInStore4Add.some(x => x.caseId === action.payload[i].caseId)) {
          caseInStore4Add.push(action.payload[i]);
        }
      }
      return {
        ...state,
        shareCases: caseInStore4Add
      };
    case ShareCasesActions.DELETE_A_SHARE_CASE:
      const caseInStore4Delete = state.shareCases.slice();
      for (let i = 0, l = caseInStore4Delete.length; i < l; i++) {
        if (caseInStore4Delete[i].caseId === action.payload) {
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
