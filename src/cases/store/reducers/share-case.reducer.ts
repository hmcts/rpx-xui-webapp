import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model';
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
      const casesInStore = state.shareCases.slice();
      const casesFromNode: SharedCase[] = sortedUserInCases(action.payload);
      const casesWithTypes: SharedCase[] = [];
      for (const aCase of casesFromNode) {
        if (!aCase.hasOwnProperty('caseTypeId')) {
          const caseExists = casesInStore.find(theCase => theCase.caseId === aCase.caseId);
          const caseTypeId = caseExists && caseExists.caseTypeId ? caseExists.caseTypeId : null;
          const caseTitle = caseExists && caseExists.caseTitle ? caseExists.caseTitle : null;
          const newCase: SharedCase = {
            ...aCase,
            caseTypeId,
            caseTitle
          };
          casesWithTypes.push(newCase);
        }
      }
      return {
        ...state,
        shareCases: casesWithTypes,
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
    case ShareCasesActions.SYNCHRONIZE_STATE_TO_STORE:
      return {
        ...state,
        shareCases: action.payload
      };
    case ShareCasesActions.ASSIGN_USERS_TO_CASE_SUCCESS:
      return {
        ...state,
        shareCases: action.payload,
        loading: true
      };
    default:
      return state;
  }
}

export function sortedUserInCases(pendingSortedCases: SharedCase[]): SharedCase[] {
  const cases: SharedCase[] = [];
  for (const aCase of pendingSortedCases) {
    if (aCase.sharedWith) {
      const sortedUsers: UserDetails[] = aCase.sharedWith.slice().sort((user1, user2) => {
        return user1.firstName > user2.firstName ? 1 : (user2.firstName > user1.firstName ? -1 : 0);
      });
      const caseWithSortedUser = {
        ...aCase,
        sharedWith: sortedUsers
      };
      cases.push(caseWithSortedUser);
    } else {
      cases.push(aCase);
    }
  }
  return cases;
}

export const getShareCases = (state: ShareCasesState) => state.shareCases;
export const getOrganisationUsers = (state: ShareCasesState) => state.users;
