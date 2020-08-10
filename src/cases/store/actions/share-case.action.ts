import { NavigationExtras } from '@angular/router';
import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model';
import { Action } from '@ngrx/store';

export const NAVIGATE_TO_SHARE_CASES = '[ShareCase] Navigate To Share Cases';
export const LOAD_SHARE_CASES = '[ShareCase] Load Share Cases';
export const LOAD_SHARE_CASES_SUCCESS = '[ShareCase] Load Share Cases Success';
export const LOAD_SHARE_CASES_FAILURE = '[ShareCase] Load Share Cases Failure';
export const ADD_SHARE_CASES = '[ShareCase] Add Share Cases';
export const ADD_SHARE_CASE_GO = '[Router] Add Share Case Go';
export const DELETE_A_SHARE_CASE = '[ShareCase] Delete A Share Case';
export const LOAD_USERS_FROM_ORG_FOR_CASE = '[LoadUsers] From ORG For A Case';
export const LOAD_USERS_FROM_ORG_FOR_CASE_SUCCESS = '[LoadUsers] From ORG For A Case Success';
export const SYNCHRONIZE_STATE_TO_STORE = '[ShareCase] Synchronize State To Store';
export const ASSIGN_USERS_TO_CASE = '[ShareCase] Assign Users to Case';
export const ASSIGN_USERS_TO_CASE_SUCCESS = '[ShareCase] Assign Users to Case Success';

export class LoadUserFromOrgForCase implements Action {
  public readonly type = LOAD_USERS_FROM_ORG_FOR_CASE;
  constructor() {}
}

export class NavigateToShareCase implements Action {
  public readonly type = NAVIGATE_TO_SHARE_CASES;
  constructor(public payload: SharedCase[]) {}
}

export class LoadShareCase implements Action {
  public readonly type = LOAD_SHARE_CASES;
  constructor(public payload: SharedCase[]) {}
}

export class LoadShareCaseSuccess implements Action {
  public readonly type = LOAD_SHARE_CASES_SUCCESS;
  constructor(public payload: SharedCase[]) {}
}

export class LoadUserFromOrgForCaseSuccess implements Action {
  public readonly type = LOAD_USERS_FROM_ORG_FOR_CASE_SUCCESS;
  constructor(public payload: UserDetails[]) {}
}

export class LoadShareCaseFailure implements Action {
  public readonly type = LOAD_SHARE_CASES_FAILURE;
  constructor(public payload: Error) {}
}

export class AddShareCases implements Action {
  public readonly type = ADD_SHARE_CASES;
  constructor(public payload: {
    path?: any[];
    query?: object;
    extras?: NavigationExtras;
    sharedCases: SharedCase[]
  }) {}
}

export class AddShareCaseGo implements Action {
  public readonly type = ADD_SHARE_CASE_GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
      sharedCases: SharedCase[]
    }
  ) {}
}

export class DeleteAShareCase implements Action {
  public readonly type = DELETE_A_SHARE_CASE;
  constructor(
    public payload: {
      caseId: string;
    }
  ) {}
}

export class SynchronizeStateToStore implements Action {
  public readonly type = SYNCHRONIZE_STATE_TO_STORE;
  constructor(public payload: SharedCase[]) {}
}

export class AssignUsersToCase implements Action {
  public readonly type = ASSIGN_USERS_TO_CASE;
  constructor(public payload: SharedCase[]) {}
}

export class AssignUsersToCaseSuccess implements Action {
  public readonly type = ASSIGN_USERS_TO_CASE_SUCCESS;
  constructor(public payload: SharedCase[]) {}
}

export type Actions = NavigateToShareCase | LoadShareCase | LoadShareCaseSuccess | LoadShareCaseFailure
  | AddShareCases | AddShareCaseGo | DeleteAShareCase | LoadUserFromOrgForCase | LoadUserFromOrgForCaseSuccess
  | SynchronizeStateToStore | AssignUsersToCase | AssignUsersToCaseSuccess;
