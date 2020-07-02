
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model';
import {REMOVE_USER_FROM_CASE} from '../actions/share-case.action';
import * as ShareCasesActions from '../actions/share-case.action';

export interface ShareCasesState {
  shareCases: SharedCase[];
  loading: boolean;
  error: Error;
  users: UserDetails[];
}

export let initialSharedCasesState: ShareCasesState = {
  shareCases: [],
  loading: false,
  error: undefined,
  users: []
};

export function shareCasesReducer(state: ShareCasesState = initialSharedCasesState,
                                  action: ShareCasesActions.Actions): ShareCasesState {
  switch (action.type) {
    case ShareCasesActions.NAVIGATE_TO_SHARE_CASES:
      const navigateToShareCases = state.shareCases.slice();
      for (const aCase of action.payload) {
        if (!navigateToShareCases.some(hasACase => hasACase.caseId === aCase.caseId)) {
          navigateToShareCases.push(aCase);
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
      for (const aCase of action.payload.sharedCases) {
        if (!addShareCases.some(hasACase => hasACase.caseId === aCase.caseId)) {
          addShareCases.push(aCase);
        }
      }
      return {
        ...state,
        shareCases: addShareCases
      };
    case ShareCasesActions.ADD_SHARE_CASE_GO:
      const addShareCasesGo = state.shareCases.slice();
      for (const aCase of action.payload.sharedCases) {
        if (!addShareCasesGo.some(hasACase => hasACase.caseId === aCase.caseId)) {
          addShareCasesGo.push(aCase);
        }
      }
      return {
        ...state,
        shareCases: addShareCasesGo
      };
    case ShareCasesActions.DELETE_A_SHARE_CASE:
      const caseInStore4Delete = state.shareCases.slice();
      for (let i = 0, l = caseInStore4Delete.length; i < l; i++) {
        if (caseInStore4Delete[i].caseId === action.payload.caseId) {
          caseInStore4Delete.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        shareCases: caseInStore4Delete
      };
    case ShareCasesActions.LOAD_USERS_FROM_ORG_FOR_CASE_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case ShareCasesActions.REMOVE_USER_FROM_CASE:
        action.payload.sharedCase.pendingUnshares.push(action.payload.user);
        return {
        ...state
      };
    case ShareCasesActions.CANCEL_USER_REMOVE_FROM_CASE:
       action.payload.sharedCase.pendingUnshares.splice(action.payload.sharedCase.pendingUnshares.findIndex(item => item.email === action.payload.user.email), 1)
       return {
        ...state
      };
    default:
      return initialSharedCasesState;
  }
}

export const getShareCases = (state: ShareCasesState) => state.shareCases;
export const getOrganisationUsers = (state: ShareCasesState) => state.users;
