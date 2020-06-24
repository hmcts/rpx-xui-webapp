import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';
import { SharedCase } from '../../../cases/models/case-share/case-share.module';

export const GO = '[Router] Go';
export const CREATE_CASE_GO = '[Router] Create Case Go';
export const ADD_SHARE_CASE_GO = '[Router] Add Share Case Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const NEW_CASE_LOADED = '[Router] Case Loaded';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
      callback?: () => void;
      errorHandler?: (err) => void;
    }
  ) {}
}
export class NewCaseLoadedSuccessfully implements Action {
  readonly type = NEW_CASE_LOADED;
}
export class CreateCaseGo implements Action {
    readonly type = CREATE_CASE_GO;
    constructor(
      public payload: {
        path: any[];
        query?: object;
        extras?: NavigationExtras;
        caseId: string
      }
    ) {}
}

export class AddShareCaseGo implements Action {
  readonly type = ADD_SHARE_CASE_GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
      sharedCases: SharedCase[]
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export type Actions = Go | Back | Forward | NewCaseLoadedSuccessfully | CreateCaseGo | AddShareCaseGo;
