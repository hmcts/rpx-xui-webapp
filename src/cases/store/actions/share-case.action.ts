import { Action } from '@ngrx/store';
import { SharedCase } from '../../models/case-share/case-share.module';

export const ADD_SHARE_CASES       = '[ShareCase] Add Share Cases';
export const DELETE_A_SHARE_CASE    = '[ShareCase] Delete A Share Case';

export class AddShareCases implements Action {
  public readonly type = ADD_SHARE_CASES;
  constructor(public payload: SharedCase[]) {}
}

export class DeleteAShareCase implements Action {
  public readonly type = DELETE_A_SHARE_CASE;
  constructor(public payload: string) {}
}

export type Actions = AddShareCases | DeleteAShareCase;
