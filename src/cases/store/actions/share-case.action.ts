import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';
import { SharedCase } from '../../models/case-share/case-share.module';

export const LOAD_SHARE_CASES = '[ShareCase] Load Share Cases';
export const LOAD_SHARE_CASES_SUCCESS = '[ShareCase] Load Share Cases Success';
export const LOAD_SHARE_CASES_FAILURE = '[ShareCase] Load Share Cases Failure';
export const ADD_SHARE_CASES = '[ShareCase] Add Share Cases';
export const DELETE_A_SHARE_CASE = '[ShareCase] Delete A Share Case';

export class LoadShareCase implements Action {
  public readonly type = LOAD_SHARE_CASES;
  constructor(public payload: SharedCase[]) {}
}

export class LoadShareCaseSuccess implements Action {
  public readonly type = LOAD_SHARE_CASES_SUCCESS;
  constructor(public payload: SharedCase[]) {}
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

export class DeleteAShareCase implements Action {
  public readonly type = DELETE_A_SHARE_CASE;
  constructor(public payload: string) {}
}

export type Actions = LoadShareCase | LoadShareCaseSuccess | LoadShareCaseFailure | AddShareCases | DeleteAShareCase;
