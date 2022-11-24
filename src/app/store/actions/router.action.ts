import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export const GO = '[Router] Go';
export const CREATE_CASE_GO = '[Router] Create Case Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const NEW_CASE_LOADED = '[Router] Case Loaded';

export class Go implements Action {
  public readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
      callback?(): void;
      errorHandler?(err): void;
    }
  ) {}
}
export class NewCaseLoadedSuccessfully implements Action {
  public readonly type = NEW_CASE_LOADED;
}
export class CreateCaseGo implements Action {
    public readonly type = CREATE_CASE_GO;
    constructor(
      public payload: {
        path: any[];
        query?: object;
        extras?: NavigationExtras;
        caseId: string
      }
    ) {}
}

export class Back implements Action {
  public readonly type = BACK;
}

export class Forward implements Action {
  public readonly type = FORWARD;
}

export type Actions = Go | Back | Forward | NewCaseLoadedSuccessfully | CreateCaseGo;
