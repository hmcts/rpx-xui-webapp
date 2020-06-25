import { SharedCase } from '../../models/case-share/case-share.module';
import * as ShareCasesActions from '../actions/share-case.action';

export interface ShareCasesState {
  shareCases: SharedCase[];
  loading: boolean;
  error: Error;
}

export let initialSharedCasesState: ShareCasesState = {
  shareCases: [],
  loading: false,
  error: undefined
};

export function shareCasesReducer(state: ShareCasesState = initialSharedCasesState,
                                  action: ShareCasesActions.Actions): ShareCasesState {
  switch (action.type) {
    case ShareCasesActions.NAVIGATE_TO_SHARE_CASES:
      const navigateToShareCases = state.shareCases.slice();
      for (let i = 0, l = action.payload.length; i < l; i++) {
        if (!navigateToShareCases.some(x => x.caseId === action.payload[i].caseId)) {
          navigateToShareCases.push(action.payload[i]);
        }
      }
      return {
        ...state,
        shareCases: navigateToShareCases
      };
    case ShareCasesActions.LOAD_SHARE_CASES:
      return {
        ...state,
        loading: true
      };
    case ShareCasesActions.LOAD_SHARE_CASES_SUCCESS:
      return {
        ...state,
        shareCases: action.payload,
        loading: false
      };
    case ShareCasesActions.LOAD_SHARE_CASES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ShareCasesActions.ADD_SHARE_CASES:
      const addShareCases = state.shareCases.slice();
      for (let i = 0, l = action.payload.sharedCases.length; i < l; i++) {
        if (!addShareCases.some(x => x.caseId === action.payload.sharedCases[i].caseId)) {
          addShareCases.push(action.payload.sharedCases[i]);
        }
      }
      return {
        ...state,
        shareCases: addShareCases
      };
    case ShareCasesActions.ADD_SHARE_CASE_GO:
      const addShareCasesGo = state.shareCases.slice();
      for (let i = 0, l = action.payload.sharedCases.length; i < l; i++) {
        if (!addShareCasesGo.some(x => x.caseId === action.payload.sharedCases[i].caseId)) {
          addShareCasesGo.push(action.payload.sharedCases[i]);
        }
      }
      return {
        ...state,
        shareCases: addShareCasesGo
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
